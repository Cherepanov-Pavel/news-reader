export function sortByDate<T>({
	items,
	getDate,
	direction = "asc",
}: {
	items: T[];
	getDate: (item: T) => ConstructorParameters<typeof Date>[0];
	direction?: "asc" | "desc";
}): T[] {
	return items.toSorted((a, b) => {
		const aTime = (
			new Date(getDate(a))
			.getTime()
		);
		const bTime = (
			new Date(getDate(b))
			.getTime()
		);

		const result = aTime - bTime;

		return direction === "asc"
			? result
			: -result;
	});
}
