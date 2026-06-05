"use client";

import { useRef } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/cart/CartContext";

export interface VideoFeedItem {
  href: string;
  video: string;
  title: string;
  price: number;
  currency: string;
}

function VideoCard({ item }: { item: VideoFeedItem }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => {});
  };

  const stop = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  return (
    <Link
      href={item.href}
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-[#f8f8f8]"
    >
      <video
        ref={ref}
        className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={item.video} type="video/mp4" />
      </video>

      {/* Semi-transparent gradient + product info overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent transition-opacity duration-500 group-hover:from-black/65" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-1 px-4 pb-5 text-center text-white">
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
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <p className="text-center text-xs tracking-[0.3em] text-[#b8902f]">
        SHOP THE LOOK
      </p>
      <h2 className="mt-4 text-center font-display text-2xl font-bold uppercase tracking-[0.2em] text-neutral-900 lg:text-3xl">
        In Motion
      </h2>
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((item) => (
          <VideoCard key={item.video} item={item} />
        ))}
      </div>
    </section>
  );
}
