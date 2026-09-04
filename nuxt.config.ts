import tailwindcss from "@tailwindcss/vite";
import type {
	ResolvedOptions,
} from "unplugin-icons";
import {
	FileSystemIconLoader as fileSystemIconLoader,
} from "unplugin-icons/loaders";
import {
	validateEnv,
} from "./nuxt-config/utils/env-validation";

validateEnv();

const transform: ResolvedOptions["transform"] = (svg) => {
	return (
		svg
		.replace(/(<svg[^>]*?)width="[^"]*"/u, "$1width=\"100%\"")
		.replace(/(<svg[^>]*?)height="[^"]*"/u, "$1height=\"100%\"")
		.replaceAll(/fill=".+"/ug, "fill=\"currentColor\"")
	);
};

export default defineNuxtConfig({
	runtimeConfig: {
		pageSize: 4,
		public: {
			RSSSourceList: [],
		},
	},
	typescript: {
		tsConfig: {
			vueCompilerOptions: {
				fallthroughAttributes: true,
			},
		},
		nodeTsConfig: {
			include: [
				"../nuxt-config/**/*",
			],
		},
	},
	css: [
		"~/assets/css/reset.css",
		"~/assets/css/tailwind.css",
	],
	vite: {
		plugins: [
			tailwindcss(),
		],
	},
	modules: [
		[
			// makes available ~icons/ import
			"unplugin-icons/nuxt",
			{
				customCollections: {
					figma: fileSystemIconLoader("app/assets/svg"),
				},
				transform,
			},
		],
		"@pinia/nuxt",
		"@vueuse/nuxt",
	],
	compatibilityDate: "2025-07-15",
});
