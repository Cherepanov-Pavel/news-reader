<script setup lang="ts">
import { useNewsStore } from '~/stores/news';

const {
  data,
} = await useFetch('/api/mos-rss');
const {
  setNewsList,
  pagination,
} = useNewsStore();
setNewsList(data.value);
const newsList = computed(() => {
  return pagination.pagedItems;
});
</script>

<template>
  <TheHeader />
  <AppDivider />
  <TheToolbar
    class="mb-7"
  />
  <TheNewsList
    :newsList
  />
  <AppPagination
    v-bind="pagination"
  />
</template>
