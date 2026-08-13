import { XMLParser } from 'fast-xml-parser';

export const defineXmlToJsonHandler = <
  R = Record<string, unknown>,
>(
  handler: EventHandler<EventHandlerRequest, Promise<string>>,
  transform?: (data: any) => R,
) => {
  return defineEventHandler(async (event): Promise<R> => {
    const response = await handler(event);
    const parsed = new XMLParser({ attributeNamePrefix: '', ignoreAttributes: false }).parse(response);
    if (!transform) {
      return parsed as R;
    }

    return transform(parsed);
  });
};
