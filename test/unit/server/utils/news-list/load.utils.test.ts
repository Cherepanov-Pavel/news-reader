import {
	expect,
	it,
	vi,
} from "vitest";
import {
	loadNewsFromRssSourceList,
} from "~~/server/utils/news-list/load.utils";

vi.mock("~~/server/utils/news-list/cache.utils", () => {
	return {
		getCachedResponseValidationResult: vi.fn(),
	};
});

it("keeps news from sources that loaded successfully", async () => {
	const loadNewsFromSourceFn = (
		vi
		.fn()
		.mockResolvedValueOnce([
			{
				title: "Example news",
				description: "",
				link: "https://example.com/news",
				pubDate: "2026-09-14",
				enclosure: {},
				source: "example.com",
			},
		])
		.mockRejectedValueOnce(new Error("RSS unavailable"))
	);

	const rssSourceList = [
		{
			href: "https://example.com/rss",
			hostname: "example.com",
		},
		{
			href: "https://other.com/rss",
			hostname: "other.com",
		},
	];
	const result = await loadNewsFromRssSourceList({
		rssSourceList,
		loadNewsFromSourceFn,
	});

	expect(result)
	.toHaveLength(1);

	expect(result[0]!.source)
	.toBe("example.com");
});

/* TODO:
need to mock createError
*/
// it("throws 502 when all sources fail", async () => {
// 	const loadNewsFromSourceFn = (
// 		vi
// 		.fn()
// 		.mockRejectedValue(new Error("RSS unavailable"))
// 	);

// 	const rssSourceList = [
// 		{
// 			href: "https://example.com/rss",
// 			hostname: "example.com",
// 		},
// 	];
// 	await expect(loadNewsFromSources({
// 		rssSourceList,
// 		loadNewsFromSourceFn,
// 	})).rejects.toMatchObject({
// 		statusCode: 502,
// 	});
// });
