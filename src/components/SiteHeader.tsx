"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart/CartContext";
import MediaPlaceholder, {
  isMissingLocalMedia,
} from "@/components/MediaPlaceholder";

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
    href: "/#accessories",
    links: [
      { label: "מעמד טלפון", href: "/#accessories" },
      { label: "כדורי ערבוב", href: "/#accessories" },
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
  // Product pages use the dark landing-page theme — flip the header to match.
  const isDark = pathname?.startsWith("/product/") ?? false;

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
      className={`absolute inset-x-0 top-7 z-50 backdrop-blur-md transition-all duration-500 ease-in-out ${
        isDark
          ? `text-zinc-100 ${scrolled ? "bg-[#0a0a0c]/95 shadow-lg shadow-black/40" : "bg-[#0a0a0c]/80"}`
          : `text-zinc-900 ${scrolled ? "bg-white/95 shadow-lg shadow-black/5" : "bg-white/80"}`
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo — leading (right) in RTL. Official VAULT mark, framed as a
            premium black badge so the source white background disappears.
            invert(1) hue-rotate(180deg): white bg → black (blends into badge),
            black letters → white, gold accent inverts to blue then rotates
            back to gold. */}
        <Link
          href="/"
          aria-label="VAULT — דף הבית"
          className="inline-flex items-center p-2 transition-all duration-500 ease-in-out hover:opacity-70"
        >
          {isDark ? (
            // The logo image has a white background, so on the dark theme we
            // render the wordmark as text instead of inverting it to a box.
            <span className="font-display text-2xl font-black uppercase tracking-[0.18em] text-white lg:text-[26px]">
              VAULT
            </span>
          ) : (
            <Image
              src="/images/favicon.png"
              alt="VAULT Logo"
              width={1774}
              height={887}
              priority
              sizes="88px"
              className="h-10 w-auto object-contain lg:h-11"
            />
          )}
        </Link>

        {/* Desktop inline nav — centered, hidden on mobile */}
        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: "חנות", href: "/#shop" },
            { label: "אביזרים", href: "/#accessories" },
            { label: "שאלות נפוצות", href: "/faq" },
            { label: "צור קשר", href: "mailto:adiamato119@gmail.com" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`text-[13px] font-medium tracking-[0.06em] transition-colors duration-300 ${
                isDark
                  ? "text-zinc-300 hover:text-[#5b82ff]"
                  : "text-zinc-700 hover:text-[#2952e3]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions — trailing (left) in RTL: search · cart · menu.
            Each button is a 44×44 tap target (negative margin keeps spacing tight). */}
        <div className="-mx-2 flex items-center">
          <button
            type="button"
            aria-label={searchOpen ? "סגירת חיפוש" : "חיפוש"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center transition-all duration-500 ease-in-out hover:opacity-60"
          >
            {searchOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Search className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
          <button
            type="button"
            aria-label={
              totalQuantity > 0
                ? `עגלת קניות, ${totalQuantity} פריטים`
                : "עגלת קניות"
            }
            onClick={openCart}
            className="flex h-11 w-11 items-center justify-center transition-all duration-500 ease-in-out hover:opacity-60"
          >
            <span className="relative">
              <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
              {totalQuantity > 0 && (
                <span className="absolute -end-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2952e3] px-1 text-[10px] font-medium leading-none text-white ring-2 ring-white">
                  {totalQuantity}
                </span>
              )}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center transition-all duration-500 ease-in-out hover:opacity-60 md:hidden"
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
        className={`overflow-hidden border-zinc-200 bg-white/95 backdrop-blur-md transition-all duration-400 ease-in-out ${
          searchOpen
            ? "max-h-[75vh] border-t opacity-100"
            : "pointer-events-none max-h-0 border-t-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-3xl px-6 py-6 lg:py-8">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-3 border-b border-zinc-300 pb-3"
          >
            <Search className="h-5 w-5 shrink-0 text-zinc-500" strokeWidth={1.5} />
            <input
              ref={searchInputRef}
              type="search"
              aria-label="חיפוש מוצרים"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש מוצרים…"
              className="w-full bg-transparent text-lg font-light tracking-[0.04em] text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
            />
          </form>

          {query.trim() && (
            <div className="mt-6">
              {results.length === 0 ? (
                <p className="text-sm tracking-[0.04em] text-zinc-500">
                  לא נמצאו תוצאות עבור &quot;{query.trim()}&quot;.
                </p>
              ) : (
                <ul className="divide-y divide-zinc-200">
                  {results.map((p) => (
                    <li key={p.handle}>
                      <Link
                        href={`/product/${p.handle}`}
                        className="flex items-center gap-4 py-3 transition-colors duration-300 hover:opacity-70"
                      >
                        <span className="relative h-14 w-12 shrink-0 overflow-hidden rounded-sm bg-zinc-100">
                          {isMissingLocalMedia(p.image) ? (
                            <MediaPlaceholder className="absolute inset-0 h-full w-full" />
                          ) : (
                            <Image
                              src={p.image}
                              alt={p.title}
                              fill
                              sizes="48px"
                              className="object-contain p-1 mix-blend-screen"
                            />
                          )}
                        </span>
                        <span className="flex-1 text-sm font-light tracking-[0.04em] text-zinc-900">
                          {p.title}
                        </span>
                        <span className="text-sm tabular-nums text-zinc-500">
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
          className={`fixed inset-x-0 bottom-0 top-[5.75rem] z-40 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <nav
          className={`fixed inset-x-0 top-[5.75rem] z-40 max-h-[calc(100vh-5.75rem)] overflow-y-auto border-t border-zinc-200 bg-white/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="px-6 py-4 text-zinc-900">
            {groups.map((group) => {
              const isOpen = expanded === group.label;
              return (
                <div key={group.label} className="border-b border-zinc-200">
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
                            className="py-3 pr-4 text-sm text-zinc-600 transition-colors duration-300 hover:text-zinc-900"
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
              className="block py-5 text-sm tracking-[0.08em] text-zinc-900"
            >
              אודות
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
