import { useLocalStorage as vueUseUseLocalStorage } from '@vueuse/core';
import { ViewMode } from '~/types';

export const DEFAULT_VIEW_MODE = ViewMode.cards;

const commonOptions = {
	writeDefaults: false,
};
export function useLocalStorage() {
	const localStorage = {
		viewMode: vueUseUseLocalStorage<ViewMode>(
			'viewMode',
			DEFAULT_VIEW_MODE,
			commonOptions,
		),

		clear: (clearKeys: string[]) => {
			(
				Object.keys(localStorage) as (keyof typeof localStorage)[]
			).forEach((key) => {
				if (key === 'clear') {
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
