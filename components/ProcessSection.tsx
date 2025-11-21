import { processSteps } from '@/data/content';

export function ProcessSection() {
  return (
    <section className="bg-[#050d15] py-24" id="work-process">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal mb-4">Delivery Process</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">From chaos to clarity in 4 steps</h2>
        </div>

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-teal/0 via-teal/30 to-teal/0" />

          <div className="grid gap-8 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative group">
                {/* Step Number Bubble */}
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#050d15] bg-slate shadow-[0_0_30px_rgba(20,184,166,0.1)] relative z-10 group-hover:scale-110 transition duration-300">
                   <span className="text-2xl font-bold text-white/30 group-hover:text-teal transition-colors">0{index + 1}</span>
                   <div className="absolute inset-0 rounded-full border border-white/10" />
                </div>

                <div className="text-center relative px-4">
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connector */}
                {index !== processSteps.length - 1 && (
                  <div className="md:hidden absolute left-1/2 bottom-[-32px] w-0.5 h-8 bg-white/10 -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
