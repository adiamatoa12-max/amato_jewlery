// Shared placeholder for media whose local files were removed. Renders a clean
// dark block so the layout never collapses and no 404s are requested.

/** True only for paths into folders that were cleared (these would 404).
 * Current top-level /images/*.png and /videos/*.mp4 assets exist and render. */
export function isMissingLocalMedia(src?: string | null): boolean {
  if (!src) return true;
  return (
    /^\/images\/products\//.test(src) ||
    /^\/collections\//.test(src) ||
    src === "/bundle.jpg"
  );
}

export default function MediaPlaceholder({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center bg-zinc-900 ${className}`}
    >
      <span className="px-2 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-zinc-500">
        VAULT Media Placeholder
      </span>
    </div>
  );
}
