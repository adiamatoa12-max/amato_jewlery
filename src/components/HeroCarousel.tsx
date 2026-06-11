import MediaPlaceholder from "@/components/MediaPlaceholder";

// Hero background. Local banner images were removed, so this renders the shared
// dark placeholder. Swap in a real <Image>/<video> here once new assets exist.
export default function HeroCarousel() {
  return (
    <div aria-hidden className="absolute inset-0">
      <MediaPlaceholder className="h-full w-full" />
    </div>
  );
}
