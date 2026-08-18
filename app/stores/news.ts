// import { usePagination } from '~/composables/pagination';
import type { NewsListItem } from '~~/shared/types/api/news';

export const useNewsStore = defineStore('news', () => {
	const newsList = ref<NewsListItem[]>([]);
	function setNewsList(news: NewsListItem[]) {
		newsList.value = news;
		// pagination.resetPage();
	}
	// const pagination = usePagination(newsList);

	return {
		setNewsList,
		// pagination,
	};
});
