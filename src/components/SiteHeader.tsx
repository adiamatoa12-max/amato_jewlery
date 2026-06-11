"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart/CartContext";

type NavLink = { label: string; href: string };
type NavGroup = { label: string; href: string; links: NavLink[] };

type SearchResult = {
  handle: string;
  title: string;
  price: number;
  currency: string;
  image: string;
};

const NAV_MENU: NavGroup[] = [
  {
    label: "השייקר",
    href: "/#shop",
    links: [
      { label: "השייקר המגנטי", href: "/#shop" },
      { label: "איך זה עובד", href: "/#shop" },
    ],
  },
  {
    label: "אביזרים",
    href: "/#shop",
    links: [
      { label: "מעמד טלפון", href: "/#shop" },
      { label: "כדורי ערבוב", href: "/#shop" },
    ],
  },
  {
    label: "אודות",
    href: "/about",
    links: [{ label: "הסיפור שלנו", href: "/about" }],
  },
];

export default function SiteHeader({
  navGroups,
}: {
  navGroups?: NavGroup[];
}) {
  const groups = navGroups && navGroups.length > 0 ? navGroups : NAV_MENU;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { totalQuantity, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Focus the search field when the panel opens; close it on Escape.
  useEffect(() => {
    if (!searchOpen) return;
    const t = window.setTimeout(() => searchInputRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [searchOpen]);

  // Live search via /api/search (debounced). The route uses the catalog layer,
  // so it returns live Shopify results when configured and the seeded catalog
  // otherwise.
  const [results, setResults] = useState<SearchResult[]>([]);
  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const t = window.setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(q)}`, {
        signal: controller.signal,
      })
        .then((r) => r.json())
        .then((d: { results?: SearchResult[] }) => setResults(d.results ?? []))
        .catch(() => {
          /* aborted or network error — leave previous results */
        });
    }, 200);
    return () => {
      window.clearTimeout(t);
      controller.abort();
    };
  }, [query]);

  // A solid, dedicated dark band that sits in its own space above the hero —
  // never overlapping the hero imagery. Deepens its shadow slightly on scroll.
  return (
    <header
      className={`fixed inset-x-0 top-7 z-50 bg-black text-white transition-shadow duration-500 ease-in-out ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo — leading (right) in RTL */}
        <Link
          href="/"
          aria-label="PULSE — דף הבית"
          className="relative h-8 w-24 transition-all duration-500 ease-in-out hover:opacity-80 lg:h-9 lg:w-28"
        >
          <Image
            src="/images/logo.jpg"
            alt="PULSE"
            fill
            priority
            sizes="112px"
            className="object-cover object-center mix-blend-screen"
          />
        </Link>

        {/* Actions — trailing (left) in RTL: search · cart · menu */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label={searchOpen ? "סגירת חיפוש" : "חיפוש"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((o) => !o)}
            className="transition-all duration-500 ease-in-out hover:opacity-60"
          >
            {searchOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Search className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
          <button
            type="button"
            aria-label="עגלת קניות"
            onClick={openCart}
            className="relative transition-all duration-500 ease-in-out hover:opacity-60"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
            {totalQuantity > 0 && (
              <span className="absolute -end-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#c8a24c] px-1 text-[10px] font-medium leading-none text-black ring-2 ring-black">
                {totalQuantity}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="-mr-2 flex items-center p-2 transition-all duration-500 ease-in-out hover:opacity-60"
            aria-label={mobileOpen ? "סגירת תפריט" : "תפריט"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Slide-down search panel */}
      <div
        className={`overflow-hidden border-white/10 bg-black/95 backdrop-blur-md transition-all duration-400 ease-in-out ${
          searchOpen
            ? "max-h-[75vh] border-t opacity-100"
            : "pointer-events-none max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-3xl px-6 py-6 lg:py-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-3 border-b border-white/25 pb-3"
          >
            <Search className="h-5 w-5 shrink-0 text-white/60" strokeWidth={1.5} />
            <input
              ref={searchInputRef}
              type="search"
              aria-label="חיפוש תכשיטים"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש תכשיטים…"
              className="w-full bg-transparent text-lg font-light tracking-[0.04em] text-white placeholder:text-white/40 focus:outline-none"
            />
          </form>

          {query.trim() && (
            <div className="mt-6">
              {results.length === 0 ? (
                <p className="text-sm tracking-[0.04em] text-white/50">
                  לא נמצאו תוצאות עבור &quot;{query.trim()}&quot;.
                </p>
              ) : (
                <ul className="divide-y divide-white/10">
                  {results.map((p) => (
                    <li key={p.handle}>
                      <Link
                        href={`/product/${p.handle}`}
                        className="flex items-center gap-4 py-3 transition-colors duration-300 hover:opacity-70"
                      >
                        <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded-sm bg-white/5">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            sizes="48px"
                            className="object-contain p-1 mix-blend-screen"
                          />
                        </span>
                        <span className="flex-1 text-sm font-light tracking-[0.04em] text-white">
                          {p.title}
                        </span>
                        <span className="text-sm tabular-nums text-white/60">
                          {formatPrice(p.price, p.currency)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Slide-down menu (all breakpoints) */}
      <div
        className={`${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Dim overlay */}
        <button
          type="button"
          aria-label="סגירת תפריט"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-x-0 bottom-0 top-[5.25rem] z-40 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <nav
          className={`fixed inset-x-0 top-[5.25rem] z-40 max-h-[calc(100vh-5.25rem)] overflow-y-auto border-t border-white/10 bg-black/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="px-6 py-4 text-white">
            {groups.map((group) => {
              const isOpen = expanded === group.label;
              return (
                <div key={group.label} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((cur) =>
                        cur === group.label ? null : group.label,
                      )
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between py-5 text-start text-sm tracking-[0.08em]"
                  >
                    {group.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col pb-3">
                        {group.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="py-3 pr-4 text-sm text-white/70 transition-colors duration-300 hover:text-white"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <Link
              href="/about"
              className="block py-5 text-sm tracking-[0.08em] text-white"
            >
              אודות
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
