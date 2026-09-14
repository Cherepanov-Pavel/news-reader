import {
	fileURLToPath,
} from "node:url";
import {
	defineConfig,
} from "vitest/config";
const rootDir = fileURLToPath(
	new URL(".", import.meta.url),
);
export default defineConfig({
	test: {
		projects: [
			{
				test: {
					name: "unit",
					include: [
						"test/unit/**/*.{test,spec}.ts",
					],
					environment: "node",
				},
			},
		],
	},
	resolve: {
		alias: {
			"~~": rootDir,
		},
	},
});
