import { processSteps } from '@/data/content';

export function ProcessSection() {
  return (
    <section className="bg-slate-900 py-20 text-white" id="work-process">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Delivery Process</p>
          <h2 className="text-3xl font-semibold">Four steps from idea to documented automation</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <article key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Step {index + 1}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm text-white/70">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
