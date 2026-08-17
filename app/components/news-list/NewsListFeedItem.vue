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
    class="flex flex-col items-start gap-5 border border-gray-100 bg-white px-5.5 pt-5 pb-1 shadow-sm md:gap-7 md:p-7.5"
  >
    <div
      class="flex flex-col gap-5 md:flex-row md:gap-7.5"
    >
      <AppImg
        v-if="newsListItem.enclosure.url"
        class="aspect-[2/1] w-full shrink-0 md:w-50"
        :src="newsListItem.enclosure.url"
        :alt="`Изображение для новости: ${newsListItem.title}`"
      />
      <div
        class="flex flex-col gap-5"
      >
        <h2
          class="line-clamp-3 h-16.5 text-lg leading-5.5 font-bold text-primary md:line-clamp-2 md:h-11"
        >
          {{ newsListItem.title }}
        </h2>

        <p
          class="line-clamp-3 h-15 text-sm md:line-clamp-2 md:h-10"
        >
          {{ newsListItem.description }}
        </p>
      </div>
    </div>
    <AppLink
      :to="newsListItem.link"
      class="text-sm text-primary md:hidden"
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
