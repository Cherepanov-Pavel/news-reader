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

export const getCachedResponseValidationResult = defineCachedFunction(
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
