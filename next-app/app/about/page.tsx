import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — David Ortiz',
  description: 'About David Ortiz — developer portfolio',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <p className="text-neutral-300">
        This page will introduce my background, interests, and how I build software.
      </p>
    </main>
  );
}
