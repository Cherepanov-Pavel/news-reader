interface Enclosure {
	url: string;
	type: string;
}

export interface RSSItem {
	title?: string;
	description?: string;
	link: string;
	pubDate: string;
	enclosure: Enclosure | Enclosure[];
}
