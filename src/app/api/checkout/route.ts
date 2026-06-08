import { NextResponse } from "next/server";
import { isShopifyLive } from "@/lib/catalog";
import { createCart } from "@/lib/shopify/operations";

interface CheckoutLine {
  variantId?: string;
  quantity: number;
}

/**
 * Create a Shopify cart from the client's line items and return its hosted
 * checkoutUrl. Payment happens on Shopify's PCI-compliant checkout — we never
 * handle card data here.
 */
export async function POST(request: Request) {
  if (!isShopifyLive()) {
    return NextResponse.json(
      { error: "התשלום אינו זמין כרגע." },
      { status: 503 },
    );
  }

  let body: { lines?: CheckoutLine[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  const lines = (body.lines ?? [])
    .filter((l) => l.variantId && l.quantity > 0)
    .map((l) => ({ merchandiseId: l.variantId as string, quantity: l.quantity }));

  if (lines.length === 0) {
    return NextResponse.json(
      { error: "אין פריטים זמינים לרכישה בסל." },
      { status: 400 },
    );
  }

  try {
    const cart = await createCart(lines);
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
