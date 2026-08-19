"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Handshake,
  Truck,
  Lock,
  ChevronDown,
  Check,
  Zap,
  Play,
  ShieldCheck,
  Magnet,
  Droplets,
  BatteryCharging,
} from "lucide-react";
import { formatPrice, type AddToCartInput } from "@/lib/cart/CartContext";
import { ACCESSORIES } from "@/lib/accessories";
import { WAITLIST_MODE, EXTRAS_AVAILABLE } from "@/lib/config";
import {
  FOUNDER_PRICE,
  BUNDLE_PRICE,
  BUNDLE_DISCOUNT_CODE,
} from "@/lib/pricing";
import WaitlistButton from "@/components/WaitlistButton";

const GOLD = "#2952e3";

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

// Compact product-spec icons — the immediate value prop shown right under the
// bundle selector, so mobile shoppers see it before/next to the checkout.
const SPECS = [
  { icon: ShieldCheck, label: "נטול BPA" },
  { icon: Magnet, label: "מגנט N52" },
  { icon: Droplets, label: "100% אטום" },
  { icon: BatteryCharging, label: "סוללה חזקה" },
];

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
    label: "סליקה מאובטחת ומוצפנת SSL",
    sub: "פרטי התשלום שלכם מוגנים ומוצפנים.",
  },
];

// Curated gallery: studio value shot → lifestyle → Mag-Grip streaming shot →
// athlete → action video. Mixed media (image + video). Hebrew filenames encoded.
type GalleryItem = { type: "image" | "video"; src: string; alt: string };
const GALLERY_MEDIA: GalleryItem[] = [
  {
    type: "image",
    src: "/images/שייקר חדש2.jpeg",
    alt: "שייקר VAULT החשמלי — גוף שקוף עם בסיס מנוע ומעמד טלפון מובנה",
  },
  {
    type: "image",
    src: "/images/שייקר חדש.jpeg",
    alt: "שייקר VAULT החשמלי מונח על ספסל האימון",
  },
  {
    type: "image",
    src: "/images/שייקר חדש1.jpeg",
    alt: "טכנולוגיית Mag-Grip — הטלפון מוצמד לרוחב על מתקן המשקולות",
  },
  {
    type: "image",
    src: "/images/שייקר חדש3.jpeg",
    alt: "ספורטאי מחזיק את שייקר VAULT החשמלי בחדר הכושר",
  },
  {
    type: "video",
    src: `/videos/${encodeURIComponent("שייקר חדש4.mp4")}`,
    alt: "שייקר VAULT החשמלי בפעולה — טכנולוגיית Mag-Grip על ספסל האימון",
  },
];

