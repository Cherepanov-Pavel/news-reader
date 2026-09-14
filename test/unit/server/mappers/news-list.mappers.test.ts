import {
	describe,
	expect,
	it,
} from "vitest";
import {
	mapRssResponseToNewsList,
} from "~~/server/mappers/news-list.mappers";
import type {
	RssResponse,
} from "~~/server/types/news-list.types";

describe("mapRssResponseToNewsList", () => {
	it("maps RSS items to news list items", () => {
		const response: RssResponse = {
			rss: {
				channel: {
					item: [
						{
							title: "Example news",
							description: "News description",
							link: "https://example.com/news",
							pubDate: "2026-09-14T10:00:00.000Z",
							enclosure: [
								{
									url: "https://example.com/news.jpg",
									type: "image/jpeg",
								},
							],
						},
					],
				},
			},
		};

		expect(
			mapRssResponseToNewsList({
				response,
				source: "example.com",
			}),
		)
		.toEqual([
			{
				title: "Example news",
				description: "News description",
				link: "https://example.com/news",
				pubDate: "2026-09-14T10:00:00.000Z",
				enclosure: {
					url: "https://example.com/news.jpg",
				},
				source: "example.com",
			},
		]);
	});

	it("uses empty text and no enclosure URL when optional fields are absent", () => {
		const response: RssResponse = {
			rss: {
				channel: {
					item: [
						{
							link: "https://example.com/news",
							pubDate: "2026-09-14T10:00:00.000Z",
						},
					],
				},
			},
		};

		expect(
			mapRssResponseToNewsList({
				response,
				source: "example.com",
			}),
		)
		.toEqual([
			{
				title: "",
				description: "",
				link: "https://example.com/news",
				pubDate: "2026-09-14T10:00:00.000Z",
				enclosure: {},
				source: "example.com",
			},
		]);
	});

	it("returns an empty list when RSS has no items", () => {
		const response: RssResponse = {
			rss: {
				channel: {
					item: [],
				},
			},
		};

		expect(mapRssResponseToNewsList({
			response,
			source: "example.com",
		}))
		.toEqual([]);
	});
});
