import type {
	frontendDateFormat,
} from "~/constants/date.constants";

export type DateConstructorParameter = ConstructorParameters<typeof Date>[0];


export type FrontendDateFormat = typeof frontendDateFormat;
