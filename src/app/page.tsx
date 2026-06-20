import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Magnet,
  ShieldCheck,
  Droplet,
  Grip,
  CheckCircle,
  Star,
  Truck,
  Lock,
  CupSoda,
  Zap,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import FooterLink, { type FooterLinkItem } from "@/components/FooterLink";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import Hero from "@/components/Hero";
import AutoplayVideo from "@/components/AutoplayVideo";
import FaqAccordion from "@/components/FaqAccordion";
import WaitlistButton from "@/components/WaitlistButton";
import { WAITLIST_MODE, EXTRAS_AVAILABLE } from "@/lib/config";

const GOLD = "#A7C7E7";

// Main product. The handle has Hebrew chars, so encode it for a safe URL;
// the [handle] route decodes it back before the Shopify lookup.
const PRODUCT_HANDLE = "vault-השייקר-המגנטי";
const PRODUCT_URL = `/product/${encodeURIComponent(PRODUCT_HANDLE)}`;

/** Primary CTA — "get notified" in pre-launch waitlist mode, else a shop link. */
function PrimaryCta({
  className,
  label,
  href = PRODUCT_URL,
}: {
  className: string;
  label: string;
  href?: string;
}) {
  if (WAITLIST_MODE) return <WaitlistButton className={className} />;
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

// Reusable gold CTA with a glowing hover.
const goldButton =
  "inline-flex w-full items-center justify-center rounded-full bg-[#A7C7E7] px-12 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black transition-all duration-300 ease-out hover:scale-105 hover:bg-[#C2DCF0] hover:shadow-[0_0_34px_-6px_rgba(167, 199, 231,0.65)] active:scale-95 active:shadow-[0_0_48px_-2px_rgba(167, 199, 231,0.95)] sm:w-auto";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-[#111111] pt-[5.75rem] text-zinc-100">
      <main id="main-content" className="flex-1">
        <Hero />
        <HowItWorks />
        <UseCases />
        <MicroConversion />
        <HorizontalStreaming />
        <Anatomy />
        <Compatibility />
        <Reviews />
        <FaqAccordion />
        <BundleBanner />
        <CompleteGear />
        <WhatsInTheBox />
      </main>
      <Footer />
    </div>
  );
}

/* ── Impact hero ─────────────────────────────────────────────────────── */
/* ── How it works (3 steps) ──────────────────────────────────────────── */
const STEPS = [
  {
    icon: Magnet,
    title: "מצמידים",
    body: "מדביקים טבעת מגנטית דקה על הטלפון או על הכיסוי — והוא נצמד לשייקר באחיזה איתנה.",
  },
  {
    icon: Zap,
    title: "מערבבים בלחיצה",
    body: "מיקסר חשמלי מובנה — בלחיצת כפתור אחת לשייק חלק לגמרי, בלי גושים, בכל פעם.",
  },
  {
    icon: CupSoda,
    title: "נהנים",
    body: "תולים את הטלפון בכל משטח מתכתי, מצלמים את האימון ושותים תוך כדי — בלי ידיים.",
  },
];

