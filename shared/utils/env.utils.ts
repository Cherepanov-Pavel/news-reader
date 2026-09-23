import {
	mapEnvRssSourceToRssSource,
	type RssSourceList,
} from "~~/shared/mappers/rss-source.mappers";

export function getRssSourceList(): {
	rssSourceList: RssSourceList;
} {
	const rssSourceList = useRuntimeConfig().public.rssSourceList.map(
		mapEnvRssSourceToRssSource,
	);
	return {
		rssSourceList,
	};
}
