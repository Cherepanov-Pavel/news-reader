import {
	beforeEach,
	describe,
	expect,
	it,
} from "vitest";
import {
	useLocalStorage,
} from "~/composables/local-storage.composables";
import {
	localStorageDefaults,
} from "~/constants/local-storage.constants";
import {
	ViewMode,
} from "~/types";
import {
	nextTick,
} from "vue";

describe("useLocalStorage", () => {
	beforeEach(() => {
		window.localStorage.clear();
	});

	it("uses the default value when storage is empty", async () => {
		useLocalStorage();

		await checkInStorages({
			key: "viewMode",
			value: localStorageDefaults.viewMode,
		});
	});

	it("persists the value in localStorage", async () => {
		const {
			viewMode,
		} = useLocalStorage();

		viewMode.value = ViewMode.Feed;

		await checkInStorages({
			key: "viewMode",
			value: ViewMode.Feed,
		});
	});

	it("loads an existing value from localStorage", async () => {
		window.localStorage.setItem(
			"viewMode",
			ViewMode.Feed,
		);

		await checkInStorages({
			key: "viewMode",
			value: ViewMode.Feed,
		});
	});

	it("reset to default selected key", async () => {
		const {
			viewMode,
			resetToDefaults,
		} = useLocalStorage();
		// @ts-expect-error for test purpose
		viewMode.value = "any";

		await checkInStorages({
			key: "viewMode",
			value: "any",
		});

		resetToDefaults([
			"viewMode",
		]);

		await checkInStorages({
			key: "viewMode",
			value: localStorageDefaults.viewMode,
		});
	});

	it("does not clear keys that were not selected", async () => {
		const {
			viewMode,
			resetToDefaults,
		} = useLocalStorage();

		// @ts-expect-error for test purpose
		viewMode.value = "any";
		resetToDefaults([]);

		await checkInStorages({
			key: "viewMode",
			value: "any",
		});
	});

	it("resets all values when keys are not specified", async () => {
		const {
			viewMode,
			resetToDefaults,
		} = useLocalStorage();
		// @ts-expect-error for test purpose
		viewMode.value = "any";
		await checkInStorages({
			key: "viewMode",
			value: "any",
		});

		resetToDefaults();

		await checkInStorages({
			key: "viewMode",
			value: localStorageDefaults.viewMode,
		});
	});
});

async function checkInStorages({
	key,
	value,
}: {
	key: any;
	value: any;
}) {
	/*
		if in code above we set some value via useLocalStorage
		useLocalStorage().viewMode.value = ViewMode.Feed;
		we need to await nextTick, before checking window.localStorage.getItem(key)
	*/
	await nextTick();

	const localStorage = useLocalStorage();
	expect(window.localStorage.getItem(key))
	.toBe(value);
	// @ts-expect-error it's just unit tests
	expect(localStorage[key].value)
	.toBe(value);
}
