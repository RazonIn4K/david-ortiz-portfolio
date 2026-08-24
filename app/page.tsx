"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { GithubIcon } from "@/components/icons/brand-icons"
import { ProtectedEmailLink, RevealedEmail } from "@/components/contact/protected-email-link"
import { AIAssistant } from "@/components/ai-assistant"
import {
  CapabilityTrack,
  Reveal,
  ScrollProgress,
  SectionHeader,
  StaggerContainer,
  staggerItem,
} from "@/components/motion/site-motion"
import { useSiteTheme } from "@/components/use-site-theme"
import { contact } from "@/data/content"
import {
  ArrowUpRight,
  AtSign,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Compass,
  FileText,
  Globe,
  LockKeyhole,
  Mail,
  Moon,
  ShieldCheck,
  Share2,
  Sparkles,
  Smartphone,
  Store,
  Sun,
  Workflow,
  Wrench,
} from "lucide-react"

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Notes", href: "#notes" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
]

const proofChips = [
  "Inspectable proof",
  "Operating notes",
  "AI-security checks",
  "Plain handoff",
]

const proofSurfaces = [
  {
    label: "Live website build",
    title: "Hernandez Landscape",
    body: "A real local-service surface with service clarity, trust cues, and direct quote paths.",
    image: "/portfolio/hernandez/site-trust-screenshot.png",
    href: "/portfolio",
    alt: "Screenshot of the Hernandez Landscape website trust and services section.",
  },
  {
    label: "Spanish-first demos",
    title: "Pedidos, citas, servicios",
    body: "Small-business flows for owners and customers who live on mobile and social.",
    image: "/visuals/local-business-system.svg",
    href: "/demo",
    alt: "Illustrated local business system showing connected website, social, and contact paths.",
  },
  {
    label: "Setup layer",
    title: "Domain, inbox, social, handoff",
    body: "The professional pieces around the site are part of the work, not an afterthought.",
    image: "/visuals/project-board.svg",
    href: "#setup",
    alt: "Desk scene representing website setup, account handoff, and project notes.",
  },
]

const heroHighlights = [
  "Web systems",
  "Automation workflows",
  "AI-security checks",
  "RAG & notes tools",
  "Operating notes",
]

const launchFlow = [
  {
    title: "Website",
    detail: "Clear pages, photos, services, forms",
    icon: Globe,
  },
  {
    title: "Domain",
    detail: "A real address the business owns",
    icon: BadgeCheck,
  },
  {
    title: "Email",
    detail: "Official inbox with familiar forwarding",
    icon: AtSign,
  },
  {
    title: "Social",
    detail: "Facebook, Instagram, and direct paths",
    icon: Smartphone,
  },
  {
    title: "Security",
    detail: "2FA, recovery, and handoff notes",
    icon: LockKeyhole,
  },
]

const setupCards = [
  {
    title: "Local Business Sites",
    body: "Selected proof: a customer-facing site with clear services, forms, and a practical handoff path. Not the main offer, but a real thing I can build and explain.",
    points: ["Mobile-first pages", "Clear calls to action", "Bilingual-friendly copy"],
    icon: Store,
  },
  {
    title: "Domain And Email Setup",
    body: "The surrounding professional layer: domain ownership, official email forwarding, and DNS checks that keep the business reachable.",
    points: ["Domain ownership", "info@ or sales@ setup", "Familiar inbox forwarding"],
    icon: AtSign,
  },
  {
    title: "Social And Contact Paths",
    body: "Connecting the site to the places customers already use, with clear paths from social profiles to contact forms.",
    points: ["Social profile buttons", "Contact forms", "Google/local links"],
    icon: Share2,
  },
  {
    title: "Security-Minded Handoff",
    body: "Account protection, recovery details, and plain-language notes so the owner can keep the system running without depending on memory.",
    points: ["2FA and recovery", "DNS/email checks", "Plain-language handoff"],
    icon: ShieldCheck,
  },
]

