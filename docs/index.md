---
layout: default
title: Kaqui Records Docs
---

# Kaqui Records Docs

This documentation describes the architecture and delivery plan for Kaqui Records, a Nuxt + Contentful + Shopify record shop.

## Sections

- [Architecture Overview](architecture.md)
- [Contentful Content Model (MVP)](content-model.md)
- [API Contracts (Nuxt BFF)](api-contracts.md)
- [Roadmap](roadmap.md)
- [GitHub Pages Setup](github-pages.md)

## Stack

- **Frontend + BFF:** Nuxt 4 + Nitro (Node runtime)
- **CMS:** Contentful
- **Commerce:** Shopify

## Core Principle

- **Contentful owns editorial content** (homepage, navigation, footer, copy).
- **Shopify owns commerce truth** (catalog, price, stock, checkout, shipping, payment).
- **Nuxt server routes** compose both systems and expose stable, frontend-friendly APIs.
