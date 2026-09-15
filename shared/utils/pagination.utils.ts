export function paginate<T>({
	items,
	page,
	pageSize,
}: {
	items: T[];
	page: number;
	pageSize: number;
}): T[] {
	const start = (page - 1) * pageSize;

	return items.slice(start, start + pageSize);
}
