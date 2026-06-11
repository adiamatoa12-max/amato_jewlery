import Link from "next/link";
import Image from "next/image";
import { Instagram, Smartphone } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import FooterLink, { type FooterLinkItem } from "@/components/FooterLink";
import MediaPlaceholder from "@/components/MediaPlaceholder";

const GOLD = "#c8a24c";

// Reusable gold CTA with a glowing hover.
const goldButton =
  "inline-flex items-center justify-center rounded-full bg-[#c8a24c] px-12 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black transition-all duration-300 ease-out hover:bg-[#e0bd6a] hover:shadow-[0_0_34px_-6px_rgba(200,162,76,0.65)]";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#0a0a0a] pt-[5.25rem] text-white">
      <main id="main-content" className="flex-1">
        <ImpactHero />
        <UseCases />
        <HorizontalStreaming />
        <Anatomy />
        <Compatibility />
        <WhatsInTheBox />
      </main>
      <Footer />
    </div>
  );
}

/* ── Impact hero ─────────────────────────────────────────────────────── */
function ImpactHero() {
  return (
    <section
      className="relative flex min-h-[90vh] w-full items-center overflow-hidden bg-black bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-main.png')" }}
    >
      {/* Readability scrim — darker on the LEFT where the text sits. */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/55 to-black/90" />

      {/* Text pinned LEFT: in RTL, justify-end aligns to the visual left. */}
      <div className="relative z-10 flex h-full w-full items-center justify-end px-6 lg:px-16">
        <div className="max-w-xl text-right">
          <h1 className="font-display text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            האימון שלך. הטלפון שלך.
            <br />
            <span style={{ color: GOLD }}>נצמד בשנייה.</span>
          </h1>
          <p className="mt-6 max-w-md text-sm font-medium leading-relaxed tracking-[0.02em] text-white/80 sm:text-base">
            שייקר הפרימיום המגנטי שמשנה את חוקי המשחק בחדר הכושר.
          </p>
          <Link href="#shop" className={`mt-9 ${goldButton}`}>
            הזמן עכשיו את VAULT
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── 'The Gym Life' use cases (2×2) ──────────────────────────────────── */
const USE_CASES = [
  {
    title: "לצלם בלי חצובה",
    body: "מעמד יציב לכל סרטון אימון — בלי לסחוב ציוד מיותר.",
  },
  {
    title: "תשכחו מהרצפה",
    body: "הטלפון נשאר נצמד ובטוח — רחוק ממשקולות, זיעה ולכלוך.",
  },
  {
    title: "זווית צפייה מושלמת",
    body: "סטרימינג בגובה העיניים בזמן האימון, בדיוק איפה שצריך.",
  },
  {
    title: "מתאים לכל סמארטפון",
    body: "כולל טבעות מגנטיות מתאמות לכל דגם ולכל כיסוי.",
  },
];

function UseCases() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p
            className="text-center text-[11px] font-bold tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            אורח חיים אתלטי
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-white lg:text-4xl">
            בנוי לחיים בחדר הכושר
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {USE_CASES.map((c, i) => (
            <FadeIn key={c.title} delay={i * 100}>
              <div className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 transition-colors duration-300 hover:border-[#c8a24c]/50">
                <MediaPlaceholder className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-xl font-extrabold tracking-tight text-white lg:text-2xl">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {c.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Horizontal streaming ────────────────────────────────────────────── */
function HorizontalStreaming() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-16 lg:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
        {/* Text — right column in RTL */}
        <FadeIn>
          <div className="text-right">
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-white lg:text-4xl">
              לא משדרים את המשחק בחדר כושר?
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-400 lg:text-base">
              חברו את הטלפון לרוחב (Landscape) ותיהנו מזווית צפייה מושלמת.
              הפתרון האולטימטיבי לסטרימינג של משחקי ספורט, סדרות, או מעקב אחרי
              סרטוני אימון ישירות ממתקן המשקולות, בלי להחזיק את המכשיר ביד.
            </p>
          </div>
        </FadeIn>

        {/* Image — left column on desktop, on TOP on mobile */}
        <FadeIn delay={120} className="order-first md:order-none">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-800">
            <Image
              src="/images/horizontal-stream.png"
              alt="טלפון מחובר לרוחב לשייקר VAULT בחדר כושר"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Anatomy of VAULT ────────────────────────────────────────────────── */
const ANATOMY = [
  "מגנט N52 עוצמתי",
  "אטימה מוחלטת לנזילות (BPA-Free)",
  "פיית שתייה היגיינית",
  "ידית נשיאה ארגונומית",
];

function AnatomyFeature({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-2 h-1.5 w-6 shrink-0 rounded-full"
        style={{ backgroundColor: GOLD }}
      />
      <p className="text-sm font-medium leading-relaxed text-white/85 lg:text-base">
        {text}
      </p>
    </div>
  );
}

function Anatomy() {
  return (
    <section
      id="shop"
      className="scroll-mt-24 border-y border-white/10 bg-black px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2 className="text-center font-display text-3xl font-black tracking-tight text-white lg:text-5xl">
            המבנה של VAULT
          </h2>
        </FadeIn>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr] lg:gap-12">
          {/* Right column (RTL-first): features 1–2 */}
          <FadeIn className="flex flex-col gap-8 lg:text-right">
            <AnatomyFeature text={ANATOMY[0]} />
            <AnatomyFeature text={ANATOMY[1]} />
          </FadeIn>

          {/* Center: product image */}
          <FadeIn delay={120}>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-2xl border border-white/10">
              <MediaPlaceholder className="absolute inset-0 h-full w-full" />
            </div>
          </FadeIn>

          {/* Left column: features 3–4 */}
          <FadeIn delay={200} className="flex flex-col gap-8">
            <AnatomyFeature text={ANATOMY[2]} />
            <AnatomyFeature text={ANATOMY[3]} />
          </FadeIn>
        </div>

        <div className="mt-14 flex justify-center">
          <Link href="#" className={goldButton}>
            הזמן עכשיו את VAULT
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Compatibility (magnetic rings) ──────────────────────────────────── */
const RING_OPTIONS = [
  { title: "אופציה 1", body: "בתוך הכיסוי (אחיזה חזקה)." },
  { title: "אופציה 2", body: "על גבי הכיסוי (אחיזה חזקה מאוד)." },
  { title: "אופציה 3", body: "ישירות על המכשיר (אחיזה מקסימלית)." },
];

function Compatibility() {
  return (
    <section className="bg-zinc-950 px-6 py-16 lg:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Right column (RTL-first): text content */}
        <FadeIn>
          <div className="text-right">
            <h2 className="font-display text-3xl font-black tracking-tight text-white lg:text-4xl">
              מתאים לכל סמארטפון!
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-400 lg:text-base">
              כל שייקר של VAULT מגיע עם שתי טבעות מתכת דקות במיוחד (עם דבק
              דו-צדדי חזק). פשוט הדביקו את הטבעת על הטלפון או על הכיסוי שלכם,
              והבטיחו חיבור מגנטי עוצמתי - גם לאייפון וגם לאנדרואיד.
            </p>
            <Link href="#shop" className={`mt-9 ${goldButton}`}>
              הזמן עכשיו
            </Link>
          </div>
        </FadeIn>

        {/* Left column: the 3 ring options */}
        <FadeIn delay={120}>
          <div>
            <p
              className="text-right text-xs font-bold tracking-[0.2em]"
              style={{ color: GOLD }}
            >
              טבעות מגנטיות לטלפון (2 יחידות מתנה בכל מארז)
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {RING_OPTIONS.map((o) => (
                <div
                  key={o.title}
                  className="rounded-xl border border-zinc-800 bg-black p-6 text-right"
                >
                  <Smartphone
                    className="h-7 w-7"
                    style={{ color: GOLD }}
                    strokeWidth={1.5}
                  />
                  <h3 className="mt-4 text-base font-bold text-white">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {o.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── What's in the box strip ─────────────────────────────────────────── */
function WhatsInTheBox() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-12 lg:px-10">
      <FadeIn>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-8 text-center sm:flex-row sm:justify-center sm:gap-4 sm:text-base">
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: GOLD }}
          >
            מה באריזה
          </span>
          <span className="hidden text-white/20 sm:inline">|</span>
          <p className="text-sm font-medium text-white/85">
            1x שייקר VAULT
            <span className="mx-3 text-white/25">|</span>
            2x טבעות מגנטיות מתאמות
            <span className="mx-3 text-white/25">|</span>
            100% ביטחון לטלפון שלך
          </p>
        </div>
      </FadeIn>
    </section>
  );
}

/* ── Footer (dark) ───────────────────────────────────────────────────── */
const FOOTER_LINKS: Record<
  "service" | "policies",
  { title: string; links: FooterLinkItem[] }
> = {
  service: {
    title: "שירות לקוחות",
    links: [
      { label: "אודות", href: "/about" },
      { label: "צור קשר", href: "mailto:adiamato119@gmail.com" },
      { label: "שאלות נפוצות (FAQ)", panel: "faq" },
      { label: "מדריך מידות", panel: "sizing" },
    ],
  },
  policies: {
    title: "מדיניות",
    links: [
      { label: "משלוחים", href: "/shipping" },
      { label: "החלפות והחזרות", href: "/returns" },
      { label: "תקנון האתר", href: "/terms" },
    ],
  },
};

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M16.5 3c.3 2.1 1.6 3.6 3.6 3.9v2.4c-1.3.1-2.5-.3-3.6-1v5.9c0 3.2-2.4 5.4-5.3 5.4-2.8 0-4.9-2.1-4.9-4.8 0-2.9 2.4-4.9 5.3-4.6v2.5c-.4-.1-.9-.2-1.3-.1-1.1.2-1.9 1-1.8 2.2.1 1.2 1 2 2.2 2 1.3 0 2.2-1 2.2-2.5V3h3.3z" />
    </svg>
  );
}

const PAYMENTS = ["VISA", "Mastercard", "PayPal", "Apple Pay", "bit"];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 lg:grid-cols-4 lg:gap-x-12">
          <div className="col-span-2 lg:col-span-1">
            <span className="font-display text-xl font-extrabold uppercase tracking-[0.3em] text-white">
              VAULT
            </span>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/50">
              שייקר מגנטי high-performance לאורח חיים אקטיבי.
            </p>
          </div>

          {[FOOTER_LINKS.service, FOOTER_LINKS.policies].map((col) => (
            <nav key={col.title} className="flex flex-col">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
                {col.title}
              </h3>
              <div className="mt-4 flex flex-col gap-3 text-white/60">
                {col.links.map((link) => (
                  <FooterLink key={link.label} item={link} />
                ))}
              </div>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white">
              הצטרפו ל-VAULT
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-white/50">
              גישה מוקדמת להשקות, מבצעים ותכני אימון.
            </p>
            <form className="mt-5 flex items-center border-b border-white/25 pb-2">
              <input
                type="email"
                aria-label="כתובת אימייל לרישום לניוזלטר"
                placeholder="כתובת אימייל"
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300 hover:text-[#e0bd6a]"
                style={{ color: GOLD }}
              >
                הירשם
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-4 text-white/60 sm:justify-start">
            <a
              href="https://www.instagram.com/amato.jewelry/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors duration-300 hover:text-[#c8a24c]"
            >
              <Instagram className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="flex items-center transition-colors duration-300 hover:text-[#c8a24c]"
            >
              <TikTokIcon className="h-[18px] w-[18px]" />
            </a>
          </div>

          <span className="text-center text-xs tracking-[0.12em] text-white/40">
            © {new Date().getFullYear()} VAULT. כל הזכויות שמורות.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="inline-flex h-6 items-center rounded-sm border border-white/15 px-2 text-[9px] font-medium tracking-[0.06em] text-white/50"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
