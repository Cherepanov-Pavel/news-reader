import tailwindcss from "@tailwindcss/vite";

import {
	validateEnv,
} from "./nuxt-config/modules/env-validation.modules";
import {
	unpluginIcons,
} from "./nuxt-config/modules/unplugin-icons.modules";

export default defineNuxtConfig({
	runtimeConfig: {
		pageSize: 4,
		public: {
			rssSourceList: [],
		},
	},
	typescript: {
		tsConfig: {
			vueCompilerOptions: {
				fallthroughAttributes: true,
			},
			include: [
				"../test/unit/**/*",
			],
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
		"@nuxt/test-utils/module",
		unpluginIcons,
		validateEnv,
	],
	// https://nuxt.com/docs/4.x/guide/concepts/auto-imports#partially-disabling-auto-imports
	// https://github.com/nuxt/nuxt/issues/29923
	// https://github.com/nitrojs/nitro/issues/2232
	imports: {
		scan: false,
	},
	compatibilityDate: "2025-07-15",
});
