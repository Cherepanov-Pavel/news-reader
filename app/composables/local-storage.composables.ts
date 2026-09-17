import {
	useStorage,
} from "@vueuse/core";
import {
	localStorageDefaults,
} from "~/constants/local-storage.constants";
import type {
	ViewMode,
} from "~/types";

export function useLocalStorage() {
	const localStorage = {
		viewMode: useStorage<ViewMode>(
			"viewMode",
			localStorageDefaults.viewMode,
		),

		clear: (clearKeys: string[]) => {
			(
				Object.keys(localStorage) as (keyof typeof localStorage)[]
			).forEach((key) => {
				if (key === "clear") {
					return;
				}
				if (!clearKeys.includes(key)) {
					return;
				}
				localStorage[key].value = null;
			});
		},
	};

	return localStorage;
}
