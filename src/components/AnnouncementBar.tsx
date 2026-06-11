import Link from "next/link";
import { Zap } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex h-7 items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 to-black px-4">
      <Link
        href="/#shop"
        className="flex items-center gap-2 truncate text-center font-sans text-[11px] font-semibold tracking-[0.1em] text-[#f4e0a0] antialiased transition-colors duration-300 hover:text-white sm:text-[12px] sm:tracking-[0.12em]"
      >
        <Zap className="h-3.5 w-3.5 shrink-0 text-[#f2dd97]" strokeWidth={1.75} />
        <span className="truncate">
          מבצע השקה: קנו 2 שייקרים וקבלו 15% הנחה! משלוח חינם.
        </span>
      </Link>
    </div>
  );
}
