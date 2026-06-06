"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import { useRef, useState } from "react";
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
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const slides = [
    { src: product.image, alt: product.title, hidden: false },
    { src: product.hoverImage, alt: "", hidden: true },
  ];

  function scrollToSlide(i: number) {
    const track = trackRef.current;
    if (!track) return;
    // scrollIntoView handles RTL/LTR coordinate differences automatically.
    const slide = track.children[i] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    // Math.abs keeps this correct in RTL, where scrollLeft is negative.
    const i = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
    if (i !== active) setActive(i);
  }

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
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#fafaf9] transition-all duration-500 ease-in-out group-hover:-translate-y-1 group-hover:shadow-[0_22px_45px_-18px_rgba(0,0,0,0.18)]"
        onMouseEnter={() => scrollToSlide(1)}
        onMouseLeave={() => scrollToSlide(0)}
      >
        {/* Swipeable image track — native scroll-snap (swipe on touch, hover-scroll on desktop) */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, i) => (
            <Link
              key={i}
              href={`/product/${product.handle}`}
              aria-label={i === 0 ? product.title : undefined}
              aria-hidden={i === 0 ? undefined : true}
              tabIndex={i === 0 ? undefined : -1}
              className="relative h-full w-full shrink-0 snap-center"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                aria-hidden={slide.hidden}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-contain p-7 mix-blend-multiply transition-transform duration-[800ms] ease-in-out group-hover:scale-[1.06]"
              />
            </Link>
          ))}
        </div>

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

        {/* Dot indicators — mobile only (desktop reveals via hover) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex justify-center gap-1.5 md:hidden">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                scrollToSlide(i);
              }}
              aria-label={`תמונה ${i + 1} מתוך ${slides.length}`}
              aria-current={active === i}
              className={`pointer-events-auto h-1.5 rounded-full transition-all duration-300 ease-in-out ${
                active === i ? "w-4 bg-neutral-800" : "w-1.5 bg-neutral-300"
              }`}
            />
          ))}
        </div>

        {/* Thin Quick View button — appears on hover (desktop) */}
        <div className="absolute inset-x-0 bottom-0 z-20 hidden justify-center p-3 opacity-0 transition-all duration-500 ease-in-out translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
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
