import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'David Ortiz | AI Automation & Chatbot Consultant',
  description:
    'AI automation consultant helping founders and agencies ship Typeform → Zapier → Notion workflows, GPT-4o chatbots, lead-gen scrapers, and AI security guardrails.',
  metadataBase: new URL('https://www.cs-learning.me'),
  openGraph: {
    title: 'David Ortiz | AI Automation & Chatbot Consultant',
    description:
      'Ship AI automations, chatbots, and lead-gen pipelines with Zapier, Notion, GPT-4o, and n8n. Includes case studies, resources, and Upwork-ready CTAs.',
    url: 'https://www.cs-learning.me',
    siteName: 'David Ortiz Automation',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Ortiz | AI Automation & Chatbot Consultant',
    description: 'Upwork-ready AI automation studio shipping Zapier, Notion, GPT-4o, and n8n builds with security guardrails.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
