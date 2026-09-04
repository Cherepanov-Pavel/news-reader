import type {
	ResolvedOptions,
} from "unplugin-icons";
import {
	FileSystemIconLoader as fileSystemIconLoader,
} from "unplugin-icons/loaders";

const transform: ResolvedOptions["transform"] = (svg) => {
	return (
		svg
		.replace(/(<svg[^>]*?)width="[^"]*"/u, "$1width=\"100%\"")
		.replace(/(<svg[^>]*?)height="[^"]*"/u, "$1height=\"100%\"")
		.replaceAll(/fill=".+"/ug, "fill=\"currentColor\"")
	);
};
export const unpluginIconsModule = [
	// makes available ~icons/ import
	"unplugin-icons/nuxt",
	{
		customCollections: {
			figma: fileSystemIconLoader("app/assets/svg"),
		},
		transform,
	},
	// I don’t want to waste time and deal with nuxt types. Maybe later.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
] as any;
