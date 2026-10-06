<script setup lang="ts">
import IconRefresh from "~icons/figma/refresh";
import {
	second,
} from "#shared/constants/date.constants";
import {
	useNewsListRoute,
} from "~/composables/news-list-route.composables";

const {
	search,
	toNewsList,
	toDefaultNewsList,
} = useNewsListRoute();
const debouncedFn = useDebounceFn(
	(search?: string) => {
		void navigateTo(
			toNewsList({
				search,
			}),
		);
	},
	1.5 * second,
);
</script>

<template>
	<header
		class="flex flex-wrap items-center justify-between gap-5"
	>
		<div
			class="flex w-full items-center gap-7.5 md:w-auto"
		>
			<h1
				class="text-4xl font-bold"
			>
				Список новостей
			</h1>
			<AppLink
				class="ml-auto rounded-full px-2.5 py-3 shadow-sm"
				:to="toDefaultNewsList()"
			>
				<IconRefresh
					class="h-4 w-5 text-primary"
				/>
			</AppLink>
		</div>
		<AppInputSearch
			class="w-full md:w-80.25"
			:modelValue="search"
			@update:modelValue="debouncedFn"
		/>
	</header>
</template>
