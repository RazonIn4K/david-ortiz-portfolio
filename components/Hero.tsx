import Link from 'next/link';
import { UPWORK_URL } from '@/lib/constants';

export function Hero() {
  return (
    <section className="bg-gradient-to-b from-ink via-slate to-ink py-20 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 lg:flex-row">
        <div className="flex-1">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">AI Automation &amp; Chatbot Consultant</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
            Ship AI automations that save hours without adding headcount.
          </h1>
          <p className="mt-6 text-lg text-white/80">
            I build Typeform → Zapier → Notion systems, GPT-4o chatbots, scraping pipelines, and AI security guardrails so
            founders, agencies, and small teams can scale calmly.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="https://calendly.com/davidinfosec07"
              target="_blank"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
            >
              Book a discovery call
            </Link>
            <Link
              href="/work-with-me"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              See how I work
            </Link>
            <Link
              href="/case-studies"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:text-white"
            >
              Read case studies
            </Link>
          </div>
          <p className="mt-3 text-xs text-white/70">
            Prefer packaged pricing? Book the Automation or Chatbot sprint via my{' '}
            <Link href={UPWORK_URL} target="_blank" className="underline">
              Upwork Project Catalog
            </Link>
            .
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal">In one sprint you get</p>
          <ul className="space-y-3">
            <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Live discovery + blueprint</p>
              <p className="text-sm text-white/70">We map every trigger, SLA, and handoff before lines of code.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Build + monitoring</p>
              <p className="text-sm text-white/70">Automations ship with guardrails, alerts, and staging demos.</p>
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-white">Handoff + SOPs</p>
              <p className="text-sm text-white/70">Looms, docs, and light retainers keep your ops team in control.</p>
            </li>
          </ul>
          <p className="text-xs text-white/60">
            Found me on Upwork? <Link href="/work-with-me#work-process" className="underline">Here&apos;s how we&apos;ll work together.</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
