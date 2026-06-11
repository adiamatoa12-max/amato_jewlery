"use client";

import Image from "next/image";
import ProductDetails from "@/components/ProductDetails";
import type { AddToCartInput } from "@/lib/cart/CartContext";
import MediaPlaceholder, {
  isMissingLocalMedia,
} from "@/components/MediaPlaceholder";

interface GalleryMedia {
  media_type: string;
  url: string;
}

interface ProductViewProps {
  product: AddToCartInput & {
    description: string;
    hoverImage: string;
    gallery?: string[];
    styledImage?: string;
    galleryMedia?: GalleryMedia[];
  };
  soldOut: boolean;
  collectionTitle: string;
  collectionHandle: string;
}

// Cut-out renders stay contained; real photos fill the frame.
const isPhoto = (src: string) => /\.jpe?g$/i.test(src);

export default function ProductView({
  product,
  soldOut,
  collectionTitle,
  collectionHandle,
}: ProductViewProps) {
  // Strictly images: keep only IMAGE media, drop any deleted-local path, then
  // de-duplicate by url.
  const galleryMedia = Array.from(
    new Set(
      (product.galleryMedia ?? [])
        .filter((media) => media.media_type === "IMAGE")
        .map((media) => media.url)
        .filter((url) => !isMissingLocalMedia(url)),
    ),
  );

  console.log("Gallery Media:", galleryMedia);

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Media column — right in RTL. Renders only the IMAGE list above. */}
      <div className="flex flex-col gap-4 lg:gap-6">
        {galleryMedia.length === 0 ? (
          <MediaPlaceholder className="aspect-[4/5] w-full rounded-sm" />
        ) : null}
        {galleryMedia.map((src, i) => {
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
