import type React from "react";
import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { socialProfileLinks } from "@/lib/contact-links";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const siteUrl = "https://davidtiz.com";
const siteTitle = "David Ortiz | AI Security Engineer";
const siteDescription =
  "Personal site for David Ortiz: AI security and offensive evaluation work, competition rankings, and production software builds.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "David Ortiz",
    "AI security",
    "prompt injection",
    "offensive evaluation",
    "National Cyber League",
    "CTF writeups",
    "Next.js",
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
        alt: "David Ortiz, AI security and software portfolio",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "David Ortiz",
  url: siteUrl,
  jobTitle: "AI Security Engineer",
  description: siteDescription,
  email: "hello@davidtiz.com",
  image: `${siteUrl}/visuals/david-og-card.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "DeKalb",
    addressRegion: "IL",
    addressCountry: "US",
  },
  knowsAbout: [
    "AI security evaluation",
    "Prompt injection",
    "Log analysis",
    "Network traffic analysis",
    "Web application security",
    "Next.js",
    "Web development",
  ],
  sameAs: [...socialProfileLinks],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <main id="main-content">{children}</main>
        {process.env.VERCEL === "1" && process.env.VERCEL_URL ? <Analytics /> : null}
      </body>
    </html>
  );
}
