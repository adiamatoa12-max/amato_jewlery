import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre, Montserrat } from "next/font/google";
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

const montserrat = Montserrat({
  variable: "--font-display",
  weight: ["500", "600", "700", "800", "900"],
  subsets: ["latin"],
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
    // Square "Ü" mark cropped from the VAULT wordmark — the wordmark itself
    // is too wide to render legibly in a browser tab. (Apple touch icon is
    // handled separately by the existing app/apple-icon.svg convention.)
    icon: "/images/favicon-mark.png",
    shortcut: "/images/favicon-mark.png",
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
        url: "/images/vault-shaker-hero.png",
        width: 1200,
        height: 1500,
        alt: "שייקר VAULT המגנטי",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/vault-shaker-hero.png"],
  },
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
      className={`${assistant.variable} ${frankRuhl.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#111111] text-zinc-100">
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
