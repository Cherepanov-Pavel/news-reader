import {
	z,
} from "zod";
import type {
	RssSourceList,
} from "~~/shared/utils/env.utils";

export const newListQuerySchema = ({
	rssSourceList,
}: {
	rssSourceList: RssSourceList;
}) => {
	return (
		z
		.object({
			page: (
				z
				.coerce
				.number()
				.int()
				.positive()
			),
			source: (
				z
				.string()
				.min(1)
				.refine(
					(value) => {
						return rssSourceList.some(({
							host,
						}) => {
							return host === value;
						});
					},
					"Unknown RSS source",
				)
				.optional()
			),
			search: (
				z
				.string()
				.min(1)
				.optional()
			),
		})
	);
};


const enclosureSchema = z.object({
	url: z.string(),
	type: z.string(),
});

const rssItemSchema = z.object({
	title: z.string().optional(),
	description: z.string().optional(),
	link: z.url(),
	pubDate: z.string(),
	// The enclosure is always present in the response. If it is not, the source is incorrect.
	enclosure: z.array(enclosureSchema),
});

export const rssResponseSchema = z.object({
	rss: z.object({
		channel: z.object({
			item: z.array(rssItemSchema),
		}),
	}),
});
