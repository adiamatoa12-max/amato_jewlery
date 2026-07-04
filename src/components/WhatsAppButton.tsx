"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const PHONE = "972515766102";
// Pre-filled WhatsApp message so the chat opens ready to send.
const PREFILL = encodeURIComponent("היי, הגעתי דרך האתר, אפשר לשאול שאלה?");

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${PREFILL}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פנייה אלינו בוואטסאפ"
      className="group fixed bottom-24 right-5 z-40 flex items-center sm:right-6 lg:bottom-6"
    >
      {/* Tooltip — appears to the left of the button (RTL-friendly) */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-neutral-900 px-4 py-2 text-[11px] font-light tracking-[0.08em] text-zinc-100 opacity-0 shadow-lg transition-all duration-300 ease-in-out translate-x-2 group-hover:translate-x-0 group-hover:opacity-100">
        יש לך שאלה?
      </span>

      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-[#2e9bff] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] ring-1 ring-[#2e9bff]/25 transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:ring-[#2e9bff]/70 group-hover:shadow-[0_16px_38px_-10px_rgba(0,0,0,0.55)]">
        <WhatsAppIcon className="h-6 w-6" />
      </span>
    </a>
  );
}
