<script setup lang="ts">
import { FIRST_PAGE } from '#shared/constants/pagination';
definePageMeta({
  name: 'news-list',
});
const route = useRoute();
const page = computed(() => {
  return Number(route.params.page);
});
if (!Number.isSafeInteger(page.value) || page.value < 1) {
  await navigateTo({
    name: 'news-list',
    params: {
      page: FIRST_PAGE,
    },
    query: route.query,
  });
}

const { data } = await useFetch('/api/rss', {
  query: {
    page,
    source: computed(() => {
      return route.query.source;
    }),
    search: computed(() => {
      return route.query.search;
    }),
  },
});
const newsList = computed(() => {
  return data.value?.items ?? [];
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
    :totalPages="data?.totalPages"
  />
</template>
