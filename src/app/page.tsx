import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Magnet,
  ShieldCheck,
  Droplet,
  Grip,
  CheckCircle,
  RotateCcw,
  Star,
  Truck,
  Lock,
  CupSoda,
  Zap,
  BadgeCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import FooterLink, { type FooterLinkItem } from "@/components/FooterLink";
import MediaPlaceholder from "@/components/MediaPlaceholder";
import Hero from "@/components/Hero";
import FaqAccordion from "@/components/FaqAccordion";
import WaitlistButton from "@/components/WaitlistButton";
import { WAITLIST_MODE, EXTRAS_AVAILABLE } from "@/lib/config";

const GOLD = "#2952e3";

// Main product. The handle has Hebrew chars, so encode it for a safe URL;
// the [handle] route decodes it back before the Shopify lookup.
const PRODUCT_HANDLE = "vault-magnetic-shaker";
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
  "inline-flex w-full items-center justify-center rounded-full bg-[#2952e3] px-12 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_10px_36px_-10px_rgba(41,82,227,0.5)] ring-1 ring-[#2952e3]/40 transition-all duration-300 ease-out hover:scale-105 hover:bg-[#4169e5] hover:shadow-[0_0_40px_-4px_rgba(41,82,227,0.65)] active:scale-95 active:shadow-[0_0_48px_-2px_rgba(41,82,227,0.75)] sm:w-auto";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-surface pb-24 pt-[5.75rem] text-zinc-900 lg:pb-0">
      <main id="main-content" className="flex-1">
        <Hero />
        {/* Exact landing-page section order (per brief) */}
        <ProblemSection />          {/* מכירים את זה? */}
        <ElectricMixSection />      {/* לוחצים. והוא מערבב לבד. */}
        <HorizontalStreaming />     {/* ויש עליו גם מעמד מגנטי לטלפון */}
        <CleaningSection />         {/* ומה עם הניקוי? */}
        <Anatomy />                 {/* בקיצור, הכול בשייקר אחד */}
        <Compatibility />          {/* אבל האם המגנט באמת מחזיק? */}
        <Reviews />                 {/* כבר משתמשים בו באימונים */}
        <BundleSection />           {/* למה עכשיו שניים? */}
        <VaultInActionSection />    {/* ראה את ה-VAULT בפעולה */}
        <WhatsInTheBox />           {/* unified-policy reassurance strip */}
        <FaqAccordion />            {/* שאלות נפוצות */}
      </main>
      <Footer />
      <StickyBuyBar />
    </div>
  );
}

/* ── 1 · מכירים את זה? (problem / agitation) ─────────────────────────── */
const PAINS = [
  "הטלפון על הרצפה של המכון — ואתם מתפללים שאף אחד לא ידרוך עליו.",
  "שייק מלא גושים של אבקה שלא נמסה עד הסוף.",
  "שייקר שנפתח בתיק ומרטיב לכם את כל הבגדים.",
];

