<script setup lang="ts">
import type { ClassValue } from 'vue';


interface Props {
  class?: ClassValue;
}
const props = defineProps<Props>();
</script>

<template>
  <NuxtLink
    v-slot="{
      href, navigate, isExternal, rel,
    }"
    custom
  >
    <a
      class="cursor-pointer underline"
      :class="props.class"
      :href="href || undefined"
      :target="isExternal ? '_blank' : undefined"
      :rel="rel || undefined"
      @click="(event) => !isExternal && navigate(event)"
    >
      <slot />
    </a>
  </NuxtLink>
</template>
