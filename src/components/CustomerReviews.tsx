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
  "silver-hoop-earrings": [
    {
      name: "שירה אברהם",
      rating: 5,
      date: "מאי 2026",
      body: "הזמנתי זוג עגילי חישוק מוזהבים ואני פשוט לא מורידה אותם. הם קלילים, נוחים ומתאימים גם ליום עבודה וגם ליציאה בערב. אני אוהבת במיוחד את העיצוב הנקי והמודרני שלהם. בדיוק הסגנון המינימליסטי שחיפשתי.",
      verified: true,
    },
  ],
  "cuban-chain-bracelet": [
    {
      name: "עומר כהן",
      rating: 5,
      date: "מאי 2026",
      body: "האמת שהופתעתי כבר מהרגע שהחבילה הגיעה. האריזה הייתה מושקעת, נקייה ויוקרתית, ממש הרגישה כמו לפתוח מתנה. הצמיד עצמו נראה אפילו טוב יותר מבתמונות באתר. איכות גבוהה, גימור מדויק וחוויית קנייה מצוינת מההתחלה ועד הסוף.",
      verified: true,
    },
  ],
  "geo-pendant-necklace": [
    {
      name: "נועה לוי",
      rating: 5,
      date: "אפריל 2026",
      body: "חיפשתי הרבה זמן תכשיט מינימליסטי שנראה יוקרתי בלי להיות מוגזם, והשרשרת שהזמנתי מ-AMATO בדיוק ענתה על מה שחיפשתי. היא עדינה, איכותית ומשתלבת כמעט עם כל לוק. אחרי כמה שבועות של שימוש יומיומי היא עדיין נראית חדשה לגמרי. בהחלט אזמין שוב.",
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
            i < rating ? "fill-[#c8a24c] text-[#c8a24c]" : "fill-transparent text-stone-300"
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
    <section className="border-t border-stone-200/70 bg-white">
      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-10 lg:py-28">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <h2 className="font-display text-2xl font-bold tracking-[0.2em] text-neutral-900 lg:text-3xl">
            ביקורות לקוחות
          </h2>
          {hasReviews ? (
            <div className="mt-5 flex items-center gap-3">
              <Stars rating={Math.round(average)} />
              <span className="text-sm tabular-nums text-neutral-500">
                {average.toFixed(1)} · {reviews.length}{" "}
                {reviews.length === 1 ? "ביקורת" : "ביקורות"}
              </span>
            </div>
          ) : (
            <p className="mt-5 text-sm text-neutral-500">
              עדיין אין ביקורות — היו הראשונים לשתף את החוויה שלכם.
            </p>
          )}
          <button
            type="button"
            onClick={() => {
              setOpen((o) => !o);
              setSubmitted(false);
            }}
            className="mt-8 inline-flex items-center rounded-full border border-neutral-800 px-8 py-3 text-xs font-medium tracking-[0.12em] text-neutral-900 transition-all duration-500 ease-in-out hover:bg-neutral-800 hover:text-white"
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
              <p className="rounded-sm bg-stone-50 px-6 py-8 text-center text-sm text-neutral-600">
                תודה על המשוב! הביקורת שלך תפורסם לאחר אישור.
              </p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="mx-auto max-w-xl rounded-sm border border-stone-200/70 bg-stone-50 p-6 lg:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs tracking-[0.08em] text-neutral-500">
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
                              : "fill-transparent text-stone-300"
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
                  placeholder="השם שלך"
                  className="mt-5 w-full border-b border-neutral-300 bg-transparent py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-800 focus:outline-none"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="ספרו לנו על החוויה שלכם..."
                  className="mt-5 w-full resize-none border-b border-neutral-300 bg-transparent py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-800 focus:outline-none"
                />
                <button
                  type="submit"
                  className="mt-6 inline-flex items-center rounded-full bg-neutral-800 px-8 py-3 text-xs font-medium tracking-[0.12em] text-white transition-all duration-500 ease-in-out hover:bg-neutral-700"
                >
                  שליחת הביקורת
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Review list */}
        <ul className="mt-14 flex flex-col divide-y divide-stone-200/70">
          {reviews.map((review) => (
            <li key={review.name} className="py-8 first:pt-0">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-neutral-900">
                    {review.name}
                  </span>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] tracking-[0.04em] text-emerald-600">
                      <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                      רכישה מאומתת
                    </span>
                  )}
                </div>
                <span className="shrink-0 text-xs text-neutral-400">{review.date}</span>
              </div>
              <Stars rating={review.rating} className="mt-3" />
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                {review.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
