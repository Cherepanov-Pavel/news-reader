<script setup lang="ts">
import IconViewCards from "~icons/figma/view-cards";
import IconViewFeed from "~icons/figma/view-feed";
import {
	FIRST_PAGE,
} from "#shared/constants/pagination";
import {
	ViewMode,
} from "~/types";
import {
	useMounted,
} from "@vueuse/core";
import {
	capitalize,
} from "#shared/utils/string";
const {
	RSSSourceList,
} = useRSSSourceListStore();

const route = useRoute();
const isMounted = useMounted();

const sourceLinks = [
	{
		label: "Все",
		source: undefined,
	},
	...RSSSourceList.map(({
		host,
	}) => {
		return {
			label: capitalize(host),
			source: host,
		};
	}),
];

const {
	viewMode,
} = useLocalStorage();
const viewModeBtns = [
	{
		mode: ViewMode.feed,
		iconComponent: IconViewFeed,
	},
	{
		mode: ViewMode.cards,
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
							page: FIRST_PAGE,
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
