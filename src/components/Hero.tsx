"use client";

import Link from "next/link";
import { WAITLIST_MODE } from "@/lib/config";
import WaitlistButton from "@/components/WaitlistButton";
import FadeIn from "@/components/FadeIn";

// Main product — Hebrew handle, encoded for a safe URL (route decodes it).
const PRODUCT_URL = `/product/${encodeURIComponent("vault-השייקר-המגנטי")}`;
// Hero background clip (Mag-Grip in action). Hebrew filename → encode for URL.
const VIDEO_SRC = `/videos/${encodeURIComponent("שייקר.mp4")}`;

const ctaButton =
  "inline-flex w-full items-center justify-center rounded-full bg-[#2e9bff] px-12 py-4 text-sm font-black uppercase tracking-[0.14em] text-black shadow-[0_10px_40px_-10px_rgba(46,155,255,0.75)] ring-1 ring-[#2e9bff]/40 transition-all duration-300 ease-out hover:scale-105 hover:bg-[#5cb3ff] hover:shadow-[0_0_44px_-4px_rgba(46,155,255,0.9)] active:scale-95 sm:w-auto";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92vh] w-full items-center overflow-hidden bg-[#111111]">
      {/* Edge-to-edge lifestyle video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/vault-shaker-hero.png"
        aria-label="שייקר VAULT המגנטי בפעולה — טכנולוגיית Mag-Grip"
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Charcoal gradients — depth + text legibility (never pure black) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/55 to-[#111111]/25" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-transparent to-black/35" />

      {/* Soft gradient-mesh glow — organic depth behind the glass card, not a flat overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 bottom-0 h-[36rem] w-[36rem] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(46,155,255,0.35) 0%, rgba(46,155,255,0) 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-[30rem] w-[30rem] rounded-full opacity-25 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* Glassmorphism content card */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-10">
        <FadeIn>
          <div className="mx-auto max-w-xl rounded-3xl border border-white/15 bg-white/[0.06] p-8 text-center shadow-[0_24px_70px_-24px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:p-10 lg:mx-0 lg:text-right">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-zinc-300 sm:text-sm">
              פיתוח מתקדם · איכות ללא פשרות
            </p>
            <h1 className="mb-5 font-display text-4xl font-black leading-[1.05] tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
              האימון שלך, משודרג. הטלפון מוגן, השייק מושלם.
            </h1>
            <p className="mb-8 text-base font-light leading-relaxed text-zinc-200 sm:text-lg">
              שכח מהטלפון על הרצפה. ה-Vault מחזיק את המכשיר שלך בגובה העיניים
              ומכין שייק חלק ב-10 שניות.
            </p>
            {WAITLIST_MODE ? (
              <WaitlistButton
                className={`mx-auto max-w-xs sm:mx-0 sm:max-w-none ${ctaButton}`}
              />
            ) : (
              <Link
                href={PRODUCT_URL}
                className={`mx-auto max-w-xs sm:mx-0 sm:max-w-none ${ctaButton}`}
              >
                שדרג את האימון שלי עכשיו
              </Link>
            )}
            <p className="mt-4 text-xs font-medium tracking-wide text-zinc-300">
              משלוח מהיר לכל חלקי הארץ | 30 ימי אחריות
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
