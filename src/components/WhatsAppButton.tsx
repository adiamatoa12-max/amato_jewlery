"use client";

const PHONE = "972585838005";
// Pre-filled WhatsApp message so the chat opens ready to send.
const PREFILL = encodeURIComponent("היי, הגעתי דרך האתר, אפשר לשאול שאלה?");

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${PREFILL}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="פנייה אלינו בוואטסאפ"
      className="group fixed bottom-24 right-5 z-40 flex items-center sm:bottom-6 sm:right-6"
    >
      {/* Tooltip — appears to the left of the button (RTL-friendly) */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-neutral-900 px-4 py-2 text-[11px] font-light tracking-[0.08em] text-zinc-100 opacity-0 shadow-lg transition-all duration-300 ease-in-out translate-x-2 group-hover:translate-x-0 group-hover:opacity-100">
        יש לך שאלה?
      </span>

      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-[#A7C7E7] shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] ring-1 ring-[#A7C7E7]/25 transition-all duration-300 ease-in-out group-hover:-translate-y-0.5 group-hover:ring-[#A7C7E7]/70 group-hover:shadow-[0_16px_38px_-10px_rgba(0,0,0,0.55)]">
        <WhatsAppIcon className="h-6 w-6" />
      </span>
    </a>
  );
}
