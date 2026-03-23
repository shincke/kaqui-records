<template>
	<div>
		<h1>Kaqui Records</h1>
		<p v-if="pending">Loading entries...</p>
		<p v-else-if="error">Failed to fetch entries.</p>
		<template v-else>
			<p>Fetched entries: {{ entryCount }}</p>
			<p v-if="!homepageEntry">No homepage entry found.</p>
			<template v-else>
				<p><strong>Entry ID:</strong> {{ homepageEntry.sys.id }}</p>
				<p>
					<strong>Content type:</strong>
					{{ homepageEntry.sys.contentType?.sys?.id }}
				</p>

				<img
					v-if="heroBannerUrl"
					:src="heroBannerUrl"
					alt="Homepage hero banner"
					style="max-width: 360px; display: block; margin: 12px 0"
				/>

				<p v-if="duplexSectionText">
					<strong>Duplex section:</strong> {{ duplexSectionText }}
				</p>
			</template>
		</template>
	</div>
</template>

<script setup lang="ts">
type LinkRef = {
	sys?: {
		id?: string;
	};
};

type ContentfulEntry = {
	sys: {
		id: string;
		contentType?: {
			sys?: {
				id?: string;
			};
		};
	};
	fields?: {
		heroBanner?: LinkRef;
		duplexSection?: RichTextNode;
	};
};

type ContentfulAsset = {
	sys: {
		id: string;
	};
	fields?: {
		file?: {
			url?: string;
		};
	};
};

type RichTextNode = {
	value?: string;
	content?: RichTextNode[];
};

type EntriesResponse = {
	items?: ContentfulEntry[];
	includes?: {
		Asset?: ContentfulAsset[];
	};
};

const { data, pending, error } = await useFetch<EntriesResponse>(
	"/api/contentful/entries",
	{
		query: {
			locale: "en-US",
			limit: 20,
		},
	},
);

const entries = computed(() => {
	const items = data.value?.items;
	return Array.isArray(items) ? items : [];
});

const homepageEntry = computed(() => {
	return entries.value.find(
		(entry) => entry.sys.contentType?.sys.id === "homepage",
	);
});

const assetsById = computed(() => {
	const assets = data.value?.includes?.Asset;
	const map = new Map<string, ContentfulAsset>();

	if (!Array.isArray(assets)) {
		return map;
	}

	for (const asset of assets) {
		map.set(asset.sys.id, asset);
	}

	return map;
});

const heroBannerUrl = computed(() => {
	const assetId = homepageEntry.value?.fields?.heroBanner?.sys?.id;
	if (!assetId) {
		return "";
	}

	const asset = assetsById.value.get(assetId);
	const url = asset?.fields?.file?.url;
	if (!url) {
		return "";
	}

	return url.startsWith("//") ? `https:${url}` : url;
});

const extractRichTextText = (node?: RichTextNode): string => {
	if (!node) {
		return "";
	}

	const selfText = typeof node.value === "string" ? node.value : "";
	const children = Array.isArray(node.content) ? node.content : [];
	const childText = children.map(extractRichTextText).filter(Boolean).join(" ");

	return [selfText, childText].filter(Boolean).join(" ").trim();
};

const duplexSectionText = computed(() => {
	return extractRichTextText(homepageEntry.value?.fields?.duplexSection);
});

const entryCount = computed(() => {
	return entries.value.length;
});
</script>
