import Link from 'next/link';
import { caseStudies } from '@/data/content';

export function CaseStudiesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-ink/60">Automation Proof</p>
          <h2 className="text-3xl font-semibold text-ink">Case studies built for lean teams</h2>
          <p className="text-sm text-ink/70">
            Want the deeper breakdown? <a className="text-accent underline" href="/case-studies">Read every detail →</a>
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.title} className="rounded-3xl border border-slate/10 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-ink">{study.title}</h3>
              <div className="mt-4 space-y-2 text-sm text-ink/80">
                <p><span className="font-semibold text-ink">Problem:</span> {study.problem}</p>
                <p><span className="font-semibold text-ink">Solution:</span> {study.solution}</p>
                <p><span className="font-semibold text-ink">Results:</span> {study.results}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/60">
                {study.stack.map((item) => (
                  <span key={item} className="rounded-full border border-ink/10 px-3 py-1">
                    {item}
                  </span>
                ))}
              </div>
              {study.links && (
                <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-accent">
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
  );
}
