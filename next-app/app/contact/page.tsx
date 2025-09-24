import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — David Ortiz',
  description: 'Get in touch with David Ortiz',
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
      <p className="text-neutral-300">
        Reach me at <a className="text-brand-500 hover:underline" href="mailto:david@cs-learning.me">david@cs-learning.me</a> or via socials on my GitHub profile.
      </p>
    </main>
  );
}
