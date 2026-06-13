import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface Signup {
  name: string;
  email: string;
  ts: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Capture a waitlist signup.
 *
 * Persistence order:
 *  1. Always logged to the server (visible in Vercel runtime logs).
 *  2. Forwarded to Mailchimp when MAILCHIMP_API_KEY / _AUDIENCE_ID / _SERVER
 *     are configured (durable list — recommended for production).
 *  3. Best-effort append to data/waitlist.json (works in local dev; the
 *     filesystem is ephemeral on serverless hosts).
 */
export async function POST(request: Request) {
  let body: { name?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "בקשה לא תקינה." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "אנא הזינו שם וכתובת אימייל תקינה." },
      { status: 400 },
    );
  }

  const signup: Signup = { name, email, ts: new Date().toISOString() };

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
            merge_fields: { FNAME: name },
          }),
        },
      );
    } catch (err) {
      console.error("[waitlist] mailchimp error", err);
      // Non-fatal — the signup is still logged.
    }
  }

  // 3) Best-effort local JSON file (dev convenience).
  try {
    const file = path.join(process.cwd(), "data", "waitlist.json");
    await fs.mkdir(path.dirname(file), { recursive: true });
    let list: Signup[] = [];
    try {
      list = JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      /* no file yet */
    }
    list.push(signup);
    await fs.writeFile(file, JSON.stringify(list, null, 2), "utf8");
  } catch {
    /* read-only filesystem (serverless) — logging above is the fallback */
  }

  return NextResponse.json({ ok: true });
}
