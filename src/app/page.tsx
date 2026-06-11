import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Magnet,
  ShieldCheck,
  Droplet,
  Grip,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import FooterLink, { type FooterLinkItem } from "@/components/FooterLink";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import Hero from "@/components/Hero";
import AutoplayVideo from "@/components/AutoplayVideo";

const GOLD = "#c8a24c";

// Reusable gold CTA with a glowing hover.
const goldButton =
  "inline-flex items-center justify-center rounded-full bg-[#c8a24c] px-12 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black transition-all duration-300 ease-out hover:bg-[#e0bd6a] hover:shadow-[0_0_34px_-6px_rgba(200,162,76,0.65)]";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#0a0a0a] pt-[5.75rem] text-white">
      <main id="main-content" className="flex-1">
        <Hero />
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
/* ── 'The Gym Life' showcase videos (side by side) ───────────────────── */
const GYM_VIDEOS = [
  "/videos/vault-magnetic-demo.mp4",
  "/videos/post_78.mp4",
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

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-2 md:grid-cols-2">
          {GYM_VIDEOS.map((src, i) => (
            <FadeIn key={src} delay={i * 100}>
              <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 transition-colors duration-300 hover:border-[#c8a24c]/50">
                <AutoplayVideo
                  src={src}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
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
type Callout = {
  icon: LucideIcon;
  label: string;
  align: "right" | "left";
  /** Label box position, as a CSS style (percent of the image container). */
  labelStyle: React.CSSProperties;
  /** Anchor dot on the bottle, in % of the container. */
  dot: { x: number; y: number };
  /** Inner endpoint of the connector line, near the label, in % of container. */
  line: { x: number; y: number };
};

const ANATOMY: Callout[] = [
  {
    icon: Droplet,
    label: "פיית שתייה היגיינית",
    align: "right",
    labelStyle: { top: "13%", right: "2%" },
    dot: { x: 49, y: 16 },
    line: { x: 67, y: 17 },
  },
  {
    icon: Magnet,
    label: "מגנט N52 עוצמתי",
    align: "right",
    labelStyle: { top: "50%", right: "2%" },
    dot: { x: 52, y: 54 },
    line: { x: 67, y: 53 },
  },
  {
    icon: Grip,
    label: "ידית נשיאה ארגונומית",
    align: "left",
    labelStyle: { top: "11%", left: "2%" },
    dot: { x: 45, y: 13 },
    line: { x: 33, y: 15 },
  },
  {
    icon: ShieldCheck,
    label: "אטימה מוחלטת לנזילות (BPA-Free)",
    align: "left",
    labelStyle: { top: "45%", left: "2%" },
    dot: { x: 48, y: 33 },
    line: { x: 33, y: 47 },
  },
];

/** A single floating callout: connector line + bottle dot + glowing label. */
function AnatomyCallout({ icon: Icon, label, align, labelStyle, dot, line }: Callout) {
  return (
    <div className="group pointer-events-none absolute inset-0">
      {/* Connector line (stretches with the container). */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden
      >
        <line
          x1={line.x}
          y1={line.y}
          x2={dot.x}
          y2={dot.y}
          stroke={GOLD}
          strokeWidth="0.25"
          className="opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        />
      </svg>

      {/* Anchor dot on the bottle part. */}
      <span
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
        aria-hidden
      >
        <span
          className="block h-2 w-2 rounded-full ring-2 ring-black/60 transition-transform duration-300 group-hover:scale-125"
          style={{ backgroundColor: GOLD }}
        />
        <span
          className="absolute inset-0 -m-1.5 rounded-full border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ borderColor: GOLD }}
        />
      </span>

      {/* Label — gold icon chip + glowing text. */}
      <div
        style={labelStyle}
        className={`pointer-events-auto absolute flex max-w-[44%] items-center gap-2.5 ${
          align === "right" ? "flex-row-reverse text-right" : "flex-row text-left"
        }`}
      >
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-black/70 backdrop-blur-sm transition-all duration-300 group-hover:shadow-[0_0_18px_-2px_rgba(200,162,76,0.7)]"
          style={{ borderColor: `${GOLD}66`, color: GOLD }}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <span className="text-xs font-semibold leading-snug text-white/85 transition-all duration-300 group-hover:text-[#c8a24c] group-hover:[text-shadow:0_0_14px_rgba(200,162,76,0.8)] lg:text-sm">
          {label}
        </span>
      </div>
    </div>
  );
}

function Anatomy() {
  return (
    <section
      id="shop"
      className="scroll-mt-24 border-y border-white/10 bg-zinc-950 px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p
            className="text-center text-[11px] font-bold tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            הנדסה מדויקת
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-white lg:text-5xl">
            המבנה המדויק של VAULT
          </h2>
        </FadeIn>

        {/* Product image with floating callouts (lg+). */}
        <FadeIn delay={120}>
          <div className="relative mx-auto mt-14 hidden aspect-[3/2] w-full max-w-3xl lg:block">
            <Image
              src="/images/vault-product-image.png"
              alt="שייקר VAULT המגנטי"
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="rounded-2xl border border-white/10 object-cover"
              priority={false}
            />
            {ANATOMY.map((c) => (
              <AnatomyCallout key={c.label} {...c} />
            ))}
          </div>
        </FadeIn>

        {/* Mobile / tablet: image + stacked feature list. */}
        <div className="mt-12 lg:hidden">
          <div className="relative mx-auto aspect-[3/2] w-full max-w-md overflow-hidden rounded-2xl border border-white/10">
            <Image
              src="/images/vault-product-image.png"
              alt="שייקר VAULT המגנטי"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {ANATOMY.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-4 transition-colors duration-300 hover:border-[#c8a24c]/50"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-black/70"
                  style={{ borderColor: `${GOLD}66`, color: GOLD }}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-semibold text-white/85 transition-colors duration-300 group-hover:text-[#c8a24c]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
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
    <section className="bg-zinc-950 px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Visuals — DOM-first so it sits on the RIGHT in RTL */}
        <FadeIn>
          <div className="mx-auto w-full max-w-md bg-transparent">
            <Image
              src="/images/compatibility-options-removebg-preview.png"
              alt="VAULT Mounting Options"
              width={1200}
              height={800}
              sizes="(min-width: 768px) 420px, 80vw"
              className="h-auto w-full object-contain"
            />
          </div>
        </FadeIn>

        {/* Content — sits on the LEFT in RTL */}
        <FadeIn delay={120}>
          <div className="text-right">
            <h2 className="font-display text-3xl font-black tracking-tight text-white lg:text-4xl">
              מתאים לכל סמארטפון!
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-400 lg:text-base">
              כל שייקר של VAULT מגיע עם שתי טבעות מתכת דקות במיוחד. פשוט מדביקים
              את הטבעת על הטלפון או על הכיסוי, ומקבלים חיבור מגנטי עוצמתי לכל
              מכשיר — אייפון או אנדרואיד.
            </p>

            <ul className="mt-8 space-y-4">
              {RING_OPTIONS.map((o) => (
                <li key={o.title} className="flex items-start gap-3">
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: GOLD }}
                    strokeWidth={1.75}
                  />
                  <p className="text-sm leading-relaxed text-zinc-300 lg:text-base">
                    <span className="font-bold text-white">{o.title}:</span>{" "}
                    {o.body}
                  </p>
                </li>
              ))}
            </ul>

            <Link href="#shop" className={`mt-9 ${goldButton}`}>
              הזמן עכשיו
            </Link>
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
