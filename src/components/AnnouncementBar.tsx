"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";

const MESSAGES = [
  "מבצע השקה: קנו 2 שייקרים וקבלו 15% הנחה!",
  "משלוח חינם לכל הארץ",
  "מלאי מוגבל - הבטיחו את שלכם עכשיו",
];

// Rolling 48h launch window, persisted per visitor so it doesn't reset on
// reload (and never hardcodes a date that would go stale).
const LAUNCH_WINDOW_MS = 48 * 60 * 60 * 1000;
const DEADLINE_KEY = "vault-launch-deadline";

function formatRemaining(ms: number) {
  const total = Math.floor(ms / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const s = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function AnnouncementBar() {
  const [active, setActive] = useState(0);
  // null until mounted → avoids SSR/client hydration mismatch on the timer.
  const [remaining, setRemaining] = useState<number | null>(null);

  // Auto-advance through the messages every 4.5s.
  useEffect(() => {
    if (MESSAGES.length < 2) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % MESSAGES.length),
      4500,
    );
    return () => window.clearInterval(id);
  }, []);

  // Countdown to the launch-discount deadline.
  useEffect(() => {
    let deadline = Number(window.localStorage.getItem(DEADLINE_KEY));
    if (!deadline || deadline <= Date.now()) {
      deadline = Date.now() + LAUNCH_WINDOW_MS;
      window.localStorage.setItem(DEADLINE_KEY, String(deadline));
    }
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-7 overflow-hidden border-b border-[#c8a24c]/40 bg-black">
      {/* Crossfading messages, stacked and absolutely positioned. */}
      <div className="relative mx-auto h-full max-w-3xl px-4">
        {MESSAGES.map((msg, i) => (
          <Link
            key={msg}
            href={`/product/${encodeURIComponent("vault-השייקר-המגנטי")}`}
            aria-hidden={i !== active}
            tabIndex={i === active ? 0 : -1}
            className={`absolute inset-0 flex items-center justify-center gap-2 whitespace-nowrap text-center font-sans text-[10px] font-semibold tracking-[0.08em] text-[#f4e0a0] antialiased transition-opacity duration-700 ease-in-out hover:text-white sm:text-[12px] sm:tracking-[0.12em] ${
              i === active
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <Zap
              className="h-3 w-3 shrink-0 text-[#f2dd97] sm:h-3.5 sm:w-3.5"
              strokeWidth={1.75}
            />
            <span className="truncate">{msg}</span>
          </Link>
        ))}

        {/* Minimalist countdown — inline-end (left in RTL). Hidden until mounted
            and on the smallest screens to avoid crowding the message. */}
        {remaining !== null && remaining > 0 && (
          <span className="pointer-events-none absolute inset-y-0 left-0 hidden items-center gap-1.5 font-sans text-[10px] tracking-[0.08em] text-[#f4e0a0]/70 antialiased sm:flex sm:text-[11px]">
            <span className="text-[#f4e0a0]/50">המבצע מסתיים בעוד</span>
            <span className="font-semibold tabular-nums text-[#f2dd97]" dir="ltr">
              {formatRemaining(remaining)}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
