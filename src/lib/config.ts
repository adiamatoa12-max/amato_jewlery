/**
 * Global site configuration.
 *
 * WAITLIST_MODE — pre-launch mode. When on, purchase actions (Add to Cart)
 * are replaced with a "get notified" waitlist signup. Toggle via the
 * NEXT_PUBLIC_WAITLIST_MODE env var ("true" / "false"), or flip the default
 * below. Set NEXT_PUBLIC_WAITLIST_MODE=false in Vercel to go fully live.
 */
// Active sales mode. Flip to `true` to return to pre-launch waitlist mode
// (Get-Notified CTAs + hidden prices). No env var needed.
export const WAITLIST_MODE = false;

// The bundle + secondary accessories aren't in stock yet. While false, those
// show "Coming Soon" + a Notify-Me capture instead of prices / Add-to-Cart.
// The main shaker is unaffected. Flip to `true` when they launch.
export const EXTRAS_AVAILABLE = false;
