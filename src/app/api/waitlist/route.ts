import { NextResponse } from "next/server";
import { addSignup, type Signup } from "@/lib/waitlist-store";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Optional phone — lenient: 7–15 digits once separators are stripped.
const PHONE_RE = /^\+?[0-9]{7,15}$/;

/**
 * Capture a waitlist signup.
 *
 * Persistence order:
 *  1. Always logged to the server (visible in Vercel runtime logs).
 *  2. Forwarded to Mailchimp when MAILCHIMP_API_KEY / _AUDIENCE_ID / _SERVER
 *     are configured.
 *  3. Saved to the durable store — Vercel KV in production (survives redeploys),
 *     or a local JSON file in development.
 */
export async function POST(request: Request) {
  let body: { name?: string; email?: string; phone?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const phone = (body.phone ?? "").trim();
  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "אנא הזינו שם וכתובת אימייל תקינה." },
      { status: 400 },
    );
  }
  // Phone is optional, but if provided it must look like a phone number.
  if (phone && !PHONE_RE.test(phone.replace(/[\s()-]/g, ""))) {
    return NextResponse.json(
      { error: "מספר הטלפון אינו תקין." },
      { status: 400 },
    );
  }

  const signup: Signup = {
    name,
    email,
    ...(phone ? { phone } : {}),
    ts: new Date().toISOString(),
  };

  // 1) Always log — reliable capture even on read-only/ephemeral hosts.
  console.log("[waitlist]", JSON.stringify(signup));

  // 2) Mailchimp (durable) when configured.
  const mcKey = process.env.MAILCHIMP_API_KEY;
  const mcAudience = process.env.MAILCHIMP_AUDIENCE_ID;
  const mcServer = process.env.MAILCHIMP_SERVER; // e.g. "us21"
  if (mcKey && mcAudience && mcServer) {
    try {
      await fetch(
        `https://${mcServer}.api.mailchimp.com/3.0/lists/${mcAudience}/members`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `apikey ${mcKey}`,
          },
          body: JSON.stringify({
            email_address: email,
            status: "subscribed",
            merge_fields: { FNAME: name, ...(phone ? { PHONE: phone } : {}) },
          }),
        },
      );
    } catch (err) {
      console.error("[waitlist] mailchimp error", err);
      // Non-fatal — the signup is still logged.
    }
  }

  // 3) Durable store — Vercel KV in production, local JSON file in dev.
  try {
    await addSignup(signup);
  } catch (err) {
    console.error("[waitlist] store error", err);
    // Non-fatal — the signup is still in the logs above.
  }

  return NextResponse.json({ ok: true });
}
