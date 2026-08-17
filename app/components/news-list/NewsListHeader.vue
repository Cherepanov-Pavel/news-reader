<script setup lang="ts">
import IconRefresh from '~icons/figma/refresh';
import { SECOND } from '#shared/constants/date';
const route = useRoute();

const search = computed(() => {
  return route.query.search?.toString();
});
const debouncedFn = useDebounceFn((search: string) => {
  void navigateTo({
    name: 'news-list',
    query: {
      ...route.query,
      search: search.trim() || undefined,
    },
  });
}, 1.5 * SECOND);
</script>

<template>
  <header
    class="flex flex-wrap items-center justify-between gap-5"
  >
    <div
      class="flex w-full items-center gap-7.5 md:w-auto"
    >
      <h1
        class="text-4xl font-bold"
      >
        Список новостей
      </h1>
      <AppLink
        class="ml-auto rounded-full px-2.5 py-3 shadow-sm"
        :to="{
          name: 'news-list',
        }"
      >
        <IconRefresh
          class="h-4 w-5 text-[#0029FF]"
        />
      </AppLink>
    </div>
    <AppInputSearch
      class="w-full md:w-[321px]"
      :modelValue="search"
      @update:modelValue="debouncedFn"
    />
  </header>
</template>
