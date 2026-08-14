import type { LentaRSSItem } from '~~/server/types/lenta-rss';
import type { MosRSSItem } from '~~/server/types/mos-rss';
import { NewsListItemSource, type NewsListItem } from '~~/shared/types/api/news';

export function mapMosRssItemToNewsListItem(item: MosRSSItem): NewsListItem {
  const enclosure = Array.isArray(item.enclosure) ? item.enclosure : [item.enclosure];
  return {
    title: item.title ?? '',
    description: item.description ?? '',
    link: item.link,
    pubDate: item.pubDate,
    enclosure: {
      url: enclosure[0]?.url,
    },
    source: NewsListItemSource.mos,
  };
}

export function mapLentaRssItemToNewsListItem(item: LentaRSSItem): NewsListItem {
  return {
    title: item.title ?? '',
    description: item.description ?? '',
    link: item.link,
    pubDate: item.pubDate,
    enclosure: {
      url: item.enclosure.url,
    },
    source: NewsListItemSource.lenta,
  };
}
