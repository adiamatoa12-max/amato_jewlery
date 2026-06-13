import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, expectedSession } from "@/lib/admin";
import { getSignups } from "@/lib/waitlist-store";

/** Return the captured waitlist signups (newest first). Guarded by middleware
 * AND here. Reads from Vercel KV in production, local JSON file in dev. */
export async function GET() {
  const expected = await expectedSession();
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!expected || session !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let signups = await getSignups().catch(() => []);
  signups = [...signups].reverse(); // newest first

  return NextResponse.json({ signups, count: signups.length });
}
