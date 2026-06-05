import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartContext";
import CartDrawer from "@/components/CartDrawer";
import SiteHeader from "@/components/SiteHeader";
import AnnouncementBar from "@/components/AnnouncementBar";
import WhatsAppButton from "@/components/WhatsAppButton";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${assistant.variable} ${frankRuhl.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-stone-50 text-neutral-900">
        <CartProvider>
          <AnnouncementBar />
          <SiteHeader />
          {children}
          <WhatsAppButton />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
