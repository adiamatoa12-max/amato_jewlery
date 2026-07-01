import Link from "next/link";
import Image from "next/image";
import { Check, X } from "lucide-react";
import FadeIn from "@/components/FadeIn";

/**
 * VAULT Manifesto — a self-contained, premium statement section.
 * Drop <ManifestoSection /> anywhere (Home or About). Customise the CTA via props.
 *
 * Aesthetic: deep-black canvas (#050505), crisp white/grey type. Electric Blue
 * is reserved strictly for functional UI (checkmarks, the CTA) — never text.
 */
const ACCENT = "#2e9bff"; // Electric Blue — functional UI only (checkmarks, CTA)
const PRODUCT_URL = `/product/${encodeURIComponent("vault-השייקר-המגנטי")}`;
const LIFESTYLE_IMG = "/images/שייקר 11.jpeg"; // next/image encodes the path
const MAGGRIP_VIDEO = `/videos/${encodeURIComponent("שייקר 31.mp4")}`;

const MANIFESTO_ROWS = [
  {
    feature: "היגיינה",
    vault: "אטימה הרמטית — בלי דליפות, בלי ריח",
    standard: "מדליף, מצטבר בו עובש וריח",
  },
  {
    feature: "ערבוב",
    vault: "מנוע חשמלי — שייק חלק בלחיצה",
    standard: "ערבוב ידני שמשאיר גושים",
  },
  {
    feature: "טכנולוגיית Mag-Grip",
    vault: "מגנט N52 — הטלפון נעול לכל משטח מתכתי",
    standard: "אין. הטלפון נזרק על הרצפה",
  },
  {
    feature: "עמידות",
    vault: "חומרים בדרגה הנדסית, בנוי לשנים",
    standard: "פלסטיק זול שנסדק ומתבלה",
  },
];

export default function ManifestoSection({
  id,
  ctaHref = PRODUCT_URL,
  ctaLabel = "הצטרפו למהפכה",
}: {
  id?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <section id={id} className="bg-[#050505] px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-4xl">
        {/* Intro — constrained width so the copy stays readable on desktop */}
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <p className="text-center font-display text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-400">
              הפילוסופיה שלנו
            </p>
            <h2 className="mt-5 text-center font-display text-3xl font-black uppercase leading-[0.95] tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
              הסטנדרט של VAULT
            </h2>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="mt-12 space-y-6 text-center">
              <p className="font-display text-xl font-bold uppercase tracking-tight text-zinc-100 sm:text-2xl">
                עידן הציוד הזול והבינוני בחדר הכושר נגמר.
              </p>
              <p className="text-base font-light leading-relaxed text-zinc-400 sm:text-lg">
                לא נולדנו כדי להתפשר. כל VAULT מהונדס בדיוק אובססיבי. מנוע חשמלי
                שמוחק גושים בשנייה, מגנט N52 שמשחרר לך את הידיים, ואטימה מושלמת
                שלא מכירה דליפות. זה לא עוד שייקר. זו הצהרה על איך נראים ביצועים,
                סטייל ואורח חיים ללא פשרות.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Lifestyle zig-zag — image row + video row, alternating sides.
            Mobile: media on top, text below. No boxes/borders — floats on the
            dark canvas. */}
        <FadeIn delay={160}>
          <div className="my-16 space-y-16 lg:my-24 lg:space-y-24">
            {/* Row 1 — image right / text left (mobile: image on top) */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg lg:max-w-none">
                <Image
                  src={LIFESTYLE_IMG}
                  alt="שייקר VAULT המגנטי — עיצוב ארגונומי שיושב טבעי ביד"
                  fill
                  sizes="(max-width: 1024px) 85vw, 450px"
                  className="object-cover"
                />
              </div>
              <div className="text-center lg:text-right">
                <h3 className="font-display text-2xl font-black tracking-tight text-zinc-50 sm:text-3xl">
                  עיצוב שנועד לך.
                </h3>
                <p className="mt-5 text-base font-light leading-relaxed text-zinc-400 sm:text-lg">
                  ארגונומיה מושלמת שיושבת טבעי ביד. ה-Vault הוא לא רק כלי, הוא
                  חלק בלתי נפרד מהציוד שלך מהרגע שיצאת מהבית.
                </p>
              </div>
            </div>

            {/* Row 2 — video left / text right (alternating; mobile: video on top) */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg lg:order-2 lg:max-w-none">
                <video
                  src={MAGGRIP_VIDEO}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="שייקר VAULT המגנטי בפעולה — הטלפון מוצמד בגובה העיניים בחדר הכושר"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="text-center lg:order-1 lg:text-right">
                <h3 className="font-display text-2xl font-black tracking-tight text-zinc-50 sm:text-3xl">
                  תמיד איתך, בכל אימון.
                </h3>
                <p className="mt-5 text-base font-light leading-relaxed text-zinc-400 sm:text-lg">
                  ה-Vault נצמד לכל משקולת או ספסל – הטלפון שלך תמיד בגובה העיניים.
                  טכנולוגיה מגנטית שמשחררת אותך להתמקד בביצועים שלך, בלי טלפונים
                  על הרצפה.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Comparison — line-free; rows separated by whitespace, VAULT column
            highlighted with a subtle dark chip rather than borders. */}
        <FadeIn delay={200}>
          <div className="mx-auto max-w-3xl">
            {/* Column headers (desktop only) */}
            <div className="hidden grid-cols-[1fr_1.25fr_1.25fr] items-center px-4 pb-5 text-center text-xs font-bold uppercase tracking-[0.2em] sm:grid">
              <span />
              <span className="text-zinc-100">VAULT</span>
              <span className="text-zinc-600">שייקר סטנדרטי</span>
            </div>

            <div className="space-y-4">
              {MANIFESTO_ROWS.map((row) => (
                <div
                  key={row.feature}
                  className="sm:grid sm:grid-cols-[1fr_1.25fr_1.25fr] sm:items-center"
                >
                  <h3 className="px-4 font-display text-base font-bold uppercase tracking-wide text-zinc-100 sm:text-sm">
                    {row.feature}
                  </h3>

                  {/* VAULT — subtle dark chip, no lines */}
                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-white/[0.04] px-4 py-3 sm:mt-0 sm:justify-center sm:text-center">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: ACCENT }}
                      strokeWidth={3}
                    />
                    <span className="text-sm leading-snug text-zinc-200">
                      {row.vault}
                    </span>
                  </div>

                  {/* Standard */}
                  <div className="mt-2 flex items-start gap-2 px-4 py-3 sm:mt-0 sm:justify-center sm:text-center">
                    <X
                      className="mt-0.5 h-4 w-4 shrink-0 text-zinc-600"
                      strokeWidth={3}
                    />
                    <span className="text-sm leading-snug text-zinc-500">
                      {row.standard}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Final CTA — generous space above, perfectly centered */}
        <FadeIn delay={260}>
          <div className="mt-20 flex flex-col items-center text-center">
            <Link
              href={ctaHref}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-12 py-4 text-sm font-black uppercase tracking-[0.16em] text-black shadow-[0_10px_40px_-12px_rgba(255,255,255,0.3)] ring-1 ring-white/20 transition-all duration-300 ease-out hover:scale-105 hover:bg-zinc-200 hover:shadow-[0_0_44px_-6px_rgba(255,255,255,0.45)] active:scale-95 sm:w-auto"
            >
              {ctaLabel}
            </Link>
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-zinc-600">
              העידן החדש של ציוד האימון
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
