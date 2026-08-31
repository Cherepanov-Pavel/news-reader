import {
	getRSSSourceList,
} from "#shared/utils/env";

export const useRSSSourceListStore = defineStore("rss-source-list", () => {
	return {
		RSSSourceList: getRSSSourceList(),
	};
});
