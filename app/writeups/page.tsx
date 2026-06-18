import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from "lucide-react"

import { contact } from "@/data/content"
import { ThemeShell } from "@/components/theme-shell"
import { getAllWriteups } from "@/lib/writeups"

export const metadata: Metadata = {
  title: "CTF Writeups | David Ortiz",
  description:
    "Capture-the-Flag writeups by David Ortiz across binary exploitation, privilege escalation, cryptography, and log forensics. Flags redacted; technique-focused.",
  alternates: { canonical: "/writeups" },
  openGraph: {
    title: "CTF Writeups | David Ortiz",
    description:
      "Capture-the-Flag writeups across binary exploitation, privilege escalation, cryptography, and log forensics.",
    url: "/writeups",
    type: "website",
  },
}

const panelStyle = {
  borderColor: "var(--dtz-border)",
  background: "var(--dtz-panel)",
} as const
const mutedText = { color: "var(--dtz-muted)" } as const
const primaryCtaStyle = {
  background: "var(--dtz-accent)",
  color: "var(--dtz-on-accent)",
} as const
const chipStyle = {
  background: "var(--dtz-accent-soft)",
  color: "var(--dtz-accent)",
} as const

export default function WriteupsPage() {
  const writeups = getAllWriteups()

  return (
    <ThemeShell>
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <nav className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
              style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
              style={primaryCtaStyle}
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact David
            </a>
          </nav>

          <section className="py-12">
            <p className="dtz-section-label">CTF Writeups</p>
            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-5xl">
              How I broke each challenge, step by step.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={mutedText}>
              Selected Capture-the-Flag solves across privilege escalation, binary exploitation,
              cryptography, and log forensics. Each writeup focuses on the reasoning and the
              technique, not the answer.
            </p>
            <div
              className="mt-6 flex items-start gap-3 rounded-2xl border p-4 text-sm"
              style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-accent-soft)" }}
            >
              <ShieldCheck
                className="mt-0.5 h-5 w-5 shrink-0"
                style={{ color: "var(--dtz-accent)" }}
                aria-hidden="true"
              />
              <p style={mutedText}>
                Flag values, live hosts, and challenge-internal data are redacted. These are written
                to teach the method, not to hand over answers.
              </p>
            </div>
          </section>

          <section className="grid gap-5 pb-16 md:grid-cols-2">
            {writeups.map((writeup) => (
              <Link
                key={writeup.slug}
                href={`/writeups/${writeup.slug}`}
                className="group flex flex-col rounded-3xl border p-6 transition-transform hover:scale-[1.01]"
                style={panelStyle}
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="rounded-full px-3 py-1" style={chipStyle}>
                    {writeup.category}
                  </span>
                  {writeup.difficulty ? (
                    <span
                      className="rounded-full border px-3 py-1"
                      style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
                    >
                      {writeup.difficulty}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-4 text-xl font-bold leading-snug">{writeup.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed" style={mutedText}>
                  {writeup.summary}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--dtz-subtle)" }}>
                    {writeup.competition}
                  </span>
                  <span
                    className="inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: "var(--dtz-accent)" }}
                  >
                    Read
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </section>
        </div>
      </main>
    </ThemeShell>
  )
}
