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
    <section className="relative flex min-h-[90vh] w-full overflow-hidden bg-[#111111] lg:grid lg:grid-cols-2 lg:overflow-visible">
      {/* CONTENT — overlaid+centered on mobile; right column on a solid dark panel on desktop */}
      <div className="relative z-10 flex min-h-[90vh] w-full items-center justify-center px-6 py-12 lg:min-h-0 lg:justify-end lg:bg-zinc-950 lg:px-16 lg:shadow-[-24px_0_70px_-24px_rgba(0,0,0,0.85)]">
        <div className="mx-auto max-w-sm rounded-2xl border border-white/15 bg-black/20 p-7 text-center shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-[8px] sm:max-w-md sm:p-8 lg:mx-0 lg:max-w-2xl lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:text-right lg:shadow-none lg:backdrop-blur-none">
          <p
            className="mb-4 text-xs font-bold tracking-widest sm:text-sm"
            style={{ color: GOLD }}
          >
            פיתוח מתקדם. איכות ללא פשרות. מחיר ללא תחרות.
          </p>
          <h1 className="mb-5 font-display text-3xl font-extrabold leading-tight text-zinc-100 sm:text-4xl md:text-5xl lg:text-5xl">
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
      </div>

      {/* VISUAL — Mag-Grip showcase video. Full-bleed on mobile; left column on
          desktop. The container is always sized (min-h-[90vh] / stretched grid
          cell), so the object-cover video can't cause layout shift; the poster
          paints instantly while the clip loads. */}
      <div className="absolute inset-0 lg:relative lg:inset-auto lg:h-auto lg:bg-[#111111]">
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

      {/* Legibility overlay — mobile only (desktop text sits on the solid panel) */}
      <div className="absolute inset-0 bg-black/40 lg:hidden" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/40 to-black/80 lg:hidden" />
    </section>
  );
}
