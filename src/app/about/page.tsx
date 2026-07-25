import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Magnet, Dumbbell } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "הסיפור שלנו — VAULT",
  description:
    "VAULT — השייקר החשמלי המגנטי בעל הביצועים הגבוהים, עם מעמד טלפון מובנה. עיצוב ארגונומי, גוף טריטן שקוף נטול BPA ואטימה מושלמת — בנוי לאורח חיים אקטיבי.",
};

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "עמידות",
    body: "גוף טריטן (Tritan) שקוף בדרגת פרימיום, נטול BPA, שסופג אימון אחרי אימון בלי להתעייף. משקיעים פעם אחת, לא קונים שייקר חדש כל חודש.",
  },
  {
    icon: Magnet,
    title: "חדשנות",
    body: "מגנט שמצמיד את הטלפון תוך שנייה, בדיוק בגובה העיניים. בלי תמיכות מתפרקות, בלי לחפש איפה להניח אותו.",
  },
  {
    icon: Dumbbell,
    title: "ביצועים",
    body: "נבנה לשימוש יומיומי בחדר הכושר. אטימה מלאה שמונעת נזילות, גם כשהתיק מתהפך בדרך.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col bg-surface text-zinc-900">
      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
          <Image
            src="/images/שייקר חדש3.jpeg"
            alt="VAULT — השייקר החשמלי המגנטי"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/70" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-300">
              אודות VAULT
            </p>
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              הסיפור שלנו
            </h1>
          </div>
        </section>

        {/* Section 1 — Our Story */}
        <section className="mx-auto max-w-3xl px-5 py-12 text-center sm:px-6 lg:py-16">
          <FadeIn>
            <h2 className="font-display text-3xl font-black tracking-tight text-[#111111] lg:text-4xl">
              שוברים את הסטנדרט הישן של ציוד הכושר.
            </h2>
          </FadeIn>
          <FadeIn delay={120}>
            <div dir="rtl" className="mx-auto mt-8 max-w-2xl space-y-5">
              <p className="text-lg font-medium leading-[1.8] text-[#2D3748]">
                מותג VAULT נולד מתוך תסכול אחד פשוט: נמאס לנו משייקרים מסורבלים,
                נוזלים, וזולים שמסתובבים בחדרי הכושר. רצינו לייצר את השייקר
                המושלם לספורטאים — כזה שמשלב{" "}
                <strong className="font-bold text-[#111111]">
                  טכנולוגיית ערבול חשמלית עוצמתית
                </strong>{" "}
                יחד עם פתרון חכם (
                <strong className="font-bold text-[#111111]">MAG-GRIP</strong>)
                שמחזיק את הטלפון שלך בבטחה ובגובה העיניים לאורך כל האימון.
              </p>
              <p className="text-lg font-medium leading-[1.8] text-[#2D3748]">
                אנחנו מאמינים בעיצוב ארגונומי מדויק, חומרים ברמת הפרימיום הגבוהה
                ביותר, ואפס פשרות על איכות. ה-VaultShaker הוא לא עוד בקבוק — הוא
                השדרוג הראוי לאימונים שלך.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* Section 2 — Why VAULT */}
        <section className="border-y border-zinc-200 bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
            <FadeIn>
              <h2 className="text-center font-display text-3xl font-black tracking-tight text-zinc-900 lg:text-4xl">
                למה VAULT?
              </h2>
            </FadeIn>
            <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-3 lg:gap-10">
              {PILLARS.map(({ icon: Icon, title, body }, i) => (
                <FadeIn key={title} delay={i * 120}>
                  <div className="flex flex-col items-center text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-200 bg-white text-[#2952e3] shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-zinc-900">
                      {title}
                    </h3>
                    <p className="mt-4 max-w-xs text-base leading-[1.7] text-[#2D3748]">
                      {body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Engineered detail */}
        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Image */}
            <FadeIn>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                <Image
                  src="/images/שייקר חדש2.jpeg"
                  alt="שייקר VAULT החשמלי — גוף שקוף עם בסיס מנוע"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>

            {/* Text */}
            <FadeIn delay={150}>
              <div className="flex flex-col text-center lg:order-first lg:text-right">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600">
                  הנדסה מדויקת
                </p>
                <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-zinc-900 lg:text-4xl">
                  כל פרט נבנה לביצועים.
                </h2>
                <p className="mx-auto mt-7 max-w-md text-lg leading-[1.7] text-[#2D3748] lg:mx-0">
                  המגנט מעגן את הטלפון כך שלא תצטרך להחזיק אותו. האטימה
                  ההרמטית דואגת שהתיק שלך יישאר יבש.
                </p>
                <p className="mx-auto mt-4 max-w-md text-lg leading-[1.7] text-[#2D3748] lg:mx-0">
                  וגוף הטריטן השקוף נטול ה-BPA עם ידית הנשיאה הארגונומית פשוט
                  מחזיק מעמד, אימון אחרי אימון.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Section 3 — Our Vision */}
        <section className="mx-auto max-w-3xl px-5 py-12 text-center sm:px-6 lg:py-16">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-600">
              החזון שלנו
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="mx-auto mt-8 max-w-2xl font-display text-2xl font-black leading-relaxed text-[#111111] lg:text-3xl">
              ציוד אימון שעובד בשבילך, לא נגדך — פחות בלגן, פחות דאגות, יותר
              זמן להתאמן.
            </p>
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
