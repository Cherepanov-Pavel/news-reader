export enum NewsListItemSource {
	lenta = 'lenta.ru',
	mos = 'mos.ru',
}

export interface NewsListItem {
	title: string;
	description: string;
	link: string;
	pubDate: string;
	enclosure: {
		url?: string;
	};
	source: NewsListItemSource;
}
