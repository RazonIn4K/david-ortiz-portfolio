"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  Mail,
  Sparkles,
} from "lucide-react"

import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/brand-icons"
import {
  followWorkLinks,
  hireMeLinks,
  quickReachLinks,
  type ContactLink,
} from "@/lib/contact-links"
import { personalSitePublicLabel } from "@/lib/site-config"
import { ThemeShell } from "@/components/theme-shell"
import { ProtectedEmailLink } from "@/components/contact/protected-email-link"
import {
  Reveal,
  ScrollProgress,
  StaggerContainer,
  staggerItem,
} from "@/components/motion/site-motion"

function iconFor(link: ContactLink) {
  const props = { className: "h-4 w-4", "aria-hidden": true } as const
  switch (link.id) {
    case "email":
      return <Mail {...props} />
    case "calendly":
      return <CalendarDays {...props} />
    case "upwork":
    case "fiverr":
    case "high-encode":
    case "business-inbox":
      return <BriefcaseBusiness {...props} />
    case "facebook":
      return <FacebookIcon {...props} />
    case "instagram":
      return <InstagramIcon {...props} />
    case "linkedin":
      return <LinkedinIcon {...props} />
    case "github":
      return <GithubIcon {...props} />
    default:
      return <ExternalLink {...props} />
  }
}

function isExternal(href: string) {
  return href.startsWith("http")
}

function ContactTile({ link }: { link: ContactLink }) {
  const shouldReduceMotion = useReducedMotion()

  const body = (
    <>
      <motion.span
        className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl dtz-icon-bounce"
        style={{ background: "var(--dtz-accent-soft)", color: "var(--dtz-accent)" }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -5 }}
      >
        {iconFor(link)}
      </motion.span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--dtz-fg)" }}>
          {link.label}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            style={{ color: "var(--dtz-subtle)" }}
            aria-hidden="true"
          />
        </span>
        <span className="mt-1 block text-xs leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
          {link.description}
        </span>
      </span>
    </>
  )

  const tileClass = "group flex items-start gap-3 rounded-2xl border px-4 py-4 dtz-card-interactive"
  const tileStyle = {
    borderColor: "var(--dtz-border)",
    background: "var(--dtz-panel-2)",
  }

  const MotionWrapper = motion.div

  return (
    <MotionWrapper
      variants={staggerItem}
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {link.id === "email" ? (
        <ProtectedEmailLink
          className={tileClass}
          style={tileStyle}
          subject="Inquiry from contact page"
        >
          {body}
        </ProtectedEmailLink>
      ) : (
        <a
          href={link.href}
          target={isExternal(link.href) ? "_blank" : undefined}
          rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
          className={tileClass}
          style={tileStyle}
        >
          {body}
        </a>
      )}
    </MotionWrapper>
  )
}

export function ContactPageClient() {
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 50])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const groups = [
    {
      heading: "Quick reach",
      intro: "Best if you want the shortest path to a real conversation.",
      links: quickReachLinks,
      icon: Mail,
    },
    {
      heading: "Hire me",
      intro: "Best if you already know this is a project, engagement, or freelance conversation.",
      links: hireMeLinks,
      icon: BriefcaseBusiness,
    },
    {
      heading: "Follow the work",
      intro: "Best if you want to inspect the actual code, experiments, and project follow-through.",
      links: followWorkLinks,
      icon: Sparkles,
    },
  ]

  return (
    <ThemeShell>
      <ScrollProgress />
      <main className="dtz-contact-page">
        <div className="dtz-contact-shell">
          <motion.div
            ref={heroRef}
            className="dtz-contact-hero mb-14 max-w-3xl"
            style={shouldReduceMotion ? {} : { y: heroY, opacity: heroOpacity }}
          >
            <motion.p
              className="dtz-section-label dtz-float-badge"
              style={{ display: "inline-block" }}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Contact
            </motion.p>
            <motion.h1
              className="mt-4"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={shouldReduceMotion ? "" : "dtz-text-shimmer"}>
                Direct path to David,
              </span>
              <br />
              without the guesswork
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-relaxed md:text-xl"
              style={{ color: "var(--dtz-muted)" }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              {personalSitePublicLabel} stays personal, experimental, and reflective. This page is the shareable contact hub:
              the fastest confirmed ways to email, book time, start a freelance conversation, or move into a scoped business discussion.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 15 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <motion.span
                className="rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] dtz-tag-pop"
                style={{
                  borderColor: "var(--dtz-border)",
                  background: "var(--dtz-accent-soft)",
                  color: "var(--dtz-accent)",
                }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              >
                English + Español welcome
              </motion.span>
              <motion.div whileHover={shouldReduceMotion ? {} : { x: -4 }}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors dtz-button-glow"
                  style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
                >
                  <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
                  Back to home
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="dtz-section-rule" aria-hidden="true" />

          <div className="dtz-contact-groups">
            {groups.map((group, groupIndex) => {
              const Icon = group.icon
              return (
                <Reveal key={group.heading} delay={groupIndex * 0.1} direction="up">
                  <motion.section
                    className="dtz-contact-group-card dtz-glass-panel"
                    whileHover={shouldReduceMotion ? {} : { y: -4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="dtz-section-label">{group.heading}</p>
                      <motion.span
                        className="flex h-10 w-10 items-center justify-center rounded-xl"
                        style={{ background: "var(--dtz-accent-soft)", color: "var(--dtz-accent)" }}
                        whileHover={shouldReduceMotion ? {} : { rotate: 10, scale: 1.1 }}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </motion.span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                      {group.intro}
                    </p>

                    <StaggerContainer className="mt-6 space-y-3" staggerDelay={0.08}>
                      {group.links.map((link) => (
                        <ContactTile key={link.id} link={link} />
                      ))}
                    </StaggerContainer>
                  </motion.section>
                </Reveal>
              )
            })}
          </div>

          <div className="dtz-section-rule mt-10" aria-hidden="true" />

          <Reveal delay={0.3} direction="up">
            <motion.div
              className="mt-8 rounded-3xl border px-6 py-6 md:py-8 dtz-cta-ring dtz-overhaul-contact"
              style={{ borderColor: "var(--dtz-border)" }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.005 }}
            >
                <p className="text-base font-bold md:text-lg" style={{ color: "var(--dtz-fg)" }}>
                  Prefer a structured intake?
                </p>
                <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                  I keep the first message short on purpose. If this is a real project, send scope and timeline so I can
                  respond quickly with realistic next steps.
                </p>
                <motion.div
                  className="mt-5 inline-block"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  <ProtectedEmailLink
                    className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold dtz-button-glow"
                    style={{ background: "var(--dtz-accent)", color: "var(--dtz-on-accent)" }}
                    subject="Project inquiry"
                  >
                    Start a project via email
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </ProtectedEmailLink>
                </motion.div>
            </motion.div>
          </Reveal>
        </div>
      </main>
    </ThemeShell>
  )
}
