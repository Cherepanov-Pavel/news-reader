<script setup lang="ts">
import IconViewCard from '~icons/figma/view-card';
import IconViewFeed from '~icons/figma/view-feed';
</script>

<template>
  <div
    class="flex items-center justify-between"
  >
    <nav
      class="flex gap-3 text-sm font-bold"
    >
      <a
        href="#"
        class="text-black"
      >
        Все
      </a>
      <a
        href="#"
        class="text-primary"
      >
        Lenta.ru
      </a>
      <a
        href="#"
        class="text-primary"
      >
        Mos.ru
      </a>
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
