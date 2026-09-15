export function filterBySearch<T>({
	items,
	search,
	getSearchableWords,
}: {
	items: T[];
	search: string;
	getSearchableWords: (item: T) => string[];
}): T[] {
	const searchWords = getSearchWords(search);

	if (searchWords.length === 0) {
		return items;
	}

	return items.filter((item) => {
		return matchesSearchWords({
			searchWords,
			words: getSearchableWords(item),
		});
	});
}
function getSearchWords(search: string): string[] {
	return (
		search
		.toLowerCase()
		.split(" ")
		.filter(Boolean)
	);
}
function matchesSearchWords({
	searchWords,
	words,
}: {
	searchWords: string[];
	words: string[];
}): boolean {
	return searchWords.some((searchWord) => {
		return words.some((word) => {
			return (
				word
				.toLowerCase()
				.includes(searchWord)
			);
		});
	});
}
