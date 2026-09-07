import {
	getCachedResponseValidationResult,
	getCachedRssSourceList,
} from "~~/server/utils/news-list.utils";
import {
	newListQueryMaxPageSchema,
	newListQuerySchema,
} from "~~/server/schemas/news-list.schemas";
import {
	rssResponseToNewsListMapper,
} from "~~/server/mappers/news-list.mappers";

const {
	pageSize,
} = useRuntimeConfig();

export default defineEventHandler(async (
	event,
) => {
	const {
		rssSourceList,
	} = await getCachedRssSourceList();
	const {
		page,
		source,
		search = "",
	} = await getValidatedQuery(
		event,
		newListQuerySchema({
			rssSourceList,
		}).parse,
	);

	const selectedRssSourceList = (() => {
		if (source === undefined) {
			return rssSourceList;
		}
		return rssSourceList.filter(({
			host,
		}) => {
			return host === source;
		});
	})();

	const newsListBySourcePromiseSettledResult = await Promise.allSettled(
		selectedRssSourceList.flatMap(async ({
			href, host,
		}) => {
			const responseXml = await $fetch<string>(
				href,
				{
					responseType: "text",
				},
			);
			const responseXmlParsed = parseXml(
				responseXml,
			);
			/*
			The schema compliance check is performed once and cached permanently for performance reasons.
			I optimistically assume that subsequent responses will also comply with the schema.
			*/
			const response = await getCachedResponseValidationResult({
				href,
				response: responseXmlParsed,
			});
			return rssResponseToNewsListMapper({
				response,
				source: host,
			});
		}),
	);
	const newsListBySourcePromiseFulfilled = (
		newsListBySourcePromiseSettledResult
		.filter((result) => {
			return result.status === "fulfilled";
		})
	);
	if (newsListBySourcePromiseFulfilled.length === 0) {
		throw createError({
			statusCode: 502,
			statusMessage: "All RSS sources failed",
		});
	}

	const newsListBySource = (
		newsListBySourcePromiseFulfilled
		.flatMap((result) => {
			return result.value;
		})
	);

	const normalizedSearch = search.toLowerCase();
	const normalizedSplittedSearch = normalizedSearch.split(" ");
	const newsListBySourceAndSearch = newsListBySource.filter(({
		title, description,
	}) => {
		return (
			normalizedSplittedSearch.some((searchWord) => {
				return title.toLowerCase().includes(searchWord);
			})
			|| normalizedSplittedSearch.some((searchWord) => {
				return description.toLowerCase().includes(searchWord);
			})
		);
	});

	const newsListBySourceAndSearchSorted = newsListBySourceAndSearch.sort((a, b) => {
		return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
	});

	const total = newsListBySourceAndSearchSorted.length;
	const totalPages = Math.ceil(total / pageSize);
	await getValidatedQuery(
		event,
		newListQueryMaxPageSchema({
			totalPages,
		}).parse,
	);
	const start = (page - 1) * pageSize;

	const newsListBySourceAndSearchSortedAndPaginated = (
		newsListBySourceAndSearchSorted.slice(start, start + pageSize)
	);

	return {
		items: newsListBySourceAndSearchSortedAndPaginated,
		totalPages,
	};
});
