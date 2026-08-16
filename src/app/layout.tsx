import type { Metadata, Viewport } from "next";
import { Assistant, Frank_Ruhl_Libre, Rubik } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { InfoProvider } from "@/lib/info/InfoContext";
import InfoDrawer from "@/components/InfoDrawer";
import { WaitlistProvider } from "@/lib/waitlist/WaitlistContext";
import WaitlistModal from "@/components/WaitlistModal";
import { WAITLIST_MODE, EXTRAS_AVAILABLE } from "@/lib/config";
import Analytics, { AnalyticsNoscript } from "@/components/Analytics";
import SiteHeader from "@/components/SiteHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import { getNavGroups } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

const assistant = Assistant({
  variable: "--font-sans",
  subsets: ["hebrew", "latin"],
});

const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
  subsets: ["hebrew", "latin"],
});

const rubik = Rubik({
  variable: "--font-display",
  weight: ["500", "600", "700", "800", "900"],
  subsets: ["hebrew", "latin"],
});

const TITLE = "VAULT Shaker | שייקר מגנטי לחדר כושר";
const DESCRIPTION =
  "VAULT — שייקר מגנטי לחדר כושר. הסוף לטלפון על הרצפה במכון: מחזיק את המכשיר שלך בגובה העיניים עם טכנולוגיית Mag-Grip, ומכין שייק חלק ב-10 שניות.";

// Re-render every 60s (ISR) so live Shopify nav/products sync without redeploy.
export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  icons: {
    // Custom VAULT favicon used for the browser tab, shortcut and Apple touch
    // icon. (The old app/apple-icon.svg file-convention icon was removed so
    // this single source of truth wins for the apple-touch-icon too.)
    icon: "/images/favicon.png",
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    siteName: "VAULT",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        // ASCII filename (no spaces / Hebrew) so Facebook/WhatsApp/LinkedIn and
        // Google can reliably fetch it — non-ASCII OG URLs often fail to scrape.
        url: "/images/vault-og.jpg",
        width: 1536,
        height: 1024,
        alt: "שייקר VAULT החשמלי המגנטי",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/vault-og.jpg"],
  },
};

// Separate from `metadata` per Next.js 14+ — sets the standard responsive
// viewport and tints mobile browser chrome (Android address bar / iOS status
// bar) with the brand accent. Pinch-zoom is intentionally left at the
// browser default (no maximumScale/userScalable override) for accessibility.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2952e3",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navGroups = await getNavGroups();

  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} ${frankRuhl.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#F7F7F5] text-zinc-900">
        <AnalyticsNoscript />
        {/* Skip link — first focusable element for keyboard/SR users */}
        <a
          href="#main-content"
          className="sr-only z-[100] rounded bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow focus:not-sr-only focus:fixed focus:end-4 focus:top-2"
        >
          דלג לתוכן הראשי
        </a>
        <CartProvider>
          <InfoProvider>
            <WaitlistProvider>
              <AnnouncementBar />
              <SiteHeader navGroups={navGroups} />
              {children}
              <WhatsAppButton />
              <AccessibilityButton />
              <CartDrawer />
              <InfoDrawer />
              {(WAITLIST_MODE || !EXTRAS_AVAILABLE) && <WaitlistModal />}
            </WaitlistProvider>
          </InfoProvider>
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
