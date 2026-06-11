"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const GOLD = "#c8a24c";
const SLIDES = ["/images/hero-main.png", "/images/hero-2.png"];

const goldButton =
  "inline-flex items-center justify-center rounded-full bg-[#c8a24c] px-12 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black transition-all duration-300 ease-out hover:bg-[#e0bd6a] hover:shadow-[0_0_34px_-6px_rgba(200,162,76,0.65)]";

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

      {/* Static text block, pinned LEFT (RTL justify-end). Never fades/moves. */}
      <div className="relative z-10 flex h-full w-full items-center justify-end px-6 lg:px-16">
        <div className="max-w-xl text-right">
          <p
            className="mb-4 text-sm font-bold tracking-widest"
            style={{ color: GOLD }}
          >
            פיתוח מתקדם. איכות ללא פשרות. מחיר ללא תחרות.
          </p>
          <h1 className="mb-6 font-display text-5xl font-extrabold leading-tight text-white md:text-6xl">
            מעלים את רמת האימון שלך.
          </h1>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-zinc-300">
            שייקר הפרימיום היחיד בעולם עם מגנט עוצמתי שמעגן את השייקר ואת הטלפון
            שלך בצורה מושלמת.
          </p>
          <Link href="#shop" className={goldButton}>
            הזמן עכשיו את VAULT
          </Link>
        </div>
      </div>
    </section>
  );
}
