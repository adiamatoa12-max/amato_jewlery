"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  "/images/hero-banner-women.jpg",
  "/images/hero-banner-men.jpg",
];

const INTERVAL = 5500;

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Respect users who prefer reduced motion — keep the first slide static.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let id: ReturnType<typeof setInterval>;
    const start = () => {
      id = setInterval(
        () => setActive((i) => (i + 1) % SLIDES.length),
        INTERVAL,
      );
    };
    const stop = () => clearInterval(id);

    const onChange = () => {
      stop();
      if (!mq.matches) start();
      else setActive(0);
    };

    start();
    mq.addEventListener("change", onChange);
    return () => {
      stop();
      mq.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div aria-hidden className="absolute inset-0">
      {SLIDES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-[1500ms] ease-in-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
