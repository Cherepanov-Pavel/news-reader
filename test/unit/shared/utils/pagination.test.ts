import {
	describe,
	expect,
	it,
} from "vitest";
import {
	paginate,
	calculateTotalPages,
} from "~~/shared/utils/pagination.utils";

describe("paginate", () => {
	it("returns the requested page", () => {
		const result = paginate({
			items: [
				1,
				2,
				3,
				4,
				5,
			],
			page: 2,
			pageSize: 2,
		});

		expect(result)
		.toEqual([
			3,
			4,
		]);
	});

	it("returns remaining items on the last page", () => {
		const result = paginate({
			items: [
				1,
				2,
				3,
				4,
				5,
			],
			page: 3,
			pageSize: 2,
		});

		expect(result)
		.toEqual([
			5,
		]);
	});

	it("returns an empty array when the page has no items", () => {
		const result = paginate({
			items: [
				1,
				2,
				3,
			],
			page: 2,
			pageSize: 3,
		});

		expect(result)
		.toEqual([]);
	});

	it("works with objects", () => {
		const items = [
			{
				id: 1,
			},
			{
				id: 2,
			},
		];

		const result = paginate({
			items,
			page: 2,
			pageSize: 1,
		});

		expect(result)
		.toEqual([
			{
				id: 2,
			},
		]);
	});

	it("does not mutate the original array", () => {
		const items = [
			1,
			2,
			3,
		];

		paginate({
			items,
			page: 2,
			pageSize: 2,
		});

		expect(items)
		.toEqual([
			1,
			2,
			3,
		]);
	});
});

describe("calculateTotalPages", () => {
	it("calculates the number of full pages", () => {
		const result = calculateTotalPages({
			items: [
				1,
				2,
				3,
				4,
			],
			pageSize: 2,
		});

		expect(result)
		.toEqual({
			totalPages: 2,
		});
	});

	it("includes a page for the remaining items", () => {
		const result = calculateTotalPages({
			items: [
				1,
				2,
				3,
				4,
				5,
			],
			pageSize: 2,
		});

		expect(result)
		.toEqual({
			totalPages: 3,
		});
	});

	it("returns one page when items fit on one page", () => {
		const result = calculateTotalPages({
			items: [
				1,
				2,
			],
			pageSize: 5,
		});

		expect(result)
		.toEqual({
			totalPages: 1,
		});
	});

	it("returns zero pages for an empty list", () => {
		const result = calculateTotalPages({
			items: [],
			pageSize: 5,
		});

		expect(result)
		.toEqual({
			totalPages: 0,
		});
	});

	it("returns one page for a single item", () => {
		const result = calculateTotalPages({
			items: [
				1,
			],
			pageSize: 1,
		});

		expect(result)
		.toEqual({
			totalPages: 1,
		});
	});
});
