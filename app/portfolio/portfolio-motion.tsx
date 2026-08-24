"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  MousePointerClick,
  Quote,
  Star,
} from "lucide-react"

import { businessSiteUrl } from "@/lib/site-config"
import { ProtectedEmailLink } from "@/components/contact/protected-email-link"

const highlights = [
  "Bilingual English and Spanish paths",
  "Instant estimator that pre-fills the full quote request (address, owner confirmation, callback time, service, and estimate range) into the lead form",
  "Service pages for lawn care, tree service, landscaping, and snow removal",
  "Project gallery, sourced public review, and local service-area content",
]

const packageExamples = [
  {
    title: "Website launch",
    description:
      "Mobile-first service site with calls, quote forms, gallery sections, and local SEO basics.",
  },
  {
    title: "Local growth",
    description:
      "Website plus Google Maps, social proof, follow-up flow, and lead generation setup.",
  },
  {
    title: "Ongoing care",
    description:
      "Monthly updates, seasonal service changes, tracking, and campaign support.",
  },
]

const referenceLinks = [
  {
    title: "Live landscaping website",
    description:
      "The Hernandez site lets visitors inspect the finished landscaping example in its live form.",
    href: "https://hernandezlandscapeservices.com",
    icon: MapPin,
  },
  {
    title: "Services and work page",
    description:
      "A broader work page with supporting local-business examples and delivery context.",
    href: `${businessSiteUrl}/work`,
    icon: ExternalLink,
  },
  {
    title: "Hernandez case note",
    description:
      "Detailed breakdown of bilingual copy, service structure, trust signals, and quote capture.",
    href: `${businessSiteUrl}/projects/hernandez-landscape-local-business-site`,
    icon: FileText,
  },
]

const stackSignals = [
  "HTML, CSS, and JavaScript",
  "Vanilla bilingual i18n",
  "Web3Forms lead capture",
  "Estimator and service-to-quote prefill",
  "Responsive service-card layout",
  "Local SEO and service-area copy",
]

const liveProofUpdates = [
  {
    title: "Sourced review links",
    description:
      "The Hernandez trust section now references a public review instead of generic placeholder testimonials.",
    icon: Star,
  },
  {
    title: "Estimate-to-form handoff",
    description:
      "After the instant estimate, a Send My Estimate Request button now pre-fills the quote form with the address, owner confirmation, callback time, service, and estimate summary, in English and Spanish.",
    icon: MousePointerClick,
  },
  {
    title: "Aligned reference links",
    description:
      "This page, the services page, and the case note now point to the same current live example.",
    icon: Quote,
  },
]

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "scale"
}

function Reveal({ children, className = "", delay = 0, direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  }

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

function StaggerContainer({ children, className = "", staggerDelay = 0.08 }: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) return null

  return (
    <motion.div
      className="dtz-scroll-progress"
      style={{ scaleX }}
    />
  )
}

