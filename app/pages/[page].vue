<script setup lang="ts">
import { FIRST_PAGE } from '#shared/constants/pagination';
import { ViewMode } from '~/types';
import { DEFAULT_VIEW_MODE } from '#imports';
definePageMeta({
	name: 'news-list',
});
useHead({
	title: 'Список новостей',
});
const isMounted = useMounted();
const NewsListFeed = resolveComponent('NewsListFeed');
const NewsListCards = resolveComponent('NewsListCards');

const route = useRoute();
const page = computed(() => {
	return Number(route.params.page);
});
if (!Number.isSafeInteger(page.value) || page.value < 1) {
	await navigateTo({
		name: 'news-list',
		params: {
			page: FIRST_PAGE,
		},
		query: route.query,
	});
}

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
const { viewMode } = useLocalStorage();
const { data } = await useFetch('/api/rss', {
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
		v-for="{ mode, componentIs } in viewModes"
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
