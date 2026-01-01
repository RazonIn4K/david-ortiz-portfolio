import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = "https://cs-learning.me";
const siteTitle = "David Ortiz | AI Automation Studio";
const siteDescription =
  "AI automation studio building n8n/Make workflows, custom RAG chatbots, SaaS security audits, and AI video/UGC.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "AI automation",
    "n8n",
    "Make",
    "chatbots",
    "RAG",
    "security audits",
    "workflow automation",
    "AI video",
    "UGC",
  ],
  applicationName: "David Ortiz AI Automation Studio",
  creator: "David Ortiz",
  authors: [{ name: "David Ortiz", url: siteUrl }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "David Ortiz AI Automation Studio",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        sizes: "32x32",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        sizes: "32x32",
        media: "(prefers-color-scheme: dark)",
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
    shortcut: "/icon-light-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
