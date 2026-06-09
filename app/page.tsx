"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { GithubIcon } from "@/components/icons/brand-icons"
import { ProtectedWhatsAppLink } from "@/components/contact/protected-whatsapp-link"
import { AIAssistant } from "@/components/ai-assistant"
import { contact, whatsappHref } from "@/data/content"
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Compass,
  FileText,
  Globe,
  Mail,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  Workflow,
  Wrench,
} from "lucide-react"

const navItems = [
  { label: "Start", href: "#start" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Stack", href: "#stack" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
]

const proofSignals = [
  "DeKalb, IL and remote",
  "Screened contact path",
  "English or Spanish",
  "Built with Next.js on Vercel",
]

const workAreas = [
  {
    label: "Web",
    title: "Local Business Sites",
    body: "Focused websites for small businesses: clear services, simple contact paths, bilingual-friendly copy, DNS/deploy setup, and handoff notes an owner can use.",
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
    title: "Prompt Safety Learning",
    body: "Ongoing study of AI guardrails, prompt injection, misuse boundaries, and the practical checks needed before an AI-powered workflow should be trusted.",
    image: "/visuals/ai-guardrails.svg",
    icon: ShieldCheck,
    tags: ["Guardrails", "Testing", "Scope", "Review"],
  },
]

const processSteps = [
  {
    title: "Start With The Real Surface",
    body: "I look at the repo, browser, files, deployment, or workflow first so the work starts from evidence instead of labels.",
    icon: Compass,
  },
  {
    title: "Map The Useful Version",
    body: "I separate facts, assumptions, and open questions, then turn the mess into a small buildable scope.",
    icon: ClipboardCheck,
  },
  {
    title: "Build In Working Passes",
    body: "I prefer a working first version, then tighten copy, layout, routes, contact paths, and edge cases from there.",
    icon: Code2,
  },
  {
    title: "Verify And Hand Off",
    body: "I run the checks that matter, document what changed, and leave the next person with a clear continuation path.",
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
  "Security-aware AI workflow habits, especially prompt injection, tool boundaries, and validation.",
  "Better notes that preserve what worked, what failed, and what should happen in the next session.",
]

const contactGuardrails = [
  "Public links start with project context instead of a bare phone number.",
  "A future WhatsApp/n8n screener can label spam, ask one clarifying question, and keep human approval on replies.",
  "Direct calls should happen after context, not as the first public CTA bots can scrape.",
]

function useSiteTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const requestedTheme = new URLSearchParams(window.location.search).get("theme")
    let nextTheme: "light" | "dark" | null = null

    if (requestedTheme === "light" || requestedTheme === "dark") {
      nextTheme = requestedTheme
      window.localStorage.setItem("davidtiz-theme", requestedTheme)
    } else {
      const savedTheme = window.localStorage.getItem("davidtiz-theme")
      if (savedTheme === "light" || savedTheme === "dark") {
        nextTheme = savedTheme
      } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
        nextTheme = "dark"
      }
    }

    if (!nextTheme) return

    const frame = window.requestAnimationFrame(() => setTheme(nextTheme))
    return () => window.cancelAnimationFrame(frame)
  }, [])

  const updateTheme = (nextTheme: "light" | "dark") => {
    setTheme(nextTheme)
    window.localStorage.setItem("davidtiz-theme", nextTheme)
  }

  return { theme, updateTheme }
}

