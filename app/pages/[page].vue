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
const route = useRoute();
const isMounted = useMounted();

definePageMeta({
	name: "news-list",
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
// const newsListQuery = {
// 	search: computed({
// 		get() {
// 			return route.query.search?.toString();
// 		},
// 		set: useDebounceFn(
// 			(search?: string) => {
// 				void navigateTo({
// 					name: "news-list",
// 					params: {
// 						page: firstPage,
// 					},
// 					query: {
// 						...route.query,
// 						search: search?.trim(),
// 					},
// 				});
// 			},
// 			1.5 * second,
// 		),
// 	}),
// 	source:
// };
const {
	data,
	error,
} = await useFetch("/api/news-list", {
	query: computed(() => {
		const {
			page,
		} = route.params;
		const {
			source,
			search,
		} = route.query;
		return {
			page,
			source,
			search,
		};
	}),
});
const newsList = computed(() => {
	return data.value?.items ?? [];
});
whenever(error, (error) => {
	if (!isInvalidNewsListPageError(error)) {
		throw error;
	}

	void navigateTo({
		name: "news-list",
		params: {
			page: firstPage,
		},
		query: route.query,
	});
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
