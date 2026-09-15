export function sortByDate<T>({
	items,
	select,
	direction = "asc",
}: {
	items: T[];
	select: (item: T) => ConstructorParameters<typeof Date>[0];
	direction?: "asc" | "desc";
}): T[] {
	return items.toSorted((a, b) => {
		const aTime = (
			new Date(select(a))
			.getTime()
		);
		const bTime = (
			new Date(select(b))
			.getTime()
		);

		const result = aTime - bTime;

		return direction === "asc"
			? result
			: -result;
	});
}
