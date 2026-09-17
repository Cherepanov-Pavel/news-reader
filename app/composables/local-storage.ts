import {
	useLocalStorage as vueUseUseLocalStorage,
} from "@vueuse/core";
import {
	ViewMode,
} from "~/types";

export const defaultViewMode = ViewMode.Cards;

const commonOptions = {
	writeDefaults: false,
};
export function useLocalStorage() {
	const localStorage = {
		viewMode: vueUseUseLocalStorage<ViewMode>(
			"viewMode",
			defaultViewMode,
			commonOptions,
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

	// watch(localStorage.viewMode, (lsViewMode) => {
	// 	const isCorrectValue = (
	// 		Object.values(ViewMode)
	// 		.some((viewMode) => {
	// 			return viewMode === lsViewMode;
	// 		})
	// 	);
	// 	if (isCorrectValue) {
	// 		return;
	// 	}
	// 	localStorage.viewMode.value = DEFAULT_VIEW_MODE;
	// }, {
	// 	immediate: true,
	// });

	return localStorage;
}
