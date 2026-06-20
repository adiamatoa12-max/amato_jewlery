"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Sparkles } from "lucide-react";
import { useCart, formatPrice, type AddToCartInput } from "@/lib/cart/CartContext";
import MediaPlaceholder, {
  isMissingLocalMedia,
} from "@/components/MediaPlaceholder";

const ACCENT = "#2e9bff";
const UPSELL_DISCOUNT = 0.3; // 30% off a second shaker

export default function ThankYou({
  product,
}: {
  product:
    | (AddToCartInput & { description?: string })
    | null;
}) {
  const { addItem, openCart } = useCart();

  const discounted = product
    ? Math.round(product.price * (1 - UPSELL_DISCOUNT))
    : 0;

  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center px-5 pb-24 pt-[160px] text-center sm:px-6"
    >
      {/* Confirmation */}
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full border"
        style={{ borderColor: `${ACCENT}55`, color: ACCENT }}
      >
        <CheckCircle className="h-8 w-8" strokeWidth={1.75} />
      </span>
      <h1 className="mt-6 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
        תודה על ההזמנה!
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 sm:text-base">
        ההזמנה שלך התקבלה ואישור נשלח לכתובת המייל שלך. אנחנו כבר אורזים אותה
        בקפידה — תקבלו עדכון עם פרטי המעקב ברגע שתצא לדרך.
      </p>
      <p className="mt-3 text-xs tracking-[0.15em] text-zinc-600" dir="ltr">
        ORDER&nbsp;#VLT-{"{{order_number}}"}
      </p>

      {/* One-click upsell */}
      {product && (
        <section className="mt-12 w-full rounded-2xl border border-[#2e9bff]/40 bg-zinc-900 p-6 text-right shadow-[0_20px_60px_-24px_rgba(46,155,255,0.4)] sm:p-8">
          <p
            className="flex items-center justify-end gap-2 text-[11px] font-bold uppercase tracking-[0.2em]"
            style={{ color: ACCENT }}
          >
            הצעה חד-פעמית
            <Sparkles className="h-4 w-4" strokeWidth={2} />
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-zinc-800">
              {isMissingLocalMedia(product.image) ? (
                <MediaPlaceholder className="absolute inset-0 h-full w-full" />
              ) : (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-extrabold leading-tight text-white">
                הוסיפו שייקר שני — 30% הנחה
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                מתנה מושלמת, או גיבוי לתיק הכושר. רק עכשיו, במחיר ההזמנה הזו.
              </p>
              <div className="mt-2 flex items-center justify-end gap-2">
                <span className="text-sm tabular-nums text-zinc-500 line-through">
                  {formatPrice(product.price, product.currency)}
                </span>
                <span
                  className="font-display text-xl font-black tabular-nums"
                  style={{ color: ACCENT }}
                >
                  {formatPrice(discounted, product.currency)}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              addItem(product);
              openCart();
            }}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#2e9bff] px-8 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-black transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#5cb3ff] active:scale-95"
          >
            הוסיפו להזמנה ב-30% הנחה
          </button>
        </section>
      )}

      <Link
        href="/"
        className="mt-10 text-xs font-bold uppercase tracking-[0.14em] text-zinc-400 underline-offset-4 transition-colors hover:text-white"
      >
        חזרה לדף הבית
      </Link>
    </main>
  );
}
