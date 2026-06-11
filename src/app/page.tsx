import Link from "next/link";
import { Instagram, Magnet, Droplets, Leaf } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import FooterLink, { type FooterLinkItem } from "@/components/FooterLink";
import MediaPlaceholder from "@/components/MediaPlaceholder";

const GOLD = "#c8a24c";

// Reusable gold CTA with a glowing hover.
const goldButton =
  "inline-flex items-center justify-center rounded-full bg-[#c8a24c] px-12 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition-all duration-300 ease-out hover:bg-[#e0bd6a] hover:shadow-[0_0_34px_-6px_rgba(200,162,76,0.65)]";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#0a0a0a] pt-[5.25rem] text-white">
      <main id="main-content" className="flex-1">
        <ImpactHero />
        <ProblemSolution />
        <Features />
        <MainProduct />
        <Accessories />
      </main>
      <Footer />
    </div>
  );
}

/* ── Impact hero ─────────────────────────────────────────────────────── */
function ImpactHero() {
  return (
    <section className="relative flex min-h-[calc(100vh-5.25rem)] w-full items-center justify-center overflow-hidden bg-black">
      {/* Video background — drop /videos/hero-shaker.mp4 in to replace this. */}
      <MediaPlaceholder className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/85" />

      <div dir="ltr" className="relative z-10 flex max-w-3xl flex-col items-center px-6 text-center">
        <h1 className="font-display text-5xl font-black uppercase leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
          The VAULT Shaker.
        </h1>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.28em] text-white/80 sm:text-base">
          Your Workout. Your Phone. Locked.
        </p>
        <Link href="#shop" className={`mt-10 ${goldButton}`}>
          Shop the Shaker
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-7 z-10 flex justify-center">
        <span
          className="h-9 w-[1px]"
          style={{
            background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`,
          }}
        />
      </div>
    </section>
  );
}

/* ── Problem & Solution ──────────────────────────────────────────────── */
function ProblemSolution() {
  const panels = [
    { label: "The Old Way", note: "Phone on the dirty gym floor." },
    { label: "The VAULT Way", note: "Phone locked onto your shaker." },
  ];
  return (
    <section className="bg-[#0a0a0a] px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <h2
            dir="ltr"
            className="text-center font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            No more dirty floors.
            <br className="hidden sm:block" /> No more shaky tripods.
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {panels.map((p, i) => (
            <FadeIn key={p.label} delay={i * 120}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                <MediaPlaceholder className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div dir="ltr" className="absolute inset-x-0 bottom-0 p-6">
                  <p
                    className="text-xs font-bold uppercase tracking-[0.28em]"
                    style={{ color: i === 0 ? "#9ca3af" : GOLD }}
                  >
                    {p.label}
                  </p>
                  <p className="mt-2 text-lg font-medium text-white">{p.note}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features grid ───────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: Magnet,
    title: "N52 Magnet",
    body: "Strong enough for any phone case.",
  },
  {
    icon: Droplets,
    title: "Leak-Proof",
    body: "100% secure seal for your bag.",
  },
  {
    icon: Leaf,
    title: "BPA-Free",
    body: "Highest quality materials for performance.",
  },
];

function Features() {
  return (
    <section className="border-y border-white/10 bg-black px-6 py-20 lg:px-10 lg:py-28">
      <div dir="ltr" className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3 lg:gap-12">
        {FEATURES.map(({ icon: Icon, title, body }, i) => (
          <FadeIn key={title} delay={i * 120}>
            <div className="flex flex-col items-center text-center">
              <span
                className="flex h-16 w-16 items-center justify-center rounded-full border"
                style={{ borderColor: GOLD }}
              >
                <Icon className="h-7 w-7" style={{ color: GOLD }} strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 font-display text-xl font-extrabold uppercase tracking-[0.1em] text-white">
                {title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
                {body}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ── Main product ────────────────────────────────────────────────────── */
function MainProduct() {
  return (
    <section
      id="shop"
      className="scroll-mt-24 bg-[#0a0a0a] px-6 py-20 lg:px-10 lg:py-28"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <FadeIn>
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
            <MediaPlaceholder className="absolute inset-0 h-full w-full" />
          </div>
        </FadeIn>
        <FadeIn delay={120}>
          <div className="flex flex-col">
            <p
              dir="ltr"
              className="text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              The Hero Product
            </p>
            <h2 dir="ltr" className="mt-4 font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-white lg:text-5xl">
              The VAULT Shaker
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70">
              שייקר high-performance עם מעמד טלפון מגנטי מובנה — ערבוב מושלם,
              אטימות מלאה נגד נזילות, והטלפון שלך נעול במקום לאורך כל האימון.
            </p>
            <Link href="/collections/amato-essentials" className={`mt-9 self-start ${goldButton}`}>
              Shop the Shaker
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Accessories ─────────────────────────────────────────────────────── */
const ACCESSORIES = [
  "Phone Mount",
  "Mixing Ball",
  "Leak-Proof Lid",
  "Carry Sleeve",
];

function Accessories() {
  return (
    <section className="border-t border-white/10 bg-black px-6 py-20 lg:px-10 lg:py-28">
      <div dir="ltr" className="mx-auto max-w-6xl">
        <FadeIn>
          <p
            className="text-center text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            Complete Your Setup
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black uppercase tracking-tight text-white lg:text-4xl">
            Accessories
          </h2>
        </FadeIn>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {ACCESSORIES.map((name, i) => (
            <FadeIn key={name} delay={i * 100}>
              <div className="group">
                <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10 transition-all duration-300 group-hover:border-[#c8a24c]/60">
                  <MediaPlaceholder className="absolute inset-0 h-full w-full" />
                </div>
                <p className="mt-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white/85">
                  {name}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
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
                className="shrink-0 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300 hover:text-[#c8a24c]"
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
