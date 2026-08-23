import { FIRST_PAGE } from '#shared/constants/pagination';
import { getCachedRSSSourceList } from '~~/server/utils/rss';
import { fetchRSSItems } from '../utils/rss';
const { pageSize } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
	const { RSSSourceList = [] } = (await getCachedRSSSourceList()) ?? {};

	const {
		page,
		source,
		...query
	} = getQuery(event);

	const selectedSources = source
		? RSSSourceList.filter(({ host }) => {
			return host === source;
		})
		: RSSSourceList;

	const rssBySource = (await Promise.all(
		selectedSources.map(async ({ href, host }) => {
			return fetchRSSItems(href, host);
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
	const totalPages = Math.ceil(total / pageSize);
	const start = (normalizedPage - 1) * pageSize;

	const paginatedAndSortedRss = allRssSorted.slice(start, start + pageSize);

	return {
		items: paginatedAndSortedRss,
		totalPages,
	};
});
