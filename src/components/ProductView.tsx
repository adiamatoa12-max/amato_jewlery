"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Gem,
  Truck,
  RotateCcw,
  Magnet,
  Droplet,
  Smartphone,
  ChevronDown,
  Check,
} from "lucide-react";
import { useCart, formatPrice, type AddToCartInput } from "@/lib/cart/CartContext";
import { ACCESSORIES } from "@/lib/accessories";
import { WAITLIST_MODE } from "@/lib/config";
import WaitlistButton from "@/components/WaitlistButton";
import MediaPlaceholder, {
  isMissingLocalMedia,
} from "@/components/MediaPlaceholder";

const GOLD = "#c8a24c";

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
  { icon: Gem, label: "חומרים באיכות פרימיום", sub: "טריטן עמיד ללא BPA" },
  { icon: RotateCcw, label: "החזר כספי 30 יום", sub: "התחייבות מלאה" },
  { icon: Truck, label: "משלוח מהיר", sub: "חינם לכל הארץ" },
];

const BUNDLE_DISCOUNT = 0.15;

const MAGNETIC_FEATURES = [
  {
    icon: Magnet,
    title: "מגנט N52 עוצמתי",
    body: "החזקה מגנטית חזקה שמעגנת את הטלפון יציב לכל משטח מתכתי — בלי לזוז.",
  },
  {
    icon: Smartphone,
    title: "מעמד טלפון מובנה",
    body: "צלמו ושדרו את האימון ללא ידיים, בזווית מושלמת, בכל רגע.",
  },
  {
    icon: Droplet,
    title: "אטימה מושלמת",
    body: "אטימה הרמטית שמונעת נזילות לחלוטין — גם בתנועה ובעומס.",
  },
];

