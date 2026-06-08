import Image from "next/image";
import Link from "next/link";
import { getProduct } from "@/lib/catalog";

// When you create the Shopify product with the English title
// "The AMATO Full Look Bundle", Shopify generates this handle automatically.
// Until the product exists, the CTA falls back to WhatsApp.
const BUNDLE_HANDLE = "the-amato-full-look-bundle";
const WHATSAPP = "972585838005";

const DESCRIPTION =
  "הלוק המלא של AMATO. סט שנבחר בקפידה על ידי המעצבים שלנו ליצירת הופעה שלמה ומדויקת. המארז כולל 3 שרשראות שכבות, סט טבעות חותם ועגילי חישוק זוויתיים. רכשו את הלוק המלא ותיהנו מ-15% הנחה על הקנייה.";

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat("he-IL", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export default async function BundleShowcase() {
  const product = await getProduct(BUNDLE_HANDLE);
  const isLive = Boolean(product?.variantId);

  const href = isLive
    ? `/product/${product!.handle}`
    : `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        "היי, אשמח לפרטים על באנדל 'הלוק המלא'",
      )}`;
  const ctaLabel = isLive ? "רכשו את הלוק המלא" : "לפרטים ולרכישה";

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
      <div className="grid items-center overflow-hidden rounded-2xl bg-neutral-900 text-white lg:grid-cols-2">
        {/* Image — defined portrait aspect (matches the photo) so it never
            collapses and isn't cropped. */}
        <div className="relative aspect-[3/4] w-full sm:aspect-[4/3] lg:aspect-[4/5]">
          <Image
            src="/images/bundle.jpg"
            alt="באנדל הלוק המלא של AMATO"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain lg:object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center px-8 py-12 text-center lg:px-14 lg:py-16 lg:text-right">
          <p className="text-[11px] font-medium tracking-[0.3em] text-[#d4af6a]">
            הסט המלא · 15% הנחה
          </p>
          <h2 className="mt-4 font-serif text-3xl font-light leading-tight tracking-[0.04em] lg:text-4xl">
            באנדל &rsquo;הלוק המלא&rsquo;
          </h2>
          <p className="mt-5 text-sm leading-loose text-white/80 lg:text-base">
            {DESCRIPTION}
          </p>

          {isLive && product && (
            <p className="mt-6 text-lg tabular-nums text-white">
              {formatPrice(product.price, product.currency)}
            </p>
          )}

          <div className="mt-8 flex justify-center lg:justify-start">
            <Link
              href={href}
              target={isLive ? undefined : "_blank"}
              rel={isLive ? undefined : "noopener noreferrer"}
              className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-xs font-medium tracking-[0.16em] text-neutral-900 transition-all duration-500 ease-in-out hover:bg-white/90 sm:text-[13px]"
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
