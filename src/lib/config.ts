/**
 * Global site configuration.
 *
 * WAITLIST_MODE — pre-launch mode. When on, purchase actions (Add to Cart)
 * are replaced with a "get notified" waitlist signup. Toggle via the
 * NEXT_PUBLIC_WAITLIST_MODE env var ("true" / "false"), or flip the default
 * below. Set NEXT_PUBLIC_WAITLIST_MODE=false in Vercel to go fully live.
 */
const DEFAULT_WAITLIST_MODE = true;

export const WAITLIST_MODE =
  process.env.NEXT_PUBLIC_WAITLIST_MODE != null
    ? process.env.NEXT_PUBLIC_WAITLIST_MODE === "true"
    : DEFAULT_WAITLIST_MODE;
