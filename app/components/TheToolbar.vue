<script setup lang="ts">
import IconViewCard from '~icons/figma/view-card';
import IconViewFeed from '~icons/figma/view-feed';
import { NewsListItemSource } from '~~/shared/types/api/news';
import { FIRST_PAGE } from '#shared/constants/pagination';
const route = useRoute();

const sourceLinks = [
  { label: 'Все' },
  { label: 'Lenta.ru', source: NewsListItemSource.lenta },
  { label: 'Mos.ru', source: NewsListItemSource.mos },
];
</script>

<template>
  <div
    class="flex items-center justify-between"
  >
    <nav
      class="flex gap-3 text-sm font-bold"
    >
      <template
        v-for="{ label, source } in sourceLinks"
        :key="label"
      >
        <NuxtLink
          :class="{
            'text-primary': route.query.source !== source,
          }"
          :to="{
            name: `news-list`,
            params: {
              page: FIRST_PAGE,
            },
            query: {
              ...route.query,
              source,
            },
          }"
        >
          {{ label }}
        </NuxtLink>
      </template>
    </nav>

    <div
      class="flex gap-2.5"
    >
      <!--
				text-gray-400
				text-blue-600
			-->
      <AppButton
        class="w-4 h-4"
      >
        <IconViewFeed />
      </AppButton>

      <AppButton
        class="w-4 h-4"
      >
        <IconViewCard />
      </AppButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