const workAreas = [
  {
    label: "Featured",
    title: "Hernandez Landscape",
    body: "Live bilingual landscaping site — service pages, instant estimator, quote handoff, and sourced trust signals you can inspect end to end.",
    image: "/portfolio/hernandez/site-screenshot.png",
    icon: Store,
    tags: ["Bilingual", "Estimator", "Local SEO", "Handoff"],
    cta: { label: "Open portfolio case", href: "/portfolio" },
    featured: true,
  },
  {
    label: "Web",
    title: "Local Business Sites",
    body: "Customer-facing sites with clear services, forms, and bilingual-friendly copy — layout, contact paths, and owner handoff included.",
    image: "/visuals/local-business-system.svg",
    icon: Globe,
    tags: ["Next.js", "Forms", "Local SEO", "Handoff"],
    cta: { label: "See live demos (pedidos, citas, servicios)", href: "/demo" },
  },
  {
    label: "Systems",
    title: "AI-Assisted Workflows",
    body: "Practical workflows that split research, implementation, review, QA, and documentation into visible steps instead of hiding everything inside one prompt.",
    image: "/visuals/systems-routing.svg",
    icon: Workflow,
    tags: ["Codex", "Claude", "Browser QA", "Runbooks"],
  },
  {
    label: "Knowledge",
    title: "RAG and Notes Tools",
    body: "Experiments around retrieval, cited answers, local notes, and the habit of checking the actual source before treating a generated answer as true.",
    image: "/visuals/notes-map.svg",
    icon: BookOpen,
    tags: ["RAG", "Search", "Citations", "Obsidian"],
  },
  {
    label: "Ops",
    title: "Automation and Cleanup",
    body: "Small automations for intake, follow-up, project cleanup, and deployment checks, with the maintenance path documented before the work is considered done.",
    image: "/visuals/project-board.svg",
    icon: Wrench,
    tags: ["n8n", "APIs", "Scripts", "QA"],
  },
  {
    label: "Safety",
    title: "AI Security and Prompt Defense",
    body: "Practical work on prompt injection, instruction boundaries, misuse resistance, and the checks needed before an AI-powered workflow should be trusted.",
    image: "/visuals/ai-guardrails.svg",
    icon: ShieldCheck,
    tags: ["Prompt defense", "Guardrails", "Testing", "Review"],
    cta: { label: "Read CTF writeups", href: "/writeups" },
  },
  {
    label: "Proof",
    title: "PromptDefenders",
    body: "A prompt-injection defense project: evaluation methodology, safe test cases, and checklists for hardening AI-assisted workflows.",
    image: "/visuals/proof-asset-gallery.svg",
    icon: ShieldCheck,
    tags: ["Prompt defense", "Eval methodology", "Checklists"],
    cta: { label: "Open live demo", href: "https://prompt-defenders.vercel.app" },
  },
  {
    label: "Lab",
    title: "Razon Live Lab",
    body: "Learning AI security and systems in public: streams, writeups, and sanitized demos, in English and Spanish.",
    image: "/visuals/systems-routing.svg",
    icon: Sparkles,
    tags: ["Live builds", "AI security", "EN/ES"],
    cta: { label: "Visit lab", href: "https://razonlab.com" },
  },
]

const processSteps = [
  {
    title: "Start With The Real Surface",
    body: "I look at the current site, social page, domain, inbox, or workflow first so the work starts from the real situation.",
    icon: Compass,
  },
  {
    title: "Map The Useful Version",
    body: "I separate what customers need to see, what the owner needs to control, and what should be kept simple.",
    icon: ClipboardCheck,
  },
  {
    title: "Build In Working Passes",
    body: "I ship a working first version, then tighten the design, copy, forms, routes, contact paths, and edge cases.",
    icon: Code2,
  },
  {
    title: "Verify And Hand Off",
    body: "I run the checks that matter, document what changed, and leave the owner with a clear continuation path.",
    icon: FileText,
  },
]

const stackGroups = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS", "Accessible UI"],
  },
  {
    title: "Deployment",
    items: ["Vercel", "Netlify", "DNS setup", "Production QA"],
  },
  {
    title: "Automation",
    items: ["n8n", "APIs", "Shell scripts", "Operational notes"],
  },
  {
    title: "AI Workflow",
    items: ["Codex", "Claude Code", "Grok", "Perplexity", "Obsidian"],
  },
]

