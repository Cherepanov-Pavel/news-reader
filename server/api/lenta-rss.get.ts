import type { LentaRSSItem } from '~~/server/types/lenta-rss';
import { defineXmlToJsonHandler } from '~~/server/utils/xml';

export default defineXmlToJsonHandler<
	LentaRSSItem[]
>(
	async () => {
		return $fetch<string>('https://lenta.ru/rss/news', {
			responseType: 'text',
		});
	},
	(data) => {
		return data.rss.channel.item;
	},
);
