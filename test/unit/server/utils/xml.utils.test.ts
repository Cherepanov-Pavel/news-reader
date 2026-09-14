import {
	expect,
	it,
} from "vitest";
import {
	parseXml,
} from "~~/server/utils/xml.utils";

it("parses a single RSS item and preserves enclosure attributes", () => {
	const result = parseXml({
		xml: "<rss><channel><item><title>Example news</title><enclosure url=\"https://example.com/news.jpg\" type=\"image/jpeg\" /></item></channel></rss>",
		options: {
			isArray,
		},
	});

	expect(result.rss.channel.item)
	.toEqual([
		{
			title: "Example news",
			enclosure: [
				{
					url: "https://example.com/news.jpg",
					type: "image/jpeg",
				},
			],
		},
	]);
});

it("keeps rss.channel.item and rss.channel.item.enclosures as arrays", () => {
	let result = parseXml({
		xml: "<rss><channel><item><enclosure url=\"one\" /><enclosure url=\"two\" /></item><item><enclosure url=\"three\" /></item></channel></rss>",
		options: {
			isArray,
		},
	});
	expect(result.rss.channel.item)
	.toHaveLength(2);
	expect(result.rss.channel.item[0]!.enclosure)
	.toHaveLength(2);
	expect(result.rss.channel.item[1]!.enclosure)
	.toHaveLength(1);

	result = parseXml({
		xml: "<rss><channel><item></item></channel></rss>",
		options: {
			isArray,
		},
	});
	expect(result.rss.channel.item)
	.toHaveLength(1);
});


function isArray(tagName: any, jPathOrMatcher: any) {
	const pathToItem = "rss.channel.item";
	return (
		jPathOrMatcher === pathToItem
		|| jPathOrMatcher === `${pathToItem}.enclosure`
	);
}
