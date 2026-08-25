"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, Mail } from "lucide-react"

import { ProtectedEmailLink } from "@/components/contact/protected-email-link"
import { ScrollProgress } from "@/components/motion/site-motion"

interface SubpageNavProps {
  backHref: string
  backLabel: string
  contactSubject?: string
}

export function SubpageNav({ backHref, backLabel, contactSubject = "Inquiry from davidtiz.com" }: SubpageNavProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.nav
      className="flex flex-wrap items-center justify-between gap-4"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -16 }}
      animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <motion.div whileHover={shouldReduceMotion ? {} : { x: -4 }}>
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors dtz-button-glow"
          style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </Link>
      </motion.div>
      <ProtectedEmailLink
        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold dtz-button-glow"
        style={{ background: "var(--dtz-accent)", color: "var(--dtz-on-accent)" }}
        subject={contactSubject}
      >
        <Mail className="h-4 w-4" aria-hidden="true" />
        Contact David
      </ProtectedEmailLink>
    </motion.nav>
  )
}

export function SubpageShell({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`dtz-subpage ${className}`.trim()}>
      <ScrollProgress />
      <div className="dtz-subpage-inner">{children}</div>
    </div>
  )
}
