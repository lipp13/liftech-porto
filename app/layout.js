import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata = {
  title: "LifTech — Creative Developer & Digital Experiences",
  description:
    "Portfolio of LifTech. Senior creative developer & frontend engineer crafting award-winning editorial web experiences, motion systems, and high-performance digital products.",
  keywords: [
    "Creative Developer",
    "Frontend Engineer",
    "GSAP Motion Design",
    "Next.js Portfolio",
    "Editorial Web Design",
    "LifTech",
  ],
  authors: [{ name: "LifTech" }],
  creator: "LifTech",
  openGraph: {
    title: "LifTech — Creative Developer & Digital Experiences",
    description:
      "Award-winning editorial web experiences, motion systems, and high-performance digital products.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "LifTech — Creative Developer & Digital Experiences",
    description:
      "Award-winning editorial web experiences, motion systems, and high-performance digital products.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} scroll-smooth antialiased`}
    >
      <body className="bg-[#f9f8f6] text-[#121212] font-sans selection:bg-[#121212] selection:text-[#f9f8f6] min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
