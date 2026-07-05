"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useInfo } from "@/lib/info/InfoContext";
import { INFO_CONTENT } from "@/lib/info/content";

export default function InfoDrawer() {
  const { panel, closeInfo } = useInfo();
  const isOpen = panel !== null;
  const content = panel ? INFO_CONTENT[panel] : null;

  // Lock body scroll while open + close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeInfo();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeInfo]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden={!isOpen}
        onClick={closeInfo}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel — anchored to the start (right in RTL) */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={content?.title ?? ""}
        style={{
          right: 0,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
        className="fixed inset-y-0 z-[70] flex w-full max-w-md flex-col bg-stone-50 shadow-2xl transition-transform duration-500 ease-in-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200/70 px-6 py-5">
          <div className="flex flex-col gap-1">
            {content && (
              <span className="text-[10px] font-medium tracking-[0.22em] text-neutral-400">
                {content.eyebrow}
              </span>
            )}
            <h2 className="font-display text-xl font-extrabold tracking-tight text-neutral-900">
              {content?.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeInfo}
            aria-label="סגירה"
            className="-m-2.5 flex h-11 w-11 items-center justify-center transition-all duration-500 ease-in-out hover:opacity-60"
          >
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {content && (
            <>
              <p className="text-base leading-[1.7] text-[#2D3748]">
                {content.intro}
              </p>
              <dl className="mt-8 divide-y divide-stone-200/70">
                {content.sections.map((section) => (
                  <div key={section.heading} className="py-5 first:pt-0">
                    <dt className="text-sm font-medium tracking-[0.02em] text-neutral-900">
                      {section.heading}
                    </dt>
                    <dd className="mt-2 text-base leading-[1.7] text-[#2D3748]">
                      {section.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          )}
        </div>

        {/* Footer / contact */}
        <div className="border-t border-stone-200/70 px-6 py-5">
          <a
            href="mailto:adiamato119@gmail.com"
            className="text-xs tracking-[0.08em] text-neutral-500 underline-offset-4 transition-all duration-500 ease-in-out hover:text-neutral-900 hover:underline"
          >
            יש לך שאלה נוספת? כתוב/כתבי לנו →
          </a>
        </div>
      </aside>
    </>
  );
}
