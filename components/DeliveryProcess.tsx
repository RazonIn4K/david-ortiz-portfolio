import { processSteps } from '@/data/content';

export function DeliveryProcess() {
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">Our Process</p>
          <h2 className="mt-3 text-4xl font-bold text-white lg:text-5xl">
            From discovery to handoff in 4 steps
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Transparent, predictable delivery with monitoring baked in from day one
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector Arrow - Only show between steps, not after last one */}
              {index < processSteps.length - 1 && (
                <div className="absolute left-1/2 top-12 hidden h-0.5 w-full bg-gradient-to-r from-teal-400/50 to-cyan-400/50 lg:block">
                  <div className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-4 border-l-8 border-y-transparent border-l-cyan-400/50"></div>
                </div>
              )}

              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                {/* Step Number Badge */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-cyan-400 text-xl font-bold text-navy">
                  {index + 1}
                </div>

                <h3 className="text-xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Timeline for Mobile */}
        <div className="mt-8 flex items-center justify-center gap-2 lg:hidden">
          {processSteps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-teal-400"></div>
              {index < processSteps.length - 1 && <div className="h-0.5 w-8 bg-teal-400/30"></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
