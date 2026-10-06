<script setup lang="ts">
import {
	ViewMode,
} from "~/types";
import {
	firstPage,
} from "~~/shared/constants/pagination.constants";
import {
	useLocalStorage,
} from "~/composables/local-storage.composables";
import {
	localStorageDefaults,
} from "~/constants/local-storage.constants";
import NewsListFeed from "~/components/news-list/NewsListFeed.vue";
import NewsListCards from "~/components/news-list/NewsListCards.vue";
import {
	isInvalidNewsListPageError,
} from "~/utils/news-list/error.utils";
import {
	newsListRouteName,
	useNewsListRoute,
} from "~/composables/news-list-route.composables";
const isMounted = useMounted();

definePageMeta({
	name: newsListRouteName,
});
useHead({
	title: "Список новостей",
});

const viewModeConfigs = {
	[ViewMode.Feed]: {
		component: NewsListFeed,
	},
	[ViewMode.Cards]: {
		component: NewsListCards,
	},
};
const {
	viewMode,
} = useLocalStorage();
const activeViewMode = computed(() => {
	if (isMounted.value) {
		return viewMode.value;
	}
	return localStorageDefaults.viewMode;
});

const {
	toNewsList,
	page,
	source,
	search,
} = useNewsListRoute();
const {
	data,
	error,
} = await useFetch("/api/news-list", {
	query: computed(() => {
		return reactive({
			page,
			source,
			search,
		});
	}),
});
const newsList = computed(() => {
	return data.value?.items ?? [];
});
whenever(error, async (error) => {
	if (isInvalidNewsListPageError(error)) {
		await navigateTo(
			toNewsList({
				page: firstPage,
			}),
		);
	}
}, {
	immediate: true,
});
</script>

<template>
	<NewsListHeader />
	<AppDivider />
	<NewsListToolbar
		class="mb-7"
	/>
	<component
		:is="viewModeConfigs[activeViewMode].component"
		:newsList
	/>
	<AppPagination
		:totalPages="data?.totalPages"
	/>
</template>
