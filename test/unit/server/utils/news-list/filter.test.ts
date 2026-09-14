import {
	describe,
	expect,
	it,
} from "vitest";
import {
	filterNewsBySearch,
	filterRssSourcesBySource,
} from "~~/server/utils/news-list/filter";
import type {
	NewsList,
} from "~~/shared/types/api/news";

const rssSourceList = [
	{
		href: "https://example.com/rss.xml",
		hostname: "example.com",
	},
	{
		href: "https://news.example.org/feed",
		hostname: "news.example.org",
	},
];

describe("selectRssSources", () => {
	it("returns all sources when source is not specified", () => {
		expect(filterRssSourcesBySource({
			rssSourceList,
		}))
		.toEqual(rssSourceList);
	});

	it("returns only the selected source", () => {
		expect(filterRssSourcesBySource({
			rssSourceList,
			source: "example.com",
		}))
		.toEqual([
			rssSourceList[0],
		]);
	});
});

const newsList: NewsList = [
	{
		title: "Vue 4 released",
		description: "A new version of Vue",
		link: "https://example.com/vue",
		pubDate: "2026-09-14",
		enclosure: {},
		source: "example.com",
	},
	{
		title: "Nuxt application",
		description: "Building a news reader",
		link: "https://example.com/nuxt",
		pubDate: "2026-09-13",
		enclosure: {},
		source: "example.com",
	},
	{
		title: "TypeScript tips",
		description: "Useful frontend techniques",
		link: "https://example.com/typescript",
		pubDate: "2026-09-12",
		enclosure: {},
		source: "example.com",
	},
];

describe("filterNewsBySearch", () => {
	it("returns all news for an empty search", () => {
		const result = filterNewsBySearch({
			newsList,
			search: "",
		});

		expect(result)
		.toEqual(newsList);
	});

	it("searches case-insensitively in title", () => {
		const result = filterNewsBySearch({
			newsList,
			search: "VUE",
		});

		expect(result.map(({
			title,
		}) => {
			return title;
		}))
		.toEqual([
			"Vue 4 released",
		]);
	});

	it("searches in description", () => {
		const result = filterNewsBySearch({
			newsList,
			search: "frontend",
		});

		expect(result.map(({
			title,
		}) => {
			return title;
		}))
		.toEqual([
			"TypeScript tips",
		]);
	});

	it("returns news when at least one search word matches", () => {
		const result = filterNewsBySearch({
			newsList,
			search: "unknown reader",
		});

		expect(result.map(({
			title,
		}) => {
			return title;
		}))
		.toEqual([
			"Nuxt application",
		]);
	});

	it("ignores extra spaces between search words", () => {
		const result = filterNewsBySearch({
			newsList,
			search: "  vue   released  ",
		});

		expect(result.map(({
			title,
		}) => {
			return title;
		}))
		.toEqual([
			"Vue 4 released",
		]);
	});

	it("returns an empty list when there are no matches", () => {
		const result = filterNewsBySearch({
			newsList,
			search: "react angular",
		});

		expect(result)
		.toEqual([]);
	});
});
