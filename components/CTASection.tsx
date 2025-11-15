import Link from 'next/link';
import { UPWORK_URL } from '@/lib/constants';

export function CTASection() {
  return (
    <section className="bg-white py-20" id="contact">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate/10 bg-slate-50 px-6 py-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-ink/60">Next Steps</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">Ready to unblock your automation backlog?</h2>
        <p className="mt-4 text-sm text-ink/70">
          Tell me what you&apos;re trying to fix, and I&apos;ll map it live. You get the blueprint, build, monitoring, and handoff without
          chasing contractors.
          chasing contractors.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="https://calendly.com/davidinfosec07"
            target="_blank"
            className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
          >
            Book a call
          </Link>
          <Link
            href="mailto:david@cs-learning.me"
            className="rounded-full border border-ink/10 px-6 py-3 text-sm font-semibold text-ink"
          >
            david@cs-learning.me
          </Link>
        </div>
        <p className="mt-4 text-xs text-ink/60">
          Prefer Upwork escrow? Grab a catalog slot here:{' '}
          <Link href={UPWORK_URL} target="_blank" className="text-accent underline">
            Upwork Project Catalog
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
