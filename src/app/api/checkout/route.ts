import { NextResponse } from "next/server";
import { isShopifyLive } from "@/lib/catalog";
import { createCart } from "@/lib/shopify/operations";
import { checkRateLimit } from "@/lib/rate-limit";

interface CheckoutLine {
  variantId?: string;
  quantity: number;
  /** Custom line properties (e.g. chosen colour), shown on the Shopify order. */
  attributes?: { key: string; value: string }[];
}

/**
 * Create a Shopify cart from the client's line items and return its hosted
 * checkoutUrl. Payment happens on Shopify's PCI-compliant checkout — we never
 * handle card data here.
 */
export async function POST(request: Request) {
  // Basic abuse protection: 10 cart-creation attempts per IP per minute.
  const { allowed } = await checkRateLimit(request, "checkout", 10, 60);
  if (!allowed) {
    return NextResponse.json(
      { error: "יותר מדי בקשות. נסו שוב בעוד דקה." },
      { status: 429 },
    );
  }

  if (!isShopifyLive()) {
    return NextResponse.json(
      { error: "התשלום אינו זמין כרגע." },
      { status: 503 },
    );
  }

  let body: { lines?: CheckoutLine[]; discountCodes?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  const lines = (body.lines ?? [])
    .filter((l) => l.variantId && l.quantity > 0)
    .map((l) => {
      // Keep only well-formed {key, value} string pairs.
      const attributes = Array.isArray(l.attributes)
        ? l.attributes.filter(
            (a) =>
              a &&
              typeof a.key === "string" &&
              a.key.trim().length > 0 &&
              typeof a.value === "string" &&
              a.value.trim().length > 0,
          )
        : [];
      return {
        merchandiseId: l.variantId as string,
        quantity: l.quantity,
        ...(attributes.length ? { attributes } : {}),
      };
    });

  if (lines.length === 0) {
    return NextResponse.json(
      { error: "אין פריטים זמינים לרכישה בסל." },
      { status: 400 },
    );
  }

  // Bundle/promo discount codes applied to the Shopify cart (e.g. the 2-pack
  // code). Sanitised to non-empty strings; Shopify ignores any that don't match.
  const discountCodes = Array.isArray(body.discountCodes)
    ? body.discountCodes.filter(
        (c): c is string => typeof c === "string" && c.trim().length > 0,
      )
    : [];

  try {
    const cart = await createCart(lines, discountCodes);
    return NextResponse.json({ url: cart.checkoutUrl });
  } catch (error) {
    // Log the real (English) Shopify error server-side; show Hebrew to the user.
    console.error("[checkout]", error);
    return NextResponse.json(
      { error: "אירעה שגיאה במעבר לתשלום. נסו שוב מאוחר יותר." },
      { status: 502 },
    );
  }
}
