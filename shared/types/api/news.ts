export interface NewsListItem {
	title: string;
	description: string;
	link: string;
	pubDate: string;
	enclosure: {
		url?: string;
	};
	source: string;
}
