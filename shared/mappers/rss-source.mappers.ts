import type {
	RssSource as EnvRssSource,
} from "@/../index";
export type RssSource = EnvRssSource & {
	hostname: string;
};
export type RssSourceList = RssSource[];

export function mapEnvRssSourceToRssSource({
	href,
}: EnvRssSource): RssSource {
	return {
		href,
		hostname: new URL(href).hostname,
	};
}
