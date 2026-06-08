import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import HeroCarousel from "@/components/HeroCarousel";
import EssenceSection from "@/components/EssenceSection";
import BundleShowcase from "@/components/BundleShowcase";
import ShoppableVideoFeed, {
  type VideoFeedItem,
} from "@/components/ShoppableVideoFeed";
import FooterLink, { type FooterLinkItem } from "@/components/FooterLink";
import { COLLECTIONS } from "@/lib/mock-data";
import {
  getCollections,
  getFeaturedProducts,
  getStyleTiles,
  type StyleTile,
} from "@/lib/catalog";

// The "In Motion" lifestyle clips. Each video is paired (by order) with one of
// your live Shopify products, so its title/price/URL come straight from Shopify.
const VIDEO_FILES = [
  "/videos/silver-hoops-lifestyle.mp4",
  "/videos/gold-pendant-lifestyle.mp4",
  "/videos/geo-pendant-lifestyle.mp4",
  "/videos/gold-hoops-lifestyle.mp4",
];

async function getVideoFeedItems(): Promise<VideoFeedItem[]> {
  const products = await getFeaturedProducts(VIDEO_FILES.length);
  return VIDEO_FILES.flatMap((video, i) => {
    const product = products[i];
    if (!product) return [];
    return [
      {
        video,
        href: `/product/${product.handle}`,
        title: product.title,
        price: product.price,
        currency: product.currency,
      } satisfies VideoFeedItem,
    ];
  });
}

