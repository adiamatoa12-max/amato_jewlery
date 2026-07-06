import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Magnet, Dumbbell } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "הסיפור שלנו — VAULT",
  description:
    "VAULT — השייקר המגנטי בעל הביצועים הגבוהים, עם מעמד טלפון מובנה. עיצוב ארגונומי, פולימרים ללא BPA ואטימה מושלמת — בנוי לאורח חיים אקטיבי.",
};

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "עמידות",
    body: "פולימרים בדרגת מזון ללא BPA שסופגים אימון אחרי אימון בלי להתעייף. משקיעים פעם אחת, לא קונים שייקר חדש כל חודש.",
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
            src="/images/hero-2.png"
            alt="VAULT — השייקר המגנטי"
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
        <section className="mx-auto max-w-3xl px-5 py-32 text-center sm:px-6 lg:py-40">
          <FadeIn>
            <h2 className="font-display text-3xl font-black tracking-tight text-zinc-900 lg:text-4xl">
              נולדנו בחדר הכושר
            </h2>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-[1.7] text-[#2D3748]">
              נמאס לנו משייקרים זולים שנוזלים בתיק, ומטלפון שאין לו איפה לשבת
              באמצע האימון. אז בנינו את הפתרון בעצמנו.
            </p>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-[1.7] text-[#2D3748]">
              שייקר אחד עם{" "}
              <strong className="font-bold text-[#111111]">מעמד טלפון מגנטי מובנה</strong>{" "}
              שמחזיק את המכשיר יציב לצילום, לסטרימינג ולמעקב אחרי סטים. ידיים
              פנויות, טלפון נקי, אימון בלי הפרעות.
            </p>
          </FadeIn>
        </section>

        {/* Section 2 — Why VAULT */}
        <section className="border-y border-white/10 bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-32 sm:px-6 lg:px-10 lg:py-40">
            <FadeIn>
              <h2 className="text-center font-display text-3xl font-black tracking-tight text-zinc-900 lg:text-4xl">
                למה VAULT?
              </h2>
            </FadeIn>
            <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 lg:gap-10">
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
        <section className="mx-auto max-w-7xl px-5 py-32 sm:px-6 lg:px-10 lg:py-40">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Image */}
            <FadeIn>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
                <Image
                  src="/images/vault-product-image.png"
                  alt="שייקר VAULT המגנטי"
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
                  והפולימרים ללא BPA עם ידית הנשיאה הארגונומית פשוט מחזיקים
                  מעמד, אימון אחרי אימון.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Section 3 — Our Vision */}
        <section className="mx-auto max-w-3xl px-5 py-36 text-center sm:px-6 lg:py-48">
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
