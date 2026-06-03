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
const siteTitle = "David Ortiz | Personal Portfolio";
const siteDescription =
  "Personal portfolio for David Ortiz — practical web systems, AI-assisted workflows, automation experiments, selected builds, and notes.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "David Ortiz",
    "personal portfolio",
    "web systems",
    "AI-assisted workflows",
    "automation",
    "Next.js",
    "local business websites",
    "RAG experiments",
    "prompt safety",
  ],
  applicationName: "David Ortiz Portfolio",
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
