import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Magnet, Dumbbell } from "lucide-react";
import FadeIn from "@/components/FadeIn";

const GOLD = "#c8a24c";

export const metadata: Metadata = {
  title: "הסיפור שלנו — VAULT",
  description:
    "VAULT — השייקר המגנטי בעל הביצועים הגבוהים, עם מעמד טלפון מובנה. עיצוב ארגונומי, פולימרים ללא BPA ואטימה מושלמת — בנוי לאורח חיים אקטיבי.",
};

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "עמידות",
    body: "פולימרים בדרגת מזון ללא BPA, שנבחרו לעמוד בעומסים של אורח חיים פעיל — אימון אחרי אימון, בלי להתפשר.",
  },
  {
    icon: Magnet,
    title: "חדשנות",
    body: "עיצוב ארגונומי עם טכנולוגיה מגנטית פורצת דרך לחיבור מיידי ויציב לסמארטפון — בדיוק איפה שצריך.",
  },
  {
    icon: Dumbbell,
    title: "ביצועים",
    body: "שייקר שתוכנן לשימוש אינטנסיבי בחדר הכושר, עם אטימה מושלמת למניעת נזילות — גם בתנועה ובעומס.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col bg-[#0a0a0a] text-white">
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
            <p
              className="text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              אודות VAULT
            </p>
            <h1 className="mt-4 font-display text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              הסיפור שלנו
            </h1>
          </div>
        </section>

        {/* Section 1 — Our Story */}
        <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 lg:py-28">
          <FadeIn>
            <h2 className="font-display text-3xl font-black tracking-tight text-white lg:text-4xl">
              נולדנו בחדר הכושר
            </h2>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-loose text-zinc-400">
              VAULT נולדה מתוך תסכול פשוט — שייקרים זולים שנוזלים, ובעיקר טלפון
              שאין לאן להניח באמצע האימון. יצאנו לבנות מוצר אחד שעושה הכול נכון:
              שייקר בביצועים גבוהים עם מעמד מגנטי מובנה, שמחזיק את הטלפון יציב
              לצילום, לסטרימינג ולמעקב אחר האימון. כל פרט תוכנן סביב מי שבאמת
              מתאמן — חזק יותר, איכותי יותר, חכם יותר.
            </p>
          </FadeIn>
        </section>

        {/* Section 2 — Why VAULT */}
        <section className="border-y border-white/10 bg-zinc-950">
          <div className="mx-auto max-w-6xl px-5 py-20 sm:px-6 lg:px-10 lg:py-28">
            <FadeIn>
              <h2 className="text-center font-display text-3xl font-black tracking-tight text-white lg:text-4xl">
                למה VAULT?
              </h2>
            </FadeIn>
            <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 lg:gap-10">
              {PILLARS.map(({ icon: Icon, title, body }, i) => (
                <FadeIn key={title} delay={i * 120}>
                  <div className="flex flex-col items-center text-center">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full border bg-black/40"
                      style={{ borderColor: `${GOLD}55`, color: GOLD }}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-white">
                      {title}
                    </h3>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
                      {body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Engineered detail */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-10 lg:py-28">
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
                <p
                  className="text-xs font-bold uppercase tracking-[0.3em]"
                  style={{ color: GOLD }}
                >
                  הנדסה מדויקת
                </p>
                <h2 className="mt-5 font-display text-3xl font-black leading-tight tracking-tight text-white lg:text-4xl">
                  כל פרט נבנה לביצועים.
                </h2>
                <p className="mx-auto mt-7 max-w-md text-base leading-loose text-zinc-400 lg:mx-0">
                  מהמגנט העוצמתי שמעגן את הטלפון, דרך האטימה ההרמטית שמונעת
                  נזילות, ועד הפולימרים ללא BPA ולידית הנשיאה הארגונומית — כל
                  רכיב נבחר כדי לעמוד בקצב שלך ולשרת אותך לאורך זמן.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Section 3 — Our Vision */}
        <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-6 lg:py-32">
          <FadeIn>
            <p
              className="text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              החזון שלנו
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="mx-auto mt-8 max-w-2xl font-display text-2xl font-black leading-relaxed text-white lg:text-3xl">
              להפוך כל אימון לחכם, חזק ונקי יותר — עם ציוד שתוכנן בלי פשרות,
              לאנשים שלא מתפשרים.
            </p>
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
