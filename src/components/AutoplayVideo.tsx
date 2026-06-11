"use client";

import { useEffect, useRef } from "react";

/**
 * A muted, looping background video that only plays while it is on screen.
 * An IntersectionObserver pauses offscreen instances so multiple copies of
 * the same clip don't all decode at once — keeps scrolling smooth.
 */
export default function AutoplayVideo({
  src,
  className,
  poster,
}: {
  src: string;
  className?: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // play() can reject if interrupted — ignore.
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  );
}
