import {
	describe,
	expect,
	it,
} from "vitest";
import {
	filterBySearch,
} from "~~/shared/utils/search.utils";

const items = [
	{
		name: "Vue 4 released",
		category: "framework",
	},
	{
		name: "Nuxt application",
		category: "framework",
	},
	{
		name: "TypeScript tips",
		category: "language",
	},
];

function getSearchableWords({
	name,
	category,
}: (typeof items)[number]) {
	return [
		name,
		category,
	];
}

describe("filterBySearch", () => {
	it("returns all items for an empty search", () => {
		const result = filterBySearch({
			items,
			search: "",
			getSearchableWords,
		});

		expect(result)
		.toEqual(items);
	});

	it("searches case-insensitively in searchable words", () => {
		const result = filterBySearch({
			items,
			search: "VUE",
			getSearchableWords,
		});

		expect(result)
		.toEqual([
			items[0],
		]);
	});

	it("searches across all words returned by the selector", () => {
		const result = filterBySearch({
			items,
			search: "language",
			getSearchableWords,
		});

		expect(result)
		.toEqual([
			items[2],
		]);
	});

	it("returns items when at least one search word matches", () => {
		const result = filterBySearch({
			items,
			search: "unknown application",
			getSearchableWords,
		});

		expect(result)
		.toEqual([
			items[1],
		]);
	});

	it("ignores extra spaces between search words", () => {
		const result = filterBySearch({
			items,
			search: "  vue   released  ",
			getSearchableWords,
		});

		expect(result)
		.toEqual([
			items[0],
		]);
	});

	it("returns an empty list when there are no matches", () => {
		const result = filterBySearch({
			items,
			search: "react angular",
			getSearchableWords,
		});

		expect(result)
		.toEqual([]);
	});
});
