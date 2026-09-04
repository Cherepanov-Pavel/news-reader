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
		unpluginIconsModule,
	],
	compatibilityDate: "2025-07-15",
});
