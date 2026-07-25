/**
 * Founder's Edition launch pricing — the single source of truth for both the
 * on-page price display and the Product JSON-LD schema, so structured data
 * never drifts from what's actually shown/sold on the page.
 */
export const FOUNDER_PRICE = 189;
export const FOUNDER_COMPARE_AT = 229;
/** Flat price for the 2-pack bundle. The discount % shown to users is derived
 *  from this vs. 2 × FOUNDER_PRICE, so promo copy never drifts from the price. */
export const BUNDLE_PRICE = 239;

/**
 * Shopify discount code auto-applied at checkout for the 2-pack, so the cart
 * created from 2 shaker units nets to BUNDLE_PRICE instead of 2 × FOUNDER_PRICE.
 * A matching code must exist in Shopify (fixed 139 ₪ off, or 37% off the 2 units).
 * Override per-store via NEXT_PUBLIC_BUNDLE_DISCOUNT_CODE without a code change.
 */
export const BUNDLE_DISCOUNT_CODE =
  process.env.NEXT_PUBLIC_BUNDLE_DISCOUNT_CODE || "VAULT2PACK";
