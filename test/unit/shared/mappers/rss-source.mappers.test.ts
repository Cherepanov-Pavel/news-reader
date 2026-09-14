import {
	describe,
	expect,
	it,
} from "vitest";
import {
	mapEnvRssSourceToRssSource,
} from "~~/shared/mappers/rss-source.mappers";

describe("mapEnvRssSourceToRssSource", () => {
	it("adds hostname to RSS source", () => {
		const result = mapEnvRssSourceToRssSource({
			href: "https://example.com/rss.xml",
		});

		expect(result)
		.toEqual({
			href: "https://example.com/rss.xml",
			hostname: "example.com",
		});
	});

	it("extracts hostname from URL with subdomain and port", () => {
		const result = mapEnvRssSourceToRssSource({
			href: "https://news.example.com:8443/feed",
		});

		expect(result)
		.toEqual({
			href: "https://news.example.com:8443/feed",
			hostname: "news.example.com",
		});
	});

	it("throws for invalid URL", () => {
		expect(() => {
			mapEnvRssSourceToRssSource({
				href: "invalid-url",
			});
		})
		.toThrow();
	});
});
