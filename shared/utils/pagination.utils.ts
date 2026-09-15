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

export function calculateTotalPages({
	items,
	pageSize,
}: {
	items: unknown[];
	pageSize: number;
}) {
	const total = items.length;
	const totalPages = Math.ceil(total / pageSize);

	return {
		totalPages,
	};
}
