import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ShieldCheck } from "lucide-react"

import { ThemeShell } from "@/components/theme-shell"
import { WriteupContent } from "@/components/writeup-content"
import { getWriteup, getWriteupSlugs } from "@/lib/writeups"

export const dynamicParams = false

export function generateStaticParams() {
  return getWriteupSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const writeup = getWriteup(slug)
  if (!writeup) return { title: "Writeup not found | David Ortiz" }

  return {
    title: `${writeup.title} | CTF Writeup`,
    description: writeup.summary,
    alternates: { canonical: `/writeups/${slug}` },
    openGraph: {
      title: `${writeup.title} | CTF Writeup`,
      description: writeup.summary,
      url: `/writeups/${slug}`,
      type: "article",
    },
  }
}

const mutedText = { color: "var(--dtz-muted)" } as const
const chipStyle = {
  background: "var(--dtz-accent-soft)",
  color: "var(--dtz-accent)",
} as const

export default async function WriteupPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const writeup = getWriteup(slug)
  if (!writeup) notFound()

  return (
    <ThemeShell>
      <main className="min-h-screen px-6 py-12">
        <article className="mx-auto max-w-3xl">
          <nav className="flex items-center justify-between gap-4">
            <Link
              href="/writeups"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
              style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All writeups
            </Link>
          </nav>

          <header className="py-10">
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
              <span className="rounded-full border px-3 py-1" style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}>
                {writeup.competition}
              </span>
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">{writeup.title}</h1>
            <p className="mt-4 text-lg leading-relaxed" style={mutedText}>
              {writeup.summary}
            </p>
          </header>

          <WriteupContent content={writeup.content} />

          <footer
            className="mt-12 flex items-start gap-3 rounded-2xl border p-4 text-sm"
            style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-panel)" }}
          >
            <ShieldCheck
              className="mt-0.5 h-5 w-5 shrink-0"
              style={{ color: "var(--dtz-accent)" }}
              aria-hidden="true"
            />
            <p style={mutedText}>
              Flag values, live hosts, and challenge-internal data are intentionally redacted.
              Written to share method and reasoning, in line with competition rules of engagement.
            </p>
          </footer>
        </article>
      </main>
    </ThemeShell>
  )
}
