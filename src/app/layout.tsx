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
  weight: ["500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AMATO — תכשיטי פרימיום",
  description:
    "AMATO מעצבת תכשיטי פרימיום מינימליסטיים מכסף סטרלינג 925 בציפוי זהב 14 קראט — נועדו ללוות אותך בכל יום.",
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
        <CartProvider>
          <InfoProvider>
            <AnnouncementBar />
            <SiteHeader navGroups={navGroups} />
            {children}
            <WhatsAppButton />
            <CartDrawer />
            <InfoDrawer />
          </InfoProvider>
        </CartProvider>
      </body>
    </html>
  );
}
