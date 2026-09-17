import type {
	localStorageSchema,
} from "~/schemas/local-storage.schemas";
import type {
	z,
} from "zod";
import {
	ViewMode,
} from "~/types";

export const localStorageDefaults: z.infer<typeof localStorageSchema> = {
	viewMode: ViewMode.Cards,
};
