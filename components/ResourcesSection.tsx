import Link from 'next/link';
import { resources } from '@/data/content';
import { UPWORK_URL } from '@/lib/constants';

export function ResourcesSection() {
  return (
    <section className="bg-navy-dark py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">Resources</p>
          <h2 className="text-4xl font-bold text-white lg:text-5xl">Articles for busy founders</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-white/60">
            Published on{' '}
            <a className="text-teal-400 underline transition hover:text-teal-300" href="https://highencodelearning.com" target="_blank" rel="noreferrer">
              High Encode Learning
            </a>
            .
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {resources.map((resource) => (
            <article
              key={resource.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
            >
              <h3 className="text-xl font-bold text-white">{resource.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{resource.description}</p>
              <Link
                href={resource.href}
                target="_blank"
                className="mt-5 inline-flex text-sm font-semibold text-teal-400 transition hover:text-teal-300"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-white/60">
          Prefer Upwork?{' '}
          <Link href={UPWORK_URL} target="_blank" className="text-teal-400 underline transition hover:text-teal-300">
            Hire me there
          </Link>{' '}
          and mention the resource that resonated so I map it to the right catalog offer.
        </p>
      </div>
    </section>
  );
}
