import { defineXmlToJsonHandler } from '~~/server/utils/xml';

export default defineXmlToJsonHandler(
  async () => {
    return $fetch<string>('https://www.mos.ru/rss', {
      responseType: 'text',
    });
  },
  (data: any) => {
    return data.rss.channel.item;
  },
);