export default function ProductView({
  product,
  soldOut,
  collectionTitle,
  collectionHandle,
}: ProductViewProps) {
  const { addItem } = useCart();
  const [bundle, setBundle] = useState(false);

  // Pricing: single unit vs. 2-pack with the launch discount.
  const unit = product.price;
  const bundleWas = unit * 2;
  const bundleNow = Math.round(unit * 2 * (1 - BUNDLE_DISCOUNT));
  const bundleSaves = bundleWas - bundleNow;
  const displayPrice = bundle ? bundleNow : unit;

  // Accessory add-ons selected via the in-buy-box checklist.
  const [addOns, setAddOns] = useState<Record<string, boolean>>({});
  const toggleAddOn = (handle: string) =>
    setAddOns((prev) => ({ ...prev, [handle]: !prev[handle] }));

  // Bundle = add the unit twice; single = once. Then add any selected add-ons.
  const addToCart = () => {
    addItem(product);
    if (bundle) addItem(product);
    ACCESSORIES.filter((a) => addOns[a.handle]).forEach((a) => addItem(a));
  };

  // Strictly images: IMAGE media only, drop deleted-local paths, de-dupe.
  const images = Array.from(
    new Set(
      (product.galleryMedia ?? [])
        .filter((m) => m.media_type === "IMAGE")
        .map((m) => m.url)
        .filter((url) => !isMissingLocalMedia(url)),
    ),
  );
  const [activeImg, setActiveImg] = useState(0);
  const active = images[activeImg] ?? images[0];

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {/* DETAILS — DOM-first → right column in RTL */}
        <section className="flex flex-col self-start lg:sticky lg:top-32">
          <Link
            href={`/#${collectionHandle}`}
            className="text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-300"
            style={{ color: GOLD }}
          >
            {collectionTitle}
          </Link>

          <h1 className="mt-4 font-display text-4xl font-black leading-tight tracking-tight text-white lg:text-5xl">
            {product.title}
          </h1>

          {WAITLIST_MODE ? (
            /* Pre-launch: no price — invite the visitor to the waitlist. */
            <p
              className="mt-4 text-sm font-semibold tracking-[0.02em]"
              style={{ color: GOLD }}
            >
              זמין בקרוב — הירשמו לעדכונים וקבלו עדיפות בהשקה
            </p>
          ) : (
            <>
              <div className="mt-5 flex items-end gap-3">
                <p className="font-display text-3xl font-extrabold tabular-nums text-white">
                  {formatPrice(displayPrice, product.currency)}
                </p>
                {bundle && (
                  <>
                    <span className="pb-1 text-base tabular-nums text-zinc-500 line-through">
                      {formatPrice(bundleWas, product.currency)}
                    </span>
                    <span
                      className="pb-1 text-xs font-bold tracking-wide"
                      style={{ color: GOLD }}
                    >
                      חיסכון {formatPrice(bundleSaves, product.currency)}
                    </span>
                  </>
                )}
              </div>

              <p
                className={`mt-5 flex items-center gap-2 text-xs font-medium tracking-[0.08em] ${
                  soldOut ? "text-zinc-500" : "text-emerald-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    soldOut ? "bg-zinc-500" : "bg-emerald-400"
                  }`}
                />
                {soldOut ? "אזל מהמלאי" : "במלאי — מוכן למשלוח"}
              </p>
            </>
          )}

          <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-400">
            {product.description}
          </p>

          {/* Purchase controls — hidden in pre-launch waitlist mode */}
          {!WAITLIST_MODE && (
          <>
          {/* Bundle selector */}
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <BundleOption
              selected={!bundle}
              onSelect={() => setBundle(false)}
              title="יחידה בודדת"
              priceLabel={formatPrice(unit, product.currency)}
            />
            <BundleOption
              selected={bundle}
              onSelect={() => setBundle(true)}
              title="2 יחידות"
              priceLabel={formatPrice(bundleNow, product.currency)}
              badge="15% הנחה"
              note={`חוסכים ${formatPrice(bundleSaves, product.currency)}`}
            />
          </div>

          {/* In-buy-box accessory upsell — minimalist checklist */}
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
                      className={`flex w-full items-center gap-3 rounded-xl border bg-zinc-900/60 p-2.5 text-right transition-all duration-200 ${
                        checked
                          ? "border-[#c8a24c]/70"
                          : "border-white/10 hover:border-white/25"
                      }`}
                    >
                      {/* Custom gold checkbox */}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
                          checked
                            ? "border-[#c8a24c] bg-[#c8a24c]"
                            : "border-white/30"
                        }`}
                      >
                        {checked && (
                          <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
                        )}
                      </span>
                      {/* Thumbnail */}
                      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
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
                        <span className="text-xs font-medium leading-tight text-white">
                          {a.title}
                        </span>
                        <span
                          className="shrink-0 text-xs font-bold tabular-nums"
                          style={{ color: GOLD }}
                        >
                          {formatPrice(a.price, a.currency)}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          </>
          )}

          {/* CTA — Add to Cart, or "get notified" in waitlist mode */}
          {WAITLIST_MODE ? (
            <WaitlistButton className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#c8a24c] px-10 py-4 text-sm font-black uppercase tracking-[0.14em] text-black shadow-[0_0_30px_-6px_rgba(200,162,76,0.7)] transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#e0bd6a] hover:shadow-[0_0_46px_-4px_rgba(200,162,76,0.95)] active:scale-95" />
          ) : (
            <button
              type="button"
              disabled={soldOut}
              onClick={addToCart}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#c8a24c] px-10 py-4 text-sm font-black uppercase tracking-[0.14em] text-black shadow-[0_0_30px_-6px_rgba(200,162,76,0.7)] transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#e0bd6a] hover:shadow-[0_0_46px_-4px_rgba(200,162,76,0.95)] active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-400 disabled:shadow-none"
            >
              {soldOut
                ? "אזל מהמלאי"
                : bundle
                  ? `הוספה לסל — 2 יחידות`
                  : "הוספה לסל"}
            </button>
          )}

          {/* Trust badges */}
          <ul className="mt-8 grid grid-cols-3 gap-3 border-y border-white/10 py-6">
            {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
              <li key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="h-6 w-6" style={{ color: GOLD }} strokeWidth={1.5} />
                <span className="text-xs font-bold text-white">{label}</span>
                <span className="text-[11px] leading-tight text-zinc-500">{sub}</span>
              </li>
            ))}
          </ul>

          {/* Accordions */}
          <div className="mt-2">
            <Accordion title="מפרט המוצר" body={product.material} />
            <Accordion
              title="משלוחים, החלפות והחזרות"
              body="משלוח חינם בשליחות עד הבית, אספקה תוך 7–14 ימי עסקים. ניתן להחליף או להחזיר תוך 30 יום מיום הקבלה, כל עוד המוצר במצב חדש ובאריזתו המקורית."
            />
          </div>
        </section>

        {/* GALLERY — left column in RTL */}
        <section className="flex flex-col gap-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
            {!active ? (
              <MediaPlaceholder className="absolute inset-0 h-full w-full" />
            ) : (
              <Image
                src={active}
                alt={product.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-center transition-transform duration-700 ease-in-out hover:scale-105"
              />
            )}
          </div>

          {/* Thumbnails (multiple angles) */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImg(i)}
                  aria-label={`תמונה ${i + 1}`}
                  aria-current={i === activeImg}
                  className={`relative aspect-square overflow-hidden rounded-lg border bg-zinc-900 transition-all duration-300 ${
                    i === activeImg
                      ? "border-[#c8a24c]"
                      : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Magnetic performance technology */}
      <section className="mt-20 border-t border-white/10 pt-16 lg:mt-28">
        <p
          className="text-center text-[11px] font-bold uppercase tracking-[0.3em]"
          style={{ color: GOLD }}
        >
          Magnetic Performance
        </p>
        <h2 className="mt-4 text-center font-display text-3xl font-black tracking-tight text-white lg:text-4xl">
          הטכנולוגיה שמאחורי VAULT
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {MAGNETIC_FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-zinc-900 p-8 text-center transition-colors duration-300 hover:border-[#c8a24c]/50"
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full border bg-black/40"
                style={{ borderColor: `${GOLD}55`, color: GOLD }}
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 font-display text-lg font-extrabold tracking-tight text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mobile sticky add-to-cart bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-white/10 bg-black/95 px-5 py-3 backdrop-blur-md lg:hidden">
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-[11px] text-zinc-400">
            {WAITLIST_MODE
              ? product.title
              : bundle
                ? "2 יחידות · 15% הנחה"
                : product.title}
          </span>
          {WAITLIST_MODE ? (
            <span className="text-xs font-semibold" style={{ color: GOLD }}>
              זמין בקרוב
            </span>
          ) : (
            <span className="text-base font-bold tabular-nums text-white">
              {formatPrice(displayPrice, product.currency)}
            </span>
          )}
        </div>
        {WAITLIST_MODE ? (
          <WaitlistButton className="flex flex-1 items-center justify-center rounded-full bg-[#c8a24c] px-6 py-3.5 text-sm font-black uppercase tracking-[0.1em] text-black transition-all duration-300 hover:bg-[#e0bd6a] active:scale-95" />
        ) : (
          <button
            type="button"
            disabled={soldOut}
            onClick={addToCart}
            className="flex flex-1 items-center justify-center rounded-full bg-[#c8a24c] px-6 py-3.5 text-sm font-black uppercase tracking-[0.1em] text-black transition-all duration-300 hover:bg-[#e0bd6a] active:scale-95 disabled:bg-zinc-700 disabled:text-zinc-400"
          >
            {soldOut ? "אזל מהמלאי" : "הוספה לסל"}
          </button>
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
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  priceLabel: string;
  badge?: string;
  note?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex flex-col items-start gap-1 rounded-2xl border bg-zinc-900 p-4 text-right transition-all duration-300 ${
        selected
          ? "border-[#c8a24c] shadow-[0_0_24px_-8px_rgba(200,162,76,0.7)]"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      {badge && (
        <span
          className="absolute -top-2 left-3 rounded-full px-2 py-0.5 text-[10px] font-black tracking-wide text-black"
          style={{ backgroundColor: GOLD }}
        >
          {badge}
        </span>
      )}
      <span className="flex w-full items-center justify-between">
        <span className="text-sm font-bold text-white">{title}</span>
        <span
          className={`flex h-4 w-4 items-center justify-center rounded-full border ${
            selected ? "border-[#c8a24c] bg-[#c8a24c]" : "border-white/30"
          }`}
        >
          {selected && <Check className="h-3 w-3 text-black" strokeWidth={3} />}
        </span>
      </span>
      <span className="font-display text-lg font-extrabold tabular-nums text-white">
        {priceLabel}
      </span>
      {note && (
        <span className="text-[11px] font-bold" style={{ color: GOLD }}>
          {note}
        </span>
      )}
    </button>
  );
}

function Accordion({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-start"
      >
        <span className="text-sm font-medium tracking-[0.04em] text-white">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
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
          <p className="pb-6 text-sm leading-relaxed text-zinc-400">{body}</p>
        </div>
      </div>
    </div>
  );
}
