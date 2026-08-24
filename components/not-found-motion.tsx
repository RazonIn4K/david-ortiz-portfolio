"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { ProtectedEmailLink } from "@/components/contact/protected-email-link"
import { Reveal } from "@/components/motion/site-motion"
import { SubpageShell } from "@/components/motion/subpage-shell"

export function NotFoundMotion() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <SubpageShell className="flex min-h-screen items-center">
      <div className="dtz-subpage-inner w-full py-8">
        <Reveal direction="up">
          <motion.div
            className="dtz-not-found-card dtz-glass-panel"
            style={{ borderColor: "var(--dtz-border)" }}
            whileHover={shouldReduceMotion ? {} : { y: -4 }}
          >
            <div className="dtz-not-found-badge" aria-hidden="true">
              404
            </div>

            <h1
              className="mt-6 text-2xl font-bold md:text-3xl"
              style={{
                fontFamily: "var(--font-display), var(--font-geist-sans), Georgia, serif",
                color: "var(--dtz-fg)",
              }}
            >
              Page not found
            </h1>

            <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold dtz-button-glow"
                style={{ background: "var(--dtz-accent)", color: "var(--dtz-on-accent)" }}
              >
                Go home
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/#notes"
                className="inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition-colors dtz-button-glow"
                style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
              >
                Current focus
              </Link>
            </div>

            <p className="mt-8 text-sm" style={{ color: "var(--dtz-muted)" }}>
              Looking for something specific?{" "}
              <ProtectedEmailLink
                subject="Site inquiry"
                className="font-semibold dtz-link-arrow"
                style={{ color: "var(--dtz-accent)" }}
              >
                Email David
              </ProtectedEmailLink>
            </p>
          </motion.div>
        </Reveal>
      </div>
    </SubpageShell>
  )
}
