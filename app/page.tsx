"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { contact, whatsappHref } from "@/data/content"
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Globe,
  Mail,
  MessageCircle,
  Moon,
  Phone,
  ShieldCheck,
  Sparkles,
  Sun,
  Workflow,
  Wrench,
} from "lucide-react"

const navItems = [
  { label: "Start", href: "#start" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
]

const selectedWork = [
  {
    label: "Local business websites",
    title: "Local Business Websites",
    body: "Static and Next.js sites for small businesses with clear service pages, quote/order forms, bilingual copy, DNS setup, and a clean deploy handoff. Stack: Next.js · Vercel · Netlify · Forms · Local SEO.",
    icon: Globe,
  },
  {
    label: "AI workflow",
    title: "AI Workflow Orchestration",
    body: "Using multiple AI tools intentionally: research, implementation, review, browser QA, and documentation as separate steps instead of one giant prompt. Stack: Claude Code · Codex · Grok · Perplexity · Obsidian.",
    icon: Workflow,
  },
  {
    label: "Knowledge tools",
    title: "RAG / Knowledge Tools",
    body: "Prototypes for retrieval, cited answers, note search, and safer ways to ask questions over local knowledge bases. Stack: RAG · Search · Citations · Validation.",
    icon: BookOpen,
  },
  {
    label: "Automation & ops",
    title: "Automation and Ops",
    body: "Small automations for intake, follow-up, deployment, and project cleanup, built to stay understandable for the person who has to maintain them. Stack: n8n · APIs · Workflows · Documentation.",
    icon: Wrench,
  },
  {
    label: "Prompt safety",
    title: "Security Learning / Prompt Safety",
    body: "Ongoing notes and experiments around AI guardrails, prompt injection, misuse resistance, and security boundaries. Stack: AI safety · Prompt injection · Guardrails · Testing.",
    icon: ShieldCheck,
  },
]

const operatingStyle = [
  "Start with the real surface: the repo, the browser, the files, or the business process.",
  "Separate facts, assumptions, and guesses instead of blending them together.",
  "Use AI tools for specific jobs instead of asking every model the same question.",
  "Prefer small, working systems over oversized plans.",
  "Document decisions so the next pass is easier.",
]

const stack = [
  "Frontend — Next.js, React, Tailwind, static sites",
  "Deployment — Vercel, Netlify, DNS setup",
  "Automation — n8n, APIs, scripts",
  "AI workflow — Claude Code, Codex, Grok, Perplexity, Obsidian",
  "Learning & security — RAG, prompt safety, validation, documentation",
]

const currentFocus = [
  "Building cleaner local-business websites with quote/order flows and owner-friendly handoff.",
  "Turning AI-assisted work into repeatable project systems.",
  "Studying web infrastructure, security boundaries, and AI workflow reliability.",
  "Writing down what worked, what failed, and what I would do differently.",
]

export default function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const shouldReduceMotion = useReducedMotion()

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
              <small>personal portfolio</small>
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

      <section id="start" className="dtz-hero" aria-labelledby="hero-title">
        <motion.div className="dtz-hero-copy" initial={false}>
          <p className="dtz-kicker">
            <Sparkles aria-hidden="true" />
            Personal portfolio · Builds · Notes · Experiments
          </p>
          <h1 id="hero-title">I build practical web systems and AI-assisted workflows.</h1>
          <p className="dtz-lede">
            I&apos;m David Ortiz. I use code, automation, and structured notes to turn messy ideas into working
            websites, tools, and repeatable systems.
          </p>
          <div className="dtz-hero-actions" aria-label="Primary actions">
            <a className="dtz-button primary" href="#work">
              See selected work
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              className="dtz-button secondary"
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
            >
              Message me on WhatsApp
              <MessageCircle aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div className="dtz-hero-visual" aria-label="Visual portfolio workbench" initial={false}>
          <div className="dtz-workbench-frame">
            <Image
              src="/visuals/generated-workbench.webp"
              alt="Desk scene with a laptop, notebook, and project cards representing a builder's workbench."
              width={1536}
              height={1024}
              priority
            />
          </div>

          <div className="dtz-logo-tile">
            <Image src="/logo-v1.png" alt="David Ortiz circuit logo mark." width={1024} height={1024} />
            <div>
              <span>Mark</span>
              <strong>DO / systems</strong>
            </div>
          </div>

          <div className="dtz-stack-card">
            <span>What I build</span>
            <div>
              <strong>Websites</strong>
              <small>local business</small>
            </div>
            <div>
              <strong>Automation</strong>
              <small>n8n, APIs</small>
            </div>
            <div>
              <strong>AI workflow</strong>
              <small>Claude, Codex</small>
            </div>
            <div>
              <strong>Notes</strong>
              <small>learning log</small>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="work" className="dtz-section" aria-labelledby="work-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Selected work</p>
          <h2 id="work-title">What I build, and how I think about it.</h2>
          <p>A few areas I keep working in, shown as categories of real builds and experiments.</p>
        </div>

        <div className="dtz-proof-grid">
          {selectedWork.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.article
                className="dtz-proof"
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
              >
                <span>{item.label}</span>
                <Icon aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section id="about" className="dtz-section" aria-labelledby="about-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">How I work</p>
          <h2 id="about-title">I care about the handoff as much as the build.</h2>
        </div>

        <ul className="dtz-check-list">
          {operatingStyle.map((line) => (
            <li key={line}>
              <CheckCircle2 aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="dtz-section" aria-labelledby="stack-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Stack</p>
          <h2 id="stack-title">The tools I reach for.</h2>
        </div>

        <ul className="dtz-check-list">
          {stack.map((line) => (
            <li key={line}>
              <Wrench aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="notes" className="dtz-section" aria-labelledby="notes-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Current focus</p>
          <h2 id="notes-title">What I&apos;m paying attention to right now.</h2>
          <p>Fewer claims, more useful notes. This is what I&apos;m actively working on and learning.</p>
        </div>

        <ul className="dtz-check-list">
          {currentFocus.map((line) => (
            <li key={line}>
              <CheckCircle2 aria-hidden="true" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="dtz-contact" aria-labelledby="contact-title">
        <div>
          <p className="dtz-section-label">Contact</p>
          <h2 id="contact-title">Send the rough version.</h2>
          <p>
            If you have a project, question, or messy idea, send the plain version. I care more about understanding the
            real problem than making it sound polished too early.
          </p>
        </div>
        <div className="dtz-contact-panel">
          <div className="dtz-contact-actions">
            <a className="dtz-button primary" href={whatsappHref} target="_blank" rel="noreferrer">
              Message me on WhatsApp
              <MessageCircle aria-hidden="true" />
            </a>
            <a className="dtz-button secondary" href={`tel:${contact.phone}`}>
              Call or text {contact.whatsappDisplay}
              <Phone aria-hidden="true" />
            </a>
            <a className="dtz-button secondary" href={`mailto:${contact.email}`}>
              {contact.email}
              <Mail aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <footer className="dtz-footer">
        <span>David Ortiz</span>
        <span className="dtz-footer-links">
          <a href={whatsappHref} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={`mailto:${contact.email}`}>Email</a>
          <a href={contact.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </span>
      </footer>
    </div>
  )
}
