import type {
	H3Error,
} from "h3";
import type {
	NuxtError,
} from "nuxt/app";
import type {
	ZodError,
} from "zod";

type NuxtH3Error = NuxtError<H3Error>;
type NuxtH3ZodError = NuxtError<H3Error<{
	message: string;
	name: "ZodError";
}>>;

export function isNuxtH3Error(
	error: MaybeRef<NuxtError | undefined>,
): error is MaybeRef<NuxtH3Error> {
	const errorData = unref(error)?.data;
	return (
		typeof errorData === "object"
		&& errorData !== null
		&& "message" in errorData
		&& typeof errorData.message === "string"
		&& "statusCode" in errorData
		&& typeof errorData.statusCode === "number"
	);
}

export function isNuxtH3ZodError(
	error: MaybeRef<NuxtH3Error>,
): error is MaybeRef<NuxtH3ZodError> {
	const {
		data,
	} = unref(error).data!;
	if (
		typeof data === "object"
		&& data !== null
		&& ("name" in data)
	) {
		return data.name === "ZodError";
	}
	return false;
}

export function getNuxtH3ZodIssues(
	error: MaybeRef<NuxtH3ZodError>,
): ZodError["issues"] {
	const {
		message,
	} = (unref(error).data!.data!);
	return JSON.parse(message) as ZodError["issues"];
}
