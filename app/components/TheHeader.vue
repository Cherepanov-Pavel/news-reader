<script setup lang="ts">
import AppButton from '~/components/AppButton.vue';
import IconRefresh from '~icons/figma/refresh';
</script>

<template>
  <header
    class="flex items-center justify-between"
  >
    <div
      class="flex items-center gap-7.5"
    >
      <h1
        class="font-bold text-4xl"
      >
        Список новостей
      </h1>
      <AppButton
        class="px-2.5 py-3 rounded-full shadow-sm"
      >
        <IconRefresh
          class="w-5 h-4 text-[#0029FF]"
        />
      </AppButton>
    </div>

    <AppInputSearch
      class="w-[321px]"
    />
  </header>
</template>

<style scoped lang="scss">
</style>
