import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, expectedSession } from "@/lib/admin";

/**
 * Guard the admin data API at the edge: unauthorized requests can't even fetch
 * the endpoint that supplies waitlist data. The login endpoint is intentionally
 * not matched (it has nothing to leak and must be reachable to authenticate).
 */
export async function middleware(req: NextRequest) {
  const expected = await expectedSession();
  const session = req.cookies.get(ADMIN_COOKIE)?.value;
  if (session !== expected) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/waitlist"],
};
