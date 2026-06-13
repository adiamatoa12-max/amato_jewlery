/** Shared admin-auth helpers (used by middleware + API routes). */

export const ADMIN_COOKIE = "admin_session";

/** SHA-256 hex — works in both the Edge (middleware) and Node runtimes. */
export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The opaque session value stored in the cookie = hash of the admin password.
 * The raw password is never placed in the cookie. */
export async function expectedSession(): Promise<string | null> {
  const pwd = process.env.ADMIN_PASSWORD;
  if (!pwd) return null;
  return sha256Hex(`vault-admin:${pwd}`);
}
