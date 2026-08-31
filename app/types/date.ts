import type {
	FRONTEND_DATE_FORMAT,
} from "~/constants/date";

export type DateConstructorParameter = ConstructorParameters<typeof Date>[0];


export type FrontendDateFormat = typeof FRONTEND_DATE_FORMAT;
