"use client"

import { useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { GithubIcon } from "@/components/icons/brand-icons"
import { ProtectedWhatsAppLink } from "@/components/contact/protected-whatsapp-link"
import { AIAssistant } from "@/components/ai-assistant"
import { useSiteTheme } from "@/components/use-site-theme"
import { contact, heroChips, proofCards, whatsappHref } from "@/data/content"
import type { WriteupMeta } from "@/lib/writeups"
import {
  ArrowUpRight,
  Code2,
  Compass,
  FileText,
  Mail,
  MessageCircle,
  Moon,
  Sun,
} from "lucide-react"

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Writeups", href: "/writeups" },
  { label: "Contact", href: "#contact" },
]

const processSteps = [
  {
    title: "Recon The Real Surface",
    body: "Start from the actual model, repo, or live site, not a slide about it.",
    icon: Compass,
  },
  {
    title: "Build And Break In Passes",
    body: "Ship a working version, test it, attack it, tighten it.",
    icon: Code2,
  },
  {
    title: "Write It Down",
    body: "Dated writeups and handoff docs, with sensitive details redacted.",
    icon: FileText,
  },
]

const subscribeNoop = () => () => {}
const getTrue = () => true
const getFalse = () => false

export function HomePage({ labNotes }: { labNotes: WriteupMeta[] }) {
  const { theme, updateTheme } = useSiteTheme()
  const shouldReduceMotion = useReducedMotion()
  // useSyncExternalStore reports false during SSR/hydration, true right after.
  const hydrated = useSyncExternalStore(subscribeNoop, getTrue, getFalse)

  // Motion props must be identical on server and client render (SSR bakes the
  // initial styles into the HTML), so the reduced-motion branch may only kick
  // in after hydration: it swaps the scroll-gated reveal for an instant one.
  const instantReveal = Boolean(hydrated && shouldReduceMotion)
  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: instantReveal ? { opacity: 1, y: 0 } : undefined,
    whileInView: { opacity: 1, y: 0 },
    transition: instantReveal ? { duration: 0 } : { duration: 0.45, ease: "easeOut" as const, delay },
  })

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
              <small>AI Security Engineer</small>
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

      <section id="start" className="dtz-hero dtz-command-hero" aria-labelledby="hero-title">
        <motion.div
          className="dtz-hero-copy"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: "easeOut" }}
        >
          <p className="dtz-eyebrow">
            AI security <span aria-hidden="true">{"//"}</span> offensive evaluation · production software
          </p>
          <h1 id="hero-title">I break AI systems and ship production software.</h1>

          <div className="dtz-hero-actions" aria-label="Primary actions">
            <a className="dtz-button primary" href="#work">
              See the work
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="dtz-button secondary" href="#process">
              How I work
              <Compass aria-hidden="true" />
            </a>
          </div>

          <ul className="dtz-tag-list dtz-hero-chips" aria-label="Credentials">
            {heroChips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
        </motion.div>
      </section>

      <section id="work" className="dtz-section dtz-proof-section" aria-labelledby="work-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Selected proof</p>
          <h2 id="work-title">Break results, rankings, and live builds.</h2>
        </div>

        <div className="dtz-proof-surface-grid">
          {proofCards.map((item, index) => {
            const linkProps = item.external ? { target: "_blank", rel: "noreferrer" } : undefined

            return (
              <motion.article
                className="dtz-proof-surface"
                key={item.title}
                {...reveal(index * 0.06)}
                viewport={{ once: true, amount: 0.25 }}
              >
                <div className="dtz-proof-surface-copy">
                  <ul className="dtz-tag-list" aria-label={`${item.title} status`}>
                    {item.badges.map((badge) => (
                      <li key={badge}>{badge}</li>
                    ))}
                  </ul>
                  <h3>{item.title}</h3>
                  <p>{item.result}</p>
                  {item.context ? <p>{item.context}</p> : null}
                  <a href={item.href} {...linkProps}>
                    {item.linkLabel}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                  {item.secondaryHref && item.secondaryLabel ? (
                    <a href={item.secondaryHref} target="_blank" rel="noreferrer">
                      {item.secondaryLabel}
                      <ArrowUpRight aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
              </motion.article>
            )
          })}
        </div>

        <div className="dtz-lab-strip">
          <p className="dtz-section-label">Lab log</p>
          <ol className="dtz-lab-list">
            {labNotes.map((note) => (
              <li key={note.slug}>
                <span className="dtz-lab-date">{note.date}</span>
                <div>
                  <Link href={`/writeups/${note.slug}`}>{note.title}</Link>
                  <ul className="dtz-tag-list" aria-label={`${note.title} tags`}>
                    <li>{note.category}</li>
                    <li>{note.difficulty}</li>
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <Link className="dtz-card-link" href="/writeups">
            All writeups
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section id="process" className="dtz-section" aria-labelledby="process-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">How I work</p>
          <h2 id="process-title">Same loop for security work and software.</h2>
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

      <section id="contact" className="dtz-contact dtz-overhaul-contact" aria-labelledby="contact-title">
        <div>
          <p className="dtz-section-label">Contact</p>
          <h2 id="contact-title">Send the target, the question, or the build.</h2>
          <p>WhatsApp is fastest. Email works. The code is public.</p>
        </div>

        <div className="dtz-contact-panel">
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

      <AIAssistant />
    </div>
  )
}
