/**
 * Sorting helpers for news list domain.
 */

import type {
	NewsList,
} from "~~/shared/types/api/news";

export function sortNewsByPubDate({
	newsList,
}: {
	newsList: NewsList;
}): NewsList {
	return newsList.toSorted((a, b) => {
		return (
			(
				new Date(b.pubDate)
				.getTime()
			) - (
				new Date(a.pubDate)
				.getTime()
			)
		);
	});
}