function ProblemSection() {
  return (
    <section className="bg-surface px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <h2 className="font-display text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
            מכירים את זה?
          </h2>
        </FadeIn>
        <FadeIn delay={120}>
          <ul dir="rtl" className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-right">
            {PAINS.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-base leading-[1.6] text-[#2D3748] shadow-[0_4px_16px_-6px_rgba(0,0,0,0.08)]"
              >
                <X className="mt-0.5 h-5 w-5 shrink-0 text-red-500" strokeWidth={2.5} />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-display text-xl font-bold text-zinc-900 sm:text-2xl">
            נמאס לנו מזה. אז בנינו את VAULT.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── 2 · לוחצים. והוא מערבב לבד. (electric motor) ────────────────────── */
function ElectricMixSection() {
  return (
    <section className="bg-surface-alt px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
        <FadeIn>
          <div className="text-center md:text-right">
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-zinc-900 lg:text-4xl">
              לוחצים. והוא מערבב לבד.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base leading-[1.7] text-[#2D3748] md:mx-0 lg:text-lg">
              מנוע חשמלי חזק שמערבב את החלבון בשניות —{" "}
              <strong className="font-bold text-[#111111]">שייק חלק לגמרי, בלי גושים</strong>.
              בלי לנער. לחיצה אחת וזהו.
            </p>
            <PrimaryCta className={`mt-8 ${goldButton}`} label="לבחירת צבעים והזמנה ←" />
          </div>
        </FadeIn>
        <FadeIn delay={120} className="order-first md:order-none">
          {/* Looping muted demo video. .mov → quicktime + mp4-labelled sources;
              poster covers browsers that can't decode QuickTime. */}
          <div className="mx-auto w-full max-w-sm">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={`/images/${encodeURIComponent("שייקר חדש2.jpeg")}`}
              aria-label="שייקר VAULT בפעולה — הדגמה"
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-900 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.4)]"
            >
              <source
                src={`/videos/${encodeURIComponent("סרטון הסבר מגנט.mov")}`}
                type="video/quicktime"
              />
              <source
                src={`/videos/${encodeURIComponent("סרטון הסבר מגנט.mov")}`}
                type="video/mp4"
              />
            </video>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── 4 · ומה עם הניקוי? (cleaning) ───────────────────────────────────── */
const CLEAN_STEPS = [
  "ממלאים מים וטיפת סבון",
  "מפעילים את המנוע ל-5 שניות",
  "שוטפים — ונקי לגמרי",
];

function CleaningSection() {
  return (
    <section className="bg-surface px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <h2 className="font-display text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
            ומה עם הניקוי?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-[1.7] text-[#2D3748] lg:text-lg">
            פשוט ומהיר. מים, טיפת סבון והמנוע עצמו עושים את העבודה — כל החלקים מתפרקים ומגיעים לכל פינה, בלי מאמץ.
          </p>
        </FadeIn>
        <FadeIn delay={120}>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CLEAN_STEPS.map((s, i) => (
              <div
                key={s}
                className="flex flex-col items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.08)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2952e3] font-display text-sm font-black text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-zinc-800">{s}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── 8 · למה עכשיו שניים? (bundle — second shaker ₪50) ───────────────── */
function BundleSection() {
  return (
    <section className="bg-surface-alt px-6 py-12 lg:px-10 lg:py-16">
      <FadeIn>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <p className="text-[11px] font-bold tracking-[0.3em] text-zinc-500">
            מבצע השקה · מלאי מוגבל
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
            למה עכשיו שניים?
          </h2>
          <p className="max-w-xl text-lg leading-[1.7] text-[#2D3748]">
            כי השני עולה רק <strong className="font-bold text-[#111111]">50 ₪</strong>. אחד לכם
            ואחד לפרטנר לאימונים (או גיבוי לתיק) — במקום מחיר מלא. מבצע השקה, מוגבל במלאי.
          </p>
          <PrimaryCta className={goldButton} label="להזמנה השני ב-50 ₪ ←" />
          <div className="mt-1 flex flex-col items-center gap-1.5">
            <p className="text-xs font-medium tracking-wide text-zinc-600">
              🔒 תשלום מאובטח | משלוח חינם | 30 יום להחזרה
            </p>
            <p className="text-[11px] font-medium tracking-[0.08em] text-zinc-400">
              Apple Pay | Google Pay | כרטיס אשראי
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ── See it in action — the previous hero clip, relocated near the bottom ── */
function VaultInActionSection() {
  return (
    <section className="bg-surface-alt px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <p className="text-center text-[11px] font-bold tracking-[0.3em] text-zinc-500">
            בפעולה
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
            ראה את ה-VAULT בפעולה
          </h2>
        </FadeIn>
        <FadeIn delay={120}>
          <div className="mx-auto mt-10 overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_24px_70px_-28px_rgba(0,0,0,0.4)]">
            <video
              src={`/videos/${encodeURIComponent("שייקר חדש4.mp4")}`}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={`/images/${encodeURIComponent("שייקר חדש2.jpeg")}`}
              aria-label="שייקר VAULT בפעולה — טכנולוגיית Mag-Grip בחדר הכושר"
              className="aspect-video w-full bg-zinc-900 object-cover"
            />
          </div>
          <div className="mt-8 flex justify-center">
            <PrimaryCta className={goldButton} label="לבחירת צבעים והזמנה ←" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── How it works (3 steps) ──────────────────────────────────────────── */
const STEPS = [
  {
    icon: Magnet,
    title: "מצמידים",
    body: "טבעת מגנטית דקה, חיבור מיידי ואחיזה איתנה.",
  },
  {
    icon: Zap,
    title: "מערבבים בלחיצה",
    body: "לחיצה אחת לשייק חלק, בלי גושים.",
  },
  {
    icon: CupSoda,
    title: "נהנים",
    body: "נצמד לכל משטח מתכתי. ידיים חופשיות והאימון מתועד.",
  },
];

/* ── VaultShaker vs. the rest — 3-way comparison (pure HTML, no graphic) ── */
type CompareValue = boolean | string;
const COMPARISON_ROWS: {
  feature: string;
  vault: CompareValue;
  electric: CompareValue;
  classic: CompareValue;
}[] = [
  {
    feature: "נפח נוח ליד",
    vault: "700 מ״ל",
    electric: "600 מ״ל+",
    classic: "900 מ״ל",
  },
  {
    feature: "קל על המגנט ונכנס למחזיק כוסות",
    vault: true,
    electric: false,
    classic: false,
  },
  {
    feature: "מנוע חשמלי לערבוב מיידי",
    vault: true,
    electric: true,
    classic: false,
  },
  {
    feature: "שייק מרוכז, בלי אוויר וקצף",
    vault: true,
    electric: false,
    classic: false,
  },
  {
    feature: "מגנט N52 לטלפון",
    vault: true,
    electric: false,
    classic: false,
  },
  {
    feature: "אטימה מלאה נגד נזילות",
    vault: true,
    electric: "חלקית",
    classic: false,
  },
];

/** One comparison-table cell — a yes/no icon, or a text value (e.g. volume). */
function CompareCell({
  value,
  highlight = false,
}: {
  value: CompareValue;
  highlight?: boolean;
}) {
  if (value === true)
    return (
      <CheckCircle
        className="mx-auto h-5 w-5 text-[#2952e3]"
        strokeWidth={2}
        aria-label="כן"
      />
    );
  if (value === false)
    return (
      <X className="mx-auto h-5 w-5 text-zinc-300" strokeWidth={2} aria-label="לא" />
    );
  return (
    <span
      className={
        highlight
          ? "font-display text-base font-black text-[#111111]"
          : "text-sm text-zinc-500"
      }
    >
      {value}
    </span>
  );
}

function HowItWorks() {
  return (
    <section className="bg-surface px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-center text-[11px] font-bold tracking-[0.3em] text-zinc-500">
פשוט. חכם. מהיר.
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-[#000000] lg:text-4xl">
            איך זה עובד
          </h2>
        </FadeIn>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <FadeIn key={title} delay={i * 120}>
              <div className="flex h-full flex-col items-center rounded-2xl bg-white p-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#2952e3]/10 text-[#2952e3]">
                  <Icon className="h-7 w-7" strokeWidth={1.5} />
                  <span
                    className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#2952e3] font-display text-xs font-black text-white"
                  >
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-[#000000]">
                  {title}
                </h3>
                <p className="mt-3 max-w-xs text-base leading-[1.7] text-[#2D3748]">
                  {body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 700ml positioning + 3-way comparison table (replaces the old
            static steps graphic — lighter, scannable, no image weight). */}
        <FadeIn delay={120}>
          <div dir="rtl" className="mx-auto mt-12 max-w-3xl">
            <h3 className="text-center font-display text-2xl font-black tracking-tight text-[#000000] sm:text-3xl">
              נפח 700 מ״ל. בדיוק כמו שצריך.
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-center text-base leading-[1.7] text-[#2D3748]">
              קיבולת נדיבה שמספיקה לשייק חלבון מלא ולמים לאורך כל האימון, ועדיין{" "}
              <strong className="font-bold text-[#111111]">נכנסת בול למחזיק הכוסות</strong>{" "}
              ולתיק האימונים. התוצאה: שייק חלק וקטיפתי, בלי גושים.
            </p>

            <div className="mt-10 overflow-x-auto rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <table className="w-full min-w-0 border-collapse text-right sm:min-w-[540px]">
                <thead>
                  <tr>
                    <th scope="col" className="p-2 sm:p-4" />
                    <th
                      scope="col"
                      className="rounded-t-xl bg-[#2952e3]/[0.06] px-2 py-3 text-center font-display text-xs font-black tracking-tight text-[#2952e3] sm:p-4 sm:text-sm"
                    >
                      VaultShaker
                    </th>
                    <th
                      scope="col"
                      className="px-1.5 py-3 text-center text-[11px] font-bold leading-tight text-zinc-500 sm:p-4 sm:text-xs"
                    >
                      חשמלי סטנדרטי
                    </th>
                    <th
                      scope="col"
                      className="px-1.5 py-3 text-center text-[11px] font-bold leading-tight text-zinc-500 sm:p-4 sm:text-xs"
                    >
                      שייקר קלאסי
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => {
                    const isLast = i === COMPARISON_ROWS.length - 1;
                    return (
                      <tr key={row.feature} className="border-t border-zinc-100">
                        <th
                          scope="row"
                          className="py-3 pe-2 ps-1 text-xs font-semibold leading-snug text-zinc-800 sm:p-4 sm:text-sm"
                        >
                          {row.feature}
                        </th>
                        <td
                          className={`bg-[#2952e3]/[0.06] px-1.5 py-3 text-center sm:p-4 ${
                            isLast ? "rounded-b-xl" : ""
                          }`}
                        >
                          <CompareCell value={row.vault} highlight />
                        </td>
                        <td className="px-1.5 py-3 text-center sm:p-4">
                          <CompareCell value={row.electric} />
                        </td>
                        <td className="px-1.5 py-3 text-center sm:p-4">
                          <CompareCell value={row.classic} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Micro-conversion CTA (between the video sections) ───────────────── */
function MicroConversion() {
  return (
    <section className="bg-surface px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
      <FadeIn>
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-2xl font-black tracking-tight text-zinc-900 sm:text-3xl">
            מוכנים לשדרג את האימון שלכם?
          </h2>
          <PrimaryCta
            className={`w-full sm:w-auto ${goldButton}`}
            label="הזמינו את VAULT עכשיו"
          />
        </div>
      </FadeIn>
    </section>
  );
}

/* ── Horizontal streaming ────────────────────────────────────────────── */
function HorizontalStreaming() {
  return (
    <section className="bg-surface-alt px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
        {/* Text — right column in RTL */}
        <FadeIn>
          <div className="text-right">
            <h2 className="font-display text-3xl font-black leading-tight tracking-tight text-zinc-900 lg:text-4xl">
              ויש עליו גם מעמד מגנטי לטלפון
            </h2>
            <p className="mt-6 max-w-md text-base leading-[1.7] text-[#2D3748] lg:text-lg">
              מגנט חזק שמצמיד את הטלפון לכל משטח מתכתי ומשמש בתור מעמד לטלפון —
              בכל מקום, בכל זמן.{" "}
              <br className="hidden lg:block" />
              בגובה העיניים, ידיים חופשיות: צופים במשחק, בסדרה או בסרטון אימון, ומצלמים את הסט בלי להחזיק כלום.
            </p>
          </div>
        </FadeIn>

        {/* Image — left column on desktop, on TOP on mobile */}
        <FadeIn delay={120} className="order-first md:order-none">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <Image
              src="/images/שייקר חדש1.jpeg"
              alt="שייקר VAULT החשמלי מוצמד למתקן משקולות עם טלפון לרוחב שמשדר משחק"
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
};

const ANATOMY: Callout[] = [
  { icon: Droplet, label: "פייה נוחה לשתייה ישירה" },
  { icon: Zap, label: "מנוע חשמלי — שייק חלק בלי גושים" },
  { icon: Magnet, label: "מגנט N52 שנצמד לכל מכונה" },
  { icon: Grip, label: "ידית נוחה לאחיזה" },
  { icon: ShieldCheck, label: "גוף שקוף נטול BPA · אטום 100%" },
];

function Anatomy() {
  return (
    <section
      id="shop"
      className="scroll-mt-24 border-y border-zinc-200 bg-surface px-6 py-12 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <p className="text-center text-[11px] font-bold tracking-[0.3em] text-zinc-500">
            הכול במקום אחד
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-zinc-900 lg:text-5xl">
            בקיצור, הכול בשייקר אחד
          </h2>
        </FadeIn>

        {/* Product image + feature list — clean shot at all breakpoints. */}
        <div className="mt-12 lg:mt-14">
          <div className="relative mx-auto aspect-[3/2] w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)]">
            <Image
              src="/images/שייקר חדש2.jpeg"
              alt="שייקר VAULT החשמלי — גוף שקוף עם בסיס מנוע ומעמד טלפון מובנה"
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          <ul className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-2">
            {ANATOMY.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-100 p-4 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] transition-colors duration-300 hover:border-[#2952e3]/50"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white"
                  style={{ borderColor: `${GOLD}66`, color: GOLD }}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-[#2952e3]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 flex justify-center">
          <PrimaryCta className={goldButton} label="לבחירת צבעים והזמנה ←" />
        </div>
      </div>
    </section>
  );
}

/* ── Compatibility (magnetic rings) ──────────────────────────────────── */
const RING_OPTIONS = [
  { title: "אופציה 1", body: "בתוך הכיסוי — אחיזה חזקה" },
  { title: "אופציה 2", body: "על גבי הכיסוי — אחיזה חזקה מאוד" },
  { title: "אופציה 3", body: "ישירות על המכשיר — אחיזה מקסימלית" },
];

function Compatibility() {
  return (
    <section className="bg-surface-alt px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Visuals — DOM-first so it sits on the RIGHT in RTL */}
        <FadeIn>
          <div className="mx-auto w-full max-w-md bg-transparent">
            <Image
              src="/images/compatibility-options-removebg-preview.png"
              alt="שלוש אפשרויות הצמדה מגנטית של הטלפון — בתוך הכיסוי, על גביו וישירות על המכשיר"
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
            <h2 className="font-display text-3xl font-black tracking-tight text-zinc-900 lg:text-4xl">
              אבל האם המגנט באמת מחזיק?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-base leading-[1.7] text-[#2D3748] md:mx-0 lg:text-lg">
              כן. מגנט N52 — הדרגה החזקה ביותר — נצמד חזק ולא זז, גם באמצע סט.{" "}
              <br className="hidden lg:block" />
              כל מארז כולל שתי טבעות מתכת דקות; מדביקים אחת על הטלפון, ומתאים לכל מכשיר — אייפון או אנדרואיד.
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
                  <p className="text-sm leading-relaxed text-zinc-600 lg:text-base">
                    <span className="font-bold text-zinc-900">{o.title}:</span>{" "}
                    {o.body}
                  </p>
                </li>
              ))}
            </ul>

            <PrimaryCta className={`mt-9 ${goldButton}`} label="לבחירת צבעים והזמנה ←" />
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
    text: "המגנט פשוט מטורף. הטלפון נצמד חזק ולא זז גם באמצע סט כפיפות. שדרוג רציני.",
  },
  {
    name: "נועה לוי",
    role: "מאמנת כושר",
    rating: 5,
    text: "אטום לגמרי וקל לניקוי, והמעמד לטלפון מושלם לצילום. לא מוותרת עליו.",
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
    text: "עיצוב נקי ויוקרתי שנצמד לכל משטח מתכתי. הייתי שמחה לעוד צבעים, אבל מעולה!",
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
    <section className="bg-surface-sport px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-center text-[11px] font-bold tracking-[0.3em] text-zinc-500">
            לקוחות מספרים
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-[#000000] lg:text-4xl">
            כבר משתמשים בו באימונים
          </h2>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <FadeIn key={r.name} delay={i * 80}>
              <figure className="flex h-full flex-col rounded-2xl bg-white p-8 text-right shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]">
                <div className="flex justify-end">
                  <StarRating rating={r.rating} />
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-[1.7] text-[#2D3748]">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-zinc-200 pt-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-200 font-display text-sm font-bold text-zinc-700">
                    {r.name.trim().charAt(0)}
                  </span>
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-bold text-zinc-900">
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
    <section className="bg-surface px-6 pb-4 lg:px-10">
      <FadeIn>
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl border border-[#2952e3]/30 bg-zinc-100 p-8 shadow-[0_8px_28px_-6px_rgba(41,82,227,0.12)] md:grid-cols-2 lg:p-12">
          {/* Visual — DOM-first: top on mobile, right column in RTL desktop */}
          <div className="w-full bg-transparent">
            <Image
              src="/images/vault-bundle-new.png"
              alt="סט VAULT המלא — שייקר חשמלי, טבעת מגנטית, נרתיק אוזניות, מגבת ומברשת ניקוי"
              width={1200}
              height={900}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="mx-auto h-auto w-full object-contain"
              priority={false}
            />
          </div>

          {/* Content — left column in RTL desktop */}
          <div className="flex flex-col items-center text-center md:items-end md:text-right">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
              Bundle &amp; Save
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-zinc-900 lg:text-4xl">
              קנו סט אימון מלא וחסכו 15%
            </h2>
            <p className="mt-4 max-w-md text-base leading-[1.7] text-[#2D3748] lg:text-lg">
              השייקר המגנטי + כל האביזרים המשלימים במחיר שלא יחזור.{" "}
              <br className="hidden lg:block" />
              מלאי מוגבל לזמן קצר.
            </p>

            {/* Price box when available; "Coming Soon" otherwise. */}
            {EXTRAS_AVAILABLE ? (
              <div className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-6 py-4 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]">
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                    מחיר מלא
                  </span>
                  <span className="text-lg font-bold text-zinc-500 line-through decoration-zinc-300">
                    520₪
                  </span>
                </div>
                <span className="h-10 w-px bg-zinc-200" aria-hidden />
                <div className="flex flex-col items-center">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                    מחיר מבצע
                  </span>
                  <span className="font-display text-3xl font-black leading-none text-zinc-900 lg:text-4xl">
                    רק 400₪
                  </span>
                </div>
              </div>
            ) : (
              <p className="mt-7 text-sm font-bold uppercase tracking-[0.25em] text-zinc-500">
                אזל זמנית — חוזר בקרוב
              </p>
            )}

            {EXTRAS_AVAILABLE ? (
              <PrimaryCta
                className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#2952e3] px-10 py-4 text-sm font-black uppercase tracking-[0.12em] text-white shadow-[0_0_30px_-4px_rgba(41,82,227,0.5)] transition-all duration-300 ease-out hover:scale-105 hover:bg-[#4169e5] hover:shadow-[0_0_44px_-4px_rgba(41,82,227,0.65)] active:scale-95 active:shadow-[0_0_56px_-2px_rgba(41,82,227,0.75)] sm:w-auto"
                label="קנו עכשיו ב-400₪"
              />
            ) : (
              <WaitlistButton
                label="הודיעו לי כשזמין"
                className="mt-7 inline-flex w-full items-center justify-center rounded-full border border-[#2952e3] px-10 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#2952e3] transition-all duration-300 ease-out hover:scale-105 hover:bg-[#2952e3] hover:text-white hover:shadow-[0_0_34px_-6px_rgba(41,82,227,0.45)] active:scale-95 sm:w-auto"
              />
            )}
            {EXTRAS_AVAILABLE && (
              <p className="mt-3 text-xs font-medium tracking-wide text-zinc-500">
                חיסכון של 120₪ במבצע השקה בלבד
              </p>
            )}

            {/* Launch-stock progress bar — only when on sale */}
            {EXTRAS_AVAILABLE && (
            <div className="mt-7 w-full max-w-xs">
              <div className="mb-2 flex items-center justify-between text-[11px] font-bold tracking-wide">
                <span className="text-zinc-600">85% מהמלאי להשקה נמכר</span>
              </div>
              <div
                className="h-2 w-full overflow-hidden rounded-full bg-zinc-200"
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
                    boxShadow: "0 0 12px -2px rgba(41,82,227,0.8)",
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
      className="scroll-mt-24 bg-surface-alt px-6 py-12 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="text-center text-[11px] font-bold tracking-[0.3em] text-zinc-500">
            אביזרים משלימים
          </p>
          <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-zinc-900 lg:text-4xl">
            השלימו את הציוד שלכם
          </h2>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-4">
          {GEAR_PRODUCTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 80}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-[#2952e3]/50 hover:shadow-md">
                {/* Product image */}
                <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
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
                  <h3 className="text-sm font-bold leading-snug text-zinc-900 lg:text-base">
                    {p.title}
                  </h3>
                  {EXTRAS_AVAILABLE ? (
                    <p className="mt-2 text-base font-bold tabular-nums text-zinc-900">
                      {p.price}
                    </p>
                  ) : (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      בקרוב
                    </p>
                  )}
                  {EXTRAS_AVAILABLE ? (
                    <Link
                      href={PRODUCT_URL}
                      className="mt-5 inline-flex items-center justify-center rounded-full border border-[#2952e3] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-[#2952e3] transition-all duration-300 ease-out hover:scale-105 hover:bg-[#2952e3] hover:text-white hover:shadow-[0_0_24px_-4px_rgba(41,82,227,0.5)] active:scale-95"
                    >
                      הוספה מהירה
                    </Link>
                  ) : (
                    <WaitlistButton
                      label="הודיעו לי"
                      className="mt-5 inline-flex items-center justify-center rounded-full border border-zinc-300 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-zinc-600 transition-all duration-300 ease-out hover:border-[#2952e3] hover:text-[#2952e3]"
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
  { icon: ShieldCheck, label: "30 ימי אחריות" },
  { icon: RotateCcw, label: "30 יום להחזרה" },
  { icon: Truck, label: "משלוח חינם עד הבית | 7–14 ימי עסקים" },
  { icon: Lock, label: "תשלום מאובטח ומוצפן" },
];

function WhatsInTheBox() {
  return (
    <section className="bg-surface px-6 py-12 lg:px-10 lg:py-16">
      <FadeIn>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          {TRUST_ITEMS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 text-center"
            >
              <Icon className="h-7 w-7 text-[#2952e3]" strokeWidth={1.5} />
              <span className="text-sm font-medium tracking-wide text-zinc-800 lg:text-base">
                {label}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

/* ── Final CTA — closing conversion band ─────────────────────────────── */
function FinalCta() {
  return (
    <section className="bg-surface-alt px-6 py-12 lg:px-10 lg:py-16">
      <FadeIn>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <p className="text-[11px] font-bold tracking-[0.3em] text-zinc-500">
            מבצע השקה · מלאי ראשון מוגבל
          </p>
          <h2 className="font-display text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
            קנו 2 וקבלו השייקר השני ב-50₪ + משלוח חינם
          </h2>
          <p className="max-w-xl text-lg leading-[1.7] text-[#2D3748]">
            שדרגו את האימון או תנו במתנה לפרטנר לאימונים. ההטבה להשקה בלבד
            ומוגבלת במלאי.
          </p>
          <PrimaryCta className={goldButton} label="שדרג את האימון שלי עכשיו" />
        </div>
      </FadeIn>
    </section>
  );
}

/* ── Urgency band — scarcity nudge before the footer ─────────────────── */
function UrgencyBand() {
  return (
    <section className="bg-surface px-6 py-7 text-center">
      <p className="flex items-center justify-center gap-2 text-sm font-semibold tracking-wide text-zinc-700">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2952e3] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2952e3]" />
        </span>
        נשארו יחידות אחרונות מהמלאי הנוכחי
      </p>
    </section>
  );
}

/* ── Sticky mobile buy bar — always-visible CTA (mobile only) ────────── */
function StickyBuyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 w-full border-t border-zinc-200 bg-surface px-4 py-2.5 shadow-[0_-8px_30px_-8px_rgba(0,0,0,0.15)] lg:hidden">
      <Link
        href={PRODUCT_URL}
        className="flex w-full items-center justify-center rounded-full bg-[#2952e3] px-6 py-3 text-sm font-black uppercase tracking-[0.08em] text-white shadow-[0_0_26px_-6px_rgba(41,82,227,0.5)] ring-1 ring-[#2952e3]/40 transition-all duration-300 active:scale-95"
      >
        לבחירת צבעים והזמנה ←
      </Link>
    </div>
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
      {
        label: "וואטסאפ",
        href: "https://wa.me/972515766102?text=היי,%20הגעתי%20דרך%20האתר%20ואשמח%20לפרטים%20על%20שייקר%20Vault",
      },
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
    <span className="inline-flex h-6 w-10 items-center justify-center rounded border border-zinc-200 bg-white">
      <span className="font-display text-[11px] font-black italic tracking-tight text-[#1a1f71]">
        VISA
      </span>
    </span>
  );
}

function MastercardIcon() {
  return (
    <span className="inline-flex h-6 w-10 items-center justify-center rounded border border-zinc-200 bg-white">
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
    <span className="inline-flex h-6 w-10 items-center justify-center gap-0.5 rounded border border-zinc-200 bg-white text-black">
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
    <footer className="border-t border-zinc-200 bg-surface text-zinc-900">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 lg:grid-cols-4 lg:gap-x-12">
          <div className="col-span-2 lg:col-span-1">
            <span className="font-display text-xl font-extrabold uppercase tracking-[0.3em] text-zinc-900">
              VAULT
            </span>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-zinc-500">
              השייקר המגנטי החשמלי לספורטאים שלא מתפשרים.
            </p>
          </div>

          {[FOOTER_LINKS.service, FOOTER_LINKS.policies].map((col) => (
            <nav key={col.title} className="flex flex-col">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">
                {col.title}
              </h3>
              <div className="mt-4 flex flex-col gap-3 text-zinc-600">
                {col.links.map((link) => (
                  <FooterLink key={link.label} item={link} />
                ))}
              </div>
            </nav>
          ))}

          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-900">
              הצטרפו ל-VAULT
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-zinc-500">
              גישה מוקדמת להשקות, מבצעים ותכני אימון.
            </p>
            <form className="mt-5 flex items-center border-b border-zinc-300 pb-2">
              <input
                type="email"
                aria-label="כתובת אימייל לרישום לניוזלטר"
                placeholder="כתובת אימייל"
                className="w-full bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-300 hover:text-[#4169e5]"
                style={{ color: GOLD }}
              >
                הירשמו
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-6 border-t border-zinc-200 pt-8 sm:grid-cols-3">
          <div className="flex items-center justify-center gap-4 text-zinc-600 sm:justify-start">
            <a
              href="https://www.instagram.com/vaultshaker/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors duration-300 hover:text-[#2952e3]"
            >
              <Instagram className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </a>
            <a
              href="https://www.tiktok.com/@vaultshaker"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex items-center transition-colors duration-300 hover:text-[#2952e3]"
            >
              <TikTokIcon className="h-[18px] w-[18px]" />
            </a>
          </div>

          <span className="text-center text-xs tracking-[0.12em] text-zinc-600">
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
            <span className="flex items-center gap-1.5 text-[11px] tracking-[0.06em] text-zinc-600">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.75} />
              תשלום מאובטח ב-100%
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
