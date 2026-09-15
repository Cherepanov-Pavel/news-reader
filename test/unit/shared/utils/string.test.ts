import {
	describe,
	expect,
	it,
} from "vitest";
import {
	capitalize,
} from "~~/shared/utils/string.utils";

describe("capitalize", () => {
	it("capitalizes the first letter", () => {
		expect(capitalize("news"))
		.toBe("News");
	});

	it("preserves the rest of the string", () => {
		expect(capitalize("nEwS"))
		.toBe("NEwS");
	});

	it("returns an empty string for empty input", () => {
		expect(capitalize(""))
		.toBe("");
	});

	it("does not change a string that already starts with an uppercase letter", () => {
		expect(capitalize("News"))
		.toBe("News");
	});

	it("capitalizes a cyrillic letter", () => {
		expect(capitalize("новости"))
		.toBe("Новости");
	});

	it("preserves leading whitespace", () => {
		expect(capitalize(" news"))
		.toBe(" news");
	});
});
