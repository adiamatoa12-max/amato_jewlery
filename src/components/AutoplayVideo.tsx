"use client";

import { useEffect, useRef } from "react";

/**
 * A muted background video that only plays while on screen.
 *
 * - An IntersectionObserver pauses offscreen instances so multiple copies of
 *   the same clip don't all decode at once — keeps scrolling smooth.
 * - Optional `start`/`end` (seconds) loop a single segment of the source, so
 *   several tiles can each tell a different part of the story from one file.
 */
export default function AutoplayVideo({
  src,
  className,
  poster,
  start,
  end,
}: {
  src: string;
  className?: string;
  poster?: string;
  start?: number;
  end?: number;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const segmented = typeof start === "number" && typeof end === "number";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Seek to the segment start once metadata is known.
    const seekToStart = () => {
      if (segmented && el.currentTime < (start as number)) {
        el.currentTime = start as number;
      }
    };
    if (segmented) {
      if (el.readyState >= 1) seekToStart();
      else el.addEventListener("loadedmetadata", seekToStart);
    }

    // Loop within the segment: when we pass `end`, jump back to `start`.
    const onTimeUpdate = () => {
      if (segmented && el.currentTime >= (end as number)) {
        el.currentTime = start as number;
      }
    };
    if (segmented) el.addEventListener("timeupdate", onTimeUpdate);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            seekToStart();
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      el.removeEventListener("loadedmetadata", seekToStart);
      el.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [segmented, start, end]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      autoPlay
      muted
      loop={!segmented}
      playsInline
      preload="metadata"
    />
  );
}
