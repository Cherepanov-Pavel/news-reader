<script setup lang="ts">
import {
	computed,
} from "vue";
import {
	getNuxtH3ZodIssues,
	isNuxtH3Error,
	isNuxtH3ZodError,
} from "~/utils/error.utils";

const {
	error,
} = await useFetch(
	"/api/zod-error",
	{
		query: {
			value: "x",
		},
	},
);

const isH3Error = computed(() => {
	return isNuxtH3Error(error);
});
const isZodError = computed(() => {
	return isNuxtH3ZodError(error);
});
const issues = computed(() => {
	return getNuxtH3ZodIssues(error);
});
</script>

<template>
	<pre
		data-testid="is-h3-error"
	>
		{{ isH3Error }}
	</pre>
	<pre
		data-testid="is-zod-error"
	>
		{{ isZodError }}
	</pre>
	<pre
		data-testid="issues"
	>
		{{ JSON.stringify(issues) }}
	</pre>
</template>
