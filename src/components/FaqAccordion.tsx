"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const GOLD = "#A7C7E7";

const FAQS = [
  {
    q: "איך עובד החיבור המגנטי לטלפון?",
    a: "בתוך השייקר מוטמע מגנט N52 עוצמתי. כל מארז כולל שתי טבעות מתכת דקות עם דבק חזק — מדביקים אחת על הטלפון או על הכיסוי, והטלפון נצמד לשייקר באופן מיידי ויציב. מתאים גם לאייפון וגם לאנדרואיד.",
  },
  {
    q: "האם השייקר אטום ולא נוזל?",
    a: "כן. השייקר תוכנן עם אטימה הרמטית מלאה שמונעת נזילות גם בתנועה, בעומס ובתיק. אפשר לטלטל בביטחון מלא — בלי הפתעות.",
  },
  {
    q: "ממה עשוי השייקר והאם הוא בטוח לשתייה?",
    a: "השייקר עשוי מפולימרים בדרגת מזון ללא BPA, שנבחרו לעמידות לאורך זמן ולשימוש יומיומי אינטנסיבי. הפייה היגיינית ובטוחה לשתייה ישירה.",
  },
  {
    q: "איך מנקים את השייקר?",
    a: "כל החלקים ניתנים לפירוק לניקוי קל. מומלץ לשטוף ביד עם מעט סבון ולהשתמש במברשת הניקוי הייעודית כדי להגיע לכל פינה ולשמור על השייקר רענן.",
  },
  {
    q: "מהם זמני המשלוח ומדיניות ההחזרות?",
    a: "משלוח חינם לכל הארץ, עם אספקה משוערת של 7–14 ימי עסקים. ניתן להחליף או להחזיר תוך 30 יום מיום הקבלה, כל עוד המוצר במצב חדש ובאריזתו המקורית.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-[#18181b] px-5 py-24 sm:px-6 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <p
            className="text-center text-[11px] font-bold tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            FAQ
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-zinc-100 lg:text-4xl">
            שאלות נפוצות
          </h2>
        </FadeIn>

        <FadeIn delay={120} className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-right transition-colors duration-200"
                >
                  <span
                    className={`font-display text-base font-bold tracking-tight transition-colors duration-200 lg:text-lg ${
                      isOpen ? "" : "text-zinc-100"
                    }`}
                    style={isOpen ? { color: GOLD } : undefined}
                  >
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
                    <p className="pb-6 text-right text-sm leading-relaxed text-zinc-400 lg:text-base">
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
