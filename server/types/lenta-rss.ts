export interface LentaRSSItem {
	title?: string;
	description?: string;
	link: string;
	pubDate: string;
	enclosure: {
		url: string;
		type: string;
		length: string;
	};
	guid: string;
	author: string;
	category: string;
}
