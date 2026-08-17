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
    class="flex flex-col items-start gap-5 md:gap-7 border border-gray-100 bg-white pt-5 px-5.5 pb-1 md:p-7.5 shadow-sm"
  >
    <div
      class="flex flex-col md:flex-row gap-5 md:gap-7.5"
    >
      <AppImg
        v-if="newsListItem.enclosure.url"
        class="w-full md:w-50 shrink-0 aspect-[2/1]"
        :src="newsListItem.enclosure.url"
        :alt="`Изображение для новости: ${newsListItem.title}`"
      />
      <div
        class="flex flex-col gap-5"
      >
        <h2
          class="text-lg font-bold leading-5.5 text-primary line-clamp-3 md:line-clamp-2 h-16.5 md:h-11"
        >
          {{ newsListItem.title }}
        </h2>

        <p
          class="text-sm line-clamp-3 md:line-clamp-2 h-15 md:h-10"
        >
          {{ newsListItem.description }}
        </p>
      </div>
    </div>
    <AppLink
      :to="newsListItem.link"
      class="text-primary text-sm md:hidden"
    >
      Подробнее
    </AppLink>
    <footer
      class="mt-auto flex items-end justify-between text-sm text-secondary w-full"
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

<style scoped lang="scss">
</style>
