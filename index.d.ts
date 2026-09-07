export interface RssSource {
	href: string;
}

type RssSourceList = RssSource[];

declare module "nuxt/schema" {
	interface RuntimeConfig {
		pageSize: number;
	}
	interface PublicRuntimeConfig {
		rssSourceList: RssSourceList;
	}
}
// It is always important to ensure you import/export something when augmenting a type
export {};
