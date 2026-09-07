import type {
	rssResponseSchema,
} from "~~/server/schemas/news-list.schemas";
import type {
	z,
} from "zod";

export type RssResponse = z.infer<typeof rssResponseSchema>;
