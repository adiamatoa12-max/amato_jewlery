import Link from "next/link";
import { Check, X } from "lucide-react";
import FadeIn from "@/components/FadeIn";

/**
 * VAULT Manifesto — a self-contained, premium statement section.
 * Drop <ManifestoSection /> anywhere (Home or About). Customise the CTA via props.
 *
 * Aesthetic: deep-black canvas (#050505), crisp white type, subtle metallic-silver accent.
 */
const ACCENT = "#c9ced6"; // Metallic silver — subtle, on-brand highlight
const PRODUCT_URL = `/product/${encodeURIComponent("vault-השייקר-המגנטי")}`;

const MANIFESTO_ROWS = [
  {
    feature: "היגיינה",
    vault: "אטימה הרמטית — בלי דליפות, בלי ריח",
    standard: "מדליף, מצטבר בו עובש וריח",
  },
  {
    feature: "עמידות",
    vault: "חומרים בדרגה הנדסית, בנוי לשנים",
    standard: "פלסטיק זול שנסדק ומתבלה",
  },
  {
    feature: "טכנולוגיית Mag-Grip",
    vault: "מגנט N52 — הטלפון נעול לכל משטח מתכתי",
    standard: "אין. הטלפון נזרק על הרצפה",
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
    <section
      id={id}
      className="border-t border-white/10 bg-[#050505] px-6 py-24 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-4xl">
        {/* Headline */}
        <FadeIn>
          <p
            className="text-center font-display text-[11px] font-bold uppercase tracking-[0.4em]"
            style={{ color: ACCENT }}
          >
            הפילוסופיה שלנו
          </p>
          <h2 className="mt-5 text-center font-display text-3xl font-black uppercase leading-[0.95] tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl">
            הסטנדרט של <span style={{ color: ACCENT }}>VAULT</span>
          </h2>
        </FadeIn>

        {/* Mission statement */}
        <FadeIn delay={120}>
          <div className="mx-auto mt-12 max-w-2xl space-y-6 text-center">
            <p className="font-display text-xl font-bold uppercase tracking-tight text-zinc-100 sm:text-2xl">
              עידן הציוד הזול והבינוני בחדר הכושר — נגמר.
            </p>
            <p className="text-base font-light leading-loose text-zinc-400 sm:text-lg">
              לא נולדנו כדי להתפשר. כל VAULT מהונדס בדיוק אובססיבי — מנוע חשמלי
              שמוחק גושים בשנייה, מגנט N52 שמשחרר לך את הידיים, ואטימה מושלמת שלא
              מכירה דליפות. זה לא עוד שייקר. זו הצהרה על איך נראים ביצועים, סטייל
              ואורח חיים ללא פשרות.
            </p>
          </div>
        </FadeIn>

        {/* Accent divider */}
        <FadeIn delay={160}>
          <div
            className="mx-auto mt-16 h-px w-24"
            style={{ backgroundColor: ACCENT }}
          />
        </FadeIn>

        {/* Comparison — vertical cards on mobile, grid on desktop */}
        <FadeIn delay={200}>
          <div className="mx-auto mt-12 max-w-3xl">
            {/* Column headers (desktop only) */}
            <div className="hidden grid-cols-[1fr_1.25fr_1.25fr] items-center border-b border-white/10 pb-4 text-center text-xs font-bold uppercase tracking-[0.2em] sm:grid">
              <span />
              <span style={{ color: ACCENT }}>VAULT</span>
              <span className="text-zinc-600">שייקר סטנדרטי</span>
            </div>

            {MANIFESTO_ROWS.map((row) => (
              <div
                key={row.feature}
                className="border-b border-white/10 py-7 sm:grid sm:grid-cols-[1fr_1.25fr_1.25fr] sm:items-center"
              >
                <h3 className="font-display text-base font-bold uppercase tracking-wide text-zinc-100 sm:text-sm">
                  {row.feature}
                </h3>

                {/* VAULT */}
                <div className="mt-4 flex items-start gap-2 sm:mt-0 sm:justify-center sm:text-center">
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
                <div className="mt-2 flex items-start gap-2 sm:mt-0 sm:justify-center sm:text-center">
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
        </FadeIn>

        {/* Final CTA */}
        <FadeIn delay={260}>
          <div className="mt-16 text-center">
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
