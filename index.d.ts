interface RSSSource {
	href: string;
}

type RSSSourceList = RSSSource[];

declare module "nuxt/schema" {
	interface RuntimeConfig {
		pageSize: number;
	}
	interface PublicRuntimeConfig {
		RSSSourceList: RSSSourceList;
	}
}
// It is always important to ensure you import/export something when augmenting a type
export {};
