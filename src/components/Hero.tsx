"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const GOLD = "#c8a24c";
const SLIDES = [
  { src: "/images/vault-shaker-hero.png", alt: "שייקר VAULT המגנטי עם מעמד טלפון" },
  { src: "/images/vault-shaker-unboxing.png", alt: "אריזת השייקר המגנטי של VAULT" },
];

const goldButton =
  "inline-flex w-full items-center justify-center rounded-full bg-[#c8a24c] px-12 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#e0bd6a] hover:shadow-[0_0_34px_-6px_rgba(200,162,76,0.65)] active:scale-95 active:shadow-[0_0_48px_-2px_rgba(200,162,76,0.95)] sm:w-auto";

export default function Hero() {
  const [active, setActive] = useState(0);

  // Auto-advance with a slow, elegant crossfade — every 4.5s.
  useEffect(() => {
    if (SLIDES.length < 2) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      4500,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[90vh] w-full items-center overflow-hidden bg-black">
      {/* Background slider — crossfading layers. Only these fade; text is static. */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.src}
          aria-hidden
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ))}

      {/* Legibility overlay: even darkening + a deeper scrim on the LEFT (text side). */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/40 to-black/80" />

      {/* Text block — centered on mobile, pinned LEFT (RTL justify-end) on desktop. */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-12 md:justify-end lg:px-16">
        <div className="max-w-xl text-center md:text-right">
          <p
            className="mb-4 text-xs font-bold tracking-widest sm:text-sm"
            style={{ color: GOLD }}
          >
            פיתוח מתקדם. איכות ללא פשרות. מחיר ללא תחרות.
          </p>
          <h1 className="mb-6 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            <span style={{ color: GOLD }}>VAULT</span>: השייקר המגנטי הראשון
            בעולם שמשחרר לך את הידיים לצלם את האימון.
          </h1>
          <Link
            href="#shop"
            className={`mx-auto max-w-xs sm:mx-0 sm:max-w-none ${goldButton}`}
          >
            הזמן עכשיו את VAULT
          </Link>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex items-center justify-center gap-2.5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`מעבר לתמונה ${i + 1}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all duration-500 ease-in-out ${
              i === active ? "w-6 bg-[#c8a24c]" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
