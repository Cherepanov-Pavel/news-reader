<script setup lang="ts">
import type {
	NewsListItem,
} from "~~/shared/types/api/news.types";
interface Props {
	newsList: NewsListItem[];
}
const {
	newsList,
} = defineProps<Props>();
</script>

<template>
	<div
		class="grid gap-5"
	>
		<NewsListFeedItem
			v-for="newsListItem in newsList"
			:key="newsListItem.link"
			:newsListItem
		/>
	</div>
</template>
