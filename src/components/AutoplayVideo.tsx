"use client";

import { useEffect, useRef } from "react";

type VideoSource = { src: string; type: string };

/**
 * Background / demo video that reliably autoplays on mobile.
 *
 * Two things browsers (esp. iOS Safari) need that plain JSX doesn't guarantee:
 *  1. `muted` set as a real property — React's `muted` attribute is unreliable,
 *     and mobile browsers block autoplay for anything they consider unmuted,
 *     which is what surfaces the tap-to-play button.
 *  2. an explicit play() nudge once data is ready.
 * We do both here. Controls are never rendered, so it loops as background motion.
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

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    play();
    v.addEventListener("loadeddata", play);
    v.addEventListener("canplay", play);
    return () => {
      v.removeEventListener("loadeddata", play);
      v.removeEventListener("canplay", play);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      aria-label={ariaLabel}
      className={className}
    >
      {sources.map((s) => (
        <source key={s.type} src={s.src} type={s.type} />
      ))}
    </video>
  );
}
