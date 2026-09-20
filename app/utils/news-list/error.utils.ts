import type {
	NuxtError,
} from "#app";
import {
	getNuxtH3ZodIssues,
} from "~/utils/error.utils";

export function isInvalidNewsListPageError(
	error: NuxtError,
): boolean {
	if (
		error.status !== 400
	) {
		return false;
	}

	const issues = getNuxtH3ZodIssues(error);

	if (!issues) {
		return false;
	}

	return issues.some(({
		path,
	}) => {
		return path.includes("page");
	});
}
