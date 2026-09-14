/**
 * Filtering helpers for news list domain.
 */

import type {
	RssSourceList,
} from "~~/shared/mappers/rss-source.mappers";
import type {
	NewsList,
} from "~~/shared/types/api/news";

export function filterRssSourcesBySource({
	rssSourceList,
	source,
}: {
	rssSourceList: RssSourceList;
	source?: string;
}) {
	if (source === undefined) {
		return rssSourceList;
	}
	return rssSourceList.filter(({
		hostname,
	}) => {
		return hostname === source;
	});
}

export function filterNewsBySearch({
	newsList,
	search,
}: {
	newsList: NewsList;
	search: string;
}): NewsList {
	const searchWords = (
		search
		.toLowerCase()
		.split(" ")
		.filter(Boolean)
	);

	if (searchWords.length === 0) {
		return newsList;
	}

	return newsList.filter(({
		title,
		description,
	}) => {
		return searchWords.some((searchWord) => {
			return (
				title
				.toLowerCase()
				.includes(searchWord)
			) || (
				description
				.toLowerCase()
				.includes(searchWord)
			);
		});
	});
}
