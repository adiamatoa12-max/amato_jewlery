"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "משלוח חינם עם שליח עד הבית",
  "אספקה תוך 7-14 ימי עסקים",
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
      className="fixed inset-x-0 top-0 z-[60] flex h-9 items-center justify-center overflow-hidden bg-black px-4"
      aria-live="polite"
    >
      <div className="relative h-4 w-full max-w-md">
        {MESSAGES.map((message, i) => (
          <p
            key={message}
            aria-hidden={i !== active}
            className={`absolute inset-0 flex items-center justify-center whitespace-nowrap text-center text-[10px] font-light uppercase tracking-[0.28em] text-white/85 transition-opacity duration-700 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            {message}
          </p>
        ))}
      </div>
    </div>
  );
}
