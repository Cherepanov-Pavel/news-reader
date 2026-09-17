<script setup lang="ts">
import {
	ViewMode,
} from "~/types";
import {
	firstPage,
} from "~~/shared/constants/pagination";
import {
	getNuxtH3ZodIssues,
	isNuxtH3Error,
	isNuxtH3ZodError,
} from "~/utils/error.utils";
import {
	defaultViewMode,
	useLocalStorage,
} from "~/composables/local-storage";
import NewsListFeed from "~/components/news-list/NewsListFeed.vue";
import NewsListCards from "~/components/news-list/NewsListCards.vue";
const isMounted = useMounted();
const route = useRoute();

definePageMeta({
	name: "news-list",
});
useHead({
	title: "Список новостей",
});

const viewModes = [
	{
		mode: ViewMode.Feed,
		componentIs: NewsListFeed,
	},
	{
		mode: ViewMode.Cards,
		componentIs: NewsListCards,
	},
];
const {
	viewMode,
} = useLocalStorage();

const {
	data,
	error,
} = await useFetch("/api/news-list", {
	query: {
		page: route.params.page,
		source: computed(() => {
			return route.query.source;
		}),
		search: computed(() => {
			return route.query.search;
		}),
	},
});
const newsList = computed(() => {
	return data.value?.items ?? [];
});
watch(error, (error) => {
	if (!error) {
		return;
	}
	if (
		!isNuxtH3Error(error)
		|| !isNuxtH3ZodError(error)
		|| !(error.status === 400)
	) {
		throw error;
	}

	const parsed = getNuxtH3ZodIssues(error);
	const isPageProblem = parsed.some(({
		path,
	}) => {
		return path.some((pathItem) => {
			return pathItem === "page";
		});
	});
	if (!isPageProblem) {
		return;
	}
	void navigateTo({
		name: "news-list",
		params: {
			page: firstPage,
		},
		query: route.query,
	});
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
	<template
		v-for="{
			mode,
			componentIs,
		} in viewModes"
		:key="mode"
	>
		<component
			:is="componentIs"
			v-if="isMounted ? mode === viewMode : mode === defaultViewMode"
			:newsList
		/>
	</template>
	<AppPagination
		:totalPages="data?.totalPages"
	/>
</template>
