import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sans = localFont({
  src: [
    { path: "../fonts/DMSans-400.woff2", weight: "400" },
    { path: "../fonts/DMSans-500.woff2", weight: "500" },
    { path: "../fonts/DMSans-700.woff2", weight: "700" },
  ],
  variable: "--font-sans",
});
const serif = localFont({
  src: [
    { path: "../fonts/SourceSerif4-400.woff2", weight: "400" },
    { path: "../fonts/SourceSerif4-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/SourceSerif4-600.woff2", weight: "600" },
  ],
  variable: "--font-serif",
});
const mono = localFont({
  src: [
    { path: "../fonts/DMMono-400.woff2", weight: "400" },
    { path: "../fonts/DMMono-500.woff2", weight: "500" },
  ],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Olympiad Commons",
  description:
    "Free, open-source study guides for the science olympiads. Physics, chemistry and biology, written by students.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
