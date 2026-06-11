import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const didot = localFont({
  src: "./fonts/Didot.ttf",
  variable: "--font-didot",
});

const michroma = localFont({
  src: "./fonts/Michroma.ttf",
  variable: "--font-michroma",
});

const ivymode = localFont({
  src: "./fonts/IvyMode-Regular.ttf",
  variable: "--font-ivymode",
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
      className={`${cormorant.variable} ${montserrat.variable} ${didot.variable} ${michroma.variable} ${ivymode.variable}`}
    >
      <body className="font-ivymode antialiased">
        {children}
      </body>
    </html>
  );
}
