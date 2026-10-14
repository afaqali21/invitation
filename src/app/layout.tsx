import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter, Great_Vibes, Cinzel } from "next/font/google";
import "./globals.css";
import { INVITATION_CONFIG } from "@/lib/invitation";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: INVITATION_CONFIG.metaTitle,
  description: INVITATION_CONFIG.metaDescription,
  openGraph: {
    title: INVITATION_CONFIG.metaTitle,
    description: INVITATION_CONFIG.metaDescription,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: INVITATION_CONFIG.metaTitle,
    description: INVITATION_CONFIG.metaDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${cinzel.variable} ${greatVibes.variable} scroll-smooth antialiased`}
    >
      <body className="bg-[#FAF7F2] text-[#2C241E] selection:bg-[#DFBA73]/30 selection:text-[#1A140E] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
