<script setup lang="ts">
import IconMagnifyingGlass from "~icons/figma/magnifying-glass";

const model = defineModel<string>();
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
				class="size-5 text-secondary"
			/>
		</template>
	</AppInput>
</template>
