import {
	XMLParser,
} from "fast-xml-parser";

export function parseXml<T>(xml: string): T {
	return new XMLParser({
		attributeNamePrefix: "",
		ignoreAttributes: false,
	}).parse(xml) as T;
}
