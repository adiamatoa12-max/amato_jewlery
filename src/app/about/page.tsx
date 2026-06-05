import type { Metadata } from "next";
import Image from "next/image";
import { Gem, PenTool, ShieldCheck } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "הסיפור שלנו — AMATO",
  description:
    "AMATO — תכשיטי פרימיום מינימליסטיים מכסף סטרלינג 925 בציפוי זהב 14 קראט. עיצוב נקי, איכות בלתי מתפשרת ואלגנטיות שלא יוצאת מהאופנה.",
};

const QUALITIES = [
  {
    icon: Gem,
    title: "איכות",
    body: "כסף סטרלינג 925 איכותי בציפוי זהב 14 קראט — חומרים שנבחרו בקפידה כדי להחזיק מעמד לאורך שנים.",
  },
  {
    icon: PenTool,
    title: "עיצוב",
    body: "קווים נקיים ופרופורציות מדויקות. כל פריט מעוצב בגישה מינימליסטית שמדגישה את מי שעונד אותו.",
  },
  {
    icon: ShieldCheck,
    title: "עמידות",
    body: "גימור עמיד שנועד לשגרת היומיום — תכשיט שנשאר יפה הרבה אחרי היום שבו קיבלת אותו.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
          <Image
            src="/images/hero-banner-women.jpg"
            alt="האווירה של AMATO"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/40" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
            <p className="text-xs tracking-[0.3em] text-[#d4af6a]">ABOUT AMATO</p>
            <h1 className="mt-4 font-serif text-4xl font-light tracking-[0.06em] sm:text-5xl lg:text-6xl">
              הסיפור שלנו
            </h1>
          </div>
        </section>

        {/* Section 1 — Our Story */}
        <section className="mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
          <FadeIn>
            <h2 className="font-serif text-3xl font-light text-neutral-900 lg:text-4xl">
              הסיפור שלנו
            </h2>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-loose text-neutral-500">
              AMATO נולדה מתוך אמונה אחת פשוטה — שתכשיט אמיתי לא צריך לצעוק כדי
              להבחין בו. אנחנו מעצבים תכשיטים מינימליסטיים מכסף סטרלינג 925
              איכותי בציפוי זהב 14 קראט, כאלה שנועדו ללוות אותך בכל יום. כל
              פריט נוצר בתשומת לב לפרטים הקטנים, מתוך מחויבות לחומרים מהאיכות
              הגבוהה ביותר ולעיצוב נקי שלא יוצא מהאופנה.
            </p>
          </FadeIn>
        </section>

        {/* Section 2 — Our Quality */}
        <section className="border-y border-stone-200/70 bg-stone-50">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:px-10 lg:py-28">
            <FadeIn>
              <h2 className="text-center font-serif text-3xl font-light text-neutral-900 lg:text-4xl">
                האיכות שלנו
              </h2>
            </FadeIn>
            <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 lg:gap-10">
              {QUALITIES.map(({ icon: Icon, title, body }, i) => (
                <FadeIn key={title} delay={i * 120}>
                  <div className="flex flex-col items-center text-center">
                    <Icon
                      className="h-9 w-9 text-neutral-800"
                      strokeWidth={1}
                    />
                    <h3 className="mt-6 font-serif text-xl font-light text-neutral-900">
                      {title}
                    </h3>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
                      {body}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Unboxing */}
        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Image */}
            <FadeIn>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-neutral-900">
                <Image
                  src="/images/packaging.jpg"
                  alt="האריזה הפרמיום של AMATO"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeIn>

            {/* Text */}
            <FadeIn delay={150}>
              <div className="flex flex-col lg:order-first">
                <p className="text-xs tracking-[0.3em] text-[#b8902f]">
                  PREMIUM UNBOXING
                </p>
                <h2 className="mt-5 font-serif text-3xl font-light leading-tight text-neutral-900 lg:text-4xl">
                  Experience the art of gifting.
                </h2>
                <p className="mt-7 max-w-md text-base leading-loose text-neutral-500">
                  Every AMATO piece arrives in our signature premium packaging,
                  crafted to make every unboxing a special moment.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Section 3 — Our Vision */}
        <section className="mx-auto max-w-3xl px-6 py-24 text-center lg:py-32">
          <FadeIn>
            <p className="text-xs tracking-[0.3em] text-[#b8902f]">
              החזון שלנו
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="mx-auto mt-8 max-w-2xl font-serif text-2xl font-light leading-relaxed text-neutral-900 lg:text-3xl">
              אנחנו מאמינים ב״לוקסוס שקט״ — ביופי שלא דורש מאמץ, ובסטייל
              שנשאר רלוונטי הרבה מעבר לעונה אחת.
            </p>
          </FadeIn>
        </section>
      </main>
    </div>
  );
}
