// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	runtimeConfig: {
		public: {
			contentfulSpaceId: process.env.CONTENTFUL_SPACE_ID,
			contentfulAccessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
		},
	},
});
