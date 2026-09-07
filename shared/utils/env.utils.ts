import type {
	RssSource as EnvRssSource,
} from "@/../index";
type RssSource = EnvRssSource & {
	host: string;
};
export type RssSourceList = RssSource[];

export function getRssSourceList(): RssSourceList {
	const rssSourceList = useRuntimeConfig().public.rssSourceList.map(({
		href,
	}) => {
		const {
			host,
		} = new URL(href);
		return {
			href,
			host,
		};
	});
	return rssSourceList;
}
