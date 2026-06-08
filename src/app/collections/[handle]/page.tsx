import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import { getCollectionByHandle } from "@/lib/catalog";

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
    <div className="flex min-h-full flex-col pt-[5.25rem]">
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-16 lg:px-10 lg:py-24">
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