function HowItWorks() {
  return (
    <section className="bg-[#111111] px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p
            className="text-center text-[11px] font-bold tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            פשוט להפליא
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-zinc-100 lg:text-4xl">
            איך זה עובד
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-8">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <FadeIn key={title} delay={i * 120}>
              <div className="flex flex-col items-center text-center">
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full border bg-zinc-900" style={{ borderColor: `${GOLD}55`, color: GOLD }}>
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                  <span
                    className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#A7C7E7] font-display text-xs font-black text-black"
                  >
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-zinc-100">
                  {title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-400">
                  {body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Action shot — the integrated electric motor in action */}
        <FadeIn delay={120}>
          <figure className="mx-auto mt-16 w-full max-w-3xl">
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_20px_60px_-24px_rgba(167, 199, 231,0.45)]">
              <Image
                src="/images/vault-steps.png"
                alt="המנוע החשמלי המובנה של VAULT מערבל שייק חלק בלחיצת כפתור"
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 100vw, 768px"
                className="h-auto w-full"
              />
              <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#A7C7E7] backdrop-blur-sm">
                המנוע החשמלי בפעולה
              </span>
            </div>
            <figcaption className="mt-3 text-center text-xs text-zinc-500">
              המנוע החשמלי המובנה — ערבוב חלק לגמרי בלחיצת כפתור אחת.
            </figcaption>
          </figure>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── 'The Gym Life' showcase videos (side by side) ───────────────────── */
const GYM_VIDEOS = [
  "/videos/vault-magnetic-demo.mp4",
  "/videos/post_78.mp4",
];

function UseCases() {
  return (
    <section className="bg-[#18181b] px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p
            className="text-center text-[11px] font-bold tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            אורח חיים אתלטי
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-zinc-100 lg:text-4xl">
            בנוי למתאמנים בחדר הכושר
          </h2>
        </FadeIn>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-2 md:grid-cols-2">
          {GYM_VIDEOS.map((src, i) => (
            <FadeIn key={src} delay={i * 100}>
              <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 transition-colors duration-300 hover:border-[#A7C7E7]/50">
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

/* ── Micro-conversion CTA (between the video sections) ───────────────── */
function MicroConversion() {
  return (
    <section className="bg-[#111111] px-5 py-16 sm:px-6 lg:px-10">
      <FadeIn>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-2xl border border-[#A7C7E7]/40 bg-zinc-900 px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-2xl font-black tracking-tight text-zinc-100 sm:text-3xl">
            מוכנים לשדרג את האימון שלכם?
          </h2>
          <PrimaryCta
            className={`w-full sm:w-auto ${goldButton}`}
            label="הזמינו את ה-VAULT שלכם עכשיו"
          />
        </div>
      </FadeIn>
    </section>
  );
}

/* ── Horizontal streaming ────────────────────────────────────────────── */
function HorizontalStreaming() {
  return (
    <section className="bg-[#18181b] px-6 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
        {/* Text — right column in RTL */}
        <FadeIn>
          <div className="text-right">
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-zinc-100 lg:text-4xl">
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
  {
    icon: Zap,
    label: "כפתור הפעלה · מנוע חשמלי",
    align: "left",
    labelStyle: { bottom: "8%", left: "2%" },
    dot: { x: 50, y: 86 },
    line: { x: 33, y: 84 },
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
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-black/70 backdrop-blur-sm transition-all duration-300 group-hover:shadow-[0_0_18px_-2px_rgba(167, 199, 231,0.7)]"
          style={{ borderColor: `${GOLD}66`, color: GOLD }}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <span className="text-xs font-semibold leading-snug text-white/85 transition-all duration-300 group-hover:text-[#A7C7E7] group-hover:[text-shadow:0_0_14px_rgba(167, 199, 231,0.8)] lg:text-sm">
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
      className="scroll-mt-24 border-y border-white/10 bg-[#111111] px-6 py-24 lg:px-10 lg:py-36"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p
            className="text-center text-[11px] font-bold tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            הנדסה מדויקת
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-zinc-100 lg:text-5xl">
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
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-black/40 p-4 transition-colors duration-300 hover:border-[#A7C7E7]/50"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-black/70"
                  style={{ borderColor: `${GOLD}66`, color: GOLD }}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-semibold text-white/85 transition-colors duration-300 group-hover:text-[#A7C7E7]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex justify-center">
          <PrimaryCta className={goldButton} label="הזמינו עכשיו את VAULT" />
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
    <section className="bg-[#18181b] px-6 py-24 lg:px-10 lg:py-32">
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

        {/* Content — centered on mobile, sits on the LEFT in RTL desktop */}
        <FadeIn delay={120}>
          <div className="text-center md:text-right">
            <h2 className="font-display text-3xl font-black tracking-tight text-zinc-100 lg:text-4xl">
              מתאים לכל סמארטפון!
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-zinc-400 md:mx-0 lg:text-base">
              כל שייקר VAULT מגיע עם שתי טבעות מתכת דקות במיוחד. הדביקו אחת על
              הטלפון או על הכיסוי, וקבלו חיבור מגנטי עוצמתי לכל מכשיר — אייפון
              או אנדרואיד.
            </p>

            <ul className="mt-8 space-y-4">
              {RING_OPTIONS.map((o) => (
                <li
                  key={o.title}
                  className="flex items-start justify-center gap-3 text-right md:justify-start"
                >
                  <CheckCircle
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: GOLD }}
                    strokeWidth={1.75}
                  />
                  <p className="text-sm leading-relaxed text-zinc-300 lg:text-base">
                    <span className="font-bold text-zinc-100">{o.title}:</span>{" "}
                    {o.body}
                  </p>
                </li>
              ))}
            </ul>

            <PrimaryCta className={`mt-9 ${goldButton}`} label="הזמינו עכשיו" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Customer reviews ────────────────────────────────────────────────── */
const REVIEWS = [
  {
    name: "דניאל כהן",
    role: "מתאמן קרוספיט",
    rating: 5,
    text: "המגנט פשוט מטורף. הטלפון נצמד חזק ולא זז גם באמצע סט כפיפות. שדרוג רציני לאימון.",
  },
  {
    name: "נועה לוי",
    role: "מאמנת כושר",
    rating: 5,
    text: "אטום לחלוטין, קל לניקוי, והעמדה לטלפון מושלמת לצילום סרטונים. לא מוותרת עליו.",
  },
  {
    name: "איתי ברקוביץ׳",
    role: "רץ למרחקים",
    rating: 5,
    text: "איכות בנייה פרימיום שמרגישים ביד. הטבעות המגנטיות מחזיקות גם על הכיסוי. ממליץ בחום.",
  },
  {
    name: "מאיה פרץ",
    role: "יוגה ופילאטיס",
    rating: 4,
    text: "עיצוב נקי ויוקרתי, נצמד לכל משטח מתכתי בחדר. הייתי שמחה לעוד צבעים, אבל מעולה!",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`דירוג ${rating} מתוך 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4"
          style={{ color: GOLD }}
          fill={i < rating ? GOLD : "transparent"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function Reviews() {
  return (
    <section className="bg-[#111111] px-6 py-24 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p
            className="text-center text-[11px] font-bold tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            לקוחות מספרים
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-zinc-100 lg:text-4xl">
            מה אומרים על VAULT
          </h2>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <FadeIn key={r.name} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-zinc-900 p-6 text-right shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-[#A7C7E7]/40 hover:shadow-[0_16px_44px_-16px_rgba(167, 199, 231,0.4)]">
                <div className="flex justify-end">
                  <StarRating rating={r.rating} />
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-zinc-300">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-800 font-display text-sm font-bold text-zinc-300">
                    {r.name.trim().charAt(0)}
                  </span>
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-bold text-zinc-100">
                      {r.name}
                      <BadgeCheck
                        className="h-4 w-4"
                        style={{ color: GOLD }}
                        strokeWidth={2}
                        aria-label="לקוח מאומת"
                      />
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      לקוח מאומת · {r.role}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Bundle & Save banner ────────────────────────────────────────────── */
function BundleBanner() {
  return (
    <section className="bg-[#111111] px-6 pb-4 lg:px-10">
      <FadeIn>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border border-[#A7C7E7]/30 bg-zinc-950 p-8 md:grid-cols-2 lg:p-12">
          {/* Visual — DOM-first: top on mobile, right column in RTL desktop */}
          <div className="w-full bg-transparent">
            <Image
              src="/images/accessory-bundle-set.png"
              alt="סט VAULT המלא — שייקר ואביזרים"
              width={1200}
              height={900}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="mx-auto h-auto w-full object-contain"
              priority={false}
            />
          </div>

          {/* Content — left column in RTL desktop */}
          <div className="flex flex-col items-center text-center md:items-end md:text-right">
            <p
              className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: GOLD }}
            >
              Bundle &amp; Save
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-zinc-100 lg:text-4xl">
              קנו סט אימון מלא וחסכו{" "}
              <span style={{ color: GOLD }}>15%</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-300 lg:text-base">
              השייקר המגנטי + כל האביזרים המשלימים, במחיר משתלם במיוחד — לזמן
              מוגבל בלבד.
            </p>

            {/* Price box when available; "Coming Soon" otherwise. */}
            {EXTRAS_AVAILABLE ? (
              <div className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-[#A7C7E7]/30 bg-black/40 px-6 py-4">
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                    מחיר מלא
                  </span>
                  <span className="text-lg font-bold text-zinc-500 line-through decoration-zinc-600">
                    520₪
                  </span>
                </div>
                <span className="h-10 w-px bg-[#A7C7E7]/20" aria-hidden />
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                    מחיר מבצע
                  </span>
                  <span
                    className="font-display text-3xl font-black leading-none lg:text-4xl"
                    style={{ color: GOLD }}
                  >
                    רק 400₪
                  </span>
                </div>
              </div>
            ) : (
              <p
                className="mt-7 text-sm font-bold uppercase tracking-[0.25em]"
                style={{ color: GOLD }}
              >
                בקרוב · Coming Soon
              </p>
            )}

            {EXTRAS_AVAILABLE ? (
              <PrimaryCta
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#A7C7E7] px-10 py-4 text-sm font-black uppercase tracking-[0.12em] text-black shadow-[0_0_30px_-4px_rgba(167, 199, 231,0.7)] transition-all duration-300 ease-out hover:scale-105 hover:bg-[#C2DCF0] hover:shadow-[0_0_44px_-4px_rgba(167, 199, 231,0.9)] active:scale-95 active:shadow-[0_0_56px_-2px_rgba(167, 199, 231,1)] sm:w-auto"
                label="קנו עכשיו ב-400₪"
              />
            ) : (
              <WaitlistButton
                label="הודיעו לי כשזמין"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#A7C7E7] px-10 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#A7C7E7] transition-all duration-300 ease-out hover:scale-105 hover:bg-[#A7C7E7] hover:text-black hover:shadow-[0_0_34px_-6px_rgba(167, 199, 231,0.65)] active:scale-95 sm:w-auto"
              />
            )}
            {EXTRAS_AVAILABLE && (
              <p className="mt-3 text-xs font-medium tracking-wide text-zinc-400">
                חיסכון של 120₪ במבצע השקה בלבד
              </p>
            )}

            {/* Launch-stock progress bar — only when on sale */}
            {EXTRAS_AVAILABLE && (
            <div className="mt-7 w-full max-w-xs">
              <div className="mb-2 flex items-center justify-between text-[11px] font-bold tracking-wide">
                <span className="text-zinc-300">85% מהמלאי להשקה נמכר</span>
              </div>
              <div
                className="h-2 w-full overflow-hidden rounded-full bg-[#111111]"
                role="progressbar"
                aria-valuenow={85}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="אחוז המלאי שנמכר"
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "85%",
                    backgroundColor: GOLD,
                    boxShadow: "0 0 12px -2px rgba(167, 199, 231,0.8)",
                  }}
                />
              </div>
              <p className="mt-2 text-[11px] font-medium tracking-wide text-zinc-500">
                המבצע מסתיים ברגע שהמלאי יאזל
              </p>
            </div>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ── Complete Your Gear (complementary products) ─────────────────────── */
const GEAR_PRODUCTS = [
  {
    title: "טבעות מגנטיות (זוג נוסף)",
    price: "₪39",
    image: "/images/accessory-magnetic-ring.png",
  },
  {
    title: "מגבת אימון פרימיום",
    price: "₪45",
    image: "/images/accessory-gym-towel.png",
  },
  {
    title: "מברשת ניקוי לשייקר",
    price: "₪19",
    image: "/images/accessory-cleaning-brush.png",
  },
  {
    title: "נרתיק מגנטי לאוזניות",
    price: "₪35",
    image: "/images/accessory-earphone-case.png",
  },
];

function CompleteGear() {
  return (
    <section
      id="accessories"
      className="scroll-mt-24 bg-[#18181b] px-6 py-24 lg:px-10 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p
            className="text-center text-[11px] font-bold tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            אביזרים משלימים
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-zinc-100 lg:text-4xl">
            השלימו את הציוד שלכם
          </h2>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-4">
          {GEAR_PRODUCTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 80}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-[#A7C7E7]/50 hover:shadow-[0_16px_44px_-16px_rgba(167, 199, 231,0.45)]">
                {/* Product image */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-800">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Details */}
                <div className="flex flex-1 flex-col p-5 text-right">
                  <h3 className="text-sm font-bold leading-snug text-zinc-100 lg:text-base">
                    {p.title}
                  </h3>
                  {EXTRAS_AVAILABLE ? (
                    <p
                      className="mt-2 text-base font-bold tabular-nums"
                      style={{ color: GOLD }}
                    >
                      {p.price}
                    </p>
                  ) : (
                    <p
                      className="mt-2 text-xs font-semibold uppercase tracking-[0.12em]"
                      style={{ color: GOLD }}
                    >
                      בקרוב
                    </p>
                  )}
                  {EXTRAS_AVAILABLE ? (
                    <Link
                      href={PRODUCT_URL}
                      className="mt-5 inline-flex items-center justify-center rounded-full border border-[#A7C7E7] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#A7C7E7] transition-all duration-300 ease-out hover:scale-105 hover:bg-[#A7C7E7] hover:text-black hover:shadow-[0_0_24px_-4px_rgba(167, 199, 231,0.8)] active:scale-95"
                    >
                      הוספה מהירה
                    </Link>
                  ) : (
                    <WaitlistButton
                      label="הודיעו לי"
                      className="mt-5 inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-zinc-300 transition-all duration-300 ease-out hover:border-[#A7C7E7] hover:text-[#A7C7E7]"
                    />
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Trust & guarantees banner ───────────────────────────────────────── */
const TRUST_ITEMS = [
  { icon: Truck, label: "משלוח מהיר לכל הארץ" },
  { icon: ShieldCheck, label: "אחריות מלאה על המוצר" },
  { icon: Lock, label: "רכישה מאובטחת ומוצפנת" },
];

function WhatsInTheBox() {
  return (
    <section className="border-t border-white/10 bg-[#111111] px-6 py-14 lg:px-10">
      <FadeIn>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <Icon
                className="h-7 w-7"
                style={{ color: GOLD }}
                strokeWidth={1.5}
              />
              <span className="text-sm font-medium tracking-wide text-white/90 lg:text-base">
                {label}
              </span>
            </div>
          ))}
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
      { label: "מפרט המוצר", panel: "sizing" },
    ],
  },
  policies: {
    title: "מדיניות",
    links: [
      { label: "מדיניות משלוחים", href: "/shipping" },
      { label: "החזרות וזיכויים", href: "/returns" },
      { label: "מדיניות פרטיות", href: "/privacy" },
      { label: "תנאי שימוש", href: "/terms" },
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

/* Branded payment / security marks rendered as small icon badges. */
function VisaIcon() {
  return (
    <span className="inline-flex h-6 w-10 items-center justify-center rounded bg-white">
      <span className="font-display text-[11px] font-black italic tracking-tight text-[#1a1f71]">
        VISA
      </span>
    </span>
  );
}

function MastercardIcon() {
  return (
    <span className="inline-flex h-6 w-10 items-center justify-center rounded bg-white">
      <svg viewBox="0 0 32 20" className="h-4" aria-hidden>
        <circle cx="13" cy="10" r="6" fill="#EB001B" />
        <circle cx="19" cy="10" r="6" fill="#F79E1B" />
        <path d="M16 5.2a6 6 0 0 0 0 9.6 6 6 0 0 0 0-9.6z" fill="#FF5F00" />
      </svg>
    </span>
  );
}

function ApplePayIcon() {
  return (
    <span className="inline-flex h-6 w-10 items-center justify-center gap-0.5 rounded bg-white text-black">
      <svg viewBox="0 0 24 24" className="h-3" fill="currentColor" aria-hidden>
        <path d="M16.3 12.9c0-1.9 1.6-2.8 1.6-2.9-.9-1.3-2.2-1.5-2.7-1.5-1.1-.1-2.2.7-2.8.7-.6 0-1.5-.6-2.4-.6-1.2 0-2.4.7-3 1.8-1.3 2.2-.3 5.5.9 7.3.6.9 1.3 1.9 2.2 1.8.9 0 1.2-.6 2.3-.6 1 0 1.3.6 2.3.5 1 0 1.6-.9 2.2-1.8.4-.6.6-1.2.8-1.8-1.7-.6-1.7-2.1-1.7-2.4zM14.6 7.3c.5-.6.8-1.4.7-2.3-.7 0-1.6.5-2.1 1.1-.5.5-.9 1.4-.7 2.2.8.1 1.6-.4 2.1-1z" />
      </svg>
      <span className="text-[10px] font-semibold">Pay</span>
    </span>
  );
}

const PAYMENT_ICONS = [
  { key: "visa", label: "Visa", Icon: VisaIcon },
  { key: "mastercard", label: "Mastercard", Icon: MastercardIcon },
  { key: "applepay", label: "Apple Pay", Icon: ApplePayIcon },
];

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#111111] text-zinc-100">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 lg:grid-cols-4 lg:gap-x-12">
          <div className="col-span-2 lg:col-span-1">
            <span className="font-display text-xl font-extrabold uppercase tracking-[0.3em] text-zinc-100">
              VAULT
            </span>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-white/50">
              שייקר מגנטי high-performance לאורח חיים אקטיבי.
            </p>
          </div>

          {[FOOTER_LINKS.service, FOOTER_LINKS.policies].map((col) => (
            <nav key={col.title} className="flex flex-col">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-100">
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
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-100">
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
                className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300 hover:text-[#C2DCF0]"
                style={{ color: GOLD }}
              >
                הירשמו
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-4 text-white/60 sm:justify-start">
            <a
              href="https://www.instagram.com/vaultshaker/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors duration-300 hover:text-[#A7C7E7]"
            >
              <Instagram className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </a>
            <a
              href="https://www.tiktok.com/@vaultshaker"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex items-center transition-colors duration-300 hover:text-[#A7C7E7]"
            >
              <TikTokIcon className="h-[18px] w-[18px]" />
            </a>
          </div>

          <span className="text-center text-xs tracking-[0.12em] text-white/60">
            © VAULT 2026. כל הזכויות שמורות.
          </span>

          <div className="flex flex-col items-center gap-2 sm:items-end">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
              {PAYMENT_ICONS.map(({ key, label, Icon }) => (
                <span key={key} aria-label={label} title={label}>
                  <Icon />
                </span>
              ))}
            </div>
            <span className="flex items-center gap-1.5 text-[11px] tracking-[0.06em] text-white/60">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.75} />
              תשלום מאובטח ב-100%
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
