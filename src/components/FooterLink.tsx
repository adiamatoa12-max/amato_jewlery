"use client";

import Link from "next/link";
import { useInfo } from "@/lib/info/InfoContext";
import type { InfoPanel } from "@/lib/info/content";

export interface FooterLinkItem {
  label: string;
  /** External/internal href for regular links. */
  href?: string;
  /** When set, the link opens the matching info drawer instead of navigating. */
  panel?: InfoPanel;
}

const className =
  "text-start text-xs text-neutral-500 transition-all duration-500 ease-in-out hover:text-neutral-900";

export default function FooterLink({ item }: { item: FooterLinkItem }) {
  const { openInfo } = useInfo();

  if (item.panel) {
    return (
      <button
        type="button"
        onClick={() => openInfo(item.panel!)}
        className={className}
      >
        {item.label}
      </button>
    );
  }

  return (
    <Link href={item.href ?? "#"} className={className}>
      {item.label}
    </Link>
  );
}
