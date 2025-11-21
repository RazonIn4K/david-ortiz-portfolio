import Link from 'next/link';
import { caseStudies } from '@/data/content';

export function CaseStudiesSection() {
  return (
    <section className="bg-ink py-24 relative overflow-hidden">
       {/* Background glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="flex flex-col gap-4 text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal">Case Studies</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Proven results for lean teams</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            See how we&apos;ve helped other businesses save time and scale operations.
            <br />
            <Link href="/case-studies" className="text-teal hover:text-teal/80 underline decoration-teal/30 underline-offset-4 mt-2 inline-block">
              Read all case studies →
            </Link>
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {caseStudies.map((study) => (
            <article key={study.title} className="flex flex-col rounded-2xl border border-white/10 bg-slate/50 p-8 transition hover:border-teal/30">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white">{study.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {study.stack.map((item) => (
                    <span key={item} className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/60">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-6 border-t border-white/10 pt-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-red-400 mb-2">Problem</p>
                  <p className="text-sm text-white/70 leading-relaxed">{study.problem}</p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">Solution</p>
                  <p className="text-sm text-white/70 leading-relaxed">{study.solution}</p>
                </div>

                <div className="rounded-xl bg-teal/10 border border-teal/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-teal mb-2">Results</p>
                  <p className="text-sm font-medium text-white leading-relaxed">{study.results}</p>
                </div>
              </div>

              {study.links && (
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-4 text-xs font-bold text-teal">
                  {study.links.map((link) => (
                    <Link key={link.href} href={link.href} target="_blank" className="flex items-center gap-1 hover:underline">
                      {link.label} <span className="text-lg leading-none">↗</span>
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
