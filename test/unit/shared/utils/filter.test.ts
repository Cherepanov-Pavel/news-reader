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
			value: "framework",
			getValue: getCategory,
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
			value: "unknown",
			getValue: getCategory,
		});

		expect(result)
		.toEqual([]);
	});

	it("returns all items when the value is not specified", () => {
		const result = filterByValue({
			items,
			getValue: getCategory,
		});

		expect(result)
		.toEqual(items);
	});

	it("uses the value returned by getValue", () => {
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
			value: "selected",
			getValue: ({
				metadata,
			}) => {
				return metadata.category;
			},
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
			value: "framework",
			getValue: getCategory,
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