// Selectable shaker colours, each mapped to its Shopify variant so the right
// variant is sent to checkout. `swatch` is the dot colour; `image` swaps the
// main product shot (next/image encodes the Hebrew filenames).
type ShakerColor = {
  name: string;
  image: string;
  swatch: string;
  variantId: string;
};
const COLORS: ShakerColor[] = [
  { name: "שחור", image: "/images/שחור.png", swatch: "#1c1c1e", variantId: "gid://shopify/ProductVariant/54531183313109" },
  { name: "לבן", image: "/images/לבן.png", swatch: "#ededeb", variantId: "gid://shopify/ProductVariant/54531183378645" },
  { name: "כחול", image: "/images/כחול.png", swatch: "#6b9bd1", variantId: "gid://shopify/ProductVariant/54531183345877" },
  { name: "ירוק", image: "/images/ירוק.png", swatch: "#8ed3a2", variantId: "gid://shopify/ProductVariant/54531183411413" },
  { name: "ורוד", image: "/images/ורוד.png", swatch: "#e8a3c4", variantId: "gid://shopify/ProductVariant/54531183444181" },
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
  const bundleNow = BUNDLE_PRICE;
  const bundleSaves = bundleWas - bundleNow;
  const displayPrice = bundle ? bundleNow : unit;

  // Checkout: create a fresh Shopify cart with the live-catalog variant id and
  // the selected quantity (1 or 2), then redirect to Shopify's hosted checkout
  // (the payment page). Using the real variant id avoids the "link no longer
  // exists" error a product-id permalink caused.
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  async function handleCheckout() {
    if (checkingOut) return;
    // Send the SELECTED colour's Shopify variant (falls back to the product's
    // default variant). Its own variant image + option is what Shopify shows on
    // the order and checkout for that colour.
    // Resolve the chosen colour variant(s). A single purchase uses the primary
    // colour; the 2-pack sends BOTH chosen colours so the customer receives the
    // exact two shakers they picked. Falls back to the product's default variant.
    const first = COLORS[activeColor];
    const second = COLORS[secondColor];
    const firstVariant = first.variantId || product.variantId;
    const secondVariant = second.variantId || product.variantId;
    // Guard: without a variant id the cart line is dropped server-side and the
    // API returns the confusing "no items" error — give a clear message instead.
    if (!firstVariant || (bundle && !secondVariant)) {
      console.warn("[checkout] missing variant id — cannot check out");
      setCheckoutError("הרכישה אינה זמינה כרגע. אנא רעננו את הדף ונסו שוב.");
      return;
    }
    // Build the cart lines. Single unit → one line. 2-pack → one line per chosen
    // colour (qty 1 each); if both colours match, merge into one qty-2 line so
    // the total quantity stays correct. Colour is captured by the variant itself
    // and also sent as a readable Hebrew line property for order management.
    const lines = !bundle
      ? [
          {
            variantId: firstVariant,
            quantity: 1,
            attributes: [{ key: "צבע", value: first.name }],
          },
        ]
      : firstVariant === secondVariant
        ? [
            {
              variantId: firstVariant,
              quantity: 2,
              attributes: [{ key: "צבע", value: first.name }],
            },
          ]
        : [
            {
              variantId: firstVariant,
              quantity: 1,
              attributes: [{ key: "צבע (שייקר ראשון)", value: first.name }],
            },
            {
              variantId: secondVariant,
              quantity: 1,
              attributes: [{ key: "צבע (שייקר שני)", value: second.name }],
            },
          ];
    setCheckoutError(null);
    setCheckingOut(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines,
          // 2-pack: apply the bundle discount so the cart nets to BUNDLE_PRICE
          // (2 units − 139 ₪) instead of 2 × the single-unit variant price.
          discountCodes: bundle ? [BUNDLE_DISCOUNT_CODE] : [],
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.href = data.url; // straight to the hosted payment page
        return;
      }
      setCheckoutError(data.error ?? "אירעה שגיאה במעבר לתשלום. נסו שוב.");
    } catch {
      setCheckoutError("אירעה שגיאה במעבר לתשלום. נסו שוב.");
    }
    setCheckingOut(false);
  }

  // Accessory add-ons selected via the in-buy-box checklist.
  const [addOns, setAddOns] = useState<Record<string, boolean>>({});
  const toggleAddOn = (handle: string) =>
    setAddOns((prev) => ({ ...prev, [handle]: !prev[handle] }));

  // Gallery selection: a colour is always selected (drives the main studio
  // shot). `activeThumb` is null while a colour is shown, or the index of a
  // lifestyle/video thumbnail once one is clicked.
  const [activeColor, setActiveColor] = useState(0);
  // Second shaker's colour — only used when the 2-pack bundle is selected.
  const [secondColor, setSecondColor] = useState(0);
  const [activeThumb, setActiveThumb] = useState<number | null>(null);
  const activeMedia =
    activeThumb === null
      ? {
          type: "image" as const,
          src: COLORS[activeColor].image,
          alt: `שייקר VAULT החשמלי — צבע ${COLORS[activeColor].name}`,
        }
      : GALLERY_MEDIA[activeThumb] ?? GALLERY_MEDIA[0];

  // Persistent mobile buy-bar: visible whenever the main Buy button is NOT in
  // view — including the gallery region at the top of the page (button still
  // below the fold) and after it scrolls past. Hides only while the main CTA is
  // on screen, so there's never a duplicate CTA. IntersectionObserver avoids a
  // scroll-handler and its layout thrash.
  const buyRef = useRef<HTMLDivElement | null>(null);
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-0">
        {/* HEADER — title/price. order-1 (top) on mobile; right column · top row
            on desktop (RTL). The gallery slots in after this on mobile. */}
        <section className="order-1 flex flex-col lg:col-start-1 lg:row-start-1">
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

          {/* Electric mixer feature highlight — clean inline, no box */}
          <div className="mt-5 flex items-start gap-2.5">
            <Zap
              className="mt-0.5 h-5 w-5 shrink-0 text-[#2952e3]"
              strokeWidth={2}
            />
            <p className="text-base leading-[1.7] text-[#2D3748]">
              <strong className="font-bold text-[#111111]">מיקסר חשמלי מובנה</strong> —
              שייק חלק ומושלם בלחיצת כפתור, בלי גושים.
            </p>
          </div>

          {WAITLIST_MODE ? (
            /* Pre-launch: no price — invite the visitor to the waitlist. */
            <p className="mt-4 text-sm font-semibold tracking-[0.02em] text-zinc-600">
              זמין בקרוב — הירשמו לעדכונים וקבלו עדיפות בהשקה
            </p>
          ) : (
            <>
              <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-display text-3xl font-extrabold tabular-nums text-zinc-900">
                  {formatPrice(displayPrice, product.currency)}
                </p>
                {bundle && (
                  <>
                    <span className="text-base tabular-nums text-zinc-400 line-through">
                      {formatPrice(bundleWas, product.currency)}
                    </span>
                    <span className="text-xs font-bold tracking-wide text-zinc-500">
                      חיסכון {formatPrice(bundleSaves, product.currency)}
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
        </section>

        {/* CONTROLS — colour · bundle · checkout. order-3 (below the gallery) on
            mobile, so the swatches sit directly under the product image; right
            column · second row on desktop, tucked under the header. */}
        <section className="order-3 flex flex-col lg:col-start-1 lg:row-start-2">
          {/* Colour selector(s) — a single picker, or one per shaker once the
              2-pack is selected. The first picker drives the gallery image. */}
          <div className="mt-2 space-y-4 lg:mt-6">
            <ColorRow
              label={bundle ? "צבע שייקר ראשון" : "צבע"}
              value={activeColor}
              onSelect={(i) => {
                setActiveColor(i);
                setActiveThumb(null);
              }}
            />
            {bundle && (
              <ColorRow
                label="צבע שייקר שני"
                value={secondColor}
                onSelect={(i) => setSecondColor(i)}
              />
            )}
          </div>

          {/* Purchase controls — hidden in pre-launch waitlist mode */}
          {!WAITLIST_MODE && (
          <>
          {/* Bundle & Save — vertical option cards */}
          <p className="mb-3 mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
            בחרו את החבילה שלכם
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
              title="קנה 2 · השייקר השני ב-50₪"
              priceLabel={formatPrice(bundleNow, product.currency)}
              badge="המשתלם ביותר"
              note={`חוסכים ${formatPrice(bundleSaves, product.currency)}`}
              highlight
            />
          </div>

          {/* Immediate value prop — key specs right under the bundle selector so
              mobile shoppers see them at the decision point, before checkout. */}
          <ul className="mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 sm:grid-cols-4">
            {SPECS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-1.5 px-1 py-2 text-center"
              >
                <Icon className="h-5 w-5 text-[#2952e3]" strokeWidth={1.75} />
                <span className="text-[11px] font-bold leading-tight text-zinc-900">
                  {label}
                </span>
              </li>
            ))}
          </ul>

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
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3">
              <p className="text-center text-xs font-bold leading-relaxed text-red-700">
                <span className="relative -mt-px me-1.5 inline-flex h-2 w-2 align-middle">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                </span>
                מלאי מוגבל — נותרו 14 יחידות בלבד למהדורת ההשקה!
              </p>
            </div>
          )}

          {/* CTA — routes to the direct Shopify checkout for the selected
              bundle. Pre-launch waitlist mode still shows the signup. */}
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
            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkingOut}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#2952e3] px-10 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_0_30px_-6px_rgba(41,82,227,0.5)] transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#4169e5] hover:shadow-[0_0_46px_-4px_rgba(41,82,227,0.65)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {checkingOut ? "מעבר לתשלום…" : "המשך לתשלום מאובטח"}
            </button>
          )}
          </div>
          {!WAITLIST_MODE && !soldOut && (
            <p className="mt-3 text-center text-xs font-medium tracking-wide text-zinc-500">
              סליקה מאובטחת · משלוח חינם לכל הארץ · 30 יום החזר כספי
            </p>
          )}
          {checkoutError && (
            <p className="mt-2 text-center text-xs font-medium text-red-600">
              {checkoutError}
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
              body="משלוח חינם עד הבית תוך 7–14 ימי עסקים. לא מרוצים? מחזירים תוך 30 יום, בלי שאלות."
            />
          </div>
        </section>

        {/* GALLERY — order-2 on mobile (between header and controls, so the image
            sits right above the swatches and visibly updates on colour change);
            left column spanning both rows on desktop (RTL). Mixed media. */}
        <section className="order-2 flex flex-col gap-4 lg:col-start-2 lg:row-start-1 lg:row-span-2">
          <div
            className={`relative aspect-[4/5] w-full overflow-hidden rounded-2xl transition-colors duration-300 ${
              activeThumb === null ? "bg-white" : "bg-zinc-100"
            }`}
          >
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
                key={activeMedia.src}
                src={activeMedia.src}
                alt={activeMedia.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`transition-transform duration-500 ease-in-out hover:scale-105 ${
                  activeThumb === null
                    ? "object-contain p-4"
                    : "object-cover object-center"
                }`}
              />
            )}
          </div>

          {/* Thumbnails — lifestyle shots + video (colours are chosen via the
              swatches). 5 columns so all media sit on one row. */}
          <div className="grid grid-cols-5 gap-2.5">
            {GALLERY_MEDIA.map((m, i) => (
              <button
                key={m.src}
                type="button"
                onClick={() => setActiveThumb(i)}
                aria-label={m.alt}
                aria-current={i === activeThumb}
                className={`relative aspect-square overflow-hidden rounded-2xl transition-all duration-300 ${
                  i === activeThumb
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

      {/* Sticky buy bar — slides in once the main CTA scrolls out of view (mobile) */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-zinc-200 bg-surface px-5 py-2.5 shadow-[0_-8px_30px_-8px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out lg:hidden ${
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
              <span className="text-lg font-black tabular-nums leading-none text-zinc-900">
                {formatPrice(displayPrice, product.currency)}
              </span>
              <span className="mt-1 truncate text-[11px] font-medium text-emerald-600">
                {bundle ? "2 יחידות · השייקר השני ב-50₪" : "משלוח חינם · 30 יום החזר"}
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
          <button
            type="button"
            onClick={handleCheckout}
            disabled={checkingOut}
            className="flex flex-1 items-center justify-center rounded-full bg-[#2952e3] px-6 py-3.5 text-sm font-black tracking-[0.04em] text-white transition-all duration-300 hover:bg-[#4169e5] active:scale-95 disabled:opacity-70"
          >
            {checkingOut ? "מעבר לתשלום…" : "המשך לתשלום"}
          </button>
        )}
      </div>
    </>
  );
}

// A labelled row of colour swatches. Reused for the single-unit picker and for
// each shaker's picker in the 2-pack. `value` is the selected COLORS index.
function ColorRow({
  label,
  value,
  onSelect,
}: {
  label: string;
  value: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold text-zinc-900">
        {label}:{" "}
        <span className="font-medium text-zinc-500">{COLORS[value].name}</span>
      </p>
      <div className="flex flex-wrap gap-3">
        {COLORS.map((c, i) => {
          const selected = value === i;
          return (
            <button
              key={c.name}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`${label} ${c.name}`}
              aria-pressed={selected}
              title={c.name}
              className={`h-11 w-11 rounded-full border border-black/10 shadow-sm transition-all duration-200 ${
                selected
                  ? "ring-2 ring-[#2952e3] ring-offset-2 ring-offset-white"
                  : "hover:scale-110"
              }`}
              style={{ backgroundColor: c.swatch }}
            />
          );
        })}
      </div>
    </div>
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
