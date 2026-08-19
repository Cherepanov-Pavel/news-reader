<script setup lang="ts">
await navigateTo({
	name: 'news-list',
	params: {
		page: 1,
	},
});
</script>

<template>
	<AppLoading
		class="absolute top-0 left-0"
	/>
</template>
