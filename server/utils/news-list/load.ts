/**
 * Helpers for loading news from RSS sources.
 */

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

	const responseXmlParsed = parseXml(responseXml);
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
export async function loadNewsFromSourceList({
	rssSourceList,
	loadNewsFromSourceFn = loadNewsFromSource,
}: {
	rssSourceList: RssSourceList;
	loadNewsFromSourceFn?: typeof loadNewsFromSource;
}): Promise<NewsList> {
	const newsListBySourcePromiseSettledResult = await Promise.allSettled(
		rssSourceList.map(async (rssSource) => {
			return loadNewsFromSourceFn(rssSource);
		}),
	);

	const newsListBySourcePromiseFulfilled = newsListBySourcePromiseSettledResult.filter((result) => {
		return result.status === "fulfilled";
	});

	if (newsListBySourcePromiseFulfilled.length === 0) {
		throw createError({
			statusCode: 502,
			statusMessage: "All RSS sources failed",
		});
	}

	return newsListBySourcePromiseFulfilled.flatMap((result) => {
		return result.value;
	});
}
