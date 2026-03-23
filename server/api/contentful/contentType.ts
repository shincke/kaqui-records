import { defineEventHandler, readBody, setResponseStatus } from "h3";

import type { ContentfulClientApi } from "contentful";
import createContentfulClient from ".";

export default defineEventHandler(async (event) => {
	const { contentTypeId } = await readBody<{
		contentTypeId: string;
	}>(event);
	if (!contentTypeId) {
		setResponseStatus(event, 400);
		return { error: 'Missing "contentTypeId" field' };
	}

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

	const data = await (contentfulClient as ContentfulClientApi<any>)
		.getContentType(contentTypeId)
		.catch((error) => {
			console.error("Error fetching content type:", error);
			return null;
		});

	return data;
});
