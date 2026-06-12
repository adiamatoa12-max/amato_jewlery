"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const GOLD = "#c8a24c";
const SLIDES = ["/images/hero-main.png", "/images/hero-2.png"];

const goldButton =
  "inline-flex w-full items-center justify-center rounded-full bg-[#c8a24c] px-12 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-[#e0bd6a] hover:shadow-[0_0_34px_-6px_rgba(200,162,76,0.65)] active:scale-95 active:shadow-[0_0_48px_-2px_rgba(200,162,76,0.95)] sm:w-auto";

export default function Hero() {
  const [active, setActive] = useState(0);

  // Cross-fade between the hero backgrounds every 5s.
  useEffect(() => {
    if (SLIDES.length < 2) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % SLIDES.length),
      5000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[90vh] w-full items-center overflow-hidden bg-black">
      {/* Background slider — crossfading layers. Only these fade; text is static. */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          aria-hidden
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}

      {/* Readability scrim — darker on the LEFT where the text sits. */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/55 to-black/90" />

      {/* Text block — centered on mobile, pinned LEFT (RTL justify-end) on desktop. */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-12 md:justify-end lg:px-16">
        <div className="max-w-xl text-center md:text-right">
          <p
            className="mb-4 text-xs font-bold tracking-widest sm:text-sm"
            style={{ color: GOLD }}
          >
            פיתוח מתקדם. איכות ללא פשרות. מחיר ללא תחרות.
          </p>
          <h1 className="mb-6 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            מעלים את רמת האימון שלך.
          </h1>
          <p className="mx-auto mb-8 max-w-md text-base leading-relaxed text-zinc-300 sm:text-lg md:mx-0">
            שייקר הפרימיום היחיד בעולם עם מגנט עוצמתי שמעגן את השייקר ואת הטלפון
            שלך בצורה מושלמת.
          </p>
          <Link
            href="#shop"
            className={`mx-auto max-w-xs sm:mx-0 sm:max-w-none ${goldButton}`}
          >
            הזמן עכשיו את VAULT
          </Link>
        </div>
      </div>
    </section>
  );
}
