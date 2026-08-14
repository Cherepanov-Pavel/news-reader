<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const attrs = useAttrs();

const model = defineModel<string>({
  default: '',
});
</script>

<template>
  <div
    class="flex w-full items-center gap-3 border border-gray-200 shadow-sm py-2.5 px-4"
    :class="[attrs.class]"
  >
    <input
      v-model="model"
      class="w-full h-full"
      v-bind="attrs"
    >
    <slot
      name="icon"
    />
  </div>
</template>

<style scoped lang="scss">
</style>
