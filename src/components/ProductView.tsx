"use client";

import Image from "next/image";
import ProductDetails from "@/components/ProductDetails";
import type { AddToCartInput } from "@/lib/cart/CartContext";

interface ProductViewProps {
  product: AddToCartInput & {
    description: string;
    hoverImage: string;
    gallery?: string[];
    styledImage?: string;
  };
  soldOut: boolean;
  collectionTitle: string;
  collectionHandle: string;
}

// Real lifestyle photos fill the frame; cut-out product renders stay contained.
const isPhoto = (src: string) => /\.jpe?g$/i.test(src);

// Hard filter: anything that is a video source must never appear in the
// image gallery (Shopify video CDN, or .mp4/.webm/.mov URLs).
const isVideoSrc = (src: string) =>
  /\/(cdn\/shop\/)?videos?\//i.test(src) || /\.(mp4|webm|mov|m3u8)(\?|$)/i.test(src);

export default function ProductView({
  product,
  soldOut,
  collectionTitle,
  collectionHandle,
}: ProductViewProps) {
  // safeMedia: force-exclude every video source BEFORE any rendering, then
  // de-duplicate by URL. This component has no <video> JSX and never reads raw
  // media directly — it only ever maps over this filtered, image-only list.
  const candidates =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image, product.hoverImage];
  const safeMedia = Array.from(
    new Set(candidates.filter((src) => src && !isVideoSrc(src))),
  );

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Images — right column in RTL (first child); static photos only.
          No video tags exist in this component; safeMedia excludes any video. */}
      <div className="flex flex-col gap-4 lg:gap-6">
        {safeMedia.length === 0 ? (
          // No images and never a video — show a neutral placeholder frame.
          <div className="aspect-[4/5] w-full rounded-sm bg-[#f4f2ef]" aria-hidden />
        ) : null}
        {safeMedia.map((src, i) => {
          const photo = isPhoto(src);
          return (
            <div
              key={src}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#f8f8f8]"
            >
              <Image
                src={src}
                alt={i === 0 ? product.title : ""}
                aria-hidden={i !== 0}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`transition-all duration-700 ease-in-out group-hover:scale-105 ${
                  photo ? "object-cover" : "object-contain p-8"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Info — left column in RTL (second child); sticky */}
      <ProductDetails
        soldOut={soldOut}
        collectionTitle={collectionTitle}
        collectionHandle={collectionHandle}
        product={product}
      />
    </div>
  );
}
