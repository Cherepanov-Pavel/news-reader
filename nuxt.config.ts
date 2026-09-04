import tailwindcss from "@tailwindcss/vite";

import {
	validateEnv,
} from "./nuxt-config/utils/env-validation";

validateEnv();


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
		"@pinia/nuxt",
		"@vueuse/nuxt",
	],
	compatibilityDate: "2025-07-15",
});
