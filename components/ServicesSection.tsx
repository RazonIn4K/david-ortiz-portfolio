import Link from 'next/link';
import { services } from '@/data/content';

export function ServicesSection() {
  return (
    <section id="services" className="bg-ink py-24 relative overflow-hidden">
       {/* Background glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-teal/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal mb-4">Services</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Automation retainers built for <br className="hidden md:block" />
            founders, agencies, and small businesses
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition duration-300 hover:border-teal/30 hover:bg-white/10">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-2xl border border-teal/20 group-hover:scale-110 transition duration-300">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal transition-colors">
                {service.title}
              </h3>

              <p className="text-sm text-white/60 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-white/80">
                    <svg className="mt-1 h-4 w-4 min-w-[16px] text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={service.cta.href}
                target="_blank"
                className="mt-auto block w-full rounded-xl border border-white/20 bg-white/5 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal hover:border-teal hover:text-ink"
              >
                {service.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
