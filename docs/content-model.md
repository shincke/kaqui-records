# Contentful Content Model (MVP)

## Locale Strategy

- Default locale: `en-US`
- Secondary locale: `pt-BR`
- Localize all customer-facing text fields.

## Content Types

### 1) `siteSettings` (singleton)

- `siteName` (Short text, localized)
- `logo` (Asset)
- `defaultLocale` (Short text)
- `socialLinks` (Array of `linkItem` references)

### 2) `navigation` (singleton)

- `topBannerText` (Short text, localized, optional)
- `menuItems` (Array of `navItem` references)
- `ctaLabel` (Short text, localized, optional)
- `ctaHref` (Short text, optional)

### 3) `footer` (singleton)

- `columns` (Array of `footerColumn` references)
- `copyrightText` (Short text, localized)
- `legalLinks` (Array of `linkItem` references)

### 4) `homepage` (singleton)

- `heroTitle` (Short text, localized)
- `heroSubtitle` (Long text, localized)
- `heroBanner` (Asset)
- `featuredCollections` (Array of `collectionSpotlight` references)
- `featuredProducts` (Array of `productSpotlight` references)
- `duplexSection` (Rich Text, localized)

### 5) `navItem`

- `label` (Short text, localized)
- `href` (Short text)
- `kind` (Short text: `internal` or `external`)

### 6) `footerColumn`

- `title` (Short text, localized)
- `links` (Array of `linkItem` references)

### 7) `linkItem`

- `label` (Short text, localized)
- `href` (Short text)

### 8) `collectionSpotlight`

- `title` (Short text, localized)
- `description` (Long text, localized)
- `image` (Asset)
- `shopifyCollectionHandle` (Short text)

### 9) `productSpotlight`

- `eyebrow` (Short text, localized, optional)
- `shopifyProductHandle` (Short text)
- `overrideTitle` (Short text, localized, optional)

## Modeling Rules

- Keep home/nav/footer as singleton entries to simplify fetch.
- Store Shopify handles in Contentful references for composition.
- Avoid duplicating price/stock/content that Shopify already owns.
