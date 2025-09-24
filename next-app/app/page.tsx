import Hero from '../components/Hero';

export default function Home() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <Hero
        title="David Ortiz — Developer Portfolio"
        subtitle="Next.js App Router scaffold. Tailwind CSS configured. Progressive migration from current static site."
        primary={{ href: '/', label: 'View current site' }}
        secondary={{ href: 'https://cs-learning.me', label: 'cs-learning.me' }}
      />
    </main>
  );
}
