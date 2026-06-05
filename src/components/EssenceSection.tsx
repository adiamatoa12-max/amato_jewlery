"use client";

import { useEffect, useRef, useState } from "react";

/**
 * "OUR ESSENCE" — a full-bleed, slow-motion video backdrop with a gentle
 * parallax drift and a centered text block that fades in on scroll.
 *
 * Drop a looping clip at /public/videos/essence-loop.mp4 (a slow pan of the
 * model wearing AMATO pieces). Until then, the lifestyle portrait is used as
 * the poster so the section still renders cleanly.
 */
export default function EssenceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  // Soft fade-in for the text block once the section enters the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Gentle parallax: translate the media slightly slower than the scroll.
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const media = mediaRef.current;
      if (!section || !media) return;
      const rect = section.getBoundingClientRect();
      const viewportH = window.innerHeight;
      // Progress from -1 (just below) to 1 (just above) the viewport center.
      const progress =
        (rect.top + rect.height / 2 - viewportH / 2) / (viewportH + rect.height);
      // Drift the media up to ~8% of its overscan height.
      media.style.transform = `translate3d(0, ${(progress * 16).toFixed(2)}%, 0) scale(1.18)`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[78vh] w-full items-center justify-center overflow-hidden"
    >
      {/* Parallax media layer (overscanned so the drift never reveals edges) */}
      <div ref={mediaRef} className="absolute inset-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/lifestyle-portrait.png"
        >
          <source src="/videos/essence-loop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Warm, restrained overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Centered text block */}
      <div
        className={`relative z-10 flex max-w-2xl flex-col items-center px-6 text-center text-white transition-all duration-[1200ms] ease-out ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <p className="text-[11px] font-medium uppercase tracking-[0.5em] text-[#d4af6a]">
          Our Essence
        </p>
        <h2 className="mt-7 font-serif text-3xl font-light leading-tight tracking-[0.04em] lg:text-5xl">
          Crafted with intention, worn with ease.
        </h2>
        <p className="mt-7 max-w-lg text-sm leading-loose text-white/80 lg:text-base">
          Every AMATO piece is shaped from 925 sterling silver and 14k gold
          plating — minimalist lines made to move with you, day after day.
        </p>
      </div>
    </section>
  );
}
