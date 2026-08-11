import { XMLParser } from 'fast-xml-parser';

export const defineXmlToJsonHandler = <
  T extends EventHandlerRequest,
> (
  handler: EventHandler<T, Promise<string>>,
  transform?: (data: Record<string, unknown>) => Record<string, unknown>,
) => {
  return defineEventHandler<T>(async (event) => {
    const response = await handler(event);
    const parsed = new XMLParser().parse(response);
    return transform ? transform(parsed) : parsed;
  });
};
