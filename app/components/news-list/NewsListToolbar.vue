<script setup lang="ts">
import IconViewCards from "~icons/figma/view-cards";
import IconViewFeed from "~icons/figma/view-feed";
import {
	firstPage,
} from "~~/shared/constants/pagination.constants";
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
const {
	rssSourceList,
} = useRssSourceListStore();

const route = useRoute();
const isMounted = useMounted();

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
						'text-primary': route.query.source !== source,
					}"
					:to="{
						name: `news-list`,
						params: {
							page: firstPage,
						},
						query: {
							...route.query,
							source,
						},
					}"
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
