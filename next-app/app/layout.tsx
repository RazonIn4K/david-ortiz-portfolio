import './globals.css';
import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'David Ortiz — Developer Portfolio',
  description: 'Modern, fast portfolio with Next.js App Router and Tailwind CSS',
  metadataBase: new URL('https://david-ortiz-portfolio-flax.vercel.app'),
  openGraph: {
    title: 'David Ortiz — Developer Portfolio',
    description: 'Modern, fast portfolio with Next.js App Router and Tailwind CSS',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
