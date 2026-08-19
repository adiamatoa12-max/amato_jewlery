import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import { getCollectionByHandle } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

// ISR: refresh live collection data every 60s.
export const revalidate = 60;

// Per-collection SEO: distinct title/description/OG per collection instead of
// silently inheriting the root layout's homepage metadata.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(decodeURIComponent(handle));
  if (!collection) return { title: "קולקציה לא נמצאה — VAULT" };

  const title = `${collection.title} — VAULT`;
  const description =
    collection.tagline?.replace(/\s+/g, " ").trim().slice(0, 160) ||
    `${collection.title} מבית VAULT — הציוד שמשדרג לך את האימון.`;
  const image = collection.products[0]?.image;
  const canonicalPath = `/collections/${encodeURIComponent(collection.handle)}`;

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
      images: image
        ? [{ url: image, width: 1200, height: 1500, alt: collection.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const collection = await getCollectionByHandle(decodeURIComponent(handle));

  if (!collection) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-col pt-[5.75rem]">
      <main id="main-content" className="mx-auto w-full max-w-7xl flex-1 px-6 py-16 lg:px-10 lg:py-24">
        <FadeIn>
          <h1 className="text-center font-serif text-3xl font-light tracking-[0.04em] text-neutral-900 lg:text-4xl">
            {collection.title}
          </h1>
          {collection.tagline && (
            <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-neutral-500">
              {collection.tagline}
            </p>
          )}
        </FadeIn>

        {collection.products.length === 0 ? (
          <p className="mt-16 text-center text-sm text-neutral-500">
            הקולקציה ריקה כרגע. חזרו בקרוב.
          </p>
        ) : (
          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-20 lg:mt-16 lg:gap-x-16 lg:gap-y-28">
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
        )}
      </main>
    </div>
  );
}
