"use client";

import { useState } from "react";
import Image from "next/image";
import ProductDetails from "@/components/ProductDetails";
import type { AddToCartInput } from "@/lib/cart/CartContext";

export type Plating = "gold" | "silver";

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

export default function ProductView({
  product,
  soldOut,
  collectionTitle,
  collectionHandle,
}: ProductViewProps) {
  const [plating, setPlating] = useState<Plating>("gold");

  // Silver simulates the alternate plating by neutralizing the gold tone.
  const variantClass =
    plating === "silver"
      ? "[filter:grayscale(1)_brightness(1.12)_contrast(1.03)]"
      : "";

  const gallery =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image, product.hoverImage];

  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
      {/* Images — right column in RTL (first child); scrolls normally */}
      <div className="flex flex-col gap-4 lg:gap-6">
        {gallery.map((src, i) => {
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
                  photo ? "object-cover" : `object-contain p-8 ${variantClass}`
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
        plating={plating}
        onPlatingChange={setPlating}
        product={product}
      />
    </div>
  );
}
