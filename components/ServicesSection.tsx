import Link from 'next/link';
import { services } from '@/data/content';

export function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm uppercase tracking-[0.3em] text-ink/60">Offerings</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">Automation retainers built for founders, agencies, and small businesses</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="rounded-3xl border border-slate/10 bg-slate-50 p-8 shadow-sm">
              <div className="text-3xl">{service.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-ink">{service.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{service.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink/80">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 h-1 w-1 rounded-full bg-ink"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              {service.links && (
                <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-accent">
                  {service.links.map((link) => (
                    <Link key={link.href} href={link.href} target="_blank" className="underline">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
