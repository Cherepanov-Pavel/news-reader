import {
	describe,
	expect,
	it,
} from "vitest";
import {
	paginate,
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
