"use client";

import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/cart/CartContext";
import MediaPlaceholder, {
  isMissingLocalMedia,
} from "@/components/MediaPlaceholder";

// Every field is pulled from the SAME Shopify product, so title/media/link can
// never drift apart. `video` is optional — used only if a product actually has
// video media; otherwise the product's own image is shown.
export interface VideoFeedItem {
  href: string;
  title: string;
  price: number;
  currency: string;
  image: string;
  video?: string;
}

function FeedCard({ item }: { item: VideoFeedItem }) {
  return (
    <Link
      href={item.href}
      className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-[#f8f8f8]"
    >
      {item.video && !isMissingLocalMedia(item.video) ? (
        <video
          aria-hidden
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={item.video} type="video/mp4" />
        </video>
      ) : isMissingLocalMedia(item.image) ? (
        <MediaPlaceholder className="absolute inset-0 h-full w-full" />
      ) : (
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
      )}

      {/* Semi-transparent gradient + product info overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent transition-opacity duration-500 group-hover:from-black/65" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 px-4 pb-5 text-center text-zinc-100">
        <span className="text-sm font-light tracking-[0.06em]">
          {item.title}
        </span>
        <span className="text-xs text-white/80 tabular-nums">
          {formatPrice(item.price, item.currency)}
        </span>
      </div>
    </Link>
  );
}

export default function ShoppableVideoFeed({
  items,
}: {
  items: VideoFeedItem[];
}) {
  if (items.length === 0) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <p className="text-center text-xs tracking-[0.3em] text-[#1f6fd0]">
        בפעולה
      </p>
      <h2 className="mt-4 text-center font-display text-2xl font-bold tracking-[0.2em] text-neutral-900 lg:text-3xl">
        פריטים נבחרים
      </h2>
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <FeedCard key={item.href} item={item} />
        ))}
      </div>
    </section>
  );
}
