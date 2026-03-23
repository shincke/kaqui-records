# API Contracts (Nuxt BFF)

All frontend data should come from Nuxt server routes, not direct browser calls to Contentful/Shopify.

## 1) GET `/api/content/layout`

Returns navigation, footer, and site settings in one request.

```json
{
	"site": { "siteName": "Kaqui Records", "logoUrl": "..." },
	"nav": { "topBannerText": "...", "menuItems": [] },
	"footer": { "columns": [], "legalLinks": [] }
}
```

## 2) GET `/api/content/home`

Returns homepage editorial content from Contentful.

```json
{
	"hero": { "title": "...", "subtitle": "...", "bannerUrl": "..." },
	"featuredCollections": [],
	"featuredProducts": [],
	"duplexSection": "..."
}
```

## 3) GET `/api/shop/products?handles=a,b,c`

Returns normalized product cards from Shopify.

```json
{
	"items": [
		{
			"handle": "blue-note-45",
			"title": "Blue Note Classic",
			"price": { "amount": "39.90", "currencyCode": "EUR" },
			"inStock": true,
			"imageUrl": "..."
		}
	]
}
```

## 4) Cart Endpoints

- `POST /api/shop/cart/create`
- `POST /api/shop/cart/add`
- `POST /api/shop/cart/update`
- `POST /api/shop/cart/remove`
- `GET /api/shop/cart/:id`

## 5) Checkout Endpoint

- `POST /api/shop/checkout`
- Returns Shopify checkout URL for redirect.

## Caching Guidelines

- Content endpoints: `maxAge 60-300s`, `swr: true`
- Product list endpoints: `maxAge 15-60s`, `swr: true`
- Cart/checkout endpoints: no cache
