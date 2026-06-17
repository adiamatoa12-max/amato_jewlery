"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { WAITLIST_MODE } from "@/lib/config";
import WaitlistButton from "@/components/WaitlistButton";

const GOLD = "#c8a24c";
// Main product — Hebrew handle, encoded for a safe URL (route decodes it).
const PRODUCT_URL = `/product/${encodeURIComponent("vault-השייקר-המגנטי")}`;
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

  const dots = (
    <div className="mt-10 flex items-center justify-center gap-2.5 lg:justify-end">
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
  );

  return (
    <section className="relative flex min-h-[90vh] w-full overflow-hidden bg-black lg:grid lg:grid-cols-2 lg:overflow-visible">
      {/* CONTENT — overlaid+centered on mobile; right column on a solid dark panel on desktop */}
      <div className="relative z-10 flex min-h-[90vh] w-full items-center justify-center px-6 py-12 lg:min-h-0 lg:justify-end lg:bg-zinc-950 lg:px-16 lg:shadow-[-24px_0_70px_-24px_rgba(0,0,0,0.85)]">
        <div className="max-w-xl text-center lg:max-w-2xl lg:text-right">
          <p
            className="mb-4 text-xs font-bold tracking-widest sm:text-sm"
            style={{ color: GOLD }}
          >
            פיתוח מתקדם. איכות ללא פשרות. מחיר ללא תחרות.
          </p>
          <h1 className="mb-6 font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl lg:text-5xl">
            <span style={{ color: GOLD }}>VAULT</span>: השייקר המגנטי הראשון
            בעולם שמשחרר לך את הידיים לצלם את האימון.
          </h1>
          {WAITLIST_MODE ? (
            <WaitlistButton
              className={`mx-auto max-w-xs sm:mx-0 sm:max-w-none ${goldButton}`}
            />
          ) : (
            <Link
              href={PRODUCT_URL}
              className={`mx-auto max-w-xs sm:mx-0 sm:max-w-none ${goldButton}`}
            >
              הזמינו עכשיו את VAULT
            </Link>
          )}
          {dots}
        </div>
      </div>

      {/* VISUAL — full-bleed background on mobile; left column slider on desktop */}
      <div className="absolute inset-0 lg:relative lg:inset-auto lg:h-auto lg:bg-black">
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
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Legibility overlay — mobile only (desktop text sits on the solid panel) */}
      <div className="absolute inset-0 bg-black/40 lg:hidden" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/40 to-black/80 lg:hidden" />
    </section>
  );
}
