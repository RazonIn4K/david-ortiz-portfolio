import Link from 'next/link';
import { services } from '@/data/content';
import { GlassmorphismCard } from '@/components/ui/GlassmorphismCard';

export function ServicesSection() {
  return (
    <section id="services" className="bg-navy-dark py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">Offerings</p>
          <h2 className="mt-3 text-4xl font-bold text-white lg:text-5xl">
            How we automate your operations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">
            Four core solutions to eliminate manual work and scale your team without adding headcount
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((service) => (
            <GlassmorphismCard
              key={service.title}
              hover={true}
              className="group p-8"
            >
              <div className="text-4xl">{service.icon}</div>
              <h3 className="mt-4 text-2xl font-bold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{service.description}</p>

              <ul className="mt-6 space-y-3 text-sm text-white/80">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-teal-400"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-white/10 pt-6">
                <Link
                  href={service.cta.href}
                  target="_blank"
                  className="inline-flex items-center text-sm font-semibold text-teal-400 transition-colors duration-300 hover:text-teal-300"
                >
                  {service.cta.label} →
                </Link>
              </div>
            </GlassmorphismCard>
          ))}
        </div>
      </div>
    </section>
  );
}
