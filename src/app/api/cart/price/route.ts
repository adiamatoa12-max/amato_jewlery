import { NextResponse } from "next/server";
import { isShopifyLive } from "@/lib/catalog";
import { createCart } from "@/lib/shopify/operations";

interface PriceLine {
  variantId?: string;
  quantity: number;
}

/**
 * Build a Shopify cart from the client's line items and return its live cost
 * AFTER automatic discounts — so the drawer shows the true discounted subtotal
 * instead of a naive price × quantity. Also returns per-line list vs. final
 * totals (keyed by product handle) for strike-through display, and the
 * checkoutUrl so the same priced cart is reused at checkout.
 */
export async function POST(request: Request) {
  if (!isShopifyLive()) {
    return NextResponse.json({ priced: false });
  }

  let body: { lines?: PriceLine[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  const lines = (body.lines ?? [])
    .filter((l) => l.variantId && l.quantity > 0)
    .map((l) => ({ merchandiseId: l.variantId as string, quantity: l.quantity }));

  if (lines.length === 0) {
    return NextResponse.json({ priced: false });
  }

  try {
    const cart = await createCart(lines);
    const currency = cart.cost.subtotalAmount.currencyCode;

    // Per-line list (pre-discount) vs final (post-discount), keyed by handle.
    const lineCosts: Record<string, { list: number; final: number }> = {};
    for (const line of cart.lines) {
      const handle = line.merchandise.product.handle;
      lineCosts[handle] = {
        list: Number(line.cost.subtotalAmount.amount),
        final: Number(line.cost.totalAmount.amount),
      };
    }

    return NextResponse.json({
      priced: true,
      currency,
      subtotal: Number(cart.cost.subtotalAmount.amount),
      total: Number(cart.cost.totalAmount.amount),
      lineCosts,
      checkoutUrl: cart.checkoutUrl,
    });
  } catch (error) {
    console.error("[cart/price]", error);
    // Soft failure → client falls back to local math.
    return NextResponse.json({ priced: false });
  }
}
