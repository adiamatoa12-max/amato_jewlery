// Unified catalog data layer.
//
// When real Shopify Storefront API credentials are present, this pulls live
// products, collections, and inventory from Shopify and adapts them into the
// view-model shape the UI already uses (MockProduct / MockCollection). When
// credentials are missing or still the placeholder, it falls back to the
// bundled mock data so local dev and previews keep working unchanged.
//
// SERVER-ONLY: imports process.env secrets and the Shopify client. Import this
// from Server Components or Route Handlers only — never from a "use client"
// module (the header search reaches it via /api/search instead).

import {
  COLLECTIONS,
  getAllMockHandles,
  getMockProductByHandle,
  type MockCollection,
  type MockProduct,
  type MockProductWithCollection,
} from "./mock-data";
import {
  getCollections as getShopifyCollections,
  getCollectionProducts,
  getProductByHandle,
  getProducts,
} from "./shopify/operations";
import type { Product as ShopifyProduct } from "./shopify/types";

const DEFAULT_MATERIAL = "כסף סטרלינג 925 איכותי בציפוי זהב 14 קראט";

/**
 * Log a Shopify failure and signal that we're serving the bundled catalog
 * instead, so a Shopify outage / unavailable store never takes the site down.
 */
function warnFallback(op: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(
    `[catalog] Shopify "${op}" failed — serving bundled catalog. ${message}`,
  );
}

/** True only when real (non-placeholder) Shopify credentials are configured. */
export function isShopifyLive(): boolean {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  return Boolean(
    domain && token && token !== "placeholder_token_for_now",
  );
}

function badgeFromTags(tags: string[]): MockProduct["badge"] {
  const lower = tags.map((t) => t.toLowerCase());
  if (lower.includes("bestseller") || tags.includes("רב מכר")) {
    return "bestseller";
  }
  if (lower.includes("new") || tags.includes("חדש")) return "new";
  return undefined;
}

/** Map a live Shopify product onto the UI view-model. */
function adapt(p: ShopifyProduct): MockProduct {
  const images = p.images.map((i) => i.url);
  const image = p.featuredImage?.url ?? images[0] ?? "";
  const hoverImage = images.find((u) => u !== image) ?? image;
  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    price: Number(p.priceRange.minVariantPrice.amount),
    currency: p.priceRange.minVariantPrice.currencyCode,
    material: DEFAULT_MATERIAL,
    availableForSale: p.availableForSale,
    image,
    hoverImage,
    badge: badgeFromTags(p.tags),
    gallery: images.length > 0 ? images : undefined,
    styledImage: images[1],
    variantId: p.variants[0]?.id,
  };
}

/**
 * Auto-discover the store's actual collections and their products. Headings and
 * taglines come straight from Shopify (collection title/description). Empty
 * collections are skipped so the homepage never shows a barren section.
 */
export async function getCollections(): Promise<MockCollection[]> {
  if (!isShopifyLive()) return COLLECTIONS;

  try {
    const collections = await getShopifyCollections(20);
    const withProducts = await Promise.all(
      collections.map(async (c) => {
        const products = await getCollectionProducts(c.handle, 12);
        return {
          handle: c.handle,
          title: c.title,
          enTitle: c.title,
          tagline: c.description ?? "",
          products: products.map(adapt),
        } satisfies MockCollection;
      }),
    );
    return withProducts.filter((c) => c.products.length > 0);
  } catch (error) {
    warnFallback("getCollections", error);
    return COLLECTIONS;
  }
}

export async function getProduct(
  handle: string,
): Promise<MockProductWithCollection | null> {
  if (!isShopifyLive()) return getMockProductByHandle(handle);

  try {
    const p = await getProductByHandle(handle);
    if (!p) return null;
    // Breadcrumb collection context isn't fetched per-product yet; link home.
    return { ...adapt(p), collectionTitle: "AMATO", collectionHandle: "" };
  } catch (error) {
    warnFallback("getProduct", error);
    return getMockProductByHandle(handle);
  }
}

export async function getAllHandles(): Promise<string[]> {
  if (!isShopifyLive()) return getAllMockHandles();
  try {
    const products = await getProducts({ first: 100 });
    return products.map((p) => p.handle);
  } catch (error) {
    warnFallback("getAllHandles", error);
    return getAllMockHandles();
  }
}

function searchMock(query: string): MockProduct[] {
  const needle = query.toLowerCase();
  return COLLECTIONS.flatMap((c) => c.products)
    .filter((p) => p.title.toLowerCase().includes(needle))
    .slice(0, 6);
}

export async function searchProducts(query: string): Promise<MockProduct[]> {
  const q = query.trim();
  if (!q) return [];

  if (!isShopifyLive()) return searchMock(q);

  try {
    const products = await getProducts({ first: 6, query: q });
    return products.map(adapt);
  } catch (error) {
    warnFallback("searchProducts", error);
    return searchMock(q);
  }
}