const currentFocus = [
  "Cleaner local-business websites with quote, order, or contact flows that do not feel overbuilt.",
  "Repeatable AI-assisted delivery: research, implementation, review, browser QA, and a written handoff.",
  "AI-security workflow habits, especially prompt injection, tool boundaries, and validation.",
  "Better notes that preserve what worked, what failed, and what should happen in the next session.",
]


export default function HomePage() {
  const { theme, updateTheme } = useSiteTheme()
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className={`dtz-site dtz-${theme}`}>
      <ScrollProgress />
      <header className="dtz-header">
        <nav className="dtz-nav" aria-label="Primary navigation">
          <Link className="dtz-brand" href="#start" aria-label="David Ortiz home">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Image
                className="dtz-logo-img"
                src="/davidtiz-logo-transparent.png"
                alt=""
                width={44}
                height={44}
                priority
                aria-hidden="true"
              />
            </motion.div>
            <span>
              <strong>David Ortiz</strong>
              <small>Websites and practical business systems.</small>
            </span>
          </Link>

          <ul className="dtz-nav-list">
            {navItems.map((item, i) => (
              <motion.li
                key={item.href}
                initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
              >
                <a href={item.href}>{item.label}</a>
              </motion.li>
            ))}
          </ul>

          <div className="dtz-actions">
            <fieldset className="dtz-theme" aria-label="Color theme">
              <legend className="sr-only">Color theme</legend>
              {([
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
              ] as const).map((option) => {
                const Icon = option.icon
                const selected = theme === option.value

                return (
                  <label key={option.value} className={selected ? "is-selected" : ""}>
                    <input
                      type="radio"
                      name="davidtiz-theme"
                      value={option.value}
                      checked={selected}
                      onChange={() => updateTheme(option.value)}
                    />
                    <Icon aria-hidden="true" />
                    <span>{option.label}</span>
                  </label>
                )
              })}
            </fieldset>
          </div>
        </nav>
      </header>

      <motion.section
        ref={heroRef}
        id="start"
        className="dtz-hero dtz-overhaul-hero"
        aria-labelledby="hero-title"
        style={shouldReduceMotion ? {} : { y: heroY, opacity: heroOpacity }}
      >
        <motion.div
          className="dtz-hero-copy"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.p
            className="dtz-kicker dtz-float-badge"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles aria-hidden="true" className="dtz-icon-bounce" />
            Selected work · operating notes · systems thinking
          </motion.p>
          <motion.h1
            id="hero-title"
            className="dtz-hero-display"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            I build practical web, automation,
            <span className="dtz-hero-accent">and AI-security systems.</span>
          </motion.h1>
          <motion.p
            className="dtz-lede"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            I&apos;m David Ortiz — builder/operator. This site is my proof hub: work you can inspect, notes on how I ship, and the decisions behind each system.
          </motion.p>

          <motion.div
            className="dtz-hero-actions"
            aria-label="Primary actions"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <motion.a
              className="dtz-button primary dtz-button-glow"
              href="#work"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              View selected work
              <ArrowUpRight aria-hidden="true" />
            </motion.a>
            <motion.a
              className="dtz-button secondary dtz-button-glow"
              href="#notes"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              Read operating notes
              <BookOpen aria-hidden="true" />
            </motion.a>
          </motion.div>

          <CapabilityTrack items={heroHighlights} />
        </motion.div>

        <motion.div
          className="dtz-hero-visual dtz-overhaul-visual dtz-showcase-stage"
          aria-label="Website design and setup proof"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95, y: 30 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="dtz-stage-topline">
            <span>Live screens, not just claims</span>
            <Link href="/portfolio" className="dtz-link-arrow">
              View portfolio
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <div className="dtz-stage-grid">
            <motion.div
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link className="dtz-live-preview dtz-img-hover" href="/portfolio">
                <span className="dtz-browser-bar" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <strong>davidtiz.com / portfolio</strong>
                </span>
                <Image
                  src="/portfolio/hernandez/site-screenshot.png"
                  alt="Screenshot of a local business website portfolio example."
                  width={1440}
                  height={1000}
                  priority
                  loading="eager"
                  sizes="(max-width: 560px) calc(100vw - 44px), (max-width: 1020px) calc(100vw - 64px), 368px"
                />
              </Link>
            </motion.div>

            <div className="dtz-stage-column">
              <motion.div
                whileHover={shouldReduceMotion ? {} : { y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link className="dtz-mini-preview dtz-img-hover" href="/portfolio">
                  <Image
                    src="/portfolio/hernandez/site-trust-screenshot.png"
                    alt="Screenshot of services and trust sections from a local business website."
                    width={1440}
                    height={729}
                  />
                  <span>
                    <strong>Trust section</strong>
                    Services, photos, contact path
                  </span>
                </Link>
              </motion.div>

              <motion.div
                className="dtz-handoff-panel"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span>Owner handoff</span>
                <strong>Domain, inbox, social, recovery</strong>
                <p>Set up around the tools the owner already uses.</p>
              </motion.div>
            </div>
          </div>

          <div className="dtz-stage-checks" aria-label="Setup path">
            {launchFlow.map((item, i) => {
              const Icon = item.icon

              return (
                <motion.div
                  className="dtz-stage-check"
                  key={item.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.08 }}
                  whileHover={shouldReduceMotion ? {} : { y: -3, scale: 1.02 }}
                >
                  <span aria-hidden="true" className="dtz-icon-bounce">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </motion.section>

      <div className="dtz-section-rule" aria-hidden="true" />

      <section className="dtz-section dtz-proof-section" aria-labelledby="proof-title">
        <Reveal>
          <SectionHeader
            index="01"
            label="Proof of work"
            titleId="proof-title"
            title="Show the work before anyone asks."
            lead="Customer-facing surfaces plus the setup behind them — domain, inbox, social paths, and a handoff the owner can actually use."
          />
          <ul className="dtz-proof-chips" aria-label="Portfolio signals">
            {proofChips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        </Reveal>

        <StaggerContainer className="dtz-proof-surface-grid is-bento" staggerDelay={0.1}>
          {proofSurfaces.map((item, index) => (
            <motion.article
              className={`${index === 0 ? "dtz-proof-surface is-featured" : "dtz-proof-surface"} dtz-card-interactive`}
              key={item.title}
              variants={staggerItem}
              whileHover={shouldReduceMotion ? {} : { y: -6 }}
            >
              <Link className="dtz-proof-surface-media dtz-img-hover" href={item.href}>
                <Image src={item.image} alt={item.alt} width={1440} height={index === 0 ? 1000 : 729} />
              </Link>
              <div className="dtz-proof-surface-copy">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Link href={item.href} className="dtz-link-arrow">
                  Inspect it
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </StaggerContainer>
      </section>

      <div className="dtz-section-rule" aria-hidden="true" />

      <section id="setup" className="dtz-section dtz-services-section" aria-labelledby="setup-title">
        <Reveal>
          <SectionHeader
            index="02"
            label="Selected proof"
            titleId="setup-title"
            title="The practical layer behind the site."
            lead="Domain, inbox, social paths, and security basics — connected and documented so the owner can keep running after handoff."
          />
        </Reveal>

        <StaggerContainer className="dtz-setup-grid" staggerDelay={0.08}>
          {setupCards.map((item) => {
            const Icon = item.icon

            return (
              <motion.article
                className="dtz-setup-card dtz-card-interactive"
                key={item.title}
                variants={staggerItem}
                whileHover={shouldReduceMotion ? {} : { y: -8 }}
              >
                <motion.span
                  className="dtz-setup-icon dtz-icon-bounce"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: -5 }}
                >
                  <Icon aria-hidden="true" />
                </motion.span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>
                      <CheckCircle2 aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            )
          })}
        </StaggerContainer>
      </section>

      <div className="dtz-section-rule" aria-hidden="true" />

      <section id="work" className="dtz-section" aria-labelledby="work-title">
        <Reveal>
          <SectionHeader
            index="03"
            label="Selected work"
            titleId="work-title"
            title="Lanes and proof you can open."
            lead="Categories and inspectable examples — not a brand directory. Each card points to something I can design, connect, test, and explain."
          />
        </Reveal>

        <StaggerContainer className="dtz-work-grid is-bento" staggerDelay={0.06}>
          {workAreas.map((item) => {
            const Icon = item.icon
            const isFeatured = "featured" in item && item.featured

            return (
              <motion.article
                className={`dtz-work-card dtz-card-interactive${isFeatured ? " is-featured" : ""}`}
                key={item.title}
                variants={staggerItem}
                whileHover={shouldReduceMotion ? {} : { y: -6 }}
              >
                {isFeatured ? (
                  <span className="dtz-work-featured-badge" aria-hidden="true">
                    Featured build
                  </span>
                ) : null}
                <div className="dtz-work-media dtz-img-hover">
                  <Image
                    src={item.image}
                    alt={isFeatured ? "Screenshot of the Hernandez Landscape website." : ""}
                    width={900}
                    height={640}
                  />
                </div>
                <div className="dtz-work-copy">
                  <div className="dtz-work-label">
                    <motion.span
                      whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                      className="dtz-tag-pop"
                    >
                      {item.label}
                    </motion.span>
                    <motion.span
                      className="dtz-icon-bounce"
                      whileHover={shouldReduceMotion ? {} : { rotate: 10 }}
                    >
                      <Icon aria-hidden="true" />
                    </motion.span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <ul className="dtz-tag-list" aria-label={`${item.title} tools and themes`}>
                    {item.tags.map((tag) => (
                      <motion.li
                        key={tag}
                        className="dtz-tag-pop"
                        whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -2 }}
                      >
                        {tag}
                      </motion.li>
                    ))}
                  </ul>
                  {"cta" in item && item.cta ? (
                    <a className="dtz-card-link dtz-link-arrow" href={item.cta.href}>
                      {item.cta.label}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            )
          })}
        </StaggerContainer>
      </section>

      <div className="dtz-section-rule" aria-hidden="true" />

      <section id="process" className="dtz-section" aria-labelledby="process-title">
        <Reveal>
          <SectionHeader
            index="04"
            label="Process"
            titleId="process-title"
            title="Grounded delivery, verified in the browser."
            lead="Inspect the real surface first. Ship a working pass, then tighten — smaller honest improvements beat big plans that never ship."
          />
        </Reveal>

        <StaggerContainer className="dtz-process-grid is-timeline" staggerDelay={0.1}>
          {processSteps.map((step, index) => {
            const Icon = step.icon

            return (
              <motion.article
                className="dtz-process-card dtz-card-interactive"
                key={step.title}
                variants={staggerItem}
                whileHover={shouldReduceMotion ? {} : { y: -4 }}
              >
                <span className="dtz-step-number">{String(index + 1).padStart(2, "0")}</span>
                <motion.span
                  className="dtz-icon-bounce"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.15 }}
                >
                  <Icon aria-hidden="true" />
                </motion.span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.article>
            )
          })}
        </StaggerContainer>
      </section>

      <div className="dtz-section-rule" aria-hidden="true" />

      <section id="stack" className="dtz-section dtz-stack-section" aria-labelledby="stack-title">
        <Reveal>
          <SectionHeader
            index="05"
            label="Stack"
            titleId="stack-title"
            title="Tools behind the calm handoff."
            lead="Visitors should not have to care about the stack. I use it to make the finished setup fast, reliable, secure enough for the job, and easier to maintain."
          />
        </Reveal>

        <StaggerContainer className="dtz-stack-grid" staggerDelay={0.08}>
          {stackGroups.map((group) => (
            <motion.article
              className="dtz-stack-group dtz-card-interactive"
              key={group.title}
              variants={staggerItem}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
            >
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    whileHover={shouldReduceMotion ? {} : { x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </StaggerContainer>
      </section>

      <div className="dtz-section-rule" aria-hidden="true" />

      <section id="notes" className="dtz-section dtz-notes-section" aria-labelledby="notes-title">
        <Reveal className="dtz-notes-layout is-editorial" direction="up">
          <div>
            <p className="dtz-section-label">
              <span className="dtz-index-badge" aria-hidden="true">
                06
              </span>
              Operating notes
            </p>
            <h2 id="notes-title">What I&apos;m paying attention to right now.</h2>
            <p className="dtz-section-lead">
              This is the living part of the portfolio: systems thinking, practical security habits, useful automation,
              and proof that survives beyond a sales conversation.
            </p>
          </div>

          <div className="dtz-notes-panel">
            <motion.div
              className="dtz-img-hover"
              style={{ borderRadius: "var(--dtz-radius-md)", overflow: "hidden" }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
            >
              <Image src="/visuals/notes-map.svg" alt="" width={900} height={640} />
            </motion.div>
            <StaggerContainer as="ul" className="dtz-check-list is-editorial" staggerDelay={0.08}>
              {currentFocus.map((line) => (
                <motion.li
                  key={line}
                  variants={staggerItem}
                  whileHover={shouldReduceMotion ? {} : { x: 4, scale: 1.01 }}
                >
                  <CheckCircle2 aria-hidden="true" />
                  <span>{line}</span>
                </motion.li>
              ))}
            </StaggerContainer>
          </div>
        </Reveal>
      </section>

      <div className="dtz-section-rule" aria-hidden="true" />

      <Reveal direction="up">
        <section id="contact" className="dtz-contact dtz-overhaul-contact dtz-cta-ring is-editorial" aria-labelledby="contact-title">
          <div className="dtz-contact-intro">
            <p className="dtz-section-label">
              <span className="dtz-index-badge" aria-hidden="true">
                07
              </span>
              Contact
            </p>
            <h2 id="contact-title" className="dtz-contact-display">
              Start with the project, the problem, or the link.
            </h2>
            <p className="dtz-section-lead">
              No polished brief required. Tell me what you&apos;re building, what&apos;s broken, and what a useful next step looks like.
            </p>
          </div>

          <div className="dtz-contact-panel">
            <div className="dtz-contact-quick">
              <motion.div variants={staggerItem} className="dtz-contact-quick-primary">
                <ProtectedEmailLink
                  className="dtz-button primary dtz-button-glow dtz-contact-primary-btn"
                  subject="Project inquiry from davidtiz.com"
                >
                  <Mail aria-hidden="true" />
                  <span>
                    <strong>Email David</strong>
                    <small>Best async path · hello@davidtiz.com on reveal</small>
                  </span>
                  <RevealedEmail className="sr-only" />
                </ProtectedEmailLink>
              </motion.div>
              <motion.a
                className="dtz-button secondary dtz-button-glow dtz-contact-primary-btn"
                href="https://calendly.com/davidinfosec07"
                target="_blank"
                rel="noreferrer"
              >
                <CalendarDays aria-hidden="true" />
                <span>
                  <strong>Book a call</strong>
                  <small>Live conversation when timing matters</small>
                </span>
              </motion.a>
            </div>
            <motion.div
              className="dtz-contact-card dtz-glass-panel"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span>What to send</span>
              <p>What you&apos;re trying to build or fix, plus the current link, file, or constraint if you have one.</p>
            </motion.div>
            <StaggerContainer className="dtz-contact-actions is-compact" staggerDelay={0.08}>
              <motion.div variants={staggerItem}>
                <a className="dtz-button secondary dtz-button-glow" href={contact.github} target="_blank" rel="noreferrer">
                  GitHub
                  <GithubIcon aria-hidden="true" />
                </a>
              </motion.div>
              <motion.div variants={staggerItem}>
                <Link className="dtz-button secondary dtz-button-glow" href="/contact">
                  All contact paths
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </motion.div>
            </StaggerContainer>
          </div>
        </section>
      </Reveal>

      <Reveal direction="up" delay={0.1}>
        <footer className="dtz-footer">
          <span className="dtz-footer-brand">
            <strong>David Ortiz</strong>
            <small>Websites and practical business systems.</small>
          </span>
          <span className="dtz-footer-links">
            <ProtectedEmailLink>Email</ProtectedEmailLink>
            <a href={contact.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <Link href="/contact">All contact paths</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/writeups">Writeups</Link>
            <Link href="/privacy">Privacy</Link>
          </span>
        </footer>
      </Reveal>

      <AIAssistant />
    </div>
  )
}
