import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

/**
 * VAULT Manifesto — a self-contained, premium statement section.
 * Drop <ManifestoSection /> anywhere (Home or About). Customise the CTA via props.
 *
 * The spec-by-spec comparison lives in the homepage's 3-way matrix table
 * (see HowItWorks in app/page.tsx) — this section stays story-led to avoid
 * running two comparison blocks back-to-back.
 */
const PRODUCT_URL = `/product/${encodeURIComponent("vault-magnetic-shaker")}`;
const LIFESTYLE_IMG = "/images/שייקר חדש.jpeg"; // next/image encodes the path
const MAGGRIP_VIDEO = `/videos/${encodeURIComponent("סרטון שייקר חדש.mp4")}`;

// Three core pillars. In the RTL grid the first item renders on the right,
// so the visual order is: motor (right) · magnet (center) · seal (left).
const PILLARS = [
  {
    title: "מנוע חשמלי עוצמתי",
    body: "מוחק גושים בשנייה. שייק חלק ומושלם בלי מאמץ.",
  },
  {
    title: "מגנט MAG-GRIP",
    body: "מגנט N52 משחרר את הידיים. הטלפון נעול בגובה העיניים לאורך כל האימון.",
  },
  {
    title: "אטימה הרמטית",
    body: "100% חסין לנזילות. זורקים לתיק ומתאמנים בראש שקט.",
  },
];

export default function ManifestoSection({
  id,
  ctaHref = PRODUCT_URL,
  ctaLabel = "שדרגו את האימון עכשיו",
}: {
  id?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <section id={id} className="bg-surface px-6 py-12 lg:px-10 lg:py-16">
      <div className="mx-auto max-w-4xl">
        {/* Brand manifesto — header, 3-pillar grid, closing punchline */}
        <div>
          {/* Section header */}
          <FadeIn>
            <p className="text-center font-display text-[11px] font-bold uppercase tracking-[0.4em] text-zinc-500">
              למה VAULT שונה
            </p>
            <h2 className="mt-5 text-center font-display text-4xl font-black uppercase leading-[0.95] tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
ככה שייקר צריך להיות
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-center font-display text-xl font-bold tracking-tight text-[#2D3748] sm:text-2xl">
              עידן הציוד הזול נגמר.
            </p>
          </FadeIn>

          {/* 3-column pillar grid — stacks on mobile, RTL order right→left */}
          <FadeIn delay={120}>
            <div
              dir="rtl"
              className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 lg:mt-14 lg:gap-12"
            >
              {PILLARS.map((pillar) => (
                <div
                  key={pillar.title}
                  className="flex flex-col items-center text-center"
                >
                  <h3 className="font-display text-lg font-extrabold tracking-tight text-[#111111] lg:text-xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 max-w-xs text-base font-medium leading-[1.8] text-[#2D3748]">
                    {pillar.body}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Closing punchline — generous breathing room above */}
          <FadeIn delay={200}>
            <p className="mx-auto mt-10 max-w-2xl text-center text-xl font-semibold leading-[1.6] text-[#111111] sm:text-2xl lg:mt-14">
              זה לא עוד שייקר — זה השדרוג שהאימונים שלך חיכו לו.
            </p>
          </FadeIn>
        </div>

        {/* Lifestyle zig-zag — image row + video row, alternating sides.
            Mobile: media on top, text below. No boxes/borders — floats on the
            dark canvas. */}
        <FadeIn delay={160}>
          <div className="my-10 space-y-10 lg:my-14 lg:space-y-14">
            {/* Row 1 — image right / text left (mobile: image on top) */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg lg:max-w-none">
                <Image
                  src={LIFESTYLE_IMG}
                  alt="שייקר VAULT החשמלי — גוף שקוף עם בסיס מנוע ומעמד טלפון"
                  fill
                  sizes="(max-width: 1024px) 85vw, 450px"
                  className="object-cover"
                />
              </div>
              <div dir="rtl" className="text-right">
                <h3 className="font-display text-3xl font-black tracking-tight text-[#111111] sm:text-4xl">
                  עיצוב שיושב נכון
                </h3>
                <p className="mt-5 text-lg font-medium leading-[1.85] text-[#2D3748] sm:text-xl">
                  <strong className="font-bold text-[#111111]">יושב מעולה ביד</strong>{" "}
                  ונשאר נוח גם באמצע האימון.{" "}
                  <br className="hidden sm:block" />
                  אוחזים חזק ומרגישים קל — בלי להתפשר על הסטייל.
                </p>
              </div>
            </div>

            {/* Row 2 — video left / text right (alternating; mobile: video on top) */}
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl shadow-lg lg:order-2 lg:max-w-none">
                <video
                  src={MAGGRIP_VIDEO}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label="שייקר VAULT המגנטי בפעולה — הטלפון מוצמד בגובה העיניים בחדר הכושר"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div dir="rtl" className="text-right lg:order-1">
                <h3 className="font-display text-3xl font-black tracking-tight text-[#111111] sm:text-4xl">
                  תמיד איתך בכל אימון
                </h3>
                <p className="mt-5 text-lg font-medium leading-[1.85] text-[#2D3748] sm:text-xl">
                  <strong className="font-bold text-[#111111]">נצמד בכל מקום ובכל זמן</strong>.
                  הטלפון תמיד בגובה העיניים.{" "}
                  <br className="hidden sm:block" />
                  ידיים חופשיות ואפס טלפונים על הרצפה.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Final CTA — generous space above, perfectly centered */}
        <FadeIn delay={200}>
          <div className="mt-10 flex flex-col items-center text-center">
            <Link
              href={ctaHref}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#2952e3] px-12 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_10px_36px_-10px_rgba(41,82,227,0.5)] ring-1 ring-[#2952e3]/40 transition-all duration-300 ease-out hover:scale-105 hover:bg-[#4169e5] hover:shadow-[0_0_40px_-4px_rgba(41,82,227,0.65)] active:scale-95 sm:w-auto"
            >
              {ctaLabel}
            </Link>
            <p className="mt-6 text-[11px] uppercase tracking-[0.3em] text-zinc-600">
              משלוח חינם עד הבית · 30 יום להחזרה
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
