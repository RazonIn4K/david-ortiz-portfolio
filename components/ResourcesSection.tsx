import Link from 'next/link';
import { resources } from '@/data/content';
import { UPWORK_URL } from '@/lib/constants';

export function ResourcesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-ink/60">Resources</p>
          <h2 className="text-3xl font-semibold text-ink">Articles I send to busy founders</h2>
          <p className="text-sm text-ink/70">
            Published on <a className="text-accent underline" href="https://highencodelearning.com" target="_blank" rel="noreferrer">High Encode Learning</a>.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {resources.map((resource) => (
            <article key={resource.title} className="rounded-3xl border border-slate/10 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-ink">{resource.title}</h3>
              <p className="mt-3 text-sm text-ink/70">{resource.description}</p>
              <Link
                href={resource.href}
                target="_blank"
                className="mt-5 inline-flex text-sm font-semibold text-accent"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-ink/70">
          Prefer Upwork?{' '}
          <Link href={UPWORK_URL} target="_blank" className="text-accent underline">
            Hire me there
          </Link>{' '}
          and mention the resource that resonated so I map it to the right catalog offer.
        </p>
      </div>
    </section>
  );
}
