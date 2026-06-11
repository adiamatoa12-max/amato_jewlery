import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartContext";
import CartDrawer from "@/components/CartDrawer";
import { InfoProvider } from "@/lib/info/InfoContext";
import InfoDrawer from "@/components/InfoDrawer";
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

export const metadata: Metadata = {
  title: "VAULT — השייקר המגנטי המוביל לאימון",
  description:
    "VAULT — השייקר המגנטי הראשון בעולם עם מעמד טלפון מובנה. עיצוב high-performance לחדר הכושר, לריצה ולכל אורח חיים אקטיבי.",
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
            <AnnouncementBar />
            <SiteHeader navGroups={navGroups} />
            {children}
            <WhatsAppButton />
            <AccessibilityButton />
            <CartDrawer />
            <InfoDrawer />
          </InfoProvider>
        </CartProvider>
      </body>
    </html>
  );
}
