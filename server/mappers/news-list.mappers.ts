import type {
	RssResponse,
} from "~~/server/types/news-list.types";
import type {
	NewsList,
} from "~~/shared/types/api/news";

export function rssResponseToNewsListMapper({
	response, source,
}: {
	response: RssResponse;
	source: string;
}): NewsList {
	const items = response.rss.channel.item;

	return items.map((item) => {
		return {
			title: item.title ?? "",
			description: item.description ?? "",
			link: item.link,
			pubDate: item.pubDate,
			enclosure: {
				url: item.enclosure[0]?.url,
			},
			source,
		};
	});
}
