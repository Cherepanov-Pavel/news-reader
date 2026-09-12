<script setup lang="ts">
import {
	ViewMode,
} from "~/types";
import {
	DEFAULT_VIEW_MODE,
} from "#imports";
import {
	FIRST_PAGE,
} from "~~/shared/constants/pagination";
import {
	getNuxtH3ZodIssues,
	isNuxtH3Error,
	isNuxtH3ZodError,
} from "~/utils/error.utils";
definePageMeta({
	name: "news-list",
});
useHead({
	title: "Список новостей",
});
const isMounted = useMounted();
const NewsListFeed = resolveComponent("NewsListFeed");
const NewsListCards = resolveComponent("NewsListCards");

const route = useRoute();
const page = computed(() => {
	return Number(route.params.page);
});

const viewModes = [
	{
		mode: ViewMode.feed,
		componentIs: NewsListFeed,
	},
	{
		mode: ViewMode.cards,
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
		page,
		source: computed(() => {
			return route.query.source;
		}),
		search: computed(() => {
			return route.query.search;
		}),
	},
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
			page: FIRST_PAGE,
		},
		query: route.query,
	});
}, {
	immediate: true,
});
const newsList = computed(() => {
	return data.value?.items ?? [];
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
			v-if="isMounted ? mode === viewMode : mode === DEFAULT_VIEW_MODE"
			:newsList
		/>
	</template>
	<AppPagination
		:totalPages="data?.totalPages"
	/>
</template>
