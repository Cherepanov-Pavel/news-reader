import {
	describe,
	expect,
	it,
} from "vitest";
import {
	sortByDate,
} from "~~/shared/utils/sort.utils";

const items = [
	{
		name: "Older",
		date: "2026-09-12",
	},
	{
		name: "Newer",
		date: "2026-09-14",
	},
	{
		name: "Middle",
		date: "2026-09-13",
	},
];

const getDate = ({
	date,
}: (typeof items)[number]) => {
	return date;
};

describe("sortByDate", () => {
	it("sorts items by date in ascending order by default", () => {
		const result = sortByDate({
			items,
			getDate,
		});

		expect(result.map(({
			name,
		}) => {
			return name;
		}))
		.toEqual([
			"Older",
			"Middle",
			"Newer",
		]);
	});

	it("sorts items by date in descending order", () => {
		const result = sortByDate({
			items,
			getDate,
			direction: "desc",
		});

		expect(result.map(({
			name,
		}) => {
			return name;
		}))
		.toEqual([
			"Newer",
			"Middle",
			"Older",
		]);
	});

	it("uses the date selected by getDate", () => {
		const result = sortByDate({
			items: [
				{
					name: "First item",
					metadata: {
						publishedAt: "2026-09-14",
					},
				},
				{
					name: "Second item",
					metadata: {
						publishedAt: "2026-09-12",
					},
				},
			],
			getDate: ({
				metadata,
			}) => {
				return metadata.publishedAt;
			},
		});

		expect(result.map(({
			name,
		}) => {
			return name;
		}))
		.toEqual([
			"Second item",
			"First item",
		]);
	});

	it("does not mutate the original array", () => {
		const result = sortByDate({
			items,
			getDate,
		});

		expect(result)
		.not
		.toBe(items);
		expect(items.map(({
			name,
		}) => {
			return name;
		}))
		.toEqual([
			"Older",
			"Newer",
			"Middle",
		]);
	});
});
