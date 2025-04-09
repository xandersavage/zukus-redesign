import type { Metadata } from "next";
import { Inter, Montserrat, Source_Serif_4 } from "next/font/google";
import Header from "@/components/header";
import "./globals.css";

// Define fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const sourceSans = Source_Serif_4({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zukus Industries | Oil & Gas Services",
  description:
    "Providing quality, innovative, specialized and efficient services to clients in the Oil and Gas Industry since 1987.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${sourceSans.variable} antialiased`}
    >
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
