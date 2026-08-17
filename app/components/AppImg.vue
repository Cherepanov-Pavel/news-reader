<script setup lang="ts">
interface Props {
  src: string;
  alt: string;
}
const { src, alt } = defineProps<Props>();
</script>

<template>
  <img
    :src
    :alt
  >
</template>
