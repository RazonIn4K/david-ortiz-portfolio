import Link from 'next/link';
import { showcaseProjects } from '@/data/content';

export function ProjectsSection() {
  return (
    <section id="projects" className="bg-grid-light bg-[length:20px_20px] py-20 relative overflow-hidden">
       {/* Background glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-ink/60">Design Systems</p>
          <h2 className="text-3xl font-semibold text-ink">Website projects you can preview live</h2>
          <p className="text-sm text-ink/70">
            These Tailwind builds live under <span className="font-semibold">/projects</span>. Install them as starters or embed directly in pitches.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {showcaseProjects.map((project) => (
            <article key={project.title} className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl">
              <h3 className="text-xl font-semibold text-ink">{project.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/70">
                {project.metrics.map((metric) => (
                  <span key={metric} className="rounded-full border border-ink/10 px-3 py-1">
                    {metric}
                  </span>
                ))}
              </div>
              <Link
                href={project.href}
                target="_blank"
                className="mt-6 inline-flex items-center text-sm font-semibold text-accent transition-colors duration-300 hover:text-teal-600"
              >
                Launch demo →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