export default async function Home() {
  const [collections, videoItems, styleTiles] = await Promise.all([
    getCollections(),
    getVideoFeedItems(),
    getStyleTiles(),
  ]);

  return (
    // Reserve the fixed announcement + header band (top-7 + h-14 = 5.25rem)
    // so the hero begins cleanly below the navigation, never under it.
    <div className="flex min-h-full flex-col pt-[5.25rem]">
      <main className="flex-1">
        <Hero />
        <FadeIn>
          <ShopByCategory tiles={styleTiles} />
        </FadeIn>
        <FadeIn>
          <EssenceSection />
        </FadeIn>
        <FadeIn>
          <NewArrivalsIntro />
        </FadeIn>
        {collections.map((collection) => (
          <CollectionSection key={collection.handle} collection={collection} />
        ))}
        <FadeIn>
          <ShoppableVideoFeed items={videoItems} />
        </FadeIn>
        <ThematicBanner />
        <Craftsmanship />
        <FadeIn>
          <BundleShowcase />
        </FadeIn>
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/45" />

      <div className="relative z-10 flex max-w-2xl flex-col items-center px-6 text-center text-white">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.34em] text-white/75">
          AMATO
        </p>
        <h1 className="font-serif text-[2.6rem] font-light leading-[1.05] tracking-[0.08em] sm:text-6xl sm:tracking-[0.1em] lg:text-7xl">
          הקולקציה החדשה
        </h1>
        <p className="mt-6 max-w-md text-sm font-light leading-relaxed tracking-[0.02em] text-white/85 sm:text-base">
          קולקציית תכשיטי הפרימיום מכסף סטרלינג 925 וציפוי זהב 14 קראט.
        </p>
        <Link
          href="#shop"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-xs font-medium uppercase tracking-[0.18em] text-neutral-900 shadow-lg shadow-black/10 transition-all duration-500 ease-in-out hover:bg-white/90 hover:shadow-xl sm:text-[13px]"
        >
          לקולקציה המלאה
        </Link>
      </div>

      {/* Subtle scroll cue */}
      <div className="absolute inset-x-0 bottom-7 z-10 flex justify-center">
        <span className="h-9 w-[1px] bg-gradient-to-b from-white/0 via-white/60 to-white/0" />
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

      {/* Centered flex wrap so partial rows (e.g. a lone 5th item) sit
          centered instead of leaving empty space on the side. */}
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-20 lg:gap-x-16 lg:gap-y-28">
        {collection.products.map((product, i) => (
          <FadeIn
            key={product.id}
            delay={i * 100}
            className="w-[calc(50%-1.25rem)] lg:w-[calc(25%-3rem)]"
          >
            <ProductCard product={product} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ShopByCategory({ tiles }: { tiles: StyleTile[] }) {
  if (tiles.length === 0) return null;
  return (
    <section
      id="shop"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 pb-4 pt-16 lg:px-10 lg:pb-8 lg:pt-24"
    >
      <p className="text-center text-[11px] font-medium tracking-[0.3em] text-[#b8902f]">
        הקולקציות שלנו
      </p>
      <h2 className="mt-4 text-center font-serif text-3xl font-light tracking-[0.04em] text-neutral-900 lg:text-4xl">
        קנו לפי סגנון
      </h2>
      <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-5 lg:mt-16 lg:gap-6">
        {tiles.map((tile, i) => (
          <Link
            key={`${tile.handle}-${i}`}
            href={`/collections/${tile.handle}`}
            className="group relative block aspect-[3/4] overflow-hidden rounded-lg bg-[#f4f2ef]"
          >
            <Image
              src={tile.image}
              alt={tile.label}
              fill
              sizes="(min-width: 768px) 384px, 50vw"
              className="object-cover transition-transform duration-[900ms] ease-in-out group-hover:scale-[1.06]"
            />
            {/* Soft overlay for legibility of the centered label */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/60" />
            <span className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 px-4 pb-6 text-center text-white">
              <span className="font-serif text-xl font-light tracking-[0.08em] lg:text-2xl">
                {tile.label}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                לרכישה
              </span>
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
            גלו את הקולקציה
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
          <p className="text-xs tracking-[0.3em] text-[#d4af6a]">אומנות יד</p>
          <h2 className="mt-5 font-serif text-3xl font-light tracking-[0.04em] lg:text-5xl">
            איכות בכל פרט
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
      <p className="text-xs tracking-[0.3em] text-[#b8902f]">החתימה של AMATO</p>
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
        <div className="grid grid-cols-2 gap-x-10 gap-y-12 lg:grid-cols-4 lg:gap-x-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <span className="font-serif text-xl tracking-[0.35em] text-neutral-900">
              AMATO
            </span>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-neutral-500">
              תכשיטים מינימליסטיים, עשויים בדייקנות.
            </p>
          </div>

          {/* Link columns */}
          {[FOOTER_LINKS.service, FOOTER_LINKS.policies].map((col) => (
            <nav key={col.title} className="flex flex-col">
              <h3 className="text-xs font-medium tracking-[0.16em] text-neutral-900">
                {col.title}
              </h3>
              <div className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <FooterLink key={link.label} item={link} />
                ))}
              </div>
            </nav>
          ))}

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs font-medium tracking-[0.16em] text-neutral-900">
              הצטרפו ל-AMATO
            </h3>
            <p className="mt-4 text-xs leading-relaxed text-neutral-500">
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
          <div className="flex items-center justify-center gap-4 text-neutral-600 sm:justify-start">
            <a
              href="https://www.instagram.com/amato.jewelry/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-all duration-500 ease-in-out hover:text-neutral-900"
            >
              <Instagram className="h-[18px] w-[18px]" strokeWidth={1.5} />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="flex items-center transition-all duration-500 ease-in-out hover:text-neutral-900"
            >
              <TikTokIcon className="h-[18px] w-[18px]" />
            </a>
          </div>

          {/* Center: copyright */}
          <span className="text-center text-xs tracking-[0.12em] text-neutral-400">
            © {new Date().getFullYear()} AMATO. כל הזכויות שמורות.
          </span>

          {/* Right: payments */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:justify-end">
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="inline-flex h-6 items-center rounded-sm border border-stone-200 bg-white px-2 text-[9px] font-medium tracking-[0.06em] text-neutral-500"
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
