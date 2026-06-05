# AMATO — Next.js + Shopify Storefront Scaffold

**Date:** 2026-06-02

## Goal

Initialize a greenfield headless e-commerce project for the premium jewelry brand "AMATO" with a robust Shopify Storefront API data layer.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- `lucide-react` (minimalist icons)

## Structure

```
amato/
├── .env.local.example
├── src/
│   ├── app/
│   └── lib/shopify/index.ts
└── (standard Next.js config files)
```

## Components

### `.env.local.example`
Exact variables required for Shopify Storefront access:
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`

### `src/lib/shopify/index.ts`
A single generic `shopifyFetch<T>()` function (Approach A — raw `fetch` + Next.js cache tags).

- Reads env vars; throws clear `ShopifyConfigError` at call time if missing.
- POSTs to `https://{domain}/api/{API_VERSION}/graphql.json` with header `X-Shopify-Storefront-Access-Token`.
- Pinned Storefront API version: `2025-01`.
- Options: `{ query, variables, tags, cache, revalidate, headers }`.
- Default caching: `cache: "force-cache"` with `next: { tags, revalidate }` for on-demand `revalidateTag()` invalidation.
- Error handling distinguishes:
  1. Network/transport errors
  2. Non-2xx HTTP responses
  3. GraphQL `errors[]` in the body
  Each throws a typed `ShopifyError` carrying status + query context.

## Out of Scope (YAGNI)

- No product/cart query helpers yet
- No GraphQL codegen / generated types
- No UI components beyond default scaffold
