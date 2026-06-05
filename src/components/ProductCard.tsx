"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import type { MockProduct } from "@/lib/mock-data";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

const BADGES: Record<NonNullable<MockProduct["badge"]>, string> = {
  new: "חדש",
  bestseller: "רב מכר",
};

export default function ProductCard({ product }: { product: MockProduct }) {
  const soldOut = !product.availableForSale;
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (soldOut) return;
    addItem({
      handle: product.handle,
      title: product.title,
      price: product.price,
      currency: product.currency,
      image: product.image,
      material: product.material,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#fafaf9] transition-all duration-500 ease-in-out group-hover:-translate-y-1 group-hover:shadow-[0_22px_45px_-18px_rgba(0,0,0,0.18)]">
        <Link href={`/product/${product.handle}`} className="absolute inset-0 z-10">
          <span className="sr-only">{product.title}</span>
        </Link>

        {/* Base image */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-contain p-7 transition-all duration-700 ease-in-out group-hover:scale-[1.02] group-hover:opacity-0"
        />
        {/* Lifestyle hover image */}
        <Image
          src={product.hoverImage}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-contain p-7 opacity-0 transition-all duration-700 ease-in-out group-hover:scale-[1.02] group-hover:opacity-100"
        />

        {/* Merchandising badge — top-left, subtle, fades in on hover */}
        {product.badge && !soldOut && (
          <span className="absolute end-3 top-3 z-20 rounded-full bg-white/85 px-2 py-0.5 text-[9px] font-medium tracking-[0.14em] text-neutral-700 opacity-0 backdrop-blur transition-opacity duration-500 ease-in-out group-hover:opacity-100">
            {BADGES[product.badge]}
          </span>
        )}

        {soldOut && (
          <span className="absolute end-3 top-3 z-20 rounded-full bg-white/80 px-2.5 py-0.5 text-[9px] font-medium tracking-[0.12em] text-neutral-700 backdrop-blur">
            אזל מהמלאי
          </span>
        )}

        {/* Quick Add — opposite top corner, small, fades in on hover */}
        {!soldOut && (
          <button
            type="button"
            onClick={quickAdd}
            aria-label={`הוספה מהירה — ${product.title}`}
            className="absolute start-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/85 text-neutral-700 opacity-0 backdrop-blur transition-all duration-500 ease-in-out hover:bg-neutral-900 hover:text-white group-hover:opacity-100"
          >
            {added ? (
              <Check className="h-3.5 w-3.5" strokeWidth={1.75} />
            ) : (
              <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
            )}
          </button>
        )}

        {/* Thin Quick View button — appears on hover */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center p-3 opacity-0 transition-all duration-500 ease-in-out translate-y-2 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href={`/product/${product.handle}`}
            className="rounded-full border border-neutral-900/70 bg-white/80 px-6 py-2 text-[11px] font-medium tracking-[0.12em] text-neutral-900 backdrop-blur transition-all duration-300 ease-in-out hover:bg-neutral-900 hover:text-white"
          >
            צפייה מהירה
          </Link>
        </div>
      </div>

      {/* Title + price — centered below the image, clean and minimal */}
      <div className="mt-6 flex flex-col items-center gap-2 text-center">
        <h3 className="text-base font-semibold tracking-[0.02em] text-neutral-900">
          {product.title}
        </h3>
        <p className="text-sm font-medium tabular-nums text-neutral-700">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </article>
  );
}