export function PortfolioMotion() {
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="min-h-screen px-6 py-12">
      <ScrollProgress />
      <div className="mx-auto max-w-7xl">
        <motion.nav
          className="flex flex-wrap items-center justify-between gap-4"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -20 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div whileHover={shouldReduceMotion ? {} : { x: -4 }}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors dtz-button-glow"
              style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
          </motion.div>
          <ProtectedEmailLink
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold dtz-button-glow"
            style={{ background: "var(--dtz-accent)", color: "var(--dtz-on-accent)" }}
            subject="Project inquiry from portfolio"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Contact David
          </ProtectedEmailLink>
        </motion.nav>

        <motion.section
          ref={heroRef}
          className="grid gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
          style={shouldReduceMotion ? {} : { y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              className="dtz-section-label dtz-float-badge"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: "inline-block" }}
            >
              Portfolio
            </motion.p>
            <motion.h1
              className="mt-5 text-4xl font-bold leading-tight md:text-6xl"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={shouldReduceMotion ? "" : "dtz-text-shimmer"}>
                Real local-business work,
              </span>
              <br />
              starting with Hernandez Landscape
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-lg leading-relaxed"
              style={{ color: "var(--dtz-muted)" }}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              This page gives visitors a direct reference point. Hernandez
              Landscape & Tree Service is a live landscaping website with
              bilingual content, service positioning, project photos, and a
              quote flow built around local customer calls, sourced trust
              signals, and estimate requests that carry straight into the
              contact form.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col gap-4 sm:flex-row"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <motion.a
                href="https://hernandezlandscapeservices.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold dtz-button-glow"
                style={{ background: "var(--dtz-accent)", color: "var(--dtz-on-accent)" }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                View live Hernandez site
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </motion.a>
              <motion.a
                href={`${businessSiteUrl}/projects/hernandez-landscape-local-business-site`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-3 font-semibold dtz-button-glow dtz-link-arrow"
                style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                Read case note
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </motion.div>
          </motion.div>

          <motion.div
            className="rounded-3xl border p-4 dtz-card-interactive"
            style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-panel)", boxShadow: "var(--dtz-shadow)" }}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 30 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            whileHover={shouldReduceMotion ? {} : { y: -6 }}
          >
            <div className="dtz-img-hover rounded-2xl overflow-hidden border" style={{ borderColor: "var(--dtz-border)" }}>
              <Image
                src="/portfolio/hernandez/site-screenshot.png"
                alt="Screenshot of the Hernandez Landscape website"
                width={1440}
                height={1000}
                className="h-auto w-full"
                priority
              />
            </div>
          </motion.div>
        </motion.section>

        <StaggerContainer className="grid gap-4 pb-10 md:grid-cols-3" staggerDelay={0.1}>
          {liveProofUpdates.map((item) => {
            const Icon = item.icon

            return (
              <motion.article
                key={item.title}
                className="rounded-3xl border p-6 dtz-card-interactive dtz-glass-panel"
                style={{ borderColor: "var(--dtz-border)" }}
                variants={staggerItem}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
              >
                <motion.span
                  className="flex h-11 w-11 items-center justify-center rounded-2xl dtz-icon-bounce"
                  style={{ background: "var(--dtz-accent-soft)", color: "var(--dtz-accent)" }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -5 }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </motion.span>
                <h2 className="mt-5 text-lg font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                  {item.description}
                </p>
              </motion.article>
            )
          })}
        </StaggerContainer>

        <Reveal direction="up">
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              className="rounded-3xl border p-6 dtz-glass-panel"
              style={{ borderColor: "var(--dtz-border)" }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <p className="dtz-section-label">What the example shows</p>
              <div className="mt-6 space-y-4">
                {highlights.map((highlight, i) => (
                  <motion.div
                    key={highlight}
                    className="flex gap-3"
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
                    whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  >
                    <motion.span
                      className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: "var(--dtz-accent)" }}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.5 }}
                    />
                    <p className="text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <StaggerContainer className="grid gap-6 md:grid-cols-3" staggerDelay={0.08}>
              {packageExamples.map((item) => (
                <motion.article
                  key={item.title}
                  className="rounded-3xl border p-6 dtz-card-interactive"
                  style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-panel)" }}
                  variants={staggerItem}
                  whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
                >
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                    {item.description}
                  </p>
                </motion.article>
              ))}
            </StaggerContainer>
          </section>
        </Reveal>

        <Reveal direction="up" delay={0.1}>
          <section className="grid gap-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              className="rounded-3xl border p-6 md:p-8 dtz-glass-panel"
              style={{ borderColor: "var(--dtz-border)" }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <p className="dtz-section-label">Reference links</p>
              <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                Each link answers a different question about the work.
              </h2>
              <StaggerContainer className="mt-6 grid gap-4" staggerDelay={0.1}>
                {referenceLinks.map((item) => {
                  const Icon = item.icon

                  return (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-4 rounded-2xl border p-4 dtz-card-interactive dtz-link-arrow"
                      style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-panel-2)" }}
                      variants={staggerItem}
                      whileHover={shouldReduceMotion ? {} : { x: 8, y: -2 }}
                    >
                      <motion.span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl dtz-icon-bounce"
                        style={{ background: "var(--dtz-accent-soft)", color: "var(--dtz-accent)" }}
                        whileHover={shouldReduceMotion ? {} : { rotate: -10 }}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </motion.span>
                      <span>
                        <span className="flex items-center gap-2 text-sm font-semibold">
                          {item.title}
                          <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                            style={{ color: "var(--dtz-subtle)" }}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                          {item.description}
                        </span>
                      </span>
                    </motion.a>
                  )
                })}
              </StaggerContainer>
            </motion.div>

            <motion.div
              className="rounded-3xl border p-6 md:p-8 dtz-glass-panel"
              style={{ borderColor: "var(--dtz-border)" }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <p className="dtz-section-label">Build signals</p>
              <h2 className="mt-4 text-2xl font-bold md:text-3xl">
                Concrete stack, not placeholder labels.
              </h2>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                Clients do not need the whole implementation story, but they
                should see that the site was built with real production pieces and
                not just a static mockup.
              </p>
              <StaggerContainer className="mt-6 grid gap-3" staggerDelay={0.06}>
                {stackSignals.map((signal) => (
                  <motion.div
                    key={signal}
                    className="flex items-center gap-3 rounded-2xl border px-4 py-3"
                    style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-panel-2)" }}
                    variants={staggerItem}
                    whileHover={shouldReduceMotion ? {} : { x: 8, scale: 1.01 }}
                  >
                    <motion.div whileHover={shouldReduceMotion ? {} : { scale: 1.2, rotate: 10 }}>
                      <CheckCircle2
                        className="h-4 w-4 shrink-0"
                        style={{ color: "var(--dtz-accent)" }}
                        aria-hidden="true"
                      />
                    </motion.div>
                    <span className="text-sm" style={{ color: "var(--dtz-muted)" }}>
                      {signal}
                    </span>
                  </motion.div>
                ))}
              </StaggerContainer>
            </motion.div>
          </section>
        </Reveal>

        <StaggerContainer className="grid gap-6 py-16 lg:grid-cols-3" staggerDelay={0.12}>
          <motion.div
            className="overflow-hidden rounded-3xl border dtz-card-interactive"
            style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-panel)" }}
            variants={staggerItem}
            whileHover={shouldReduceMotion ? {} : { y: -8 }}
          >
            <div className="dtz-img-hover">
              <Image
                src="/portfolio/hernandez/landscape-work-hero.jpeg"
                alt="Landscaping project photo used for Hernandez Landscape"
                width={1600}
                height={1000}
                loading="eager"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-semibold">Real project imagery</h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                The site uses real work photos instead of generic stock imagery,
                so prospects can inspect the type of landscaping work the
                business actually performs.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-3xl border dtz-card-interactive"
            style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-panel)" }}
            variants={staggerItem}
            whileHover={shouldReduceMotion ? {} : { y: -8 }}
          >
            <div className="dtz-img-hover">
              <Image
                src="/portfolio/hernandez/site-trust-screenshot.png"
                alt="Sourced customer feedback section from the Hernandez Landscape website"
                width={1440}
                height={729}
                loading="eager"
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-semibold">Sourced trust section</h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                The trust section now points to a public review source, keeping
                the sales page credible and easy to defend.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-3xl border dtz-card-interactive"
            style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-panel)" }}
            variants={staggerItem}
            whileHover={shouldReduceMotion ? {} : { y: -8 }}
          >
            <div className="dtz-img-hover">
              <Image
                src="/portfolio/hernandez/sergio-landscaping-marketing-clean.png"
                alt="Clean marketing visual for landscaping and snow removal outreach"
                width={1080}
                height={1080}
                loading="eager"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-lg font-semibold">
                Clean outreach collateral
              </h2>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                The share image is built with clean rendered text, avoiding
                distorted lettering when it is sent through Messenger or social
                DMs.
              </p>
            </div>
          </motion.div>
        </StaggerContainer>

        <Reveal direction="scale">
          <section className="pb-12">
            <motion.div
              className="rounded-3xl border p-6 md:p-8 dtz-cta-ring"
              style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-accent-soft)" }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="dtz-section-label">Next step</p>
                  <h2 className="mt-3 text-2xl font-bold">
                    Want something like this for your local business?
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                    Use the services-facing contact flow for formal scoping,
                    project questions, and local-business delivery.
                  </p>
                </div>
                <motion.a
                  href={`${businessSiteUrl}/contact`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold dtz-button-glow dtz-link-arrow"
                  style={{ background: "var(--dtz-accent)", color: "var(--dtz-on-accent)" }}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  Start a project
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </motion.a>
              </div>
            </motion.div>
          </section>
        </Reveal>
      </div>
    </main>
  )
}
