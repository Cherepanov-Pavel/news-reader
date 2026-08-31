import {
	z,
} from "zod";

export function validateEnv() {
	const schema = z.object({
		NUXT_PAGE_SIZE: (
			z
				.coerce
				.number()
				.int()
				.positive()
		),
		NUXT_PUBLIC_RSS_SOURCE_LIST: (
			z
				.string()
				.transform((val) => {
					return JSON.parse(val);
				})
				.pipe(
					z.array(z.object({
						href: z.url(),
					})).min(1),
				)
		),
	});
	const result = schema.safeParse(process.env);

	if (!result.success) {
		const errors = result.error.issues
			.map((i) => {
				return `  • ${i.path.join(".")}: ${i.message}`;
			})
			.join("\n");

		throw new Error(`Invalid environment variables:\n${errors}`);
	}
}
