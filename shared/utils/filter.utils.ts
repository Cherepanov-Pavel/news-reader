export function filterByValue<T, TValue>({
	items,
	value,
	getValue,
}: {
	items: T[];
	value?: TValue;
	getValue: (item: T) => TValue;
}): T[] {
	if (value === undefined) {
		return items;
	}

	return items.filter((item) => {
		return getValue(item) === value;
	});
}
