import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import HeroCarousel from "@/components/HeroCarousel";
import EssenceSection from "@/components/EssenceSection";
import ShoppableVideoFeed, {
  type VideoFeedItem,
} from "@/components/ShoppableVideoFeed";
import FooterLink, { type FooterLinkItem } from "@/components/FooterLink";
import { COLLECTIONS, getMockProductByHandle } from "@/lib/mock-data";

// Maps each lifestyle video to the product actually shown in the footage.
// (Verified against a still frame from each clip — the file names are
// misleading: "gold-hoops" is really the gold bar necklace, "gold-pendant"
// is the geometric prism pendant.)
const VIDEO_FEED: { video: string; handle: string }[] = [
  { video: "/videos/silver-hoops-lifestyle.mp4", handle: "silver-hoop-earrings" },
  { video: "/videos/gold-pendant-lifestyle.mp4", handle: "geo-pendant-necklace" },
  { video: "/videos/geo-pendant-lifestyle.mp4", handle: "geo-gold-earrings" },
  { video: "/videos/gold-hoops-lifestyle.mp4", handle: "clean-gold-bar-necklace" },
];

function getVideoFeedItems(): VideoFeedItem[] {
  return VIDEO_FEED.flatMap(({ video, handle }) => {
    const product = getMockProductByHandle(handle);
    if (!product) return [];
    return [
      {
        video,
        href: `/product/${product.handle}`,
        title: product.title,
        price: product.price,
        currency: product.currency,
      },
    ];
  });
}

export default function Home() {
  return (
    // Reserve the fixed announcement + header band (top-7 + h-14 = 5.25rem)
    // so the hero begins cleanly below the navigation, never under it.
    <div className="flex min-h-full flex-col pt-[5.25rem]">
      <main className="flex-1">
        <Hero />
        <FadeIn>
          <ShopByCategory />
        </FadeIn>
        <FadeIn>
          <EssenceSection />
        </FadeIn>
        <FadeIn>
          <NewArrivalsIntro />
        </FadeIn>
        {COLLECTIONS.map((collection) => (
          <CollectionSection key={collection.handle} collection={collection} />
        ))}
        <FadeIn>
          <ShoppableVideoFeed items={getVideoFeedItems()} />
        </FadeIn>
        <ThematicBanner />
        <Craftsmanship />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-5.25rem)] w-full items-center justify-center overflow-hidden">
      <HeroCarousel />
      {/* Soft, warm overlay — just enough for the white text to pop. */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/35" />
      <div className="absolute inset-0 bg-[#3a2e22]/10" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center text-white">
        <h1 className="font-serif text-4xl font-light uppercase leading-[1.08] tracking-[0.1em] sm:text-6xl sm:tracking-[0.12em] lg:text-7xl">
          The New Essentials
        </h1>
        <p className="mt-7 max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
          קולקציית תכשיטי הפרימיום מכסף סטרלינג 925 וציפוי זהב 14 קראט.
        </p>
        <Link
          href="#geo-collection"
          className="mt-11 inline-flex items-center rounded-full border border-white/80 px-9 py-3.5 text-xs font-medium tracking-[0.14em] text-white transition-all duration-500 ease-in-out hover:bg-white hover:text-neutral-900"
        >
          לקולקציה המלאה
        </Link>
      </div>
    </section>
  );
}

