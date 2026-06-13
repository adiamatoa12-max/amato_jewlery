"use client";

import { useCallback, useEffect, useState } from "react";

const GOLD = "#c8a24c";

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

  const loadData = useCallback(async () => {
    const res = await fetch("/api/admin/waitlist", { cache: "no-store" });
    if (res.ok) {
      const data = (await res.json()) as { signups: Signup[] };
      setSignups(data.signups ?? []);
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
          className="w-full max-w-sm rounded-2xl border border-[#c8a24c]/30 bg-zinc-950 p-8 text-center"
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
            className="mt-6 w-full rounded-full border border-white/15 bg-black px-5 py-3 text-center text-sm text-white placeholder:text-zinc-500 focus:border-[#c8a24c] focus:outline-none"
          />
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[#c8a24c] px-8 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition-all duration-300 hover:bg-[#e0bd6a] active:scale-95"
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
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-black tracking-tight">
            רשימת המתנה{" "}
            <span style={{ color: GOLD }}>({signups.length})</span>
          </h1>
          <button
            type="button"
            onClick={handleLogout}
            className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:text-white"
          >
            התנתקות
          </button>
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
