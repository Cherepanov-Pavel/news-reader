import {
	describe,
	expect,
	it,
} from "vitest";
import {
	newListQueryMaxPageSchema,
	newListQuerySchema,
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
