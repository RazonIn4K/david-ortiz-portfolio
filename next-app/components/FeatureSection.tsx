type Feature = {
  title: string;
  description: string;
  icon?: string;
};

export default function FeatureSection() {
  const features: Feature[] = [
    {
      title: 'Performance-first',
      description:
        'Optimized assets, lazy-loading, and fast Time to Interactive with modern tooling.',
      icon: '⚡',
    },
    {
      title: 'Accessible by default',
      description:
        'Semantic HTML, keyboard-friendly navigation, and color-contrast conscious UI.',
      icon: '♿',
    },
    {
      title: 'SEO-ready',
      description:
        'Structured metadata, Open Graph images, and sensible defaults for discoverability.',
      icon: '🔍',
    },
  ];

  return (
    <section className="mx-auto mt-12 max-w-4xl px-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-5"
          >
            <div className="text-2xl" aria-hidden="true">{f.icon ?? '•'}</div>
            <h3 className="mt-3 text-lg font-semibold text-neutral-100">{f.title}</h3>
            <p className="mt-2 text-sm text-neutral-300">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
