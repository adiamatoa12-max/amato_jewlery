"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart/CartContext";
import { ACCESSORIES } from "@/lib/accessories";
import { WAITLIST_MODE } from "@/lib/config";
import WaitlistButton from "@/components/WaitlistButton";
import { trackInitiateCheckout } from "@/lib/analytics";
import MediaPlaceholder, {
  isMissingLocalMedia,
} from "@/components/MediaPlaceholder";

const GOLD = "#A7C7E7";

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

  // Live Shopify pricing (reflects automatic discounts). Null = use local math.
  type Pricing = {
    currency: string;
    subtotal: number;
    lineCosts: Record<string, { list: number; final: number }>;
  };
  const [pricing, setPricing] = useState<Pricing | null>(null);

  // Re-price (debounced) whenever the variant-backed lines change while open.
  const variantKey = items
    .filter((i) => i.variantId)
    .map((i) => `${i.variantId}:${i.quantity}`)
    .join(",");
  useEffect(() => {
    const lines = items
      .filter((i) => i.variantId)
      .map((i) => ({ variantId: i.variantId, quantity: i.quantity }));
    if (!isOpen || lines.length === 0) {
      setPricing(null);
      return;
    }
    const controller = new AbortController();
    const t = window.setTimeout(() => {
      fetch("/api/cart/price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
        signal: controller.signal,
      })
        .then((r) => r.json())
        .then((d) => setPricing(d?.priced ? d : null))
        .catch(() => {
          /* aborted or offline → keep local math */
        });
    }, 300);
    return () => {
      window.clearTimeout(t);
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantKey, isOpen]);

  // Accessories (no variantId) are priced locally and added to the Shopify
  // subtotal; everything with a variant is priced live (post-discount).
  const accessorySum = items
    .filter((i) => !i.variantId)
    .reduce((s, i) => s + i.price * i.quantity, 0);
  const displayCurrency = pricing?.currency ?? currency;
  const displayedSubtotal = pricing ? pricing.subtotal + accessorySum : totalPrice;
  const hasDiscount = !!pricing && totalPrice - displayedSubtotal > 0.5;

  // Accessories not already in the cart — surfaced as "complete your setup".
  const inCart = new Set(items.map((i) => i.handle));
  const upsells = ACCESSORIES.filter((a) => !inCart.has(a.handle));

  async function handleCheckout() {
    setCheckingOut(true);
    setCheckoutError(null);
    trackInitiateCheckout({
      value: totalPrice,
      currency,
      num_items: totalQuantity,
    });
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
        className="fixed inset-y-0 z-[70] flex w-full max-w-md flex-col border-l border-white/10 bg-[#111111] text-zinc-100 shadow-2xl transition-transform duration-500 ease-in-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <h2 className="font-display text-lg font-extrabold tracking-tight text-zinc-100">
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
            className="-m-2.5 flex h-11 w-11 items-center justify-center transition-all duration-300 ease-in-out hover:text-[#A7C7E7]"
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
              className="text-xs tracking-[0.1em] text-[#A7C7E7] underline-offset-4 transition-all duration-300 ease-in-out hover:underline"
            >
              המשך לקנות
            </button>
          </div>
        ) : (
          // Scrollable content area — cart items (top) + upsell scroll together.
          <div className="flex-1 overflow-y-auto">
          <ul className="divide-y divide-white/10 px-6">
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
                    <h3 className="text-sm font-medium leading-snug text-zinc-100">
                      {item.title}
                    </h3>
                    {!WAITLIST_MODE && (() => {
                      const lc = pricing?.lineCosts?.[item.handle];
                      const discounted = lc && lc.list - lc.final > 0.5;
                      if (discounted) {
                        return (
                          <span className="flex shrink-0 flex-col items-end leading-tight">
                            <span className="text-xs tabular-nums text-zinc-500 line-through">
                              {formatPrice(lc!.list, displayCurrency)}
                            </span>
                            <span
                              className="text-sm font-bold tabular-nums"
                              style={{ color: GOLD }}
                            >
                              {formatPrice(lc!.final, displayCurrency)}
                            </span>
                          </span>
                        );
                      }
                      return (
                        <p className="shrink-0 text-sm font-bold tabular-nums text-zinc-100">
                          {formatPrice(item.price * item.quantity, item.currency)}
                        </p>
                      );
                    })()}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center rounded-full border border-white/15">
                      <button
                        type="button"
                        aria-label="הפחתת כמות"
                        onClick={() =>
                          updateQuantity(item.handle, item.quantity - 1)
                        }
                        className="flex h-11 w-10 items-center justify-center transition-all duration-300 ease-in-out hover:bg-white/10"
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
                        className="flex h-11 w-10 items-center justify-center transition-all duration-300 ease-in-out hover:bg-white/10"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.handle)}
                      className="text-xs tracking-[0.08em] text-zinc-500 transition-all duration-300 ease-in-out hover:text-zinc-100"
                    >
                      הסרה
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Complete your setup — compact horizontal-scroll accessory upsell */}
          {upsells.length > 0 && (
            <div className="border-t border-white/10 px-6 py-5">
              <p
                className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: GOLD }}
              >
                השלימו את הסט שלכם
              </p>
              <ul className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
                {upsells.map((a) => (
                  <li
                    key={a.handle}
                    className="flex w-32 shrink-0 flex-col rounded-xl border border-white/10 bg-zinc-900 p-2"
                  >
                    <span className="relative h-20 w-full overflow-hidden rounded-lg bg-zinc-800">
                      <Image
                        src={a.image}
                        alt={a.title}
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    </span>
                    <span className="mt-2 line-clamp-2 text-[11px] font-medium leading-tight text-zinc-100">
                      {a.title}
                    </span>
                    {WAITLIST_MODE ? (
                      <>
                        <span
                          className="mt-1 text-[11px] font-bold"
                          style={{ color: GOLD }}
                        >
                          זמין בקרוב
                        </span>
                        <WaitlistButton
                          label="הירשמו"
                          className="mt-2 flex items-center justify-center rounded-full border border-[#A7C7E7]/50 py-1.5 text-xs font-bold text-[#A7C7E7] transition-all duration-300 hover:bg-[#A7C7E7] hover:text-black"
                        />
                      </>
                    ) : (
                      <>
                        <span
                          className="mt-1 text-xs font-bold tabular-nums"
                          style={{ color: GOLD }}
                        >
                          {formatPrice(a.price, a.currency)}
                        </span>
                        <button
                          type="button"
                          onClick={() => addItem(a)}
                          aria-label={`הוספת ${a.title}`}
                          className="mt-2 flex items-center justify-center gap-1 rounded-full border border-[#A7C7E7]/50 py-1.5 text-xs font-bold text-[#A7C7E7] transition-all duration-300 hover:bg-[#A7C7E7] hover:text-black"
                        >
                          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                          הוסף
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
          </div>
        )}

        {/* Footer / checkout — hidden pre-launch (no purchasing) */}
        {items.length > 0 && !WAITLIST_MODE && (
          <div className="border-t border-white/10 px-6 py-6">
            <div className="flex items-center justify-between text-sm">
              <span className="tracking-[0.08em] text-zinc-400">סכום ביניים</span>
              <span className="flex items-baseline gap-2">
                {hasDiscount && (
                  <span className="text-sm tabular-nums text-zinc-500 line-through">
                    {formatPrice(totalPrice, displayCurrency)}
                  </span>
                )}
                <span className="font-display text-lg font-extrabold tabular-nums text-zinc-100">
                  {formatPrice(displayedSubtotal, displayCurrency)}
                </span>
              </span>
            </div>
            {hasDiscount && (
              <p className="mt-1 text-xs font-bold" style={{ color: GOLD }}>
                הנחת מבצע הוחלה — חסכת{" "}
                {formatPrice(totalPrice - displayedSubtotal, displayCurrency)}
              </p>
            )}
            <p className="mt-1 text-xs text-zinc-500">
              משלוח ומיסים מחושבים בקופה.
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkingOut}
              className="mt-6 flex w-full items-center justify-center rounded-full bg-[#A7C7E7] px-8 py-4 text-sm font-black uppercase tracking-[0.1em] text-black shadow-[0_0_30px_-6px_rgba(167, 199, 231,0.7)] transition-all duration-300 ease-in-out hover:bg-[#C2DCF0] active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400 disabled:shadow-none"
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
