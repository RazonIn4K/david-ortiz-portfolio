"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ShieldCheck } from "lucide-react"

import { WriteupContent } from "@/components/writeup-content"
import { Reveal } from "@/components/motion/site-motion"
import { SubpageNav, SubpageShell } from "@/components/motion/subpage-shell"
import type { Writeup } from "@/lib/writeups"

export function WriteupDetailMotion({ writeup }: { writeup: Writeup }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <SubpageShell className="dtz-subpage-article">
      <SubpageNav backHref="/writeups" backLabel="All writeups" contactSubject="Writeup inquiry" />

      <Reveal direction="up">
        <header className="dtz-subpage-hero dtz-subpage-hero-compact">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span
              className="rounded-full px-3 py-1"
              style={{ background: "var(--dtz-accent-soft)", color: "var(--dtz-accent-2)" }}
            >
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
            <span
              className="rounded-full border px-3 py-1"
              style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
            >
              {writeup.competition}
            </span>
          </div>
          <h1 className="mt-5">{writeup.title}</h1>
          <p className="dtz-section-lead mt-4">{writeup.summary}</p>
        </header>
      </Reveal>

      <div className="dtz-section-rule" aria-hidden="true" />

      <Reveal direction="up" delay={0.05}>
        <div
          className="rounded-3xl border p-6 md:p-8 dtz-glass-panel"
          style={{ borderColor: "var(--dtz-border)" }}
        >
          <WriteupContent content={writeup.content} />
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.1}>
        <motion.footer
          className="mt-10 flex items-start gap-3 rounded-2xl border p-4 text-sm dtz-glass-panel"
          style={{ borderColor: "var(--dtz-border)" }}
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
        >
          <ShieldCheck
            className="mt-0.5 h-5 w-5 shrink-0"
            style={{ color: "var(--dtz-accent-2)" }}
            aria-hidden="true"
          />
          <p style={{ color: "var(--dtz-muted)" }}>
            Flag values, live hosts, and challenge-internal data are intentionally redacted.
            Written to share method and reasoning, in line with competition rules of engagement.
          </p>
        </motion.footer>
      </Reveal>
    </SubpageShell>
  )
}