function CollectionSection({
  collection,
}: {
  collection: (typeof COLLECTIONS)[number];
}) {
  return (
    <section
      id={collection.handle}
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 lg:px-10 lg:py-24"
    >
      <FadeIn>
        <h2 className="mb-16 text-center font-display text-2xl font-bold uppercase tracking-[0.2em] text-neutral-900 lg:mb-20 lg:text-3xl">
          {collection.enTitle}
        </h2>
      </FadeIn>

      <div className="grid grid-cols-2 gap-x-10 gap-y-20 lg:grid-cols-4 lg:gap-x-16 lg:gap-y-28">
        {collection.products.map((product, i) => (
          <FadeIn key={product.id} delay={i * 100}>
            <ProductCard product={product} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

const CATEGORIES = [
  { label: "עגילים", handle: "geo-collection", image: "/collections/earrings.png" },
  { label: "שרשראות", handle: "the-cubans", image: "/collections/necklaces.png" },
  { label: "טבעות", handle: "clean-essentials", image: "/collections/rings.png" },
  { label: "צמידים", handle: "clean-essentials", image: "/collections/bracelets.png" },
];

function ShopByCategory() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-2 pt-14 lg:px-10 lg:pt-20">
      <p className="text-center text-xs tracking-[0.3em] text-[#b8902f]">
        SHOP BY CATEGORY
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.label}
            href={`/#${cat.handle}`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-sm bg-[#f8f8f8]"
          >
            <Image
              src={cat.image}
              alt={cat.label}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            {/* Soft overlay for legibility of the centered label */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/55" />
            <span className="absolute inset-0 flex items-center justify-center font-serif text-2xl font-light tracking-[0.1em] text-white">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ThematicBanner() {
  return (
    <FadeIn>
      <section className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <Image
          src="/images/necklace-close.png"
          alt="קולקציית AMATO במבט קרוב"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <Link
            href="#geo-collection"
            className="inline-flex items-center rounded-full border border-white/80 px-9 py-3.5 text-xs font-medium tracking-[0.14em] text-white transition-all duration-500 ease-in-out hover:bg-white hover:text-neutral-900"
          >
            Discover the Collection
          </Link>
        </div>
      </section>
    </FadeIn>
  );
}

function Craftsmanship() {
  return (
    <FadeIn>
      <section className="relative w-full overflow-hidden">
        <Image
          src="/images/jewelry-stone.png"
          alt="המלאכה של AMATO"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center text-white lg:py-36">
          <p className="text-xs tracking-[0.3em] text-[#d4af6a]">CRAFTSMANSHIP</p>
          <h2 className="mt-5 font-serif text-3xl font-light tracking-[0.04em] lg:text-5xl">
            Quality in Every Detail
          </h2>
          <p className="mt-7 max-w-xl text-sm leading-loose text-white/85">
            כל פריט עובר ביקורת קפדנית — מהבחירה בחומרים ועד הגימור הסופי. כך
            אנחנו מבטיחים תכשיט שנשאר יפה הרבה מעבר ליום שבו קיבלת אותו.
          </p>
        </div>
      </section>
    </FadeIn>
  );
}

function NewArrivalsIntro() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 text-center lg:px-10 lg:pt-24">
      <p className="text-xs tracking-[0.3em] text-[#b8902f]">THE AMATO SIGNATURE</p>
    </section>
  );
}

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
    <footer className="border-t border-stone-200/70 bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <span className="font-serif text-xl tracking-[0.35em] text-neutral-900">
              AMATO
            </span>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-neutral-500">
              Minimalist jewelry, crafted with precision.
            </p>
          </div>

          {/* Link columns */}
          {[FOOTER_LINKS.service, FOOTER_LINKS.policies].map((col) => (
            <nav key={col.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-medium tracking-[0.16em] text-neutral-900">
                {col.title}
              </h3>
              {col.links.map((link) => (
                <FooterLink key={link.label} item={link} />
              ))}
            </nav>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs font-medium tracking-[0.16em] text-neutral-900">
              הצטרפו ל-AMATO
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500">
              גישה מוקדמת לפריטים חדשים ותצוגות מקדימות של קולקציות.
            </p>
            <form className="mt-5 flex items-center border-b border-neutral-300 pb-2">
              <input
                type="email"
                placeholder="כתובת אימייל"
                className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-xs font-medium tracking-[0.08em] text-neutral-900 transition-all duration-500 ease-in-out hover:text-neutral-500"
              >
                הירשם
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar — social (left) · copyright (center) · payments (right) */}
        <div className="mt-14 grid grid-cols-1 items-center gap-6 border-t border-stone-200/70 pt-8 sm:grid-cols-3">
          {/* Left: social */}
          <div className="flex justify-center gap-4 text-neutral-700 sm:justify-start">
            <a
              href="https://www.instagram.com/amato.jewelry/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-all duration-500 ease-in-out hover:text-neutral-900"
            >
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="transition-all duration-500 ease-in-out hover:text-neutral-900"
            >
              <TikTokIcon className="h-5 w-5" />
            </a>
          </div>

          {/* Center: copyright */}
          <span className="text-center text-xs tracking-[0.12em] text-neutral-400">
            © {new Date().getFullYear()} AMATO. All rights reserved.
          </span>

          {/* Right: payments */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end">
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="rounded-sm border border-stone-200 bg-white px-2.5 py-1 text-[10px] font-medium tracking-[0.06em] text-neutral-500"
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
