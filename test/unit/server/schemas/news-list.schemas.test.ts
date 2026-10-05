import {
	describe,
	expect,
	it,
} from "vitest";
import {
	newListQueryMaxPageSchema,
	newListQuerySchema,
	rssResponseSchema,
} from "~~/server/schemas/news-list.schemas";
import type {
	RssSourceList,
} from "~~/shared/mappers/rss-source.mappers";

const rssSourceList: RssSourceList = [
	{
		href: "https://example.com/rss.xml",
		hostname: "example.com",
	},
];

describe("newListQuerySchema", () => {
	it("parses a valid query and coerces page to number", () => {
		const schema = newListQuerySchema({
			rssSourceList,
		});

		const result = schema.parse({
			page: "2",
			source: "example.com",
			search: "vue",
		});

		expect(result)
		.toEqual({
			page: 2,
			source: "example.com",
			search: "vue",
		});
	});

	it("rejects an unknown RSS source", () => {
		const schema = newListQuerySchema({
			rssSourceList,
		});

		expect(() => {
			schema.parse({
				page: "1",
				source: "unknown.com",
			});
		})
		.toThrow();
	});
});

describe("newListQueryMaxPageSchema", () => {
	it("rejects a page greater than total pages", () => {
		const schema = newListQueryMaxPageSchema({
			totalPages: 3,
		});

		expect(() => {
			schema.parse({
				page: "4",
			});
		})
		.toThrow();
	});
});

describe("rssResponseSchema", () => {
	it("parses a valid RSS response", () => {
		const result = rssResponseSchema.parse({
			rss: {
				channel: {
					item: [
						{
							title: "News",
							description: "A news item",
							link: "https://example.com/news",
							pubDate: "2026-10-05T12:00:00Z",
							enclosure: [
								{
									url: "https://example.com/image.jpg",
									type: "image/jpeg",
								},
							],
						},
					],
				},
			},
		});

		expect(result.rss.channel.item)
		.toHaveLength(1);
	});

	it("omitted optional item fields", () => {
		const result = rssResponseSchema.parse({
			rss: {
				channel: {
					item: [
						{
							link: "https://example.com/news",
							pubDate: "2026-10-05T12:00:00Z",
						},
					],
				},
			},
		});

		expect(result.rss.channel.item[0])
		.toEqual({
			link: "https://example.com/news",
			pubDate: "2026-10-05T12:00:00Z",
		});
	});

	it("allows an empty item list ", () => {
		const result = rssResponseSchema.parse({
			rss: {
				channel: {
					item: [],
				},
			},
		});
		expect(result.rss.channel.item)
		.toEqual([]);
	});

	it("rejects a missing item list", () => {
		expect(() => {
			rssResponseSchema.parse({
				rss: {
					channel: {},
				},
			});
		})
		.toThrow();
	});

	it("rejects an invalid item URL", () => {
		expect(() => {
			rssResponseSchema.parse({
				rss: {
					channel: {
						item: [
							{
								link: "not a URL",
								pubDate: "2026-10-05T12:00:00Z",
							},
						],
					},
				},
			});
		})
		.toThrow();
	});

	it("rejects an invalid publication date", () => {
		expect(() => {
			rssResponseSchema.parse({
				rss: {
					channel: {
						item: [
							{
								link: "https://example.com/news",
								pubDate: "not a date",
							},
						],
					},
				},
			});
		})
		.toThrow();
	});

	it("rejects an enclosure missing its required type", () => {
		expect(() => {
			rssResponseSchema.parse({
				rss: {
					channel: {
						item: [
							{
								link: "https://example.com/news",
								pubDate: "2026-10-05T12:00:00Z",
								enclosure: [
									{
										url: "https://example.com/image.jpg",
									},
								],
							},
						],
					},
				},
			});
		})
		.toThrow();
	});
});
