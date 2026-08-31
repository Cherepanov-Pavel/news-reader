<script setup lang="ts">
import type {
	NewsListItem,
} from "~~/shared/types/api/news";
interface Props {
	newsListItem: NewsListItem;
}
const {
	newsListItem,
} = defineProps<Props>();

const newsListItemPubDateFormatted = computed(() => {
	return convertDateToFrontendDate(newsListItem.pubDate);
});
</script>

<template>
	<article
		class="flex flex-col items-start gap-5 border border-gray-100 bg-white p-7.5 pb-4 shadow-sm"
	>
		<h2
			class="mb-1 line-clamp-3 h-16.5 text-lg leading-5.5 font-bold text-primary"
		>
			{{ newsListItem.title }}
		</h2>

		<p
			class="line-clamp-2 h-10 text-sm"
		>
			{{ newsListItem.description }}
		</p>
		<AppLink
			:to="newsListItem.link"
			class="text-sm text-primary"
		>
			Подробнее
		</AppLink>

		<footer
			class="mt-auto flex w-full items-end justify-between text-sm text-secondary"
		>
			<AppLink
				:to="`https://${newsListItem.source}`"
			>
				www.{{ newsListItem.source }}
			</AppLink>

			<time
				:datetime="newsListItem.pubDate"
			>
				{{ newsListItemPubDateFormatted }}
			</time>
		</footer>
	</article>
</template>
