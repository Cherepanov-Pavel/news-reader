<script setup lang="ts">
const route = useRoute();

interface Props {
	totalPages?: number;
}
const {
	totalPages = 1,
} = defineProps<Props>();


const currentPage = computed(() => {
	return Number(route.params.page);
});
const pages = computed(() => {
	if (totalPages <= 5) {
		return Array.from(
			{
				length: totalPages,
			},
			// eslint-disable-next-line id-length
			(_, index) => {
				return index + 1;
			},
		);
	}

	const pages: (number | "...")[] = [
		1,
	];
	let startPage: number;
	let endPage: number;

	if (currentPage.value <= 3) {
		// В начале показываем страницы от 2 до 5.
		startPage = 2;
		endPage = 5;
	} else if (currentPage.value >= totalPages - 2) {
		// В конце показываем 4 страницы перед последней.
		startPage = totalPages - 4;
		endPage = totalPages - 1;
	} else {
		// В середине показываем текущую и соседние страницы.
		startPage = currentPage.value - 1;
		endPage = currentPage.value + 1;
	}

	// Добавляем "..." между первой страницей
	// и диапазоном, если между ними есть пропуск.
	if (startPage > 2) {
		pages.push("...");
	}

	for (let page = startPage; page <= endPage; page++) {
		pages.push(page);
	}

	// Добавляем "..." между диапазоном
	// и последней страницей, если между ними есть пропуск.
	if (endPage < totalPages - 1) {
		pages.push("...");
	}

	pages.push(totalPages);

	return pages;
});
</script>

<template>
	<nav
		class="mt-8 flex justify-center gap-2 text-sm font-bold"
	>
		<template
			v-for="page in pages"
			:key="page"
		>
			<div
				class="w-4"
			>
				<NuxtLink
					v-if="page !== '...'"
					:class="[
						currentPage === page ? 'text-primary' : 'hover:text-primary',
					]"
					:to="{
						name: `news-list`,
						params: {
							page,
						},
						query: route.query,
					}"
				>
					{{ page }}
				</NuxtLink>
				<span
					v-else
				>
					{{ page }}
				</span>
			</div>
		</template>
	</nav>
</template>
