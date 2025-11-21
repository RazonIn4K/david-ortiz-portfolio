import { Metadata } from 'next';
import Link from 'next/link';
import { ServicesSection } from '@/components/ServicesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { ResourcesSection } from '@/components/ResourcesSection';
import { CTASection } from '@/components/CTASection';
import { UPWORK_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Work With Me | David Ortiz AI Automation Studio',
  description:
    'Engagement details for AI automation sprints, chatbots, scraping pipelines, and AI security audits. Includes delivery process, resources, and CTAs.'
};

export default function WorkWithMePage() {
  return (
    <div className="bg-ink text-white">
      <section className="bg-gradient-to-b from-ink to-slate py-24 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Work With Me</p>
          <h1 className="mt-3 text-4xl font-semibold">
            Execution partner for{' '}
            <span className="bg-gradient-teal bg-clip-text text-transparent">
              AI automation
            </span>
            , chatbots, scraping, and security
          </h1>
          <p className="mt-4 text-sm text-white/80">
            Found me on Upwork?{' '}
            <a href="#work-process" className="underline">
              Here&apos;s how we&apos;ll work together
            </a>{' '}
            and how each sprint maps to my Project Catalog offerings.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/davidinfosec07"
              target="_blank"
              className="rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-400"
            >
              Book a discovery call
            </a>
            <a
              href={UPWORK_URL}
              target="_blank"
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5 hover:border-white/40"
            >
              Hire me on Upwork
            </a>
          </div>
          <p className="mt-4 text-xs text-white/70">
            Upwork catalog offers currently include Automation Sprint, Messaging Agent, Scraping Pipeline, and AI Security Audit.
          </p>
        </div>
      </section>
      <ServicesSection />
      <ProcessSection />
      <ResourcesSection />
      <CTASection />
    </div>
  );
}
