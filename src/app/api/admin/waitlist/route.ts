import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";
import { ADMIN_COOKIE, expectedSession } from "@/lib/admin";

/** Return the captured waitlist signups. Guarded by middleware AND here. */
export async function GET() {
  const expected = await expectedSession();
  const session = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!expected || session !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let signups: unknown[] = [];
  try {
    const file = path.join(process.cwd(), "data", "waitlist.json");
    signups = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    // No local file (e.g. serverless / nothing captured yet).
  }

  return NextResponse.json({ signups, count: signups.length });
}
