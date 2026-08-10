import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileText,
  Mail,
  ShieldCheck,
} from "lucide-react"

import { ThemeShell } from "@/components/theme-shell"
import { contact } from "@/data/content"
import { homeProofRecords } from "@/data/home-content"

export const metadata: Metadata = {
  title: "Hernandez Landscape Decision Record | David Ortiz",
  description:
    "David Ortiz's personal decision record for a local-business web interface, with checked-in captures and explicit limits on unverified behavior.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Hernandez Landscape Decision Record | David Ortiz",
    description:
      "A personal decision record with local captures separated from unverified route behavior, authorship, permission, and outcomes.",
    url: "/portfolio",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Hernandez Landscape Decision Record | David Ortiz",
    description:
      "A checked-in personal decision record with explicit evidence limits.",
  },
}

function getPortfolioProof() {
  const record = homeProofRecords.find((candidate) => candidate.id === "hernandez-landscape")
  if (!record) throw new Error("The Hernandez Landscape proof record is required")
  return record
}

const portfolioProof = getPortfolioProof()

const recordFields = [
  {
    label: "Problem",
    value: portfolioProof.problem,
  },
  {
    label: "My role",
    value: portfolioProof.role,
  },
  {
    label: "Decision",
    value: portfolioProof.decision,
  },
  {
    label: "Tradeoff",
    value: portfolioProof.tradeoff,
  },
] as const

const implementationObservations = [
  "The landing capture shows an English hero, service, work, and video navigation, an EN/ES control, and quote and call actions.",
  "The trust-section capture shows a displayed public-review card, a service-standard checklist, and a quote prompt at the saved checkpoint.",
  "The retained project image provides visual context only; it does not establish authorship, permission, or an outcome.",
] as const

const evidenceCaptures = [
  {
    title: "Saved interface capture",
    description:
      "A checked-in screenshot preserves the page composition used when this portfolio record was assembled.",
    src: "/portfolio/hernandez/site-screenshot.png",
    alt: "Saved interface capture for the Hernandez Landscape portfolio record",
    width: 1440,
    height: 1000,
    className: "aspect-[16/11] w-full object-cover object-top",
  },
  {
    title: "Saved trust-section capture",
    description:
      "A second checked-in capture records how the trust section was presented at the source checkpoint.",
    src: "/portfolio/hernandez/site-trust-screenshot.png",
    alt: "Saved trust-section capture for the Hernandez Landscape portfolio record",
    width: 1440,
    height: 729,
    className: "aspect-[16/10] w-full object-cover object-top",
  },
  {
    title: "Retained project image",
    description:
      "The project image remains with the local evidence set so the visual context is inspectable without relying on another site.",
    src: "/portfolio/hernandez/landscape-work-hero.jpeg",
    alt: "Project image retained with the Hernandez Landscape portfolio record",
    width: 1600,
    height: 1000,
    className: "aspect-[16/10] w-full object-cover",
  },
] as const

const panelStyle = {
  borderColor: "var(--dtz-border)",
  background: "var(--dtz-panel)",
} as const
const panelDeepStyle = {
  borderColor: "var(--dtz-border)",
  background: "var(--dtz-panel-2)",
} as const
const mutedText = { color: "var(--dtz-muted)" } as const
const primaryCtaStyle = {
  background: "var(--dtz-accent)",
  color: "var(--dtz-on-accent)",
} as const

