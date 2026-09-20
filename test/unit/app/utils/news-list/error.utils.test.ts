import type {
	NuxtError,
} from "#app";
import {
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";
import {
	getNuxtH3ZodIssues,
} from "~/utils/error.utils";
import {
	isInvalidNewsListPageError,
} from "~/utils/news-list/error.utils";

vi.mock("~/utils/error.utils", () => {
	return {
		getNuxtH3ZodIssues: vi.fn(),
	};
});

describe("isInvalidNewsListPageError", () => {
	it("returns false for undefined error", () => {
		expect(
			isInvalidNewsListPageError(undefined),
		)
		.toBe(false);
	});

	it("returns false for non-400 error", () => {
		expect(
			isInvalidNewsListPageError({
				status: 500,
			} as NuxtError),
		)
		.toBe(false);
	});

	it("returns false when error has no Zod issues", () => {
		vi
		.mocked(getNuxtH3ZodIssues)
		.mockReturnValue(undefined);

		expect(
			isInvalidNewsListPageError({
				status: 400,
			} as NuxtError),
		)
		.toBe(false);
	});

	it("returns false when Zod issues don't contain page", () => {
		vi
		.mocked(getNuxtH3ZodIssues)
		.mockReturnValue([
			{
				code: "invalid_type",
				path: [
					"source",
				],
				message: "Invalid source",
				expected: "string",
			},
		]);

		expect(
			isInvalidNewsListPageError({
				status: 400,
			} as NuxtError),
		)
		.toBe(false);
	});

	it("returns true when Zod issues contain page", () => {
		vi
		.mocked(getNuxtH3ZodIssues)
		.mockReturnValue([
			{
				code: "too_small",
				path: [
					"page",
				],
				message: "Page must be greater than 0",
				origin: "number",
				minimum: 0,
			},
		]);

		expect(
			isInvalidNewsListPageError({
				status: 400,
			} as NuxtError),
		)
		.toBe(true);
	});
});
