/** Shared admin-auth helpers (used by middleware + API routes). */

export const ADMIN_COOKIE = "admin_session";

// Hardcoded admin password — no environment variable needed.
// (Trade-off: this lives in source/git. Fine for a private leads panel.)
export const ADMIN_PASSWORD = "adi001994";

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
export async function expectedSession(): Promise<string> {
  return sha256Hex(`vault-admin:${ADMIN_PASSWORD}`);
}
