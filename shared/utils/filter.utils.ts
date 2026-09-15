export function filterByValue<T, TValue>({
	items,
	select,
	value,
}: {
	items: T[];
	select: (item: T) => TValue;
	value?: TValue;
}): T[] {
	if (value === undefined) {
		return items;
	}

	return items.filter((item) => {
		return select(item) === value;
	});
}
