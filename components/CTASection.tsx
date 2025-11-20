import Link from 'next/link';
import { UPWORK_URL } from '@/lib/constants';

export function CTASection() {
  return (
    <section className="bg-navy py-20 lg:py-28" id="contact">
      <div className="mx-auto max-w-4xl px-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-12 text-center backdrop-blur-sm lg:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">Next Steps</p>
          <h2 className="mt-3 text-4xl font-bold text-white lg:text-5xl">Ready to unblock your automation backlog?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 lg:text-lg">
            Tell me what you&apos;re trying to fix, and I&apos;ll map it live. You get the blueprint, build, monitoring, and handoff without chasing contractors.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="https://calendly.com/davidinfosec07"
              target="_blank"
              className="rounded-lg bg-teal-500 px-8 py-4 text-base font-semibold text-white transition hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/30"
            >
              Book a call
            </Link>
            <Link
              href="mailto:david@cs-learning.me"
              className="rounded-lg border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
            >
              david@cs-learning.me
            </Link>
          </div>
          <p className="mt-6 text-xs text-white/60">
            Prefer Upwork escrow? Grab a catalog slot here:{' '}
            <Link href={UPWORK_URL} target="_blank" className="text-teal-400 underline transition hover:text-teal-300">
              Upwork Project Catalog
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
