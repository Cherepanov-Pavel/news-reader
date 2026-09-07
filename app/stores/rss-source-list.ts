import {
	getRssSourceList,
} from "#shared/utils/env.utils";

export const useRSSSourceListStore = defineStore("rss-source-list", () => {
	return {
		RSSSourceList: getRssSourceList(),
	};
});
