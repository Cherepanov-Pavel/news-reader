import {
	newListQueryMaxPageSchema,
	newListQuerySchema,
} from "~~/server/schemas/news-list.schemas";
import {
	loadNewsFromRssSourceList,
} from "~~/server/utils/news-list/load";
import {
	getCachedRssSourceList,
} from "~~/server/utils/news-list/cache";
import {
	firstPage,
} from "~~/shared/constants/pagination";
import {
	calculateTotalPages,
	paginate,
} from "~~/shared/utils/pagination.utils";
import {
	filterBySearch,
} from "~~/shared/utils/search.utils";
import {
	sortByDate,
} from "~~/shared/utils/sort.utils";
import {
	filterByValue,
} from "~~/shared/utils/filter.utils";

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

	const filteredRssSourceList = filterByValue({
		items: rssSourceList,
		select: ({
			hostname,
		}) => {
			return hostname;
		},
		value: source,
	});
	const newsList = await loadNewsFromRssSourceList({
		rssSourceList: filteredRssSourceList,
	});
	const filteredNewsList = filterBySearch({
		items: newsList,
		search,
		getSearchableWords: ({
			title, description,
		}) => {
			return [
				title,
				description,
			];
		},
	});
	const sortedNewsList = sortByDate({
		items: filteredNewsList,
		select: ({
			pubDate,
		}) => {
			return pubDate;
		},
		direction: "desc",
	});

	const {
		totalPages,
	} = calculateTotalPages({
		items: sortedNewsList,
		pageSize,
	});
	await getValidatedQuery(
		event,
		newListQueryMaxPageSchema({
			totalPages: Math.max(totalPages, firstPage),
		}).parse,
	);
	const paginatedNewsList = paginate({
		items: sortedNewsList,
		page,
		pageSize,
	});

	return {
		items: paginatedNewsList,
		totalPages,
	};
});
