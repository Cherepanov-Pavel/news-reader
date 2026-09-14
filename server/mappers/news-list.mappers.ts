/**
 * Data mappers for news list domain.
 */

import type {
	RssResponse,
} from "~~/server/types/news-list.types";
import type {
	NewsList,
} from "~~/shared/types/api/news";

export function mapRssResponseToNewsList({
	response, source,
}: {
	response: RssResponse;
	source: string;
}): NewsList {
	return response.rss.channel.item.map(({
		title = "",
		description = "",
		link,
		pubDate,
		enclosure,
	}) => {
		return {
			title,
			description,
			link,
			pubDate,
			enclosure: {
				url: enclosure?.[0]?.url,
			},
			source,
		};
	});
}
