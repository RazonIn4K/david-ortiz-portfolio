import { Metadata } from 'next';
import Link from 'next/link';
import { caseStudies } from '@/data/content';
import { UPWORK_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Automation Case Studies | David Ortiz',
  description: 'Driver scoring, messaging agents, and lead gen pipelines for founders and agencies.'
};

export default function CaseStudiesPage() {
  return (
    <div className="bg-white text-ink">
      <section className="bg-gradient-to-b from-ink to-slate py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Case Studies</p>
          <h1 className="mt-3 text-4xl font-semibold">Automation stories built for lean teams</h1>
          <p className="mt-4 text-sm text-white/80">
            Found me on Upwork?{' '}
            <a href="/work-with-me#work-process" className="underline">
              Here&apos;s how we&apos;ll work together
            </a>{' '}
            and pick the matching Project Catalog offer for each outcome below.
          </p>
          <p className="mt-2 text-xs text-white/60">
            Automation Sprint, Messaging Agent, Scraping Pipeline, and AI Security Audit are all packaged here:
            {' '}
            <Link href={UPWORK_URL} target="_blank" className="underline">
              Upwork Project Catalog
            </Link>
            .
          </p>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="space-y-10">
            {caseStudies.map((study) => (
              <article key={study.title} className="rounded-3xl border border-slate/10 bg-slate-50 p-6">
                <div className="flex flex-col gap-1">
                  <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Case Study</p>
                  <h2 className="text-2xl font-semibold text-ink">{study.title}</h2>
                </div>
                <div className="mt-6 grid gap-4 text-sm text-ink/80 md:grid-cols-3">
                  <div>
                    <p className="font-semibold text-ink">Problem</p>
                    <p className="mt-2">{study.problem}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Solution</p>
                    <p className="mt-2">{study.solution}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-ink">Results</p>
                    <p className="mt-2">{study.results}</p>
                  </div>
                </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-ink/60">
                {study.stack.map((item) => (
                  <span key={item} className="rounded-full border border-ink/10 px-3 py-1">
                    {item}
                  </span>
                ))}
              </div>
              {study.links && (
                <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold text-accent">
                  {study.links.map((link) => (
                    <Link key={link.href} href={link.href} target="_blank" className="underline">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
        </div>
      </section>
    </div>
  );
}
