import {
	type X2jOptions,
	XMLParser,
} from "fast-xml-parser";

export function parseXml({
	xml,
	options = {},
}: {
	xml: string;
	options?: X2jOptions;
}) {
	return (
		new XMLParser({
			attributeNamePrefix: "",
			ignoreAttributes: false,
			...options,
		})
		.parse(xml)
	);
}
