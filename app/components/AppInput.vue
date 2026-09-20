<script setup lang="ts" generic="EmptyValue extends '' | undefined | null = undefined">
defineOptions({
	inheritAttrs: false,
});
const attrs = useAttrs();

interface Props {
	emptyValue?: EmptyValue;
}
const {
	emptyValue,
} = defineProps<Props>();


// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
const model = defineModel<string | NoInfer<EmptyValue>>({
	required: true,
	set(value) {
		if (value) {
			return value;
		}
		return emptyValue;
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
