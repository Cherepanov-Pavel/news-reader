import {
	fileURLToPath,
} from "node:url";
import {
	defineConfig,
} from "vitest/config";
import {
	defineVitestProject,
} from "@nuxt/test-utils/config";
import {
	loadEnv,
} from "vite";

const rootDir = fileURLToPath(
	new URL(".", import.meta.url),
);
Object.assign(
	process.env,
	loadEnv("development", rootDir, ""),
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
					environment: "happy-dom",
				},
			},
			await defineVitestProject({
				test: {
					name: "nuxt",
					include: [
						"test/nuxt/*.{test,spec}.ts",
					],
					environment: "nuxt",
				},
			}),
		],
	},
	resolve: {
		alias: {
			"~~": rootDir,
			"~": `${rootDir}/app`,
		},
	},
});
