import {
	ViewMode,
} from "~/types";

export const localStorageDefaults = {
	viewMode: ViewMode.Cards,
};
export const localStorageDefaultsKeys = (
	Object.keys(localStorageDefaults) as (keyof typeof localStorageDefaults)[]
);
