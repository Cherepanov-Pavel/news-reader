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
	};

	type LocalStorageKeyList = (keyof typeof localStorage)[];
	function resetToDefaults(resetKeys?: LocalStorageKeyList) {
		(Object.keys(localStorage) as LocalStorageKeyList).forEach((key) => {
			if (resetKeys && !resetKeys.includes(key)) {
				return;
			}

			localStorage[key].value = null;
		});
	}

	return {
		...localStorage,
		resetToDefaults,
	};
}
