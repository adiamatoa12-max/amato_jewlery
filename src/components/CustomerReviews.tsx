"use client";

import { useState } from "react";
import { Star, BadgeCheck } from "lucide-react";
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
            i < rating ? "fill-[#2952e3] text-[#2952e3]" : "fill-transparent text-zinc-700"
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

  const reviews = REVIEWS_BY_HANDLE[handle] ?? DEFAULT_REVIEWS;
  const hasReviews = reviews.length > 0;
  const average = hasReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <section className="border-t border-zinc-200 bg-surface-alt">
      <div className="mx-auto max-w-6xl px-6 py-32 lg:px-10 lg:py-40">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900 lg:text-3xl">
            ביקורות לקוחות
          </h2>
          {hasReviews ? (
            <div className="mt-5 flex items-center gap-3">
              <Stars rating={Math.round(average)} />
              <span className="text-sm tabular-nums text-zinc-500">
                {average.toFixed(1)} · {DISPLAY_REVIEW_COUNT} ביקורות
              </span>
            </div>
          ) : (
            <p className="mt-5 text-sm text-zinc-500">
              עדיין אין ביקורות — היו הראשונים לשתף את החוויה שלכם.
            </p>
          )}
          <button
            type="button"
            onClick={() => {
              setOpen((o) => !o);
              setSubmitted(false);
            }}
            className="mt-8 inline-flex items-center rounded-full border border-[#2952e3]/50 px-8 py-3 text-xs font-bold tracking-[0.12em] text-[#2952e3] transition-all duration-300 ease-in-out hover:bg-[#2952e3] hover:text-white"
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
              <p className="rounded-sm border border-zinc-200 bg-white px-6 py-8 text-center text-sm text-zinc-600">
                תודה על המשוב! הביקורת שלך תפורסם לאחר אישור.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="mx-auto max-w-xl rounded-sm border border-zinc-200 bg-white p-6 lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.08em] text-zinc-500">
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
                              ? "fill-[#2952e3] text-[#2952e3]"
                              : "fill-transparent text-zinc-700"
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
                  className="mt-5 w-full border-b border-zinc-300 bg-transparent py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-[#2952e3] focus:outline-none"
                />
                <textarea
                  required
                  rows={4}
                  aria-label="ספרו לנו על החוויה שלכם"
                  placeholder="ספרו לנו על החוויה שלכם..."
                  className="mt-5 w-full resize-none border-b border-zinc-300 bg-transparent py-2 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-[#2952e3] focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-6 inline-flex items-center rounded-full bg-[#2952e3] px-8 py-3 text-xs font-bold tracking-[0.12em] text-white transition-all duration-300 ease-in-out hover:bg-[#4169e5]"
                >
                  שליחת הביקורת
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Review grid */}
        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <li
              key={review.name}
              className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-[#2952e3]/40"
            >
              <Stars rating={review.rating} />
              <p className="mt-4 flex-1 text-base leading-[1.7] text-[#2D3748]">
                “{review.body}”
              </p>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-zinc-200 pt-4">
                <span className="text-sm font-bold text-zinc-900">{review.name}</span>
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
    </section>
  );
}
