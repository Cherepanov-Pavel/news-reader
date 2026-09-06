import {
	parseXml,
} from "~~/server/utils/xml.utils";
import type {
	NewsListItem,
} from "#shared/types/api/news";
import {
	getRssSourceList,
} from "#shared/utils/env.utils";
import {
	rssResponseSchema,
} from "~~/server/schemas/news-list.schemas";

export const getCachedRssSourceList = defineCachedFunction(
	() => {
		return {
			rssSourceList: getRssSourceList(),
		};
	},
	{
		maxAge: Infinity,
	},
);

const getCachedResponseValidationResult = defineCachedFunction(
	({
		response,
	}: {
		href: string;
		response: unknown;
	}) => {
		return rssResponseSchema.parse(response);
	},
	{
		maxAge: Infinity,
		getKey: ({
			href,
		}) => {
			return href;
		},
	},
);
export async function fetchRSSItems(
	href: string,
	source: string,
): Promise<NewsListItem[]> {
	const xml = await $fetch<string>(
		href,
		{
			responseType: "text",
		},
	);
	const response = parseXml(
		xml,
	);
	const data = await getCachedResponseValidationResult({
		href,
		response,
	});
	const items = data.rss.channel.item;

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
