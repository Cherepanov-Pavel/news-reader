<script setup lang="ts">
import type { UsePagination } from '~/composables/pagination';
// Pick<UsePagination, 'page' | 'setPage' | 'totalPages'>;
type Props = Pick<UsePagination, 'setPage'> & {
  page: number;
  totalPages: number;
};
const {
  page,
  setPage,
  totalPages,
} = defineProps<Props>();
</script>

<template>
  <nav
    class="mt-8 flex justify-center gap-2 text-sm font-bold"
  >
    <AppButton
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      :class="pageNumber === page ? 'text-blue-600' : 'text-black hover:text-blue-600'"
      @click="setPage(pageNumber)"
    >
      {{ pageNumber }}
    </AppButton>
  </nav>
</template>

<style scoped lang="scss">
</style>
