"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
    totalQuantity,
    currency,
  } = useCart();

  // Lock body scroll while the drawer is open + close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel — anchored to the start (right in RTL) */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="עגלת קניות"
        style={{
          right: 0,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
        className="fixed inset-y-0 z-[70] flex w-full max-w-md flex-col bg-stone-50 shadow-2xl transition-transform duration-500 ease-in-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200/70 px-6 py-5">
          <h2 className="font-serif text-xl font-light text-neutral-900">
            העגלה שלך
            {totalQuantity > 0 && (
              <span className="ms-2 text-sm text-neutral-400">
                ({totalQuantity})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="סגירה"
            className="transition-all duration-500 ease-in-out hover:opacity-60"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-neutral-300" strokeWidth={1} />
            <p className="text-sm text-neutral-500">העגלה שלך ריקה כרגע.</p>
            <button
              type="button"
              onClick={closeCart}
              className="text-xs tracking-[0.1em] text-neutral-900 underline-offset-4 transition-all duration-500 ease-in-out hover:underline"
            >
              המשך לקנות
            </button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-stone-200/70 overflow-y-auto px-6">
            {items.map((item) => (
              <li key={item.handle} className="flex gap-4 py-6">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-base font-normal leading-snug text-neutral-900">
                      {item.title}
                    </h3>
                    <p className="shrink-0 text-sm tabular-nums text-neutral-900">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center rounded-full border border-stone-300">
                      <button
                        type="button"
                        aria-label="הפחתת כמות"
                        onClick={() =>
                          updateQuantity(item.handle, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center transition-all duration-300 ease-in-out hover:bg-stone-100"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                      <span className="w-8 text-center text-sm tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="הוספת כמות"
                        onClick={() =>
                          updateQuantity(item.handle, item.quantity + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center transition-all duration-300 ease-in-out hover:bg-stone-100"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.handle)}
                      className="text-xs tracking-[0.08em] text-neutral-400 transition-all duration-500 ease-in-out hover:text-neutral-900"
                    >
                      הסרה
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Footer / checkout */}
        {items.length > 0 && (
          <div className="border-t border-stone-200/70 px-6 py-6">
            <div className="flex items-center justify-between text-sm">
              <span className="tracking-[0.08em] text-neutral-500">סכום ביניים</span>
              <span className="text-lg tabular-nums text-neutral-900">
                {formatPrice(totalPrice, currency)}
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-400">
              משלוח ומיסים מחושבים בקופה.
            </p>
            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-neutral-900 px-8 py-4 text-sm font-medium tracking-[0.1em] text-white transition-all duration-500 ease-in-out hover:bg-neutral-700"
            >
              למעבר לקופה
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
