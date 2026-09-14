import {
	mapEnvRssSourceToRssSource,
} from "~~/shared/mappers/rss-source.mappers";

export function getRssSourceList() {
	const rssSourceList = useRuntimeConfig().public.rssSourceList.map(
		mapEnvRssSourceToRssSource,
	);
	return {
		rssSourceList,
	};
}
