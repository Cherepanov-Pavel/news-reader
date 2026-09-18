import type {
	NuxtError,
} from "#app";
import {
	getNuxtH3ZodIssues,
	isNuxtH3Error, isNuxtH3ZodError,
} from "~/utils/error.utils";

export function isInvalidNewsListPageError(
	error: NuxtError | undefined,
): boolean {
	if (
		!isNuxtH3Error(error)
		|| !isNuxtH3ZodError(error)
		|| error.status !== 400
	) {
		return false;
	}

	const issues = getNuxtH3ZodIssues(error);

	return issues.some(({
		path,
	}) => {
		return path.includes("page");
	});
}
