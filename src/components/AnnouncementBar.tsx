"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

const MESSAGES = [
  "מבצע השקה: קנו 2 שייקרים וקבלו 37% הנחה + משלוח חינם | מלאי ראשון מוגבל",
];

const PRODUCT_URL = `/product/${encodeURIComponent("vault-magnetic-shaker")}`;

export default function AnnouncementBar() {
  const [active, setActive] = useState(0);

  // Auto-advance through the promo messages every 4.5s.
  useEffect(() => {
    if (MESSAGES.length < 2) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % MESSAGES.length),
      4500,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-7 overflow-hidden bg-[#2952e3]">
      {/* Crossfading promo messages, stacked and absolutely positioned. */}
      <div className="relative mx-auto h-full max-w-3xl px-4">
        {MESSAGES.map((msg, i) => (
          <Link
            key={msg}
            href={PRODUCT_URL}
            aria-hidden={i !== active}
            tabIndex={i === active ? 0 : -1}
            className={`absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap text-center font-sans text-[10px] font-semibold tracking-[0.08em] text-white antialiased transition-opacity duration-700 ease-in-out hover:text-white/80 sm:text-[12px] sm:tracking-[0.12em] ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Zap
              className="h-3 w-3 shrink-0 text-white sm:h-3.5 sm:w-3.5"
              strokeWidth={1.75}
            />
            <span className="truncate">{msg}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
