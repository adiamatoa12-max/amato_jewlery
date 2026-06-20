"use client";

import { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import { useWaitlist } from "@/lib/waitlist/WaitlistContext";

const GOLD = "#A7C7E7";

export default function WaitlistModal() {
  const { isOpen, closeWaitlist } = useWaitlist();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeWaitlist();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeWaitlist]);

  // Reset the form a moment after closing.
  useEffect(() => {
    if (isOpen) return;
    const t = window.setTimeout(() => {
      setStatus("idle");
      setName("");
      setEmail("");
      setPhone("");
    }, 300);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={closeWaitlist}
        className={`fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="הרשמה לרשימת המתנה"
        className={`fixed left-1/2 top-1/2 z-[90] w-[calc(100%-2.5rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#A7C7E7]/30 bg-zinc-950 p-7 text-center shadow-2xl transition-all duration-300 sm:p-9 ${
          isOpen
            ? "opacity-100 scale-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={closeWaitlist}
          aria-label="סגירה"
          className="absolute left-4 top-4 text-zinc-500 transition-colors duration-300 hover:text-zinc-100"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>

        {status === "done" ? (
          <div className="flex flex-col items-center py-4">
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full border"
              style={{ borderColor: `${GOLD}66`, color: GOLD }}
            >
              <Check className="h-7 w-7" strokeWidth={2} />
            </span>
            <h2 className="mt-5 font-display text-2xl font-black text-zinc-100">
              אתם ברשימה!
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              נעדכן אתכם ראשונים ברגע שה-VAULT יוצא למכירה — כולל הטבת השקה
              בלעדית.
            </p>
            <button
              type="button"
              onClick={closeWaitlist}
              className="mt-7 text-xs font-bold uppercase tracking-[0.12em]"
              style={{ color: GOLD }}
            >
              סגירה
            </button>
          </div>
        ) : (
          <>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ color: GOLD }}
            >
              Coming Soon
            </p>
            <h2 className="mt-3 font-display text-2xl font-black tracking-tight text-zinc-100 sm:text-3xl">
              הצטרפו לרשימת ההמתנה
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-400">
              ה-VAULT כמעט כאן. השאירו פרטים ותהיו הראשונים לדעת על ההשקה — עם
              הטבה בלעדית לנרשמים מוקדם.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="השם שלך"
                placeholder="השם שלך"
                className="w-full rounded-full border border-white/15 bg-[#111111] px-5 py-3 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#A7C7E7] focus:outline-none"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="כתובת אימייל"
                placeholder="כתובת אימייל"
                dir="ltr"
                className="w-full rounded-full border border-white/15 bg-[#111111] px-5 py-3 text-right text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#A7C7E7] focus:outline-none"
              />
              <input
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                // Lenient: digits, spaces, +, -, (), 7–15 chars. Optional field.
                pattern="[0-9+()\-\s]{7,15}"
                aria-label="מספר טלפון (לא חובה)"
                placeholder="מספר טלפון (לא חובה)"
                dir="ltr"
                className="w-full rounded-full border border-white/15 bg-[#111111] px-5 py-3 text-right text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#A7C7E7] focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-[#A7C7E7] px-8 py-3.5 text-sm font-black uppercase tracking-[0.12em] text-black transition-all duration-300 ease-out hover:scale-105 hover:bg-[#C2DCF0] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "שולח…" : "הירשמו לעדכונים"}
              </button>
              {status === "error" && (
                <p className="text-xs text-red-400">
                  משהו השתבש. נסו שוב בעוד רגע.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </>
  );
}
