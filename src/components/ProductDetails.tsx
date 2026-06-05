"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Lock,
  ChevronDown,
} from "lucide-react";
import { useCart, formatPrice, type AddToCartInput } from "@/lib/cart/CartContext";

interface ProductDetailsProps {
  product: AddToCartInput & { description: string; styledImage?: string };
  soldOut: boolean;
  collectionTitle: string;
  collectionHandle: string;
  plating: string;
  onPlatingChange: (plating: "gold" | "silver") => void;
}

const PLATINGS = [
  { id: "gold", label: "זהב", className: "bg-gradient-to-br from-[#e6c878] to-[#b8902f]" },
  { id: "silver", label: "כסף", className: "bg-gradient-to-br from-[#e8e8e8] to-[#a9a9a9]" },
] as const;

const TRUST_BADGES = [
  { icon: Truck, label: "משלוח חינם", sub: "בקנייה מעל 299 ₪" },
  { icon: RotateCcw, label: "החזרות והחלפות", sub: "תוך 30 יום" },
  { icon: ShieldCheck, label: "אחריות לשנה", sub: "על כל פריט" },
  { icon: Lock, label: "אבטחה מירבית", sub: "תשלום מאובטח" },
];

export default function ProductDetails({
  product,
  soldOut,
  collectionTitle,
  collectionHandle,
  plating,
  onPlatingChange,
}: ProductDetailsProps) {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);

  const accordions = [
    {
      title: "פרטים נוספים ומידות",
      body: product.description,
    },
    {
      title: "משלוחים & החלפות והחזרות",
      body: "משלוח חינם בקנייה מעל 299 ₪. ניתן להחליף או להחזיר פריטים תוך 30 יום מיום הקבלה, כל עוד הם במצב חדש ובאריזתם המקורית.",
    },
    {
      title: "חומרים ואחריות",
      body: `${product.material}. כל פריט מגיע עם אחריות לשנה.`,
    },
  ];

  return (
    <section className="flex flex-col self-start lg:sticky lg:top-32 lg:py-2">
      <Link
        href={`/#${collectionHandle}`}
        className="text-xs tracking-[0.16em] text-neutral-400 transition-all duration-500 ease-in-out hover:text-neutral-900"
      >
        {collectionTitle}
      </Link>

      <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-neutral-900 lg:text-5xl">
        {product.title}
      </h1>

      <p className="mt-5 text-2xl tabular-nums text-neutral-900">
        {formatPrice(product.price, product.currency)}
      </p>

      {/* Plating swatches */}
      <div className="mt-9">
        <p className="text-xs tracking-[0.12em] text-neutral-500">
          סוג ציפוי: <span className="text-neutral-900">{PLATINGS.find((p) => p.id === plating)?.label}</span>
        </p>
        <div className="mt-3 flex gap-3">
          {PLATINGS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPlatingChange(p.id)}
              aria-label={p.label}
              aria-pressed={plating === p.id}
              className={`h-9 w-9 rounded-full ${p.className} ring-1 ring-stone-300 transition-all duration-300 ease-in-out ${
                plating === p.id
                  ? "ring-2 ring-offset-2 ring-neutral-900"
                  : "hover:ring-neutral-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Stock status */}
      <p className="mt-7 flex items-center gap-2 text-xs tracking-[0.08em] text-emerald-600">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {soldOut ? "אזל מהמלאי" : "זמין במלאי"}
      </p>

      {/* Actions */}
      <div className="mt-6 flex items-stretch gap-3">
        <button
          type="button"
          disabled={soldOut}
          onClick={() => addItem(product)}
          className="flex flex-1 items-center justify-center rounded-full bg-neutral-800 px-8 py-4 text-sm font-medium tracking-[0.1em] text-white transition-all duration-500 ease-in-out hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          {soldOut ? "אזל מהמלאי" : "הוספה לסל"}
        </button>
        <button
          type="button"
          onClick={() => setWishlisted((w) => !w)}
          aria-label="הוספה למועדפים"
          aria-pressed={wishlisted}
          className="flex aspect-square items-center justify-center rounded-full border border-stone-300 px-4 transition-all duration-500 ease-in-out hover:border-neutral-900"
        >
          <Heart
            className={`h-5 w-5 transition-all duration-300 ${
              wishlisted ? "fill-red-500 text-red-500" : "text-neutral-700"
            }`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Trust badges 2x2 */}
      <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-7">
        {TRUST_BADGES.map(({ icon: Icon, label, sub }) => (
          <li key={label} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-neutral-700" strokeWidth={1.25} />
            <div>
              <p className="text-xs font-medium tracking-[0.04em] text-neutral-800">
                {label}
              </p>
              <p className="mt-0.5 text-[11px] leading-snug text-neutral-400">{sub}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Accordions */}
      <div className="mt-10 border-t border-stone-200/70">
        {accordions.map((item) => (
          <Accordion key={item.title} title={item.title} body={item.body} />
        ))}
      </div>

      {/* Mobile sticky add-to-cart bar — sits above the WhatsApp button (z-40) */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-4 border-t border-stone-200 bg-white/95 px-5 py-3 backdrop-blur-md lg:hidden">
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-[11px] text-neutral-400">{product.title}</span>
          <span className="text-base tabular-nums text-neutral-900">
            {formatPrice(product.price, product.currency)}
          </span>
        </div>
        <button
          type="button"
          disabled={soldOut}
          onClick={() => addItem(product)}
          className="flex flex-1 items-center justify-center rounded-full bg-neutral-800 px-6 py-3.5 text-sm font-medium tracking-[0.1em] text-white transition-all duration-500 ease-in-out hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400"
        >
          {soldOut ? "אזל מהמלאי" : "הוספה לסל"}
        </button>
      </div>

      {/* Styled for You */}
      {product.styledImage && (
        <div className="mt-12">
          <p className="text-xs tracking-[0.3em] text-[#b8902f]">STYLED FOR YOU</p>
          <h2 className="mt-3 font-serif text-2xl font-light text-neutral-900">
            Styled for You
          </h2>
          <div className="relative mt-5 aspect-[4/5] w-full overflow-hidden rounded-sm bg-[#f8f8f8]">
            <Image
              src={product.styledImage}
              alt={`${product.title} — נראה על הדגמן`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-in-out hover:scale-105"
            />
          </div>
        </div>
      )}
    </section>
  );
}

function Accordion({ title, body }: { title: string; body: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-stone-200/70">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-start"
      >
        <span className="text-sm tracking-[0.04em] text-neutral-900">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-neutral-500 transition-transform duration-300 ease-in-out ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={1.5}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-6 text-sm leading-relaxed text-neutral-500">{body}</p>
        </div>
      </div>
    </div>
  );
}
