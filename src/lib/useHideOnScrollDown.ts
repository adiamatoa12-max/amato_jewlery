"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns true while the user is actively scrolling DOWN past `threshold`px —
 * used to tuck a floating button out of the way so it never sits on top of the
 * content being read. It reappears the moment scrolling stops, reverses, or the
 * page is back near the top. rAF-throttled; passive listener.
 */
export function useHideOnScrollDown(threshold = 140) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;
    let idle: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY.current;
        if (y < threshold) setHidden(false);
        else if (dy > 6) setHidden(true);
        else if (dy < -6) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
      // Re-show shortly after scrolling stops.
      clearTimeout(idle);
      idle = setTimeout(() => setHidden(false), 500);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(idle);
    };
  }, [threshold]);

  return hidden;
}
