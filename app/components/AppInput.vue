<script setup lang="ts">
defineOptions({
	inheritAttrs: false,
});
const attrs = useAttrs();

interface Props {
	emptyAsString?: boolean;
}
const {
	emptyAsString,
} = defineProps<Props>();

const model = defineModel<string>({
	set(value) {
		if (value || emptyAsString) {
			return value;
		}
		return undefined;
	},
});
</script>

<template>
	<div
		class="flex w-full items-center gap-3 border border-gray-200 px-4 py-2.5 shadow-sm"
		:class="[
			attrs.class,
		]"
	>
		<input
			v-model="model"
			class="size-full"
			v-bind="attrs"
		>
		<slot
			name="icon"
		/>
	</div>
</template>
