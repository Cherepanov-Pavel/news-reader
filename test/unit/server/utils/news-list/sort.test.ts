import {
	describe,
	expect,
	it,
} from "vitest";
import {
	sortNewsByPubDate,
} from "~~/server/utils/news-list/sort";
import type {
	NewsList,
} from "~~/shared/types/api/news";

describe("sortNewsByPublicationDate", () => {
	it("sorts news from newest to oldest", () => {
		const oldNews: NewsList[number] = {
			title: "Old news",
			description: "",
			link: "https://example.com/old",
			pubDate: "2026-09-01T10:00:00.000Z",
			enclosure: {},
			source: "example.com",
		};

		const newNews: NewsList[number] = {
			title: "New news",
			description: "",
			link: "https://example.com/new",
			pubDate: "2026-09-14T10:00:00.000Z",
			enclosure: {},
			source: "example.com",
		};

		const newsList = [
			oldNews,
			newNews,
		];

		const result = sortNewsByPubDate({
			newsList,
		});

		expect(result)
		.toEqual([
			newNews,
			oldNews,
		]);
	});

	it("does not mutate the original list", () => {
		const newsList: NewsList = [
			{
				title: "Old news",
				description: "",
				link: "https://example.com/old",
				pubDate: "2026-09-01T10:00:00.000Z",
				enclosure: {},
				source: "example.com",
			},
			{
				title: "New news",
				description: "",
				link: "https://example.com/new",
				pubDate: "2026-09-14T10:00:00.000Z",
				enclosure: {},
				source: "example.com",
			},
		];

		const originalOrder = [
			...newsList,
		];

		sortNewsByPubDate({
			newsList,
		});

		expect(newsList)
		.toEqual(originalOrder);
	});

	it("returns an empty list for an empty input", () => {
		const newsList: NewsList = [];
		expect(sortNewsByPubDate({
			newsList,
		}))
		.toEqual([]);
	});
});
