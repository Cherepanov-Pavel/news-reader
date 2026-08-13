<script setup lang="ts">
import type { NewsListItem } from '~~/shared/types/api/news';
interface Props {
  newsListItem: NewsListItem;
}
const { newsListItem } = defineProps<Props>();

const newsListItemPubDateFormatted = computed(() => {
  return convertDateToFrontendDate(newsListItem.pubDate);
});
</script>

<template>
  <article
    class="flex flex-col gap-5 border border-gray-100 bg-white p-7.5 pb-4 shadow-sm"
  >
    <h2
      class="text-lg font-bold leading-5.5 text-primary line-clamp-3 h-16.5 mb-1"
    >
      {{ newsListItem.title }}
    </h2>

    <p
      class="text-sm line-clamp-2 h-10"
    >
      {{ newsListItem.description }}
    </p>

    <AppLink
      :to="newsListItem.link"
      class="text-primary"
    >
      Подробнее
    </AppLink>

    <footer
      class="mt-auto flex items-end justify-between text-sm text-secondary"
    >
      <AppLink
        :href="`https://${newsListItem.source}`"
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

<style scoped lang="scss">
</style>
