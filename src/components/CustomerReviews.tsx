"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, BadgeCheck, X } from "lucide-react";
import {
  REVIEWS_BY_HANDLE,
  DEFAULT_REVIEWS,
  DISPLAY_REVIEW_COUNT,
} from "@/lib/reviews";

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} מתוך 5 כוכבים`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-[#D4AF37] text-[#D4AF37]" : "fill-transparent text-zinc-600"
          }`}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function CustomerReviews({ handle }: { handle: string }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  // Full-resolution lightbox for a clicked review photo — null when closed.
  const [lightbox, setLightbox] = useState<{ src: string; name: string } | null>(null);

  // Close on Escape + lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLightbox(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const reviews = REVIEWS_BY_HANDLE[handle] ?? DEFAULT_REVIEWS;
  const hasReviews = reviews.length > 0;
  const average = hasReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <section className="border-t border-white/10 bg-[#0B0B0B]">
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10 lg:py-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white lg:text-3xl">
            ביקורות לקוחות
          </h2>
          {hasReviews ? (
            <div className="mt-5 flex items-center gap-3">
              <Stars rating={Math.round(average)} />
              <span className="text-sm tabular-nums text-zinc-400">
                {average.toFixed(1)} · {DISPLAY_REVIEW_COUNT} ביקורות
              </span>
            </div>
          ) : (
            <p className="mt-5 text-sm text-zinc-400">
              עדיין אין ביקורות — היו הראשונים לשתף את החוויה שלכם.
            </p>
          )}
          <button
            type="button"
            onClick={() => {
              setOpen((o) => !o);
              setSubmitted(false);
            }}
            className="mt-8 inline-flex items-center rounded-full border border-[#D4AF37]/50 px-8 py-3 text-xs font-bold tracking-[0.12em] text-[#D4AF37] transition-all duration-300 ease-in-out hover:bg-[#D4AF37] hover:text-black"
          >
            כתבו ביקורת
          </button>
        </div>

        {/* Inline review form */}
        <div
          className={`grid transition-all duration-500 ease-in-out ${
            open ? "mt-10 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            {submitted ? (
              <p className="rounded-sm border border-white/10 bg-white/[0.04] px-6 py-8 text-center text-sm text-zinc-300">
                תודה על המשוב! הביקורת שלך תפורסם לאחר אישור.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="mx-auto max-w-xl rounded-sm border border-white/10 bg-white/[0.04] p-6 lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.08em] text-zinc-400">
                    הדירוג שלך
                  </span>
                  <div className="-mx-1 flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        aria-label={`${i + 1} כוכבים`}
                        className="flex h-11 w-11 items-center justify-center transition-transform duration-200 ease-in-out hover:scale-110"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            i < rating
                              ? "fill-[#D4AF37] text-[#D4AF37]"
                              : "fill-transparent text-zinc-600"
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  type="text"
                  required
                  aria-label="השם שלך"
                  placeholder="השם שלך"
                  className="mt-5 w-full border-b border-white/20 bg-transparent py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#D4AF37] focus:outline-none"
                />
                <textarea
                  required
                  rows={4}
                  aria-label="ספרו לנו על החוויה שלכם"
                  placeholder="ספרו לנו על החוויה שלכם..."
                  className="mt-5 w-full resize-none border-b border-white/20 bg-transparent py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#D4AF37] focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-6 inline-flex items-center rounded-full bg-[#D4AF37] px-8 py-3 text-xs font-bold tracking-[0.12em] text-black transition-all duration-300 ease-in-out hover:bg-[#e0c24e]"
                >
                  שליחת הביקורת
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Review grid */}
        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((review) => (
            <li
              key={review.name}
              className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-white/20"
            >
              <Stars rating={review.rating} />
              <p className="mt-4 flex-1 text-base leading-[1.7] text-zinc-300">
                “{review.body}”
              </p>

              {review.image && (
                <button
                  type="button"
                  onClick={() => setLightbox({ src: review.image!, name: review.name })}
                  aria-label={`תמונה מהלקוח/ה ${review.name} — לצפייה מוגדלת`}
                  className="group relative mt-5 aspect-[3/4] w-full overflow-hidden rounded-lg transition-opacity duration-300 hover:opacity-90"
                >
                  <Image
                    src={review.image}
                    alt={`תמונה אמיתית מלקוח/ה — ${review.name}`}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </button>
              )}

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                <span className="text-sm font-bold text-white">{review.name}</span>
                {review.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] tracking-[0.04em] text-emerald-400">
                    <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                    רכישה מאומתת
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Lightbox — full-resolution view of a clicked review photo */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`תמונה מוגדלת מלקוח/ה ${lightbox.name}`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="סגירה"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
          >
            <X className="h-6 w-6" strokeWidth={1.75} />
          </button>
          <div
            className="relative aspect-[3/4] w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={`תמונה אמיתית מלקוח/ה — ${lightbox.name}`}
              fill
              sizes="(min-width: 768px) 448px, 90vw"
              className="rounded-lg object-contain"
              priority
            />
          </div>
        </div>
      )}
    </section>
  );
}
