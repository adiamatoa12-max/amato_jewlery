import { NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_PASSWORD, expectedSession } from "@/lib/admin";

/** Authenticate the admin: correct password → set an httpOnly session cookie. */
export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  if ((body.password ?? "") !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "סיסמה שגויה." }, { status: 401 });
  }

  const expected = await expectedSession();

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}

/** Log out — clear the session cookie. */
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
