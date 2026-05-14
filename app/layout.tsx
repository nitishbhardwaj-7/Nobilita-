import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const michroma = localFont({
  src: "./fonts/Michroma.ttf",
  variable: "--font-michroma",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Porcellana Nobilita — IL GRES IMPERIALE D'ITALIA",
  description:
    "Timeless Italian porcelain surfaces crafted for the modern era. Inspired by the noble floors of Italian palazzi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} ${michroma.variable}`}
    >
      <body className="font-gurmukhi antialiased">{children}</body>
    </html>
  );
}
