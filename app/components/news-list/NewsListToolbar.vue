<script setup lang="ts">
import IconViewCards from "~icons/figma/view-cards";
import IconViewFeed from "~icons/figma/view-feed";
import {
	ViewMode,
} from "~/types";
import {
	useMounted,
} from "@vueuse/core";
import {
	capitalize,
} from "~~/shared/utils/string.utils";
import {
	useRssSourceListStore,
} from "~/stores/rss-source-list.stores";
import {
	useLocalStorage,
} from "~/composables/local-storage.composables";
import {
	useNewsListRoute,
} from "~/composables/news-list-route.composables";
const isMounted = useMounted();

const {
	source: routeSource,
	toNewsList,
} = useNewsListRoute();
const {
	rssSourceList,
} = useRssSourceListStore();
const sourceLinks = [
	{
		label: "Все",
		source: undefined,
	},
	...rssSourceList.map(({
		hostname,
	}) => {
		return {
			label: capitalize(hostname),
			source: hostname,
		};
	}),
];

const {
	viewMode,
} = useLocalStorage();
const viewModeBtns = [
	{
		mode: ViewMode.Feed,
		iconComponent: IconViewFeed,
	},
	{
		mode: ViewMode.Cards,
		iconComponent: IconViewCards,
	},
];
</script>

<template>
	<div
		class="flex items-center justify-between"
	>
		<nav
			class="flex gap-3 text-sm font-bold"
		>
			<template
				v-for="{
					label,
					source,
				} in sourceLinks"
				:key="label"
			>
				<NuxtLink
					:class="{
						'text-primary': source !== routeSource,
					}"
					:to="toNewsList({
						source,
					})"
				>
					{{ label }}
				</NuxtLink>
			</template>
		</nav>

		<div
			class="flex gap-2.5"
		>
			<template
				v-for="{
					mode,
					iconComponent,
				} in viewModeBtns"
				:key="mode"
			>
				<AppButton
					class="size-4"
					:class="[
						isMounted && viewMode === mode ? 'text-primary' : 'text-secondary',
					]"
					@click="() => viewMode = mode"
				>
					<component
						:is="iconComponent"
					/>
				</AppButton>
			</template>
		</div>
	</div>
</template>
