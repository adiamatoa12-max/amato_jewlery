"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart/CartContext";
import { COLLECTIONS } from "@/lib/mock-data";

type NavLink = { label: string; href: string };
type NavGroup = { label: string; href: string; links: NavLink[] };

const NAV_MENU: NavGroup[] = [
  {
    label: "סדרת הגיאומטריה",
    href: "/#geo-collection",
    links: [
      { label: "עגילי חישוק", href: "/product/silver-hoop-earrings" },
      { label: "שרשראות תליון", href: "/product/geo-pendant-necklace" },
      { label: "טבעות חותם", href: "/product/geo-signet-ring" },
    ],
  },
  {
    label: "חוליות על-זמניות",
    href: "/#the-cubans",
    links: [
      { label: "שרשראות קצרות", href: "/product/cuban-chain-necklace" },
      { label: "שרשראות ארוכות", href: "/#the-cubans" },
      { label: "צמידים", href: "/product/cuban-chain-bracelet" },
    ],
  },
  {
    label: "סדרת ה-Signature",
    href: "/#clean-essentials",
    links: [
      { label: "פריטי בייסיק", href: "/product/clean-band-ring" },
      { label: "תכשיטי סטייטמנט", href: "/product/clean-gold-bar-necklace" },
    ],
  },
];

export default function SiteHeader() {
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

  // Live search across the full catalog.
  const allProducts = useMemo(
    () => COLLECTIONS.flatMap((c) => c.products),
    [],
  );
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allProducts
      .filter((p) => p.title.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query, allProducts]);

  // A solid, dedicated dark band that sits in its own space above the hero —
  // never overlapping the hero imagery. Deepens its shadow slightly on scroll.
  return (
    <header
      className={`fixed inset-x-0 top-9 z-50 bg-black text-white transition-shadow duration-500 ease-in-out ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6 lg:h-[5.5rem] lg:px-10">
        {/* Start cell (right in RTL): hamburger + primary nav */}
        <div className="flex items-center justify-start">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="-m-2 flex items-center p-2 transition-all duration-500 ease-in-out hover:opacity-60 md:hidden"
            aria-label={mobileOpen ? "סגירת תפריט" : "תפריט"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>

          <nav className="hidden items-center gap-10 text-[11px] font-light tracking-[0.18em] md:flex">
            {NAV_MENU.map((group) => (
              <div key={group.label} className="group relative">
                <Link
                  href={group.href}
                  className="flex items-center gap-1.5 py-8 transition-all duration-500 ease-in-out group-hover:opacity-60"
                >
                  {group.label}
                  <ChevronDown
                    className="h-3 w-3 transition-transform duration-300 ease-in-out group-hover:rotate-180"
                    strokeWidth={1.5}
                  />
                </Link>

                {/* Hover dropdown panel */}
                <div className="invisible absolute right-1/2 top-full z-50 min-w-[220px] translate-x-1/2 translate-y-1 opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="overflow-hidden rounded-sm border border-stone-200/70 bg-white py-2 shadow-xl shadow-black/10">
                    {group.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="block px-6 py-2.5 text-center text-[13px] tracking-[0.06em] text-neutral-600 transition-all duration-300 ease-in-out hover:bg-stone-50 hover:text-neutral-900"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <Link
              href="/about"
              className="py-8 transition-all duration-500 ease-in-out hover:opacity-60"
            >
              אודות
            </Link>
          </nav>
        </div>

        {/* Center cell: logo */}
        <Link
          href="/"
          aria-label="AMATO — דף הבית"
          className="relative h-9 w-28 justify-self-center transition-all duration-500 ease-in-out hover:opacity-80 lg:h-10 lg:w-32"
        >
          <Image
            src="/images/logo.jpg"
            alt="AMATO"
            fill
            priority
            sizes="128px"
            className="object-cover object-center mix-blend-screen"
          />
        </Link>

        {/* End cell (left in RTL): icons */}
        <div className="flex items-center justify-end gap-6">
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
        <div className="mx-auto max-w-3xl px-6 py-8 lg:py-10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-3 border-b border-white/25 pb-3"
          >
            <Search className="h-5 w-5 shrink-0 text-white/60" strokeWidth={1.5} />
            <input
              ref={searchInputRef}
              type="search"
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

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      >
        {/* Dim overlay */}
        <button
          type="button"
          aria-label="סגירת תפריט"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
          className={`fixed inset-x-0 bottom-0 top-[7.25rem] z-40 bg-black/40 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Panel */}
        <nav
          className={`fixed inset-x-0 top-[7.25rem] z-40 max-h-[calc(100vh-7.25rem)] overflow-y-auto border-t border-white/10 bg-black/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
            mobileOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="px-6 py-4 text-white">
            {NAV_MENU.map((group) => {
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
