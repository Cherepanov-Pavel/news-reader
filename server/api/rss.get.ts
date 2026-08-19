import { mapLentaRssItemToNewsListItem, mapMosRssItemToNewsListItem } from '~~/server/utils/mappers';
import { NewsListItemSource } from '~~/shared/types/api/news';
import { FIRST_PAGE } from '#shared/constants/pagination';

const PAGE_SIZE = 4;

export default defineEventHandler(async (event) => {
	const {
		page,
		source,
		...query
	} = getQuery(event);

	const selectedSources = source
		? [source as NewsListItemSource]
		: Object.values(NewsListItemSource);

	const rssBySource = (await Promise.all(
		selectedSources.map(async (sourceName) => {
			switch (sourceName) {
				case NewsListItemSource.lenta: {
					const items = await $fetch('/api/lenta-rss');

					return items.map(mapLentaRssItemToNewsListItem);
				}

				case NewsListItemSource.mos: {
					const items = await $fetch('/api/mos-rss');

					return items.map(mapMosRssItemToNewsListItem);
				}
			}
		}),
	)).flat();

	const search = query.search ?? '';
	if (typeof search !== 'string') {
		throw createError({
			statusCode: 400,
		});
	}
	const normalizedSearch = search.toLowerCase();
	const normalizedSplittedSearch = normalizedSearch.split(' ');
	const rssBySourceAndSearch = rssBySource.filter(({ title, description }) => {
		return (
			normalizedSplittedSearch.some((searchWord) => {
				return title.toLowerCase().includes(searchWord);
			})
			|| normalizedSplittedSearch.some((searchWord) => {
				return description.toLowerCase().includes(searchWord);
			})
		);
	});

	const allRssSorted = rssBySourceAndSearch.sort((a, b) => {
		return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
	});

	const normalizedPage = Math.max(Number(page) || FIRST_PAGE, FIRST_PAGE);
	const total = allRssSorted.length;
	const totalPages = Math.ceil(total / PAGE_SIZE);
	const start = (normalizedPage - 1) * PAGE_SIZE;

	const paginatedAndSortedRss = allRssSorted.slice(start, start + PAGE_SIZE);

	return {
		items: paginatedAndSortedRss,
		totalPages,
	};
});
