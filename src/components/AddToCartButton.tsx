"use client";

import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { useCart, type AddToCartInput } from "@/lib/cart/CartContext";

interface AddToCartButtonProps {
  product: AddToCartInput;
  soldOut?: boolean;
  /** "card" = compact overlay button; "detail" = full-width product-page button. */
  variant?: "card" | "detail";
}

export default function AddToCartButton({
  product,
  soldOut = false,
  variant = "card",
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  if (variant === "detail") {
    return (
      <button
        type="button"
        disabled={soldOut}
        onClick={() => addItem(product)}
        className="mt-10 flex w-full items-center justify-center rounded-full bg-neutral-900 px-8 py-4 text-sm font-medium tracking-[0.1em] text-zinc-100 transition-all duration-500 ease-in-out hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400 sm:max-w-sm"
      >
        {soldOut ? "אזל מהמלאי" : "הוסף לעגלה"}
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={() => addItem(product)}
      className="flex w-full items-center justify-center gap-1.5 rounded-full bg-neutral-900 px-5 py-3 text-xs font-medium tracking-[0.08em] text-zinc-100 transition-all duration-500 ease-in-out hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400"
    >
      {soldOut ? "עדכנו אותי" : "הוספה לסל"}
      {soldOut ? (
        <ArrowUpRight className="h-3.5 w-3.5 -scale-x-100" strokeWidth={1.5} />
      ) : (
        <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
      )}
    </button>
  );
}
