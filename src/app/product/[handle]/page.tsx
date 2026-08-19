import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import CustomerReviews from "@/components/CustomerReviews";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";
import { getAllHandles, getProduct } from "@/lib/catalog";
import { getReviewSummary } from "@/lib/reviews";
import { SITE_URL } from "@/lib/site";
import { FOUNDER_PRICE } from "@/lib/pricing";

// ISR: refresh live product data every 60s. dynamicParams (default true) lets
// products added after the last build render on first request.
export const revalidate = 60;

// Per-product SEO: meta title/description + Open Graph & Twitter cards.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(decodeURIComponent(handle));
  if (!product) return { title: "מוצר לא נמצא — VAULT" };

  const title = /vault/i.test(product.title)
    ? product.title
    : `${product.title} — VAULT`;
  const description =
    product.description?.replace(/\s+/g, " ").trim().slice(0, 160) ||
    "שייקר VAULT החשמלי — מערבב שייק חלק בלי גושים, נצמד עם מגנט N52 לכל מכונה ואטום 100%.";
  const canonicalPath = `/product/${encodeURIComponent(product.handle)}`;
  // Structured OG image object (width/height/alt) — WhatsApp/Facebook render
  // a correctly-sized preview immediately instead of guessing dimensions.
  const ogImages = product.image
    ? [{ url: product.image, width: 1200, height: 1500, alt: product.title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "website",
      locale: "he_IL",
      siteName: "VAULT",
      url: `${SITE_URL}${canonicalPath}`,
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const handles = await getAllHandles();
  return handles.map((handle) => ({ handle }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  // Decode so non-ASCII (Hebrew) handles match Shopify exactly — the route
  // param arrives percent-encoded.
  const product = await getProduct(decodeURIComponent(handle));

  if (!product) {
    notFound();
  }

  const soldOut = !product.availableForSale;
  const { average: ratingValue, count: reviewCount } = getReviewSummary(
    product.handle,
  );
  const productUrl = `${SITE_URL}/product/${encodeURIComponent(product.handle)}`;
  const absoluteImage = product.image?.startsWith("http")
    ? product.image
    : `${SITE_URL}${product.image}`;

  // Product structured data — mirrors exactly what's rendered on the page
  // (price, currency, stock status, rating) so it never drifts from the UI.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: [absoluteImage],
    description:
      product.description?.replace(/\s+/g, " ").trim() ||
      "שייקר מגנטי לחדר כושר VAULT — מגנט N52, מעמד טלפון מובנה ואטימה מושלמת.",
    sku: product.handle,
    brand: { "@type": "Brand", name: "VAULT" },
    ...(ratingValue > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: ratingValue.toFixed(1),
        reviewCount,
      },
    }),
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: product.currency || "ILS",
      // ProductView always displays the Founder's Edition launch price for
      // the single unit, regardless of the raw Shopify catalog price — match
      // that exactly so the schema never disagrees with the visible page.
      price: FOUNDER_PRICE,
      availability: soldOut
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/InStock",
    },
  };

  return (
    <div className="flex min-h-full flex-col bg-surface pb-20 text-zinc-900 lg:pb-0">
      <script
        type="application/ld+json"
        // Trusted, server-derived data only (Shopify catalog + our own
        // review data) — never user input, so this is safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-6 pb-16 pt-[140px] lg:px-10 lg:pb-24 lg:pt-[160px]">
        <ProductView
          soldOut={soldOut}
          collectionTitle={product.collectionTitle}
          collectionHandle={product.collectionHandle}
          product={{
            handle: product.handle,
            title: product.title,
            price: product.price,
            currency: product.currency,
            image: product.image,
            hoverImage: product.hoverImage,
            material: product.material,
            description: product.description,
            gallery: product.gallery,
            styledImage: product.styledImage,
            variantId: product.variantId,
            // Typed media for the gallery. Live products carry galleryMedia;
            // bundled products fall back to their images, typed as IMAGE.
            galleryMedia:
              product.galleryMedia ??
              (product.gallery ?? [product.image, product.hoverImage])
                .filter(Boolean)
                .map((url) => ({ media_type: "IMAGE" as const, url })),
          }}
        />
      </main>
      {/* Below-the-fold reviews — kept below the buy box/accordions. Brand
          story (Manifesto) lives on the homepage only, to avoid duplication. */}
      <CustomerReviews handle={product.handle} />

      {/* Objection-busting FAQ — the three questions buyers ask most before
          checkout. `bg-surface` alternates against the gray reviews section. */}
      <FaqAccordion items={PRODUCT_FAQS} className="bg-surface" />
    </div>
  );
}

// Product-page FAQ — focused on the top pre-purchase objections.
const PRODUCT_FAQS: FaqItem[] = [
  {
    q: "כמה זמן מחזיקה הסוללה?",
    a: "טעינת USB אחת מספיקה ל-30+ אימונים. ממשיכה איתכם שבועות בלי לחשוב על טעינה.",
  },
  {
    q: "המגנט בטוח לטלפון ולכרטיסי אשראי?",
    a: "100% בטוח לכל המכשירים. ההצמדה חיצונית בלבד — לא פוגעת במסך, בסוללה או בכרטיסים.",
  },
  {
    q: "איך מנקים את השייקר?",
    a: "מים וטיפת סבון, מפעילים את המנוע החשמלי ל-5 שניות ושוטפים. נקי לגמרי, בלי מאמץ.",
  },
];
