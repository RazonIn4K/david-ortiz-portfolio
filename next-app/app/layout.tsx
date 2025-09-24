import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'David Ortiz — Developer Portfolio',
  description: 'Modern, fast portfolio with Next.js App Router and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
