/**
 * Analytics IDs. Paste your IDs here directly, OR set the matching
 * NEXT_PUBLIC_* env vars in Vercel — either works. Leave blank to disable
 * (no scripts load, no errors).
 *
 *   GTM_ID       — Google Tag Manager container, e.g. "GTM-XXXXXXX"
 *   FB_PIXEL_ID  — Meta (Facebook) Pixel id, e.g. "123456789012345"
 */
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID ?? "1557516699348001";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

/** Fire a conversion/interaction event to both Meta Pixel and GTM dataLayer. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", event, params);
    window.dataLayer?.push({ event, ...params });
  } catch {
    /* analytics must never break the UI */
  }
}

export const trackAddToCart = (params: Record<string, unknown> = {}) =>
  track("AddToCart", params);

export const trackInitiateCheckout = (params: Record<string, unknown> = {}) =>
  track("InitiateCheckout", params);
