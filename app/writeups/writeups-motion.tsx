"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, ShieldCheck } from "lucide-react"

import {
  Reveal,
  SectionHeader,
  StaggerContainer,
  staggerItem,
} from "@/components/motion/site-motion"
import { SubpageNav, SubpageShell } from "@/components/motion/subpage-shell"
import type { WriteupMeta } from "@/lib/writeups"

export function WriteupsMotion({ writeups }: { writeups: WriteupMeta[] }) {
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <SubpageShell>
      <SubpageNav backHref="/" backLabel="Back to home" contactSubject="Writeup inquiry" />

      <motion.header
        ref={heroRef}
        className="dtz-subpage-hero"
        style={shouldReduceMotion ? {} : { y: heroY, opacity: heroOpacity }}
      >
        <div className="dtz-subpage-hero-atmosphere" aria-hidden="true">
          <Image
            src="/visuals/notes-atmosphere.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 960px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <Reveal>
          <p className="dtz-section-label">
            <span className="dtz-index-badge" aria-hidden="true">
              CTF
            </span>
            Writeups
          </p>
          <h1 className="mt-4">
            How I broke each challenge,
            <span className="dtz-hero-accent"> step by step.</span>
          </h1>
          <p className="dtz-section-lead mt-6">
            Selected Capture-the-Flag solves across privilege escalation, binary exploitation,
            cryptography, and log forensics. Each writeup focuses on the reasoning and the
            technique, not the answer.
          </p>
          <motion.div
            className="mt-6 flex items-start gap-3 rounded-2xl border p-4 text-sm dtz-glass-panel"
            style={{ borderColor: "var(--dtz-border)" }}
            whileHover={shouldReduceMotion ? {} : { y: -2 }}
          >
            <ShieldCheck
              className="mt-0.5 h-5 w-5 shrink-0"
              style={{ color: "var(--dtz-accent-2)" }}
              aria-hidden="true"
            />
            <p style={{ color: "var(--dtz-muted)" }}>
              Flag values, live hosts, and challenge-internal data are redacted. These are written
              to teach the method, not to hand over answers.
            </p>
          </motion.div>
        </Reveal>
      </motion.header>

      <div className="dtz-section-rule" aria-hidden="true" />

      <Reveal direction="up">
        <SectionHeader
          index="01"
          label="Archive"
          title="Technique-first notes from real challenges."
          lead="Pick a category, read the chain of reasoning, and see how each step was verified."
          align="left"
        />
      </Reveal>

      <StaggerContainer className="dtz-writeup-grid pb-16" staggerDelay={0.08}>
        {writeups.map((writeup) => (
          <motion.div key={writeup.slug} variants={staggerItem}>
            <Link
              href={`/writeups/${writeup.slug}`}
              className="group flex h-full flex-col rounded-3xl border p-6 dtz-card-interactive dtz-glass-panel"
              style={{ borderColor: "var(--dtz-border)" }}
            >
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
              </div>
              <h2 className="mt-4 text-xl font-bold leading-snug">{writeup.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                {writeup.summary}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs" style={{ color: "var(--dtz-subtle)" }}>
                  {writeup.competition}
                </span>
                <span
                  className="inline-flex items-center gap-1 text-sm font-semibold dtz-link-arrow"
                  style={{ color: "var(--dtz-accent)" }}
                >
                  Read
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </StaggerContainer>
    </SubpageShell>
  )
}
