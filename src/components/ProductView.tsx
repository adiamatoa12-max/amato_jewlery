"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Handshake,
  Truck,
  Lock,
  Magnet,
  Droplet,
  Smartphone,
  ChevronDown,
  Check,
  Zap,
  Play,
} from "lucide-react";
import { formatPrice, type AddToCartInput } from "@/lib/cart/CartContext";
import { ACCESSORIES } from "@/lib/accessories";
import { WAITLIST_MODE, EXTRAS_AVAILABLE } from "@/lib/config";
import {
  FOUNDER_PRICE,
  FOUNDER_COMPARE_AT,
  BUNDLE_DISCOUNT,
} from "@/lib/pricing";
import WaitlistButton from "@/components/WaitlistButton";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const GOLD = "#2952e3";

// Conversational Commerce: the buy CTA opens WhatsApp with a message that's
// pre-filled based on the selected bundle option, so orders can be confirmed
// and closed directly in chat.
const WHATSAPP_PHONE = "972515766102";

function buildWhatsAppOrderUrl(
  bundle: boolean,
  unitPrice: number,
  bundlePrice: number,
): string {
  // Plain "149 ₪" text — formatPrice() embeds invisible RTL marks that don't
  // belong in a pre-filled chat message.
  const message = bundle
    ? `היי! הגעתי מהאתר ואשמח להזמין את מארז הזוג (2 שייקרים) ב-${bundlePrice} ₪.`
    : `היי! הגעתי מהאתר ואשמח להזמין VaultShaker אחד ב-${unitPrice} ₪.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

interface GalleryMedia {
  media_type: string;
  url: string;
}

interface ProductViewProps {
  product: AddToCartInput & {
    description: string;
    hoverImage: string;
    gallery?: string[];
    styledImage?: string;
    galleryMedia?: GalleryMedia[];
  };
  soldOut: boolean;
  collectionTitle: string;
  collectionHandle: string;
}

const TRUST_BADGES = [
  {
    icon: Handshake,
    label: "30 ימי אחריות מלאה",
    sub: "לא אהבתם? כספכם יוחזר.",
  },
  {
    icon: Truck,
    label: "משלוח מבוטח עם שליח עד הבית",
    sub: "7–14 ימי עסקים · חינם במסגרת מבצע ההשקה!",
  },
  {
    icon: Lock,
    label: "רכישה בטוחה, ללא אשראי באתר",
    sub: "הכל נסגר ישירות מול נציג בוואטסאפ.",
  },
];

const MAGNETIC_FEATURES = [
  {
    icon: Magnet,
    title: "מגנט N52. כוח אמיתי.",
    body: "אחיזה מגנטית עוצמתית. תמיד בזווית הנכונה.",
  },
  {
    icon: Smartphone,
    title: "ידיים חופשיות, תמיד.",
    body: "צלם. שדר. תתאמן. בלי להחזיק כלום.",
  },
  {
    icon: Droplet,
    title: "אפס דליפות.",
    body: "אטימה מושלמת. גם בעומס מקסימלי.",
  },
];

// Curated gallery: studio value shot → UGC Mag-Grip close-up → lifestyle →
// action video. Mixed media (image + video). Hebrew filenames are encoded.
type GalleryItem = { type: "image" | "video"; src: string; alt: string };
const GALLERY_MEDIA: GalleryItem[] = [
  {
    type: "image",
    src: "/images/vault-shaker-unboxing.png",
    alt: "ערכת VAULT באריזת פרימיום — צילום אולפן",
  },
  {
    type: "image",
    src: "/images/שייקר 100.jpeg",
    alt: "שני שייקרים של VAULT — מבצע קנו 2 יחידות",
  },
  {
    type: "image",
    src: "/images/שייקר ת.jpeg",
    alt: "טכנולוגיית Mag-Grip בקלוז-אפ — הטלפון מוצמד על ציוד הכושר",
  },
  {
    type: "video",
    src: `/videos/${encodeURIComponent("שייקר 31.mp4")}`,
    alt: "טכנולוגיית Mag-Grip בפעולה על ספסל האימון",
  },
];

export default function ProductView({
  product,
  soldOut,
  collectionTitle,
  collectionHandle,
}: ProductViewProps) {
  const [bundle, setBundle] = useState(false);

  // Pricing: single unit (Founder's Edition price) vs. 2-pack launch discount.
  const unit = FOUNDER_PRICE;
  const bundleWas = unit * 2;
  const bundleNow = Math.round(unit * 2 * (1 - BUNDLE_DISCOUNT));
  const bundleSaves = bundleWas - bundleNow;
  const displayPrice = bundle ? bundleNow : unit;
  const whatsappUrl = buildWhatsAppOrderUrl(bundle, unit, bundleNow);

  // Accessory add-ons selected via the in-buy-box checklist.
  const [addOns, setAddOns] = useState<Record<string, boolean>>({});
  const toggleAddOn = (handle: string) =>
    setAddOns((prev) => ({ ...prev, [handle]: !prev[handle] }));

  const [activeImg, setActiveImg] = useState(0);
  const activeMedia = GALLERY_MEDIA[activeImg] ?? GALLERY_MEDIA[0];

  // Sticky bar appears only once the main Buy button has scrolled out of view
  // (above the viewport) — keeps the CTA reachable without crowding the page.
  const buyRef = useRef<HTMLDivElement | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const el = buyRef.current;
      if (!el) return;
      // Show once the main Buy button has fully scrolled above the viewport.
      setShowSticky(el.getBoundingClientRect().bottom < 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {/* DETAILS — order-2 on mobile (below gallery), right column on desktop (RTL) */}
        <section className="order-2 flex flex-col self-start lg:order-1 lg:sticky lg:top-32">
          <Link
            href={`/#${collectionHandle}`}
            className="text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-300"
            style={{ color: GOLD }}
          >
            {collectionTitle}
          </Link>

          <h1 className="mt-4 font-display text-4xl font-black leading-tight tracking-tight text-zinc-900 lg:text-5xl">
            {product.title}
          </h1>

          {/* Launch edition — scarcity, neutral typography */}
          <p className="mt-3 flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-zinc-600">
            <span>מהדורת השקה</span>
            <span className="text-zinc-600" aria-hidden>
              |
            </span>
            <span>מלאי ראשון מוגבל</span>
          </p>

          {/* Electric mixer feature highlight */}
          <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-zinc-100 px-4 py-3 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]">
            <Zap
              className="mt-0.5 h-5 w-5 shrink-0 text-zinc-900"
              strokeWidth={2}
            />
            <p className="text-base leading-[1.7] text-[#2D3748]">
              <strong className="font-bold text-[#111111]">מיקסר חשמלי מובנה</strong> —
              ערבוב בלחיצת כפתור לשייק חלק ומושלם בכל פעם, בלי גושים.
            </p>
          </div>

          {WAITLIST_MODE ? (
            /* Pre-launch: no price — invite the visitor to the waitlist. */
            <p className="mt-4 text-sm font-semibold tracking-[0.02em] text-zinc-600">
              זמין בקרוב — הירשמו לעדכונים וקבלו עדיפות בהשקה
            </p>
          ) : (
            <>
              <div className="mt-5 flex items-end gap-3">
                <p className="font-display text-3xl font-extrabold tabular-nums text-zinc-900">
                  {formatPrice(displayPrice, product.currency)}
                </p>
                {bundle ? (
                  <>
                    <span className="pb-1 text-base tabular-nums text-zinc-500 line-through">
                      {formatPrice(bundleWas, product.currency)}
                    </span>
                    <span className="pb-1 text-xs font-bold tracking-wide text-zinc-500">
                      חיסכון {formatPrice(bundleSaves, product.currency)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="pb-1 text-base tabular-nums text-zinc-500 line-through">
                      {formatPrice(FOUNDER_COMPARE_AT, product.currency)}
                    </span>
                    <span className="pb-1 text-xs font-bold tracking-wide text-zinc-500">
                      מחיר מוקדמים
                    </span>
                  </>
                )}
              </div>

              <p
                className={`mt-5 flex items-center gap-2 text-xs font-medium tracking-[0.08em] ${
                  soldOut ? "text-zinc-500" : "text-emerald-600"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    soldOut ? "bg-zinc-500" : "bg-emerald-500"
                  }`}
                />
                {soldOut ? "אזל מהמלאי" : "במלאי — מוכן למשלוח"}
              </p>
            </>
          )}

          {/* Purchase controls — hidden in pre-launch waitlist mode */}
          {!WAITLIST_MODE && (
          <>
          {/* Bundle & Save — vertical option cards */}
          <p className="mb-3 mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            Bundle & Save
          </p>
          <div className="grid grid-cols-1 gap-3">
            <BundleOption
              selected={!bundle}
              onSelect={() => setBundle(false)}
              title="קנה 1"
              priceLabel={formatPrice(unit, product.currency)}
            />
            <BundleOption
              selected={bundle}
              onSelect={() => setBundle(true)}
              title="קנה 2 (15% הנחה)"
              priceLabel={formatPrice(bundleNow, product.currency)}
              badge="המשתלם ביותר"
              note={`חוסכים ${formatPrice(bundleSaves, product.currency)}`}
              highlight
            />
          </div>

          {/* In-buy-box accessory upsell — hidden while extras are out of stock */}
          {EXTRAS_AVAILABLE && (
          <div className="mt-6">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              השלימו את הסט
            </p>
            <ul className="flex flex-col gap-2">
              {ACCESSORIES.map((a) => {
                const checked = !!addOns[a.handle];
                return (
                  <li key={a.handle}>
                    <button
                      type="button"
                      onClick={() => toggleAddOn(a.handle)}
                      aria-pressed={checked}
                      className={`flex w-full items-center gap-3 rounded-xl border bg-zinc-100 p-2.5 text-right shadow-[0_2px_10px_-3px_rgba(0,0,0,0.08)] transition-all duration-200 ${
                        checked
                          ? "border-[#2952e3]/70"
                          : "border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      {/* Custom gold checkbox */}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                          checked
                            ? "border-[#2952e3] bg-[#2952e3]"
                            : "border-zinc-300"
                        }`}
                      >
                        {checked && (
                          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                        )}
                      </span>
                      {/* Thumbnail */}
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-zinc-200">
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                      {/* Title + price */}
                      <span className="flex flex-1 items-center justify-between gap-2">
                        <span className="text-xs font-medium leading-tight text-zinc-900">
                          {a.title}
                        </span>
                        <span className="shrink-0 text-xs font-bold tabular-nums text-zinc-900">
                          {formatPrice(a.price, a.currency)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          )}
          </>
          )}

          {/* Scarcity nudge — sits directly above the buy button. */}
          {!WAITLIST_MODE && !soldOut && (
            <div className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-center">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span className="text-xs font-bold text-red-700">
                מלאי מוגבל: נותרו רק 14 יחידות למהדורת ההשקה!
              </span>
            </div>
          )}

          {/* CTA — Concierge MVP: routes to WhatsApp to complete the order
              manually. Pre-launch waitlist mode still shows the signup. */}
          <div ref={buyRef} id="buy">
          {WAITLIST_MODE ? (
            <WaitlistButton className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#2952e3] px-10 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_0_30px_-6px_rgba(41,82,227,0.5)] transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#4169e5] hover:shadow-[0_0_46px_-4px_rgba(41,82,227,0.65)] active:scale-95" />
          ) : soldOut ? (
            <button
              type="button"
              disabled
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#2952e3] px-10 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_0_30px_-6px_rgba(41,82,227,0.5)] transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#4169e5] hover:shadow-[0_0_46px_-4px_rgba(41,82,227,0.65)] active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400 disabled:shadow-none"
            >
              אזל מהמלאי
            </button>
          ) : (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-[#2952e3] px-10 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_0_30px_-6px_rgba(41,82,227,0.5)] transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#4169e5] hover:shadow-[0_0_46px_-4px_rgba(41,82,227,0.65)] active:scale-95"
            >
              <WhatsAppIcon className="h-5 w-5" />
              הזמן עכשיו בוואטסאפ
            </a>
          )}
          </div>
          {!WAITLIST_MODE && !soldOut && (
            <p className="mt-3 text-center text-xs font-medium tracking-wide text-zinc-500">
              מענה אנושי מהיר · סגירת הזמנה בלי התחייבות
            </p>
          )}

          {/* Trust badges — stacked so the full reassurance copy stays legible */}
          <ul dir="rtl" className="mt-8 flex flex-col gap-4 border-y border-zinc-200 py-6 text-right">
            {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2952e3]/10 text-[#2952e3]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-bold text-zinc-900">{label}</p>
                  <p className="mt-0.5 text-xs leading-snug text-zinc-500">{sub}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Accordions — collapsed detail, keeps the buy box lean */}
          <div className="mt-2 space-y-3">
            <Accordion title="תיאור המוצר" body={product.description} />
            <Accordion title="מפרט טכני" body={product.material} />
            <Accordion
              title="משלוח ואחריות"
              body="משלוח חינם עד הבית תוך 7–14 ימי עסקים. לא מרוצים? מחזירים תוך 30 יום, ללא שאלות מיותרות."
            />
          </div>
        </section>

        {/* GALLERY — order-1 on mobile (top, under header), left column on desktop (RTL). Mixed media: image + action video. */}
        <section className="order-1 flex flex-col gap-4 lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100">
            {activeMedia.type === "video" ? (
              <video
                src={activeMedia.src}
                autoPlay
                loop
                muted
                playsInline
                aria-label={activeMedia.alt}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            ) : (
              <Image
                src={activeMedia.src}
                alt={activeMedia.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-in-out hover:scale-105"
              />
            )}
          </div>

          {/* Thumbnails — clean, rounded-2xl, no borders (ring marks active) */}
          <div className="grid grid-cols-4 gap-3">
            {GALLERY_MEDIA.map((m, i) => (
              <button
                key={m.src}
                type="button"
                onClick={() => setActiveImg(i)}
                aria-label={m.alt}
                aria-current={i === activeImg}
                className={`relative aspect-square overflow-hidden rounded-2xl transition-all duration-300 ${
                  i === activeImg
                    ? "ring-2 ring-[#2952e3]"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                {m.type === "video" ? (
                  <>
                    <video
                      src={m.src}
                      muted
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <Play
                        className="h-5 w-5 text-white"
                        strokeWidth={2}
                        fill="currentColor"
                      />
                    </span>
                  </>
                ) : (
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    sizes="120px"
                    className="object-cover object-center"
                  />
                )}
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Magnetic performance technology — flat, airy, no boxes */}
      <section className="mt-24 pt-20 lg:mt-32">
        <p className="text-center text-[11px] font-bold tracking-[0.3em] text-zinc-500">
          טכנולוגיה מגנטית
        </p>
        <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-zinc-900 lg:text-4xl">
          הטכנולוגיה שמאחורי VAULT
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {MAGNETIC_FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-[0_8px_24px_rgba(0,0,0,0.03)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
            >
              <span className="flex h-16 w-16 items-center justify-center text-[#2952e3]">
                <Icon className="h-9 w-9" strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-lg font-extrabold tracking-tight text-zinc-900">
                {title}
              </h3>
              <p className="mt-3 max-w-xs text-base leading-[1.7] text-[#2D3748]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sticky buy bar — slides in once the main CTA scrolls out of view (mobile) */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-zinc-200 bg-surface px-5 py-3 shadow-[0_-8px_30px_-8px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out lg:hidden ${
          showSticky ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex min-w-0 flex-col leading-tight">
          {WAITLIST_MODE ? (
            <>
              <span className="truncate text-[11px] text-zinc-500">
                {product.title}
              </span>
              <span className="text-xs font-semibold text-zinc-600">
                זמין בקרוב
              </span>
            </>
          ) : (
            <>
              <span className="text-base font-bold tabular-nums text-zinc-900">
                {formatPrice(displayPrice, product.currency)}
              </span>
              <span className="truncate text-[11px] font-medium text-emerald-600">
                {bundle ? "2 יחידות · 15% הנחה" : "משלוח חינם"}
              </span>
            </>
          )}
        </div>
        {WAITLIST_MODE ? (
          <WaitlistButton className="flex flex-1 items-center justify-center rounded-full bg-[#2952e3] px-6 py-3.5 text-sm font-black uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#4169e5] active:scale-95" />
        ) : soldOut ? (
          <button
            type="button"
            disabled
            className="flex flex-1 items-center justify-center rounded-full bg-[#2952e3] px-6 py-3.5 text-sm font-black uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-[#4169e5] active:scale-95 disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            אזל מהמלאי
          </button>
        ) : (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2952e3] px-5 py-3.5 text-sm font-black tracking-[0.02em] text-white transition-all duration-300 hover:bg-[#4169e5] active:scale-95"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0" />
            להזמנה מאובטחת בוואטסאפ
          </a>
        )}
      </div>
    </>
  );
}

function BundleOption({
  selected,
  onSelect,
  title,
  priceLabel,
  badge,
  note,
  highlight,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  priceLabel: string;
  badge?: string;
  note?: string;
  /** Always shows a subtle electric-blue border, even unselected — marks the best-value card. */
  highlight?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex w-full items-center justify-between gap-3 rounded-2xl border bg-white p-5 text-right shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 ${
        selected
          ? "border-[#2952e3] shadow-[0_0_24px_-8px_rgba(41,82,227,0.35)]"
          : highlight
            ? "border-[#2952e3]/40 hover:border-[#2952e3]/70"
            : "border-zinc-200 hover:border-zinc-300"
      }`}
    >
      {badge && (
        <span className="absolute -top-2.5 left-4 rounded-full bg-[#2952e3] px-2.5 py-0.5 text-[10px] font-black tracking-wide text-white">
          {badge}
        </span>
      )}
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
          selected ? "border-[#2952e3] bg-[#2952e3]" : "border-zinc-300"
        }`}
      >
        {selected && <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />}
      </span>
      <span className="flex flex-1 flex-col items-start gap-0.5">
        <span className="text-sm font-bold text-zinc-900">{title}</span>
        {note && (
          <span className="text-[11px] font-bold text-zinc-500">{note}</span>
        )}
      </span>
      <span className="font-display text-xl font-extrabold tabular-nums text-zinc-900">
        {priceLabel}
      </span>
    </button>
  );
}

function Accordion({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E2E8F0] bg-transparent transition-colors duration-300 ease-out">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-start"
      >
        <span className="text-sm font-medium tracking-[0.04em] text-zinc-900">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform duration-300 ease-in-out ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: GOLD }}
          strokeWidth={1.5}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-base leading-[1.7] text-[#2D3748]">{body}</p>
        </div>
      </div>
    </div>
  );
}
