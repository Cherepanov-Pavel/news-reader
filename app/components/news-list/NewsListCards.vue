<script setup lang="ts">
import type { NewsListItem } from '~~/shared/types/api/news';
interface Props {
  newsList: NewsListItem[];
}
const { newsList } = defineProps<Props>();
</script>

<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 gap-5"
  >
    <NewsListCardsItem
      v-for="newsListItem in newsList"
      :key="newsListItem.link"
      :newsListItem
    />
  </div>
</template>

<style scoped lang="scss">
</style>
