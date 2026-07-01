import { createClient } from "@vercel/kv";

// Reuse the same KV connection pattern as waitlist-store.ts: Vercel KV in
// production, no-op (rate limiting disabled) in local dev without KV configured.
const KV_URL = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN =
  process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const client =
  KV_URL && KV_TOKEN ? createClient({ url: KV_URL, token: KV_TOKEN }) : null;

/** Best-effort client IP from Vercel's edge-forwarded header. */
function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

/**
 * Fixed-window rate limit: allows `limit` requests per `windowSeconds` per
 * IP+key. Fails open (allows the request) if KV isn't configured or errors,
 * so local dev and transient KV issues never block real traffic.
 */
export async function checkRateLimit(
  request: Request,
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<{ allowed: boolean; remaining: number }> {
  if (!client) return { allowed: true, remaining: limit };

  try {
    const bucket = Math.floor(Date.now() / 1000 / windowSeconds);
    const redisKey = `ratelimit:${key}:${clientIp(request)}:${bucket}`;
    const count = await client.incr(redisKey);
    if (count === 1) await client.expire(redisKey, windowSeconds);
    return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
  } catch {
    return { allowed: true, remaining: limit };
  }
}
