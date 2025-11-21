import Link from 'next/link';
import { caseStudies } from '@/data/content';

export function CaseStudiesSection() {
  return (
    <section className="bg-navy-dark py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">Automation Proof</p>
          <h2 className="text-4xl font-bold text-white lg:text-5xl">Real results from real automations</h2>
          <p className="mx-auto mt-2 max-w-2xl text-lg text-white/60">
            See how we&apos;ve helped teams eliminate manual work and scale operations
          </p>
          <p className="mt-2 text-sm text-white/50">
            Want the deeper breakdown?{' '}
            <a className="text-teal-400 underline transition hover:text-teal-300" href="/case-studies">
              Read every detail →
            </a>
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <article
              key={study.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition hover:border-white/20 hover:bg-white/10"
            >
              <h3 className="text-2xl font-bold text-white">{study.title}</h3>

              <div className="mt-6 space-y-4">
                {/* Problem */}
                <div>
                  <div className="mb-2 inline-block rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-400">
                    Problem
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">{study.problem}</p>
                </div>

                {/* Solution */}
                <div>
                  <div className="mb-2 inline-block rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    Solution
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">{study.solution}</p>
                </div>

                {/* Results */}
                <div>
                  <div className="mb-2 inline-block rounded-full bg-teal-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-400">
                    Results
                  </div>
                  <p className="text-sm leading-relaxed text-white/70">{study.results}</p>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mt-6 flex flex-wrap gap-2">
                {study.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Links */}
              {study.links && (
                <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                  {study.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      className="text-xs font-semibold text-teal-400 transition hover:text-teal-300"
                    >
                      {link.label} →
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
