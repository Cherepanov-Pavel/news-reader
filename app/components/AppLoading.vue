<script setup lang="ts">
// Adapted from https://github.com/egoist/vue-content-loader/blob/master/src/ContentLoader.tsx
interface Props {
	width?: string | number;
	height?: string | number;
	viewBox?: string;
	preserveAspectRatio?: string;
	speed?: number;
	baseUrl?: string;
	primaryColor?: string;
	secondaryColor?: string;
	primaryOpacity?: number;
	secondaryOpacity?: number;
	uniqueKey?: string;
	animate?: boolean;
}
const {
	viewBox,
	preserveAspectRatio = "xMidYMid meet",
	speed = 5,
	baseUrl = "",
	primaryColor = "#f9f9f9",
	secondaryColor = "black",
	primaryOpacity = 1,
	secondaryOpacity = 1,
	uniqueKey,
	// eslint-disable-next-line vue/no-boolean-default
	animate = true,
	...props
} = defineProps<Props>();

const idClip = computed(() => {
	return (uniqueKey ? `${uniqueKey}-idClip` : useId());
});
const idGradient = computed(() => {
	return (uniqueKey ? `${uniqueKey}-idGradient` : useId());
});
const width = computed(() => {
	return props.width ?? "100%";
});
const height = computed(() => {
	return props.height ?? "100%";
});
const computedViewBox = computed(
	() => {
		return viewBox ?? `0 0 ${width.value} ${height.value}`;
	},
);
</script>

<template>
	<svg
		:width
		:height
		:viewBox="computedViewBox"
		version="1.1"
		:preserveAspectRatio
	>
		<rect
			:style="{
				fill: `url(${baseUrl}#${idGradient})`,
			}"
			:clip-path="`url(${baseUrl}#${idClip})`"
			x="0"
			y="0"
			width="100%"
			height="100%"
		/>

		<defs>
			<clipPath
				:id="idClip"
			>
				<rect
					x="0"
					y="0"
					rx="5"
					ry="5"
					width="100%"
					height="100%"
				/>
			</clipPath>

			<linearGradient
				:id="idGradient"
			>
				<stop
					offset="0%"
					:stop-color="primaryColor"
					:stop-opacity="primaryOpacity"
				>
					<animate
						v-if="animate"
						attributeName="offset"
						values="-2; 1"
						:dur="`${speed}s`"
						repeatCount="indefinite"
					/>
				</stop>
				<stop
					offset="50%"
					:stop-color="secondaryColor"
					:stop-opacity="secondaryOpacity"
				>
					<animate
						v-if="animate"
						attributeName="offset"
						values="-1.5; 1.5"
						:dur="`${speed}s`"
						repeatCount="indefinite"
					/>
				</stop>
				<stop
					offset="100%"
					:stop-color="primaryColor"
					:stop-opacity="primaryOpacity"
				>
					<animate
						v-if="animate"
						attributeName="offset"
						values="-1; 2"
						:dur="`${speed}s`"
						repeatCount="indefinite"
					/>
				</stop>
			</linearGradient>
		</defs>
	</svg>
</template>
