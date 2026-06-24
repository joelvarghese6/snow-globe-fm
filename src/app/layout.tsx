import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, DM_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import SnowParticles from "@/components/layout/SnowParticles";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snow Globe FM",
  description: "Collaborative generative lo-fi beats on Sui",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmMono.variable} ${playfairDisplay.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SnowParticles />
        <div className="flex flex-col w-full">
          <Navbar />
          <div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
