import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { InfoProvider } from "@/lib/info/InfoContext";
import InfoDrawer from "@/components/InfoDrawer";
import { WaitlistProvider } from "@/lib/waitlist/WaitlistContext";
import WaitlistModal from "@/components/WaitlistModal";
import SiteHeader from "@/components/SiteHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import AccessibilityButton from "@/components/AccessibilityButton";
import { getNavGroups } from "@/lib/catalog";

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

const SITE_URL = "https://vaultshaker.vercel.app";
const TITLE = "VAULT | השייקר המגנטי הראשון בעולם לאימון מושלם";
const DESCRIPTION =
  "שדרגו את האימון שלכם עם VAULT - שייקר פרימיום עם מגנט N52 עוצמתי המצמיד את הסמארטפון שלכם לכל משטח מתכתי. מושלם לצילום אימונים ללא ידיים.";

// Re-render every 60s (ISR) so live Shopify nav/products sync without redeploy.
export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
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
      <body className="min-h-full bg-stone-50 text-neutral-900">
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
              <WaitlistModal />
            </WaitlistProvider>
          </InfoProvider>
        </CartProvider>
      </body>
    </html>
  );
}
