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
      class="flex items-center gap-7.5 w-full md:w-auto"
    >
      <h1
        class="font-bold text-4xl"
      >
        Список новостей
      </h1>
      <AppLink
        class="px-2.5 py-3 rounded-full shadow-sm ml-auto"
        :to="{
          name: 'news-list',
        }"
      >
        <IconRefresh
          class="w-5 h-4 text-[#0029FF]"
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

<style scoped lang="scss">
</style>
