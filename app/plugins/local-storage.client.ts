import {
	useLocalStorage,
} from "~/composables/local-storage.composables";
import {
	localStorageDefaults,
} from "~/constants/local-storage.constants";
import {
	localStorageSchema,
} from "~/schemas/local-storage.schemas";

export default defineNuxtPlugin(() => {
	normalizeLocalStorage();
});

function normalizeLocalStorage() {
	const localStorage = useLocalStorage();
	const values = {
		viewMode: localStorage.viewMode.value,
	};

	(Object.keys(localStorageDefaults) as (keyof typeof localStorageDefaults)[])
	.forEach((key) => {
		const result = localStorageSchema.shape[key].safeParse(values[key]);
		if (result.success) {
			return;
		}
		localStorage[key].value = localStorageDefaults[key];
	});
}
