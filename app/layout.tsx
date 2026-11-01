import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-primary",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SriVisionary Marketplace — India's Premier Online Shopping Gateway",
  description: "Discover deals on Mobiles, Electronics, Home Appliances, and Fashion with 10% Bank Offers, Free Delivery, and 7-day Easy Returns on SriVisionary.",
  keywords: "srivisionary, amazon india marketplace, online shopping, mobile offers, electronics festival deals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-[#F59E0B] selection:text-black"
      >
        {children}
      </body>
    </html>
  );
}
