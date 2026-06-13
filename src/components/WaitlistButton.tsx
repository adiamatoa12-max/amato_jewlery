"use client";

import { useWaitlist } from "@/lib/waitlist/WaitlistContext";

/** "Get notified" CTA that opens the global waitlist modal. */
export default function WaitlistButton({
  className = "",
  label = "הירשמו לעדכונים",
}: {
  className?: string;
  label?: string;
}) {
  const { openWaitlist } = useWaitlist();
  return (
    <button type="button" onClick={openWaitlist} className={className}>
      {label}
    </button>
  );
}
