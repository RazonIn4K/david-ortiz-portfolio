import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const siteUrl = "https://davidtiz.com";
const siteTitle = "David Ortiz | Personal hub for builds, notes, and systems work";
const siteDescription =
  "Personal hub for David Ortiz: current builds, casual notes, HighEncode routing, AI tooling experiments, and web systems work.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "David Ortiz",
    "HighEncode",
    "personal portfolio",
    "web systems",
    "automation notes",
    "AI tooling experiments",
    "systems design",
    "local business websites",
  ],
  applicationName: "David Ortiz Personal Site",
  creator: "David Ortiz",
  authors: [{ name: "David Ortiz", url: siteUrl }],
  metadataBase: new URL(siteUrl),
  manifest: "/site.webmanifest",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "David Ortiz",
    type: "website",
    images: [
      {
        url: "/visuals/david-og-card.png",
        width: 1200,
        height: 630,
        alt: "Generated David Ortiz portfolio workbench image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/visuals/david-og-card.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        url: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        sizes: "180x180",
      },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
        {process.env.VERCEL === "1" && process.env.VERCEL_URL ? <Analytics /> : null}
      </body>
    </html>
  );
}
