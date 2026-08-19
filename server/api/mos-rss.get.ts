import type { MosRSSItem } from '~~/server/types/mos-rss';
import { defineXmlToJsonHandler } from '~~/server/utils/xml';

export default defineXmlToJsonHandler<
	MosRSSItem[]
>(
	async () => {
		return $fetch<string>('https://mos.ru/rss', {
			responseType: 'text',
		});
	},
	(data) => {
		return data.rss.channel.item;
	},
);
