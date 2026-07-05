import type { Metadata } from "next";
import ThankYou from "@/components/ThankYou";
import { getProduct } from "@/lib/catalog";

// Order-confirmation page — keep it out of search.
export const metadata: Metadata = {
  title: "תודה על ההזמנה — VAULT",
  robots: { index: false, follow: false },
};

export const revalidate = 60;

export default async function ThankYouPage() {
  const product = await getProduct("vault-השייקר-המגנטי").catch(() => null);

  return (
    <div className="flex min-h-full flex-col bg-surface text-zinc-900">
      <ThankYou
        product={
          product
            ? {
                handle: product.handle,
                title: product.title,
                price: product.price,
                currency: product.currency,
                image: product.image,
                material: product.material,
                variantId: product.variantId,
              }
            : null
        }
      />
    </div>
  );
}
