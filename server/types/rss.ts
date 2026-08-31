export interface RssAnswer {
	rss: {
		channel: {
			item: RSSItem[];
		};
	};
}
interface RSSItem {
	title?: string;
	description?: string;
	link: string;
	pubDate: string;
	enclosure: Enclosure | Enclosure[];
}
interface Enclosure {
	url: string;
	type: string;
}
