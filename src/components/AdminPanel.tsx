"use client";

import { useCallback, useEffect, useState } from "react";

const GOLD = "#2e9bff";

interface Signup {
  name: string;
  email: string;
  phone?: string;
  ts: string;
}

export default function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [store, setStore] = useState<"kv" | "file" | null>(null);

  const loadData = useCallback(async () => {
    const res = await fetch("/api/admin/waitlist", { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as {
        signups: Signup[];
        store?: "kv" | "file";
      };
      setSignups(data.signups ?? []);
      setStore(data.store ?? null);
      setAuthed(true);
      return true;
    }
    setAuthed(false);
    return false;
  }, []);

  // On mount: if an existing session is valid, skip the password screen.
  useEffect(() => {
    loadData().finally(() => setChecking(false));
  }, [loadData]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setPassword("");
      await loadData();
    } else {
      const d = (await res.json().catch(() => ({}))) as { error?: string };
      setError(d.error ?? "התחברות נכשלה.");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setSignups([]);
  }

  function downloadCsv() {
    const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = [
      ["שם", "אימייל", "טלפון", "תאריך"],
      ...signups.map((s) => [s.name, s.email, s.phone ?? "", s.ts]),
    ];
    const csv = rows.map((r) => r.map(esc).join(",")).join("\r\n");
    // BOM so Excel renders Hebrew (UTF-8) correctly.
    const blob = new Blob(["﻿" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vault-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-zinc-500">
        טוען…
      </main>
    );
  }

  // Password gate
  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-5">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-[#2e9bff]/30 bg-zinc-950 p-8 text-center"
        >
          <p
            className="text-[11px] font-bold uppercase tracking-[0.3em]"
            style={{ color: GOLD }}
          >
            VAULT Admin
          </p>
          <h1 className="mt-3 font-display text-2xl font-black text-white">
            כניסה מאובטחת
          </h1>
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="סיסמה"
            placeholder="סיסמה"
            className="mt-6 w-full rounded-full border border-white/15 bg-black px-5 py-3 text-center text-sm text-white placeholder:text-zinc-500 focus:border-[#2e9bff] focus:outline-none"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[#2e9bff] px-8 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition-all duration-300 hover:bg-[#5cb3ff] active:scale-95"
          >
            כניסה
          </button>
          {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
        </form>
      </main>
    );
  }

  // Authenticated — show the signups table
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-5 py-10 text-white sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-black tracking-tight">
              רשימת המתנה{" "}
              <span style={{ color: GOLD }}>({signups.length})</span>
            </h1>
            {store && (
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] ${
                  store === "kv"
                    ? "border-emerald-500/40 text-emerald-400"
                    : "border-white/15 text-zinc-500"
                }`}
                title={
                  store === "kv"
                    ? "מאוחסן ב-Vercel KV — נשמר לצמיתות"
                    : "קובץ מקומי (פיתוח) — לא נשמר ב-Production"
                }
              >
                {store === "kv" ? "Vercel KV" : "Local file"}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={downloadCsv}
              disabled={signups.length === 0}
              className="rounded-full bg-[#2e9bff] px-5 py-2 text-xs font-black uppercase tracking-[0.1em] text-black transition-all duration-300 hover:bg-[#5cb3ff] active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:text-zinc-500"
            >
              הורדת CSV
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:text-white"
            >
              התנתקות
            </button>
          </div>
        </div>

        {signups.length === 0 ? (
          <p className="mt-10 text-sm text-zinc-500">אין נרשמים עדיין.</p>
        ) : (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.1em] text-zinc-500">
                  <th className="p-4 font-bold">שם</th>
                  <th className="p-4 font-bold">אימייל</th>
                  <th className="p-4 font-bold">טלפון</th>
                  <th className="p-4 font-bold">תאריך</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {signups.map((s, i) => (
                  <tr key={`${s.email}-${i}`} className="text-zinc-300">
                    <td className="p-4 font-medium text-white">{s.name}</td>
                    <td className="p-4" dir="ltr">
                      {s.email}
                    </td>
                    <td className="p-4 text-zinc-400" dir="ltr">
                      {s.phone || "—"}
                    </td>
                    <td className="p-4 text-zinc-500" dir="ltr">
                      {new Date(s.ts).toLocaleString("he-IL")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
