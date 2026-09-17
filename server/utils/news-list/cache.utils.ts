import {
	rssResponseSchema,
} from "~~/server/schemas/news-list.schemas";
import {
	getRssSourceList,
} from "~~/shared/utils/env.utils";
import {
	hour,
} from "~~/shared/constants/date.constants";
import {
	createHash,
} from "node:crypto";

export const getCachedRssSourceList = defineCachedFunction(
	() => {
		return getRssSourceList();
	},
	{
		maxAge: Infinity,
		getKey: () => {
			return (
				createHash("sha256")
				.update(JSON.stringify(useRuntimeConfig().public.rssSourceList))
				.digest("hex")
			);
		},
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
		maxAge: hour,
		getKey: ({
			href,
		}) => {
			return href;
		},
	},
);
