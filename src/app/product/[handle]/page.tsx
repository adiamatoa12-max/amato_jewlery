import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import CustomerReviews from "@/components/CustomerReviews";
import {
  getAllMockHandles,
  getMockProductByHandle,
} from "@/lib/mock-data";

export function generateStaticParams() {
  return getAllMockHandles().map((handle) => ({ handle }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = getMockProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const soldOut = !product.availableForSale;

  return (
    <div className="flex min-h-full flex-col pb-20 lg:pb-0">
      <main className="mx-auto w-full max-w-7xl flex-1 px-6 pb-12 pt-[140px] lg:px-10 lg:pb-16 lg:pt-[160px]">
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
          }}
        />
      </main>
      <CustomerReviews handle={product.handle} />
    </div>
  );
}
