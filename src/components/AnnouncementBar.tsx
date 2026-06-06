"use client";

import { useEffect, useState } from "react";
import { Truck, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const MESSAGES: { icon: LucideIcon; text: string }[] = [
  { icon: Truck, text: "משלוח חינם עם שליח עד הבית" },
  { icon: Clock, text: "אספקה תוך 7-14 ימי עסקים" },
];

const INTERVAL = 4000;

export default function AnnouncementBar() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (MESSAGES.length < 2) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % MESSAGES.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] flex h-7 items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 to-black px-4"
      aria-live="polite"
    >
      <div className="relative h-5 w-full max-w-md">
        {MESSAGES.map(({ icon: Icon, text }, i) => (
          <p
            key={text}
            aria-hidden={i !== active}
            className={`absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap text-center font-sans text-[12px] font-semibold tracking-[0.14em] text-[#f4e0a0] antialiased transition-opacity duration-700 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-[#f2dd97]" strokeWidth={1.75} />
            <span>{text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
