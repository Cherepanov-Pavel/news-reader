import {
	z,
} from "zod";
import type {
	RssSourceList,
} from "~~/shared/mappers/rss-source.mappers";

export function newListQuerySchema({
	rssSourceList,
}: {
	rssSourceList: RssSourceList;
}) {
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
							hostname,
						}) => {
							return hostname === value;
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
}
export function newListQueryMaxPageSchema({
	totalPages,
}: {
	totalPages: number;
}) {
	return (
		z
		.object({
			page: (
				z
				.coerce
				.number()
				.max(totalPages)
			),
		})
	);
}

const enclosureSchema = z.object({
	url: z.string(),
	type: z.string(),
});
const rssItemSchema = z.object({
	title: (
		z
		.string()
		.optional()
	),
	description: (
		z
		.string()
		.optional()
	),
	link: z.url(),
	pubDate: (
		z
		.string()
		.refine(
			(value) => {
				return !Number.isNaN(Date.parse(value));
			},
			"Invalid RSS date",
		)
	),
	enclosure: (
		z
		.array(enclosureSchema)
		.optional()
	),
});
export const rssResponseSchema = z.object({
	rss: z.object({
		channel: z.object({
			item: z.array(rssItemSchema),
		}),
	}),
});
