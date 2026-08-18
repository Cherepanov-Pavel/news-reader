<script setup lang="ts">
import type { NewsListItem } from '~~/shared/types/api/news';
interface Props {
	newsList: NewsListItem[];
}
const { newsList } = defineProps<Props>();
</script>

<template>
	<div
		class="grid grid-cols-1 gap-5 md:grid-cols-2"
	>
		<NewsListCardsItem
			v-for="newsListItem in newsList"
			:key="newsListItem.link"
			:newsListItem
		/>
	</div>
</template>
