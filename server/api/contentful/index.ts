import { defineEventHandler } from "h3";
import { createClient } from "contentful";

export default defineEventHandler(async (event: Event) => {
	// const environmentData = getEnvironmentFromContext(event);

	// if (!environmentData) {
	// 	console.error("Failed to fetch environment data.");
	// 	return;
	// }

	const spaceId = process.env.CONTENTFUL_SPACE_ID;
	const environment = "master";
	// const environment = environmentData.environment;
	const cdaKey = process.env.CONTENTFUL_ACCESS_TOKEN;

	if (!spaceId || typeof spaceId !== "string") {
		throw new Error("Space ID is not defined");
	}

	// if (!environment || typeof environment !== "string") {
	// 	throw new Error("Environment is not defined");
	// }

	if (!cdaKey || typeof cdaKey !== "string") {
		throw new Error("CDA Key is not defined");
	}

	const contentfulClient = createClient({
		accessToken: cdaKey,
		space: spaceId,
		// host: "cdn.eu.contentful.com",
		environment: environment,
	});

	return contentfulClient;
});
