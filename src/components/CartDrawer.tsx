"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart/CartContext";
import { ACCESSORIES } from "@/lib/accessories";
import MediaPlaceholder, {
  isMissingLocalMedia,
} from "@/components/MediaPlaceholder";

const GOLD = "#c8a24c";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    totalPrice,
    totalQuantity,
    currency,
  } = useCart();

  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  // Accessories not already in the cart — surfaced as "complete your setup".
  const inCart = new Set(items.map((i) => i.handle));
  const upsells = ACCESSORIES.filter((a) => !inCart.has(a.handle));

  async function handleCheckout() {
    setCheckingOut(true);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: items.map((i) => ({
            variantId: i.variantId,
            quantity: i.quantity,
          })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setCheckoutError(
        data.error ?? "לא ניתן להשלים את ההזמנה כרגע. נסו שוב מאוחר יותר.",
      );
    } catch {
      setCheckoutError("שגיאת רשת. בדקו את החיבור ונסו שוב.");
    } finally {
      setCheckingOut(false);
    }
  }

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
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-500 ease-in-out ${
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
        className="fixed inset-y-0 z-[70] flex w-full max-w-md flex-col border-l border-white/10 bg-[#0a0a0a] text-white shadow-2xl transition-transform duration-500 ease-in-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="font-display text-lg font-extrabold tracking-tight text-white">
            העגלה שלך
            {totalQuantity > 0 && (
              <span className="ms-2 text-sm font-normal text-zinc-500">
                ({totalQuantity})
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="סגירה"
            className="transition-all duration-300 ease-in-out hover:text-[#c8a24c]"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-10 w-10 text-zinc-700" strokeWidth={1} />
            <p className="text-sm text-zinc-400">העגלה שלך ריקה כרגע.</p>
            <button
              type="button"
              onClick={closeCart}
              className="text-xs tracking-[0.1em] text-[#c8a24c] underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
            >
              המשך לקנות
            </button>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-6">
            {items.map((item) => (
              <li key={item.handle} className="flex gap-4 py-6">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                  {isMissingLocalMedia(item.image) ? (
                    <MediaPlaceholder className="absolute inset-0 h-full w-full" />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-sm font-medium leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="shrink-0 text-sm font-bold tabular-nums text-white">
                      {formatPrice(item.price * item.quantity, item.currency)}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center rounded-full border border-white/15">
                      <button
                        type="button"
                        aria-label="הפחתת כמות"
                        onClick={() =>
                          updateQuantity(item.handle, item.quantity - 1)
                        }
                        className="flex h-8 w-8 items-center justify-center transition-all duration-300 ease-in-out hover:bg-white/10"
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
                        className="flex h-8 w-8 items-center justify-center transition-all duration-300 ease-in-out hover:bg-white/10"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.handle)}
                      className="text-xs tracking-[0.08em] text-zinc-500 transition-all duration-300 ease-in-out hover:text-white"
                    >
                      הסרה
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Complete your setup — accessory upsell */}
        {items.length > 0 && upsells.length > 0 && (
          <div className="border-t border-white/10 px-6 py-5">
            <p
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              השלימו את הסט שלכם
            </p>
            <ul className="flex flex-col gap-2.5">
              {upsells.map((a) => (
                <li
                  key={a.handle}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-zinc-900 p-2.5"
                >
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-xs font-medium text-white">
                      {a.title}
                    </span>
                    <span
                      className="text-xs font-bold tabular-nums"
                      style={{ color: GOLD }}
                    >
                      {formatPrice(a.price, a.currency)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItem(a)}
                    aria-label={`הוספת ${a.title}`}
                    className="flex shrink-0 items-center gap-1 rounded-full border border-[#c8a24c]/50 px-3.5 py-1.5 text-xs font-bold text-[#c8a24c] transition-all duration-300 hover:bg-[#c8a24c] hover:text-black"
                  >
                    <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                    הוסף
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer / checkout */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-6 py-6">
            <div className="flex items-center justify-between text-sm">
              <span className="tracking-[0.08em] text-zinc-400">סכום ביניים</span>
              <span className="font-display text-lg font-extrabold tabular-nums text-white">
                {formatPrice(totalPrice, currency)}
              </span>
            </div>
            <p className="mt-1 text-xs text-zinc-500">
              משלוח ומיסים מחושבים בקופה.
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkingOut}
              className="mt-6 flex w-full items-center justify-center rounded-full bg-[#c8a24c] px-8 py-4 text-sm font-black uppercase tracking-[0.1em] text-black shadow-[0_0_30px_-6px_rgba(200,162,76,0.7)] transition-all duration-300 ease-in-out hover:bg-[#e0bd6a] active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400 disabled:shadow-none"
            >
              {checkingOut ? "מעבירים לקופה…" : "למעבר לקופה"}
            </button>
            {checkoutError && (
              <p className="mt-3 text-center text-xs text-red-400">
                {checkoutError}
              </p>
            )}
          </div>
        )}
      </aside>
    </>
  );
}
