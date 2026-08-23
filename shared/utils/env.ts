export function getRSSSourceList() {
	const RSSSourceList = useRuntimeConfig().public.RSSSourceList.map(({ href }) => {
		const { host } = new URL(href);
		return {
			href,
			host,
		};
	});
	return RSSSourceList as {
		href: string;
		host: string;
	}[];
}
