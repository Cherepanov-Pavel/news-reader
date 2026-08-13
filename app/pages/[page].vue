<script setup lang="ts">
import { useNewsStore } from '~/stores/news';
definePageMeta({
  name: 'news-list',
});
const route = useRoute();

const page = Number(route.params.page ?? 1);
if (!Number.isSafeInteger(page) || page < 1) {
  await navigateTo({
    name: 'news-list',
    params: {
      page: 1,
    },
  });
}

const { data } = await useFetch('/api/rss', {
  query: {
    page,
  },
});
const newsList = data.value?.items ?? [];
const {
  setNewsList,
} = useNewsStore();
setNewsList(newsList);
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
