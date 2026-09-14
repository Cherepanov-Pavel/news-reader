import {
	newListQueryMaxPageSchema,
	newListQuerySchema,
} from "~~/server/schemas/news-list.schemas";
import {
	filterNewsBySearch,
	filterRssSourcesBySource,
} from "~~/server/utils/news-list/filter";
import {
	loadNewsFromSourceList,
} from "~~/server/utils/news-list/load";
import {
	getCachedRssSourceList,
} from "~~/server/utils/news-list/cache";
import {
	FIRST_PAGE,
} from "~~/shared/constants/pagination";
import {
	sortNewsByPubDate,
} from "~~/server/utils/news-list/sort";
import {
	paginateNews,
} from "~~/server/utils/news-list/paginate";

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

	const filteredRssSourceList = filterRssSourcesBySource({
		rssSourceList,
		source,
	});

	const newsList = await loadNewsFromSourceList({
		rssSourceList: filteredRssSourceList,
	});
	const filteredNewsList = filterNewsBySearch({
		newsList,
		search,
	});
	const sortedNewsList = sortNewsByPubDate({
		newsList: filteredNewsList,
	});

	const total = sortedNewsList.length;
	const totalPages = Math.ceil(total / pageSize);
	await getValidatedQuery(
		event,
		newListQueryMaxPageSchema({
			totalPages: Math.max(totalPages, FIRST_PAGE),
		}).parse,
	);
	const paginatedNewsList = paginateNews({
		newsList: sortedNewsList,
		page,
		pageSize,
	});

	return {
		items: paginatedNewsList,
		totalPages,
	};
});
