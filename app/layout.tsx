import type { Metadata } from "next";
import { Be_Vietnam_Pro, Newsreader } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Cà phê ${site.city}`,
    template: `%s · ${site.name}`,
  },
  description: `${site.name}: quán cà phê ở ${site.city}. Cà phê phin, bạc xỉu, trà và cà phê hạt rang mới giao toàn quốc.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${newsreader.variable} antialiased`}>
      <head>
        {/* Keep reveal content visible when JS is off. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body id="top">{children}</body>
    </html>
  );
}
