"use client";

import Link from "next/link";
import { WAITLIST_MODE } from "@/lib/config";
import WaitlistButton from "@/components/WaitlistButton";
import FadeIn from "@/components/FadeIn";

// Main product — Hebrew handle, encoded for a safe URL (route decodes it).
const PRODUCT_URL = `/product/${encodeURIComponent("vault-השייקר-המגנטי")}`;
// Hero background clip (new electric shaker in action). Hebrew filename with a
// space → encode for a safe URL. The clip lives under /images with the assets.
const VIDEO_SRC = `/videos/${encodeURIComponent("שייקר חדש4.mp4")}`;
const VIDEO_POSTER = `/images/${encodeURIComponent("שייקר חדש2.jpeg")}`;

const ctaButton =
  "inline-flex w-full items-center justify-center rounded-full bg-[#2952e3] px-12 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-[0_10px_40px_-10px_rgba(41,82,227,0.75)] ring-1 ring-[#2952e3]/40 transition-all duration-300 ease-out hover:scale-105 hover:bg-[#4169e5] hover:shadow-[0_0_44px_-4px_rgba(41,82,227,0.9)] active:scale-95 sm:w-auto";

export default function Hero() {
  return (
    <section className="relative flex min-h-[86vh] w-full items-center justify-center overflow-hidden bg-surface sm:min-h-[92vh]">
      {/* Edge-to-edge lifestyle video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={VIDEO_POSTER}
        aria-label="שייקר VAULT החשמלי בפעולה — טכנולוגיית Mag-Grip"
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>

      {/* Global dark overlay — uniform legibility wash + a vertical gradient
          for extra depth toward the bottom. No local box behind the text. */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Content — floats directly over the video, centered on every breakpoint */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-16 text-center sm:py-24 lg:px-10">
        <FadeIn>
          <div className="flex flex-col items-center">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-zinc-200 sm:text-sm">
              הנדסת ביצועים · אפס פשרות
            </p>
            <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              האימון שלך משודרג
            </h1>
            <p className="mt-3 max-w-2xl text-lg font-light leading-relaxed text-zinc-100 sm:text-xl">
              הטלפון מאובטח. השייק מושלם.
            </p>
            <p className="mx-auto mt-5 max-w-md text-base font-light leading-relaxed text-zinc-300">
              בלי טלפון על הרצפה. בלי גושים. רק ביצועים.
            </p>

            <div className="mt-10 sm:mt-10">
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
            </div>
            <p className="mt-4 text-xs font-medium tracking-wide text-zinc-300">
              משלוח מהיר לכל חלקי הארץ | 30 ימי אחריות
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
