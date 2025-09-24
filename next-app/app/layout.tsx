import './globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'David Ortiz — Developer Portfolio',
  description: 'Modern, fast portfolio with Next.js App Router and Tailwind CSS',
  metadataBase: new URL('https://david-ortiz-portfolio-flax.vercel.app'),
  openGraph: {
    title: 'David Ortiz — Developer Portfolio',
    description: 'Modern, fast portfolio with Next.js App Router and Tailwind CSS',
    images: ['/opengraph-image'],
    url: '/',
    siteName: 'David Ortiz — Developer Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Ortiz — Developer Portfolio',
    description: 'Modern, fast portfolio with Next.js App Router and Tailwind CSS',
    images: ['/opengraph-image'],
    creator: '@',
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0f1a',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-neutral-950 text-neutral-100 antialiased`}>
        <Header />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
