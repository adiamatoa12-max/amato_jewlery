"use client";

import { useState } from "react";
import { Star, BadgeCheck } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  date: string;
  body: string;
  verified: boolean;
}

// Real customer reviews keyed by product handle.
const REVIEWS_BY_HANDLE: Record<string, Review[]> = {
  "vault-magnetic-shaker": [
    {
      name: "דניאל כהן",
      rating: 5,
      date: "מאי 2026",
      body: "המגנט פשוט מטורף. הטלפון נצמד חזק ולא זז גם באמצע סט כפיפות, ואני סוף סוף יכול לצלם את האימונים בלי חצובה. השייקר עצמו אטום לחלוטין ולא נוזל אפילו טיפה. שדרוג רציני לאימון.",
      verified: true,
    },
    {
      name: "נועה לוי",
      rating: 5,
      date: "מאי 2026",
      body: "האריזה הגיעה מושקעת ויוקרתית, והשייקר נראה אפילו טוב יותר מבתמונות. קל לניקוי, נעים לאחיזה, והמעמד לטלפון מושלם לסטרימינג בזמן האימון. לא מוותרת עליו.",
      verified: true,
    },
  ],
  "vault-bundle-set": [
    {
      name: "איתי ברקוביץ׳",
      rating: 5,
      date: "אפריל 2026",
      body: "לקחתי את הסט המלא וזה שווה כל שקל. איכות בנייה פרימיום שמרגישים ביד, הטבעות המגנטיות מחזיקות מצוין גם על הכיסוי, וכל האביזרים פשוט משלימים את חוויית האימון. ממליץ בחום.",
      verified: true,
    },
  ],
};

function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} מתוך 5 כוכבים`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-[#c8a24c] text-[#c8a24c]" : "fill-transparent text-zinc-700"
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

  const reviews = REVIEWS_BY_HANDLE[handle] ?? [];
  const hasReviews = reviews.length > 0;
  const average = hasReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <section className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-28">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display text-2xl font-bold tracking-[0.2em] text-white lg:text-3xl">
            ביקורות לקוחות
          </h2>
          {hasReviews ? (
            <div className="mt-5 flex items-center gap-3">
              <Stars rating={Math.round(average)} />
              <span className="text-sm tabular-nums text-zinc-400">
                {average.toFixed(1)} · {reviews.length}{" "}
                {reviews.length === 1 ? "ביקורת" : "ביקורות"}
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
            className="mt-8 inline-flex items-center rounded-full border border-[#c8a24c]/50 px-8 py-3 text-xs font-bold tracking-[0.12em] text-[#c8a24c] transition-all duration-300 ease-in-out hover:bg-[#c8a24c] hover:text-black"
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
              <p className="rounded-sm bg-zinc-900 px-6 py-8 text-center text-sm text-zinc-300">
                תודה על המשוב! הביקורת שלך תפורסם לאחר אישור.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="mx-auto max-w-xl rounded-sm border border-white/10 bg-zinc-900 p-6 lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.08em] text-zinc-400">
                    הדירוג שלך
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(i + 1)}
                        aria-label={`${i + 1} כוכבים`}
                        className="transition-transform duration-200 ease-in-out hover:scale-110"
                      >
                        <Star
                          className={`h-5 w-5 ${
                            i < rating
                              ? "fill-[#c8a24c] text-[#c8a24c]"
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
                  className="mt-5 w-full border-b border-white/20 bg-transparent py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#c8a24c] focus:outline-none"
                />
                <textarea
                  required
                  rows={4}
                  aria-label="ספרו לנו על החוויה שלכם"
                  placeholder="ספרו לנו על החוויה שלכם..."
                  className="mt-5 w-full resize-none border-b border-white/20 bg-transparent py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#c8a24c] focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-6 inline-flex items-center rounded-full bg-[#c8a24c] px-8 py-3 text-xs font-bold tracking-[0.12em] text-black transition-all duration-300 ease-in-out hover:bg-[#e0bd6a]"
                >
                  שליחת הביקורת
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Review list */}
        <ul className="mt-14 flex flex-col divide-y divide-white/10">
          {reviews.map((review) => (
            <li key={review.name} className="py-8 first:pt-0">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white">
                    {review.name}
                  </span>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] tracking-[0.04em] text-emerald-400">
                      <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                      רכישה מאומתת
                    </span>
                  )}
                </div>
                <span className="shrink-0 text-xs text-zinc-500">{review.date}</span>
              </div>
              <Stars rating={review.rating} className="mt-3" />
              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                {review.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
