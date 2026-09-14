/**
 * Pagination helpers for news list domain.
 */

import type {
	NewsList,
} from "~~/shared/types/api/news";

export function paginateNews({
	newsList,
	page,
	pageSize,
}: {
	newsList: NewsList;
	page: number;
	pageSize: number;
}): NewsList {
	const start = (page - 1) * pageSize;

	return newsList.slice(start, start + pageSize);
}
