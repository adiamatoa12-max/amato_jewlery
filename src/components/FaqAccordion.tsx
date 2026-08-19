"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const GOLD = "#2952e3";

export type FaqItem = { q: string; a: ReactNode };

const DEFAULT_FAQS: FaqItem[] = [
  {
    q: "איך עובד החיבור המגנטי לטלפון?",
    a: (
      <>
        בתוך השייקר מוטמע <strong className="font-bold text-[#111111]">מגנט N52</strong>{" "}
        עוצמתי. כל מארז כולל שתי טבעות מתכת דקות עם דבק חזק. מדביקים אחת על
        הטלפון והוא נצמד מיידית ויציב. מתאים לאייפון ולאנדרואיד.
      </>
    ),
  },
  {
    q: "האם השייקר אטום ולא נוזל?",
    a: "כן — זורקים אותו לתיק בלי לחשוב פעמיים. אטימה הרמטית מלאה מונעת נזילות גם בתנועה, כך שהבגדים נשארים יבשים.",
  },
  {
    q: "ממה עשוי השייקר והאם הוא בטוח לשתייה?",
    a: (
      <>
        בטוח לגמרי. הגוף עשוי{" "}
        <strong className="font-bold text-[#111111]">טריטן (Tritan) שקוף בדרגת מזון, נטול BPA</strong>{" "}
        שעומד בשימוש יומיומי אינטנסיבי. הפייה ההיגיינית מיועדת לשתייה ישירה.
      </>
    ),
  },
  {
    q: "איך מנקים את השייקר?",
    a: "בקלות ובלי מאמץ. כל החלקים מתפרקים, שוטפים ביד עם מעט סבון ומברשת הניקוי הייעודית ומגיעים לכל פינה.",
  },
  {
    q: "מהם זמני המשלוח ומדיניות ההחזרות?",
    a: "משלוח חינם עד הבית | 7–14 ימי עסקים. לא מתאים? 30 יום להחזרה, כל עוד המוצר חדש ובאריזתו המקורית.",
  },
];

export default function FaqAccordion({
  items = DEFAULT_FAQS,
  className = "bg-surface-alt",
}: {
  items?: FaqItem[];
  className?: string;
} = {}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={`px-5 py-12 sm:px-6 lg:px-10 lg:py-16 ${className}`}>
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p className="text-center text-[11px] font-bold tracking-[0.3em] text-zinc-500">
            FAQ
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-zinc-900 lg:text-4xl">
            שאלות נפוצות
          </h2>
        </FadeIn>

        <FadeIn delay={120} className="mt-10 space-y-2.5">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="rounded-2xl border border-zinc-200 bg-transparent px-5 transition-colors duration-300 ease-out hover:border-zinc-300"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-right transition-colors duration-200"
                >
                  <span className="font-display text-base font-bold tracking-tight text-zinc-900 lg:text-lg">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    style={{ color: GOLD }}
                    strokeWidth={1.75}
                  />
                </button>
                {/* Smooth collapse via grid-rows trick */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-right text-base leading-[1.7] text-[#2D3748] lg:text-lg">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </FadeIn>
      </div>
    </section>
  );
}
