import {
  RefreshCw,
  Sparkles,
  Magnet,
  ShieldCheck,
  Droplets,
  BatteryCharging,
} from "lucide-react";

// Benefit rows + a spec strip — the "why it's better" band that sits between
// the buy box and the reviews on the dark product landing page.
const FEATURES = [
  {
    icon: RefreshCw,
    title: "ערבוב חשמלי אמיתי",
    body: "מנער שוב ושוב עד שהאבקה מתערבבת — שייק חלק לגמרי, בלי גושים ובלי מאמץ.",
  },
  {
    icon: Sparkles,
    title: "ניקוי מהיר ופשוט",
    body: "כל החלקים מתפרקים ונשטפים בשנייה. מים, טיפת סבון, וחוזרים נקיים לאימון הבא.",
  },
  {
    icon: Magnet,
    title: "הטלפון תמיד איתך",
    body: "מגנט N52 מצמיד את הטלפון בגובה העיניים — ידיים חופשיות לצילום ולסטרימינג.",
  },
];

const SPECS = [
  { icon: ShieldCheck, label: "נטול BPA", sub: "טריטן בדרגת מזון" },
  { icon: Magnet, label: "מגנט N52", sub: "אחיזה עוצמתית" },
  { icon: Droplets, label: "100% אטום", sub: "בלי נזילות" },
  { icon: BatteryCharging, label: "סוללה חזקה", sub: "30+ אימונים לטעינה" },
];

export default function ProductHighlights() {
  return (
    <section className="border-t border-white/10 bg-[#0a0a0c] px-6 py-14 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Benefit rows */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-right transition-colors duration-300 hover:border-white/20"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#5b82ff]/15 text-[#5b82ff]">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-white">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-[1.7] text-zinc-400">{body}</p>
            </div>
          ))}
        </div>

        {/* Spec strip */}
        <div className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-4 lg:gap-4 lg:p-6">
          {SPECS.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 px-2 py-3 text-center"
            >
              <Icon className="h-6 w-6 text-[#5b82ff]" strokeWidth={1.5} />
              <span className="text-sm font-bold text-white">{label}</span>
              <span className="text-[11px] leading-tight text-zinc-500">{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
