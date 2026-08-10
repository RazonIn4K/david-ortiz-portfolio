"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FileText,
  Mail,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  Workflow,
} from "lucide-react"

import { ProtectedWhatsAppLink } from "@/components/contact/protected-whatsapp-link"
import { GithubIcon } from "@/components/icons/brand-icons"
import { useSiteTheme } from "@/components/use-site-theme"
import { contact, whatsappHref } from "@/data/content"
import { homeNavigation, homePrimaryActions, homeProofRecords } from "@/data/home-content"

const focusAreas = ["Web systems", "Security practice", "Automation guardrails"]

const processSteps = [
  {
    title: "Start with the real surface",
    body: "I inspect the current page, workflow, logs, source, or account state before deciding what the problem is.",
    icon: Compass,
  },
  {
    title: "Map the trust boundary",
    body: "I separate what a person controls, what a tool can change, and what still depends on an external system.",
    icon: ShieldCheck,
  },
  {
    title: "Test the smallest claim",
    body: "I prefer a reproducible check and a bounded conclusion over a polished result that cannot be traced.",
    icon: ClipboardCheck,
  },
  {
    title: "Leave continuation evidence",
    body: "I record the decision, tradeoff, verification, and next safe step so the work can continue without guesswork.",
    icon: FileText,
  },
]

const stackGroups = [
  {
    title: "Interfaces",
    items: ["Next.js and React", "Accessible HTML", "Responsive browser QA"],
  },
  {
    title: "Systems",
    items: ["APIs and webhooks", "Shell and automation", "Deployment and DNS checks"],
  },
  {
    title: "Security",
    items: ["Trust boundaries", "Abuse controls", "Reproducible test cases"],
  },
  {
    title: "Working memory",
    items: ["Cited notes", "Runbooks", "Decision and handoff records"],
  },
]

const currentFocus = [
  "Separating model behavior from authority, tools, persistence, and recovery in agent-security work.",
  "Making local, committed, preview, and hosted verification boundaries obvious in delivery notes.",
  "Tracing browser, network, backend, data, and policy as one connected system.",
  "Keeping handoffs small enough that another person can continue without reconstructing the session.",
]

const contactGuardrails = [
  "Public links start with context instead of exposing a bare phone number.",
  "The WhatsApp redirect uses a short-lived challenge and replay checks before it forwards.",
  "Email and GitHub stay available when WhatsApp is not the right path.",
]

