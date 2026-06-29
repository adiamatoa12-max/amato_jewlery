"use client";

import Link from "next/link";
import { WAITLIST_MODE } from "@/lib/config";
import WaitlistButton from "@/components/WaitlistButton";

const GOLD = "#A7C7E7";
// Main product — Hebrew handle, encoded for a safe URL (route decodes it).
const PRODUCT_URL = `/product/${encodeURIComponent("vault-השייקר-המגנטי")}`;
// Hero showcase clip (Mag-Grip in action). Hebrew filename → encode for the URL.
const VIDEO_SRC = `/videos/${encodeURIComponent("שייקר.mp4")}`;

const goldButton =
  "inline-flex w-full items-center justify-center rounded-full bg-[#A7C7E7] px-12 py-4 text-sm font-bold uppercase tracking-[0.14em] text-black transition-all duration-300 ease-out hover:scale-105 hover:bg-[#C2DCF0] hover:shadow-[0_0_34px_-6px_rgba(167, 199, 231,0.65)] active:scale-95 active:shadow-[0_0_48px_-2px_rgba(167, 199, 231,0.95)] sm:w-auto";

export default function Hero() {
  return (
    <section className="bg-[#111111] px-6 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* TEXT — top on mobile; left column on desktop (order-2 in RTL flow). */}
        <div className="text-center lg:order-2 lg:text-right">
          <p
            className="mb-4 text-xs font-bold tracking-widest sm:text-sm"
            style={{ color: GOLD }}
          >
            פיתוח מתקדם. איכות ללא פשרות. מחיר ללא תחרות.
          </p>
          <h1 className="mb-5 font-display text-3xl font-extrabold leading-tight text-zinc-100 sm:text-4xl md:text-5xl">
            האימון שלך, משודרג.{" "}
            <span style={{ color: GOLD }}>הטלפון מוגן, השייק מושלם.</span>
          </h1>
          <p className="mb-8 text-base font-light leading-relaxed text-zinc-300 sm:text-lg">
            שכח מהטלפון על הרצפה. ה-Vault מחזיק את המכשיר שלך בגובה העיניים
            ומכין שייק חלק ב-10 שניות.
          </p>
          {WAITLIST_MODE ? (
            <WaitlistButton
              className={`mx-auto max-w-xs sm:mx-0 sm:max-w-none ${goldButton}`}
            />
          ) : (
            <Link
              href={PRODUCT_URL}
              className={`mx-auto max-w-xs sm:mx-0 sm:max-w-none ${goldButton}`}
            >
              שדרג את האימון שלי עכשיו
            </Link>
          )}
          <p className="mt-4 text-xs font-medium tracking-wide text-zinc-300">
            משלוח מהיר לכל חלקי הארץ | 30 ימי אחריות
          </p>
        </div>

        {/* VIDEO — below text on mobile; right column on desktop (order-1).
            Sequential flow only — never overlaps the text. The aspect-ratio
            container is pre-sized (no layout shift) and the poster paints
            instantly while the clip loads. */}
        <div className="lg:order-1">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/images/vault-shaker-hero.png"
              aria-label="שייקר VAULT המגנטי מחזיק את הטלפון בחדר הכושר — טכנולוגיית Mag-Grip בפעולה"
              className="absolute inset-0 h-full w-full object-cover object-center"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