export default function PortfolioPage() {
  return (
    <ThemeShell>
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-6xl">
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

          <section className="grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="dtz-section-label">Selected work · {portfolioProof.sequence}</p>
              <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
                {portfolioProof.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed" style={mutedText}>
                A personal proof record about the decisions behind one customer path. The purpose
                here is to make my role, reasoning, constraint, and local evidence inspectable.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#record"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold"
                  style={primaryCtaStyle}
                >
                  Inspect the record
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#evidence"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-3 font-semibold"
                  style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
                >
                  View checked-in evidence
                  <FileText className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div
              className="rounded-3xl border p-4"
              style={{ ...panelStyle, boxShadow: "var(--dtz-shadow)" }}
            >
              <Image
                src="/portfolio/hernandez/site-screenshot.png"
                alt="Saved interface capture for the Hernandez Landscape portfolio record"
                width={1440}
                height={1000}
                className="h-auto w-full rounded-2xl border"
                style={{ borderColor: "var(--dtz-border)" }}
                priority
              />
            </div>
          </section>

          <section id="record" className="scroll-mt-24 pb-16" aria-labelledby="record-heading">
            <div className="max-w-3xl">
              <p className="dtz-section-label">Decision record</p>
              <h2 id="record-heading" className="mt-4 text-3xl font-bold md:text-4xl">
                What I was responsible for, and why I chose this path
              </h2>
            </div>
            <dl className="mt-8 grid gap-5 md:grid-cols-2">
              {recordFields.map((field) => (
                <div key={field.label} className="rounded-3xl border p-6" style={panelStyle}>
                  <dt className="dtz-section-label">{field.label}</dt>
                  <dd className="mt-4 leading-relaxed" style={mutedText}>
                    {field.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="grid gap-6 pb-16 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-3xl border p-6 md:p-8" style={panelStyle}>
              <p className="dtz-section-label">Evidence status</p>
              <div className="mt-5 flex items-start gap-3">
                <ShieldCheck
                  className="mt-0.5 h-6 w-6 shrink-0"
                  style={{ color: "var(--dtz-accent)" }}
                  aria-hidden="true"
                />
                <div>
                  <h2 className="text-xl font-semibold">{portfolioProof.evidence.status}</h2>
                  <p className="mt-2 text-sm leading-relaxed" style={mutedText}>
                    {portfolioProof.evidence.note}
                  </p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border p-4" style={panelDeepStyle}>
                <p className="text-sm leading-relaxed" style={mutedText}>
                  The problem, role, decision, and tradeoff are David&apos;s recorded account. The
                  images support only the visual observations stated here. They do not verify route
                  behavior, authorship, permission, hosted state, form delivery, or outcomes.
                </p>
              </div>
            </article>

            <article className="rounded-3xl border p-6 md:p-8" style={panelStyle}>
              <p className="dtz-section-label">Recorded observations</p>
              <h2 className="mt-4 text-2xl font-bold">What the local captures show</h2>
              <div className="mt-6 space-y-4">
                {implementationObservations.map((observation) => (
                  <div key={observation} className="flex gap-3">
                    <CheckCircle2
                      className="mt-1 h-4 w-4 shrink-0"
                      style={{ color: "var(--dtz-accent)" }}
                      aria-hidden="true"
                    />
                    <p className="text-sm leading-relaxed" style={mutedText}>
                      {observation}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section id="evidence" className="scroll-mt-24 pb-16" aria-labelledby="evidence-heading">
            <div className="max-w-3xl">
              <p className="dtz-section-label">Checked-in evidence</p>
              <h2 id="evidence-heading" className="mt-4 text-3xl font-bold md:text-4xl">
                Local captures, separated from current hosted claims
              </h2>
              <p className="mt-4 leading-relaxed" style={mutedText}>
                These assets preserve what was reviewed for this record. They are evidence of the
                saved portfolio checkpoint, not a claim about another site today.
              </p>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {evidenceCaptures.map((capture) => (
                <article key={capture.src} className="overflow-hidden rounded-3xl border" style={panelStyle}>
                  <Image
                    src={capture.src}
                    alt={capture.alt}
                    width={capture.width}
                    height={capture.height}
                    className={capture.className}
                  />
                  <div className="p-6">
                    <h3 className="text-lg font-semibold">{capture.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={mutedText}>
                      {capture.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="pb-12">
            <div
              className="flex flex-col gap-5 rounded-3xl border p-6 md:flex-row md:items-center md:justify-between md:p-8"
              style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-accent-soft)" }}
            >
              <div>
                <p className="dtz-section-label">Continue</p>
                <h2 className="mt-3 text-2xl font-bold">Return to the broader personal record</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={mutedText}>
                  The homepage connects this record to my security writeups, operating notes, and
                  the way I document technical decisions.
                </p>
              </div>
              <Link
                href="/#work"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold"
                style={primaryCtaStyle}
              >
                Back to selected work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </ThemeShell>
  )
}
