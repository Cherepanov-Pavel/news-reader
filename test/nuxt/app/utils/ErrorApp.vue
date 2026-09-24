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
	if (!error.value) {
		return false;
	}
	return isNuxtH3Error(error.value);
});
const isZodError = computed(() => {
	if (!error.value) {
		return false;
	}
	return isNuxtH3ZodError(error.value);
});
const issues = computed(() => {
	if (!error.value) {
		return false;
	}
	return getNuxtH3ZodIssues(error.value);
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
