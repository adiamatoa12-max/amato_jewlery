"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart/CartContext";

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
  const { totalQuantity, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Always dark so the gold AMATO logo reads cleanly; deepen slightly on scroll.
  return (
    <header
      className={`fixed inset-x-0 top-9 z-50 border-b text-white backdrop-blur-md transition-all duration-500 ease-in-out ${
        scrolled
          ? "border-white/10 bg-black/95"
          : "border-transparent bg-black/80"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
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

        <nav className="hidden items-center gap-9 text-xs tracking-[0.08em] md:flex">
          {NAV_MENU.map((group) => (
            <div key={group.label} className="group relative">
              <Link
                href={group.href}
                className="flex items-center gap-1 py-7 transition-all duration-500 ease-in-out group-hover:opacity-60"
              >
                {group.label}
                <ChevronDown
                  className="h-3 w-3 transition-transform duration-300 ease-in-out group-hover:rotate-180"
                  strokeWidth={1.5}
                />
              </Link>

              {/* Hover dropdown panel */}
              <div className="invisible absolute right-1/2 top-full z-50 min-w-[210px] translate-x-1/2 translate-y-1 opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="overflow-hidden rounded-sm border border-stone-200/70 bg-white py-2 shadow-xl shadow-black/10">
                  {group.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="block px-5 py-2.5 text-center text-[13px] tracking-[0.06em] text-neutral-600 transition-all duration-300 ease-in-out hover:bg-stone-50 hover:text-neutral-900"
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
            className="py-7 transition-all duration-500 ease-in-out hover:opacity-60"
          >
            אודות
          </Link>
        </nav>

        <Link
          href="/"
          aria-label="AMATO — דף הבית"
          className="relative h-9 w-28 transition-all duration-500 ease-in-out hover:opacity-80 lg:h-10 lg:w-32"
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

        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-label="חיפוש"
            className="transition-all duration-500 ease-in-out hover:opacity-60"
          >
            <Search className="h-5 w-5" strokeWidth={1.5} />
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
