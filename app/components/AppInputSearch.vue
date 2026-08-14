<script setup lang="ts">
import IconMagnifyingGlass from '~icons/figma/magnifying-glass';


const model = defineModel<string>({
  default: '',
});
</script>

<template>
  <AppInput
    v-model="model"
    type="search"
    name="search"
  >
    <template
      #icon
    >
      <IconMagnifyingGlass
        class="h-5 w-5 text-[#DCDCDC]"
      />
    </template>
  </AppInput>
</template>
