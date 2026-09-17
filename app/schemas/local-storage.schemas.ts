import {
	z,
} from "zod";
import {
	ViewMode,
} from "~/types";

export const localStorageSchema = z.object({
	viewMode: z.enum(ViewMode),
});
