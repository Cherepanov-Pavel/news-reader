import type {
	RSSItem,
} from "~~/server/types/rss";
import {
	parseXml,
} from "~~/server/utils/xml";
import type {
	NewsListItem,
} from "~~/shared/types/api/news";

import {
	getRSSSourceList as getRSSSourceListShared,
} from "#shared/utils/env";

export const getCachedRSSSourceList = cachedFunction(
	() => {
		return {
			RSSSourceList: getRSSSourceListShared(),
		};
	},
	{
		name: "get-rss-source-list",
	},
);

export async function fetchRSSItems(href: string, source: string): Promise<NewsListItem[]> {
	const xml = await $fetch<string>(href, {
		responseType: "text",
	});
	const data = parseXml<{
		rss?: {
			channel?: {
				item?: RSSItem[];
			};
		};
	}>(xml);
	const items = data.rss?.channel?.item ?? [];

	return items.map((item) => {
		const normalizedEnclosure = Array.isArray(item.enclosure) ? item.enclosure[0] : item.enclosure;
		return {
			title: item.title ?? "",
			description: item.description ?? "",
			link: item.link,
			pubDate: item.pubDate,
			enclosure: {
				url: normalizedEnclosure?.url,
			},
			source,
		};
	});
}
