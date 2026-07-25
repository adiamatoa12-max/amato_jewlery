"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useHideOnScrollDown } from "@/lib/useHideOnScrollDown";

const PHONE = "972515766102";
// Pre-filled WhatsApp message so the chat opens ready to send.
const PREFILL = encodeURIComponent("היי, הגעתי דרך האתר, אפשר לשאול שאלה?");

export default function WhatsAppButton() {
  // Tuck the button away while scrolling down so it never covers the content
  // being read (e.g. the product title); it slides back the moment you pause.
  const hidden = useHideOnScrollDown();
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${PREFILL}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פנייה אלינו בוואטסאפ"
      className={`group fixed bottom-[4.75rem] right-4 z-40 flex items-center transition-all duration-300 ease-out sm:right-6 lg:bottom-6 ${
        hidden
          ? "pointer-events-none translate-y-[160%] opacity-0 lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto"
          : "translate-y-0 opacity-100"
      }`}
    >
      {/* Tooltip — appears to the left of the button (RTL-friendly) */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full border border-zinc-200 bg-white px-4 py-2 text-[11px] font-light tracking-[0.08em] text-zinc-900 opacity-0 shadow-md transition-all duration-300 ease-in-out translate-x-2 group-hover:translate-x-0 group-hover:opacity-100">
        יש לך שאלה?
      </span>

      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-[#2952e3] shadow-md ring-1 ring-[#2952e3]/25 transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:ring-[#2952e3]/70 sm:h-14 sm:w-14">
        <WhatsAppIcon className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
    </a>
  );
}
