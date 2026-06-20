"use client";

import { useEffect, useState } from "react";
import { Accessibility, X } from "lucide-react";

const STORAGE_KEY = "vault-a11y";

interface A11ySettings {
  contrast: boolean;
  largeText: boolean;
}

const DEFAULTS: A11ySettings = { contrast: false, largeText: false };

/** Reflect the current settings onto the <html> element via classes. */
function apply({ contrast, largeText }: A11ySettings) {
  const root = document.documentElement;
  root.classList.toggle("a11y-contrast", contrast);
  root.classList.toggle("a11y-large-text", largeText);
}

export default function AccessibilityButton() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted preferences on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = { ...DEFAULTS, ...JSON.parse(raw) } as A11ySettings;
        setSettings(parsed);
        apply(parsed);
      }
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Persist + apply whenever settings change (after initial hydration).
  useEffect(() => {
    if (!hydrated) return;
    apply(settings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore quota / private-mode errors */
    }
  }, [settings, hydrated]);

  const toggle = (key: keyof A11ySettings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  const reset = () => setSettings(DEFAULTS);

  return (
    <div className="fixed bottom-6 left-5 z-[55] flex flex-col items-start gap-3 sm:left-6">
      {/* Settings panel */}
      {open && (
        <div
          role="dialog"
          aria-label="הגדרות נגישות"
          className="w-60 rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_18px_44px_-16px_rgba(0,0,0,0.3)]"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-neutral-900">נגישות</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="סגירת הגדרות נגישות"
              className="text-neutral-400 transition-colors hover:text-neutral-900"
            >
              <X className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => toggle("contrast")}
              aria-pressed={settings.contrast}
              className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-all duration-300 ${
                settings.contrast
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-stone-200 text-neutral-800 hover:border-neutral-400"
              }`}
            >
              ניגודיות גבוהה
              <span className="text-xs opacity-70">
                {settings.contrast ? "פעיל" : "כבוי"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => toggle("largeText")}
              aria-pressed={settings.largeText}
              className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-all duration-300 ${
                settings.largeText
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-stone-200 text-neutral-800 hover:border-neutral-400"
              }`}
            >
              הגדלת טקסט
              <span className="text-xs opacity-70">
                {settings.largeText ? "פעיל" : "כבוי"}
              </span>
            </button>

            <button
              type="button"
              onClick={reset}
              className="mt-1 text-center text-xs text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline"
            >
              איפוס הגדרות
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="הגדרות נגישות"
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] ring-1 ring-white/10 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:ring-[#2e9bff]/70 hover:shadow-[0_16px_38px_-10px_rgba(0,0,0,0.55)]"
      >
        <Accessibility className="h-6 w-6" strokeWidth={1.75} />
      </button>
    </div>
  );
}
