import { mapLentaRssItemToNewsListItem, mapMosRssItemToNewsListItem } from '~~/server/utils/mappers';

const PAGE_SIZE = 4;

export default defineEventHandler(async (event) => {
  const [mosRss, lentaRss] = await Promise.all([
    $fetch('/api/mos-rss'),
    $fetch('/api/lenta-rss'),
  ]);
  const allRss = [
    ...mosRss.map(mapMosRssItemToNewsListItem),
    ...lentaRss.map(mapLentaRssItemToNewsListItem),
  ];

  const allRssSorted = allRss.sort((a, b) => {
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  const query = getQuery(event);
  const page = Math.max(Number(query.page) || 1, 1);
  const total = allRssSorted.length;
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;

  const paginatedAndSortedRss = allRssSorted.slice(start, start + PAGE_SIZE);

  return {
    items: paginatedAndSortedRss,
    page,
    total,
    totalPages,
  };
});
