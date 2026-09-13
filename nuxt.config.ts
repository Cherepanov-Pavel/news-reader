import tailwindcss from "@tailwindcss/vite";

import {
	validateEnv,
} from "./nuxt-config/utils/env-validation";
import {
	unpluginIconsModule,
} from "./nuxt-config/unplugin-icons";

validateEnv();


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
		unpluginIconsModule,
	],
	// https://nuxt.com/docs/4.x/guide/concepts/auto-imports#partially-disabling-auto-imports
	// https://github.com/nuxt/nuxt/issues/29923
	// https://github.com/nitrojs/nitro/issues/2232
	imports: {
		scan: false,
	},
	compatibilityDate: "2025-07-15",
});
