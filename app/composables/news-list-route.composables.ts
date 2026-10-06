import type {
	LocationQueryRaw,
	RouteLocationRaw,
} from "vue-router";
import {
	firstPage,
} from "~~/shared/constants/pagination.constants";
export const newsListRouteName = "news-list";
interface NewsListRoutePatch {
	page?: number;
	search?: string | null;
	source?: string | null;
}
export function useNewsListRoute() {
	const route = useRoute();
	const page = computed(() => {
		return Number(route.params.page);
	});
	const search = computed(() => {
		return route.query.search?.toString();
	});
	const source = computed(() => {
		return route.query.source?.toString();
	});
	const apiQuery = computed(() => {
		return {
			page: page.value,
			search: search.value,
			source: source.value,
		};
	});
	function toDefaultNewsList() {
		return toNewsList({
			page: firstPage,
			search: null,
			source: null,
		});
	}
	function toNewsList(patch: NewsListRoutePatch = {}): RouteLocationRaw {
		const filtersChanged = (
			patch.search !== undefined || patch.source !== undefined
		);
		return {
			name: newsListRouteName,
			params: {
				page: patch.page ?? (filtersChanged ? firstPage : page.value),
			},
			query: toQuery(patch),
		};
	}
	function toQuery(patch: NewsListRoutePatch): LocationQueryRaw {
		const nextSearch = (
			patch.search === undefined
				? search.value
				: patch.search?.trim() || undefined
		);
		const nextSource = (
			patch.source === undefined
				? source.value
				: patch.source || undefined
		);
		return {
			search: nextSearch,
			source: nextSource,
		};
	}

	return {
		page,
		search,
		source,
		apiQuery,
		toNewsList,
		toDefaultNewsList,
	};
}