export default function HomePage() {
  const { theme, updateTheme } = useSiteTheme()
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`dtz-site dtz-${theme}`}>
      <header className="dtz-header">
        <nav className="dtz-nav" aria-label="Primary navigation">
          <Link className="dtz-brand" href="#start" aria-label="David Ortiz home">
            <span className="dtz-mark" aria-hidden="true">
              DO
            </span>
            <span>
              <strong>David Ortiz</strong>
              <small>builder/operator portfolio</small>
            </span>
          </Link>

          <ul className="dtz-nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
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

      <section id="start" className="dtz-hero dtz-overhaul-hero" aria-labelledby="hero-title">
        <motion.div
          className="dtz-hero-copy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="dtz-kicker">
            <Sparkles aria-hidden="true" />
            Practical websites, automation, and AI workflow notes
          </p>
          <h1 id="hero-title">I turn messy ideas into working web systems.</h1>
          <p className="dtz-lede">
            I&apos;m David Ortiz. I build practical sites, workflow prototypes, and clear handoff notes for projects
            where the real value is getting the system working and understandable.
          </p>

          <div className="dtz-hero-actions" aria-label="Primary actions">
            <a className="dtz-button primary" href="#work">
              See selected work
              <ArrowUpRight aria-hidden="true" />
            </a>
            <ProtectedWhatsAppLink
              className="dtz-button secondary"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Message me on WhatsApp
              <MessageCircle aria-hidden="true" />
            </ProtectedWhatsAppLink>
          </div>
        </motion.div>

        <motion.div
          className="dtz-hero-visual dtz-overhaul-visual"
          aria-label="Visual portfolio workbench"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <div className="dtz-workbench-frame">
            <Image
              src="/visuals/generated-workbench.webp"
              alt="Desk scene with a laptop, notebook, and project cards representing a builder's workbench."
              width={1536}
              height={1024}
              priority
            />
          </div>

          <div className="dtz-hero-note">
            <span>How this page should read</span>
            <strong>Personal, useful, and specific.</strong>
            <p>No inflated claims. No agency wrapper. Just what I build, how I work, and how to reach me.</p>
          </div>

          <div className="dtz-stack-card dtz-hero-stack">
            <span>Current lanes</span>
            <div>
              <strong>Local sites</strong>
              <small>forms, copy, deploys</small>
            </div>
            <div>
              <strong>AI workflow</strong>
              <small>research to QA</small>
            </div>
            <div>
              <strong>Automation</strong>
              <small>small, documented systems</small>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="dtz-band dtz-summary-band" aria-labelledby="summary-title">
        <div>
          <p className="dtz-section-label">Quick read</p>
          <h2 id="summary-title">A portfolio for the work I actually do.</h2>
        </div>
        <div className="dtz-summary-copy">
          <p>
            This site is the front door for selected builds, current learning, and practical collaboration. Outside
            projects can show up as examples, but the organizing idea is simple: David Ortiz, the work, and a direct
            path to contact.
          </p>
          <ul className="dtz-signal-list" aria-label="Portfolio signals">
            {proofSignals.map((signal) => (
              <li key={signal}>
                <CheckCircle2 aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="work" className="dtz-section" aria-labelledby="work-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Selected work</p>
          <h2 id="work-title">Five lanes I keep returning to.</h2>
          <p>
            These are portfolio categories, not inflated case studies. Each one points to the kind of systems I can
            build, test, and explain clearly.
          </p>
        </div>

        <div className="dtz-work-grid">
          {workAreas.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.article
                className="dtz-work-card"
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.04 }}
              >
                <div className="dtz-work-media">
                  <Image src={item.image} alt="" width={900} height={640} />
                </div>
                <div className="dtz-work-copy">
                  <div className="dtz-work-label">
                    <span>{item.label}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <ul className="dtz-tag-list" aria-label={`${item.title} tools and themes`}>
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {"cta" in item && item.cta ? (
                    <a className="dtz-card-link" href={item.cta.href}>
                      {item.cta.label}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section id="process" className="dtz-section" aria-labelledby="process-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Process</p>
          <h2 id="process-title">How I keep projects grounded.</h2>
          <p>
            The common thread is verification. I would rather inspect the actual surface and make a smaller honest
            improvement than write a big plan that never reaches the browser.
          </p>
        </div>

        <div className="dtz-process-grid">
          {processSteps.map((step, index) => {
            const Icon = step.icon

            return (
              <article className="dtz-process-card" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Icon aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section id="stack" className="dtz-section dtz-stack-section" aria-labelledby="stack-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Stack</p>
          <h2 id="stack-title">Tools I reach for when the job fits.</h2>
          <p>
            The stack changes by project, but the goal stays the same: ship something understandable, verify it, and
            leave the maintenance path visible.
          </p>
        </div>

        <div className="dtz-stack-grid">
          {stackGroups.map((group) => (
            <article className="dtz-stack-group" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="notes" className="dtz-section dtz-notes-section" aria-labelledby="notes-title">
        <div className="dtz-notes-layout">
          <div>
            <p className="dtz-section-label">Current focus</p>
            <h2 id="notes-title">What I&apos;m paying attention to right now.</h2>
            <p>
              This is the living part of the portfolio: fewer broad claims, more notes about what is being built,
              tested, and tightened.
            </p>
          </div>

          <div className="dtz-notes-panel">
            <Image src="/visuals/generated-lanes.webp" alt="" width={1774} height={887} />
            <ul className="dtz-check-list">
              {currentFocus.map((line) => (
                <li key={line}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="dtz-contact dtz-overhaul-contact" aria-labelledby="contact-title">
        <div>
          <p className="dtz-section-label">Contact</p>
          <h2 id="contact-title">Send the rough version.</h2>
          <p>
            You do not need a polished brief. Send the project, the problem, the current link or file if you have one,
            and what would make the next step useful. I keep the public contact path screened so the phone number is not
            treated like an open spam target.
          </p>
        </div>

        <div className="dtz-contact-panel">
          <div className="dtz-contact-card">
            <span>Best first message</span>
            <p>What are you trying to build or fix, and what is the current state?</p>
          </div>
          <div className="dtz-contact-card dtz-contact-guard">
            <span>Phone spam guard</span>
            <ul>
              {contactGuardrails.map((item) => (
                <li key={item}>
                  <ShieldCheck aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="dtz-contact-actions">
            <ProtectedWhatsAppLink
              className="dtz-button primary"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Message me on WhatsApp
              <MessageCircle aria-hidden="true" />
            </ProtectedWhatsAppLink>
            <ProtectedWhatsAppLink
              className="dtz-button secondary"
              href="/contact/whatsapp?intent=callback"
              target="_blank"
              rel="noreferrer"
            >
              Request a call-back
              <MessageCircle aria-hidden="true" />
            </ProtectedWhatsAppLink>
            <a className="dtz-button secondary" href={`mailto:${contact.email}`}>
              {contact.email}
              <Mail aria-hidden="true" />
            </a>
            <a className="dtz-button secondary" href={contact.github} target="_blank" rel="noreferrer">
              GitHub
              <GithubIcon aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer className="dtz-footer">
        <span>David Ortiz</span>
        <span className="dtz-footer-links">
          <ProtectedWhatsAppLink href={whatsappHref} target="_blank" rel="noreferrer">
            WhatsApp
          </ProtectedWhatsAppLink>
          <a href={`mailto:${contact.email}`}>Email</a>
          <a href={contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </span>
      </footer>

      <AIAssistant />
    </div>
  )
}
