"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import type { MockProduct } from "@/lib/mock-data";
import MediaPlaceholder, {
  isMissingLocalMedia,
} from "@/components/MediaPlaceholder";

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
      variantId: product.variantId,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#fafaf9]">
        {/* 100% static — the single primary image, nothing else */}
        <Link
          href={`/product/${product.handle}`}
          aria-label={product.title}
          className="block h-full w-full"
        >
          {isMissingLocalMedia(product.image) ? (
            <MediaPlaceholder className="absolute inset-0 h-full w-full" />
          ) : (
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-contain p-7 mix-blend-multiply"
            />
          )}
        </Link>

        {/* Merchandising badge — always visible (no hover) */}
        {product.badge && !soldOut && (
          <span className="absolute end-3 top-3 z-20 rounded-full bg-white/85 px-2 py-0.5 text-[9px] font-medium tracking-[0.14em] text-neutral-700 backdrop-blur">
            {BADGES[product.badge]}
          </span>
        )}

        {soldOut && (
          <span className="absolute end-3 top-3 z-20 rounded-full bg-white/80 px-2.5 py-0.5 text-[9px] font-medium tracking-[0.12em] text-neutral-700 backdrop-blur">
            אזל מהמלאי
          </span>
        )}

        {/* Add to cart — always visible (no hover) */}
        {!soldOut && (
          <button
            type="button"
            onClick={quickAdd}
            aria-label={`הוספה מהירה — ${product.title}`}
            className="absolute start-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-neutral-700 backdrop-blur hover:bg-neutral-900 hover:text-zinc-100"
          >
            {added ? (
              <Check className="h-3.5 w-3.5" strokeWidth={1.75} />
            ) : (
              <Plus className="h-3.5 w-3.5" strokeWidth={1.75} />
            )}
          </button>
        )}
      </div>

      {/* Title + price */}
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
