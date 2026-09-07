import {
	XMLParser,
} from "fast-xml-parser";

export function parseXml<T>(xml: string): T {
	return new XMLParser({
		attributeNamePrefix: "",
		ignoreAttributes: false,
		isArray: (tagName, jPathOrMatcher) => {
			const pathToItem = "rss.channel.item";
			return (
				jPathOrMatcher === pathToItem
				|| jPathOrMatcher === `${pathToItem}.enclosure`
			);
		},
	}).parse(xml) as T;
}
