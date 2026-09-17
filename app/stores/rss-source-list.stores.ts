import {
	getRssSourceList,
} from "#shared/utils/env.utils";

export const useRssSourceListStore = defineStore("rss-source-list", () => {
	return getRssSourceList();
});
