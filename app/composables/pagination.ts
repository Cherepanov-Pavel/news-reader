import { computed, ref, type Ref } from 'vue';

export function usePagination<T>(
  items: Ref<T[]>,
) {
  const startPage = 1;
  const page = ref(startPage);
  function setPage(newPage: number) {
    page.value = newPage;
    console.log(page.value);
  }
  function resetPage() {
    page.value = startPage;
  }
  const perPage = ref(4);

  const totalPages = computed(() => {
    return Math.max(1, Math.ceil(items.value.length / perPage.value));
  });

  const pagedItems = computed(() => {
    const start = (page.value - 1) * perPage.value;
    return items.value.slice(start, start + perPage.value);
  });

  watchEffect(() => {
    console.log(pagedItems.value);
  });
  return {
    page,
    setPage,
    resetPage,
    perPage,
    totalPages,
    pagedItems,
  };
}
export interface UsePagination {
  page: Ref<number, number>;
  setPage: (newPage: number) => void;
  resetPage: () => void;
  perPage: Ref<number, number>;
  totalPages: ComputedRef<number>;
  pagedItems: globalThis.ComputedRef<unknown[]>;
}
