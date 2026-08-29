"use client";

import { useEffect, useRef } from "react";

type VideoSource = { src: string; type: string };

/**
 * Background / demo video that autoplays as pure looping motion — no controls,
 * no tap-to-play. Uses a direct `src` (single, universally-supported MP4/H.264)
 * rather than <source> children, sets `muted` as a real property (React's
 * attribute alone is unreliable and mobile blocks autoplay for anything it
 * considers unmuted), and retries play() across the load lifecycle plus the
 * first user gesture as a last resort.
 */
export default function AutoplayVideo({
  sources,
  poster,
  className,
  ariaLabel,
}: {
  sources: VideoSource[];
  poster?: string;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const src = sources[0]?.src;

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    let cancelled = false;
    const tryPlay = () => {
      if (cancelled) return;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();
    const events = ["loadedmetadata", "loadeddata", "canplay", "canplaythrough"];
    events.forEach((e) => v.addEventListener(e, tryPlay));
    // Last-resort resume on the first user interaction (covers Low-Power-Mode
    // / strict autoplay policies) — one-shot listeners.
    const onGesture = () => tryPlay();
    document.addEventListener("touchstart", onGesture, { once: true, passive: true });
    document.addEventListener("click", onGesture, { once: true });
    document.addEventListener("visibilitychange", tryPlay);
    return () => {
      cancelled = true;
      events.forEach((e) => v.removeEventListener(e, tryPlay));
      document.removeEventListener("touchstart", onGesture);
      document.removeEventListener("click", onGesture);
      document.removeEventListener("visibilitychange", tryPlay);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={poster}
      aria-label={ariaLabel}
      className={className}
    />
  );
}
