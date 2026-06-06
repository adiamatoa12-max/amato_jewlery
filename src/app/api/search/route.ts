import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/catalog";

/** Live product search (falls back to the bundled catalog when not configured). */
export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q") ?? "";
  const products = await searchProducts(q);
  return NextResponse.json({
    results: products.map((p) => ({
      handle: p.handle,
      title: p.title,
      price: p.price,
      currency: p.currency,
      image: p.image,
    })),
  });
}
