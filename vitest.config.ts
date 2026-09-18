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
						"test/unit/server/**/*.{test,spec}.ts",
					],
					environment: "node",
				},
			},
			{
				test: {
					name: "app",
					include: [
						"test/unit/app/**/*.{test,spec}.ts",
					],
					environment: "jsdom",
				},
			},
		],
	},
	resolve: {
		alias: {
			"~~": rootDir,
			"~": `${rootDir}/app`,
		},
	},
});
