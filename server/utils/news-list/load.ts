import {
	mapRssResponseToNewsList,
} from "~~/server/mappers/news-list.mappers";
import type {
	RssSource,
	RssSourceList,
} from "~~/shared/mappers/rss-source.mappers";
import type {
	NewsList,
} from "~~/shared/types/api/news";
import {
	getCachedResponseValidationResult,
} from "~~/server/utils/news-list/cache";

async function loadNewsFromSource({
	href,
	hostname,
}: RssSource) {
	const responseXml = await $fetch<string>(
		href,
		{
			responseType: "text",
		},
	);

	const responseXmlParsed = parseXml({
		xml: responseXml,
		options: {
			isArray: (tagName, jPathOrMatcher) => {
				const pathToItem = "rss.channel.item";
				return (
					jPathOrMatcher === pathToItem
					|| jPathOrMatcher === `${pathToItem}.enclosure`
				);
			},
		},
	});
	/*
	The schema compliance check is performed once and cached permanently for performance reasons.
	I optimistically assume that subsequent responses will also comply with the schema.
	*/
	const response = await getCachedResponseValidationResult({
		href,
		response: responseXmlParsed,
	});

	return mapRssResponseToNewsList({
		response,
		source: hostname,
	});
}
export async function loadNewsFromRssSourceList({
	rssSourceList,
	loadNewsFromSourceFn = loadNewsFromSource,
}: {
	rssSourceList: RssSourceList;
	loadNewsFromSourceFn?: typeof loadNewsFromSource;
}): Promise<NewsList> {
	const newsListBySourceSettled = await Promise.allSettled(
		rssSourceList.map(async (rssSource) => {
			return loadNewsFromSourceFn(rssSource);
		}),
	);

	const newsListBySourceFulfilled = newsListBySourceSettled.filter((result) => {
		return result.status === "fulfilled";
	});

	if (newsListBySourceFulfilled.length === 0) {
		throw createError({
			statusCode: 502,
			statusMessage: "All RSS sources failed",
		});
	}

	return newsListBySourceFulfilled.flatMap((result) => {
		return result.value;
	});
}
