import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./../styles/globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OurLoveSong.co | Custom Songs Crafted with Love",
  description: "A radio-quality, custom song crafted with love in 7 days—delivered to your inbox. Celebrate your loved ones with personalized music for any occasion.",
  keywords: ["custom song", "personalized music", "gift songs", "wedding songs", "birthday songs", "anniversary songs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