export default function HomePage() {
  const { theme, updateTheme } = useSiteTheme()
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`dtz-site dtz-${theme}`}>
      <header className="dtz-header">
        <nav className="dtz-nav" aria-label="Primary navigation">
          <Link className="dtz-brand" href="#start" aria-label="David Ortiz home">
            <Image
              className="dtz-logo-img"
              src="/davidtiz-logo-transparent.png"
              alt=""
              width={44}
              height={44}
              priority
              aria-hidden="true"
            />
            <span>
              <strong>David Ortiz</strong>
              <small>technical systems builder</small>
            </span>
          </Link>

          <ul className="dtz-nav-list">
            {homeNavigation.map((item) => (
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
                      aria-label={option.label}
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

      <section id="start" className="dtz-hero dtz-overhaul-hero dtz-proof-first-hero" aria-labelledby="hero-title">
        <motion.div
          className="dtz-hero-copy"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="dtz-kicker">
            <Sparkles aria-hidden="true" />
            Technical systems builder
          </p>
          <h1 id="hero-title">Tools are powerful. Systems make them useful.</h1>
          <p className="dtz-lede">
            I&apos;m David Ortiz. I build web, automation, and security-minded systems, then document the decisions,
            tradeoffs, and evidence that make the work understandable.
          </p>

          <ul className="dtz-hero-badges" aria-label="David's current working areas">
            {focusAreas.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="dtz-hero-actions" aria-label="Primary actions">
            {homePrimaryActions.map((action, index) => (
              <a className={`dtz-button ${index === 0 ? "primary" : "secondary"}`} href={action.href} key={action.href}>
                {action.label}
                {index === 0 ? <ArrowUpRight aria-hidden="true" /> : <BookOpen aria-hidden="true" />}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.aside
          className="dtz-proof-index"
          aria-label="Three selected proof records"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
        >
          <div className="dtz-proof-index-heading">
            <span>Selected proof</span>
            <strong>3 records</strong>
          </div>
          <ol>
            {homeProofRecords.map((record) => (
              <li key={record.id}>
                <a href={`#proof-${record.id}`}>
                  <span className="dtz-proof-index-number">{record.sequence}</span>
                  <span className="dtz-proof-index-copy">
                    <small>{record.eyebrow}</small>
                    <strong>{record.title}</strong>
                  </span>
                  <em>{record.evidence.status}</em>
                </a>
              </li>
            ))}
          </ol>
          <p>Curated for judgment and traceability, not volume.</p>
        </motion.aside>
      </section>

      <section id="work" className="dtz-section dtz-records-section" aria-labelledby="work-title">
        <div className="dtz-section-heading dtz-records-heading">
          <div>
            <p className="dtz-section-label">Selected work</p>
            <h2 id="work-title">Three records. Each shows the choice behind the build.</h2>
          </div>
          <p>
            These are not categories or offers. Each record names the problem, my role, the decision I made, the
            tradeoff I accepted, and where the evidence lives.
          </p>
        </div>

        <div className="dtz-proof-record-list">
          {homeProofRecords.map((record, index) => (
            <motion.article
              id={`proof-${record.id}`}
              className="dtz-proof-record"
              key={record.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.04 }}
            >
              <header className="dtz-proof-record-header">
                <span className="dtz-proof-record-number">{record.sequence}</span>
                <div>
                  <p>{record.eyebrow}</p>
                  <h3>{record.title}</h3>
                </div>
                <strong>{record.evidence.status}</strong>
              </header>

              <dl className="dtz-proof-record-facts">
                <div>
                  <dt>Problem</dt>
                  <dd>{record.problem}</dd>
                </div>
                <div>
                  <dt>My role</dt>
                  <dd>{record.role}</dd>
                </div>
                <div>
                  <dt>Decision</dt>
                  <dd>{record.decision}</dd>
                </div>
                <div>
                  <dt>Tradeoff</dt>
                  <dd>{record.tradeoff}</dd>
                </div>
              </dl>

              <footer className="dtz-proof-record-footer">
                <ul aria-label={`${record.title} themes`}>
                  {record.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div>
                  <small>{record.evidence.note}</small>
                  <Link href={record.evidence.href}>
                    {record.evidence.label}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="process" className="dtz-section" aria-labelledby="process-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">How I work</p>
          <h2 id="process-title">The through-line is judgment I can show.</h2>
          <p>
            The tools change. The operating habit stays the same: inspect first, map authority, test a bounded claim,
            and leave enough evidence for the next person.
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
          <p className="dtz-section-label">Working vocabulary</p>
          <h2 id="stack-title">Tools support the reasoning. They are not the headline.</h2>
          <p>
            This is the small set I reach for after the problem is clear. I care more about the boundary and handoff
            than a wall of logos.
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
            <p className="dtz-section-label">Operating notes</p>
            <h2 id="notes-title">What I am paying attention to now.</h2>
            <p>
              This is the living part of the portfolio: the boundaries, verification habits, and continuation problems
              that are shaping my current work.
            </p>
            <Link className="dtz-notes-link" href="/writeups">
              Open published writeups
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <div className="dtz-notes-panel dtz-field-notes">
            <div className="dtz-field-notes-heading">
              <Workflow aria-hidden="true" />
              <span>Current focus</span>
              <strong>Now</strong>
            </div>
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
          <p className="dtz-section-label">Personal contact</p>
          <h2 id="contact-title">Reach me directly.</h2>
          <p>
            This path is for employment, collaboration, speaking, referrals, peer contact, or a useful technical
            conversation. A short note about who you are and what you want to discuss is enough.
          </p>
        </div>

        <div className="dtz-contact-panel">
          <div className="dtz-contact-card">
            <span>Best first message</span>
            <p>Who are you, what do you want to discuss, and what would make the next step useful?</p>
          </div>
          <div className="dtz-contact-card dtz-contact-guard">
            <span>Contact guardrails</span>
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
          <Link href="/contact">All contact paths</Link>
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/writeups">Writeups</Link>
          <Link href="/privacy">Privacy</Link>
        </span>
      </footer>
    </div>
  )
}
