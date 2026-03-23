import type { ContentfulClientApi } from "contentful";
import createContentfulClient from ".";

export default defineEventHandler(async (event) => {
	const { entryType, locale, limit } = getQuery(event);

	const contentfulClient = await createContentfulClient(event);

	// TODO: This check is repeated across multiple handlers. Consider refactoring to a common utility function.
	if (!contentfulClient || (contentfulClient as any).error) {
		console.error(
			"Failed to create Contentful client:",
			(contentfulClient as any).error,
		);
		setResponseStatus(event, 500);
		return { error: "Failed to create Contentful client" };
	}

	const parsedLimit = Number(limit);
	const safeLimit = Number.isFinite(parsedLimit)
		? Math.min(Math.max(Math.floor(parsedLimit), 1), 100)
		: 20;

	const entriesQuery: Record<string, any> = {
		locale: typeof locale === "string" && locale.length > 0 ? locale : "en-US",
		limit: safeLimit,
		include: 1,
	};

	if (typeof entryType === "string" && entryType.length > 0) {
		entriesQuery.content_type = entryType;
	}

	const data = await (contentfulClient as ContentfulClientApi<any>)
		.getEntries(entriesQuery as any)
		.catch((error) => {
			console.error("Error fetching entries by type:", error);
			setResponseStatus(event, 500);
			return null;
		});

	return data;
});
