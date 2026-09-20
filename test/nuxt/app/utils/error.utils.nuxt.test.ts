import {
	mountSuspended,
	registerEndpoint,
} from "@nuxt/test-utils/runtime";
import {
	getValidatedQuery,
} from "h3";
import {
	z,
} from "zod";
import {
	describe,
	expect,
	it,
} from "vitest";
import ErrorApp from "./ErrorApp.vue";

const querySchema = z.object({
	value: (
		z
		.string()
		.min(2)
	),
});

registerEndpoint("/api/zod-error", {
	handler: async (event) => {
		await getValidatedQuery(event, querySchema.parse);

		return {
			ok: true,
		};
	},
});

describe("error utilities", () => {
	it("recognizes a real Nuxt H3 Zod error", async () => {
		const wrapper = await mountSuspended(ErrorApp);

		expect(
			wrapper.get("[data-testid=\"is-h3-error\"]")
			.text(),
		)
		.toBe("true");
		expect(
			wrapper.get("[data-testid=\"is-zod-error\"]")
			.text(),
		)
		.toBe("true");
		expect(
			wrapper.get("[data-testid=\"issues\"]")
			.text(),
		)
		.toContain("\"code\":\"too_small\"");
	});
});
