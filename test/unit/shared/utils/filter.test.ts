import {
	describe,
	expect,
	it,
} from "vitest";
import {
	filterByValue,
} from "~~/shared/utils/filter.utils";

const items = [
	{
		name: "Vue",
		category: "framework",
	},
	{
		name: "Nuxt",
		category: "framework",
	},
	{
		name: "Vitest",
		category: "testing",
	},
];

const getCategory = ({
	category,
}: (typeof items)[number]) => {
	return category;
};

describe("filterByValue", () => {
	it("returns items with the selected value", () => {
		const result = filterByValue({
			items,
			select: getCategory,
			value: "framework",
		});

		expect(result)
		.toEqual([
			items[0],
			items[1],
		]);
	});

	it("returns an empty list when there are no matches", () => {
		const result = filterByValue({
			items,
			select: getCategory,
			value: "unknown",
		});

		expect(result)
		.toEqual([]);
	});

	it("returns all items when the value is not specified", () => {
		const result = filterByValue({
			items,
			select: getCategory,
		});

		expect(result)
		.toEqual(items);
	});

	it("uses the value returned by select", () => {
		const result = filterByValue({
			items: [
				{
					name: "First item",
					metadata: {
						category: "selected",
					},
				},
				{
					name: "Second item",
					metadata: {
						category: "other",
					},
				},
			],
			select: ({
				metadata,
			}) => {
				return metadata.category;
			},
			value: "selected",
		});

		expect(result.map(({
			name,
		}) => {
			return name;
		}))
		.toEqual([
			"First item",
		]);
	});

	it("does not mutate the original array", () => {
		const result = filterByValue({
			items,
			select: getCategory,
			value: "framework",
		});

		expect(result)
		.not
		.toBe(items);
		expect(items)
		.toEqual([
			{
				name: "Vue",
				category: "framework",
			},
			{
				name: "Nuxt",
				category: "framework",
			},
			{
				name: "Vitest",
				category: "testing",
			},
		]);
	});
});
