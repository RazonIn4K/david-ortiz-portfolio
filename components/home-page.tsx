"use client"

import { useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { GithubIcon } from "@/components/icons/brand-icons"
import { ProtectedWhatsAppLink } from "@/components/contact/protected-whatsapp-link"
import { AIAssistant } from "@/components/ai-assistant"
import { useSiteTheme } from "@/components/use-site-theme"
import { contact, currentFocus, flagshipSystems, heroStatus, whatsappHref, workLanes } from "@/data/content"
import type { WriteupMeta } from "@/lib/writeups"
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Compass,
  FileText,
  Mail,
  MessageCircle,
  Moon,
  ShieldCheck,
  Sun,
} from "lucide-react"

const navItems = [
  { label: "Work", href: "#work" },
  { label: "Lab", href: "#lab" },
  { label: "Process", href: "#process" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
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

const contactGuardrails = [
  "Public links start with project context instead of a bare phone number.",
  "A future WhatsApp/n8n screener can label spam, ask one clarifying question, and keep human approval on replies.",
  "Direct calls should happen after context, not as the first public CTA bots can scrape.",
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
              <small>Technical Systems Builder</small>
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
            Systems builder <span aria-hidden="true">{"//"}</span> AI orchestration · Security · Automation
          </p>
          <h1 id="hero-title">I build systems out of many AIs.</h1>
          <p className="dtz-lede">
            I coordinate models, tools, and workflows into systems that hold up, and I study how they fail in public.
            Not one technology, a working stack of them.
          </p>

          <div className="dtz-hero-actions" aria-label="Primary actions">
            <a className="dtz-button primary" href="#work">
              See the systems
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="dtz-button secondary" href="#process">
              How I work
              <Compass aria-hidden="true" />
            </a>
          </div>

          <div className="dtz-status-strip" aria-label="Current status">
            <p>
              <span className="dtz-status-dot" aria-hidden="true" />
              <strong>Now</strong>
              <span>{heroStatus.now}</span>
            </p>
            <p>
              <strong>Last shipped</strong>
              <span>
                <Link href={heroStatus.lastShipped.href}>{heroStatus.lastShipped.label}</Link> ·{" "}
                {heroStatus.lastShipped.date}
              </span>
            </p>
          </div>
        </motion.div>
      </section>

      <section id="work" className="dtz-section dtz-proof-section" aria-labelledby="work-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Selected systems</p>
          <h2 id="work-title">Three systems, each with proof.</h2>
          <p>
            The flagship builds, all in the same format: the problem, what I built, and what it proves. The rest of the
            bench is below, and the working notes live in the lab.
          </p>
        </div>

        <div className="dtz-proof-surface-grid">
          {flagshipSystems.map((item, index) => {
            const media = (
              <Image src={item.image} alt={item.alt} width={1440} height={index === 0 ? 1000 : 729} />
            )
            const linkProps = item.external ? { target: "_blank", rel: "noreferrer" } : undefined

            return (
              <motion.article
                className={index === 0 ? "dtz-proof-surface is-featured" : "dtz-proof-surface"}
                key={item.title}
                {...reveal(index * 0.06)}
                viewport={{ once: true, amount: 0.25 }}
              >
                {item.external ? (
                  <a className="dtz-proof-surface-media" href={item.href} {...linkProps}>
                    {media}
                  </a>
                ) : (
                  <Link className="dtz-proof-surface-media" href={item.href}>
                    {media}
                  </Link>
                )}
                <div className="dtz-proof-surface-copy">
                  <ul className="dtz-tag-list" aria-label={`${item.title} status`}>
                    {item.badges.map((badge) => (
                      <li key={badge}>{badge}</li>
                    ))}
                  </ul>
                  <h3>{item.title}</h3>
                  <dl className="dtz-system-lines">
                    <div>
                      <dt>Problem</dt>
                      <dd>{item.problem}</dd>
                    </div>
                    <div>
                      <dt>Built</dt>
                      <dd>{item.built}</dd>
                    </div>
                    <div>
                      <dt>Proves</dt>
                      <dd>{item.proves}</dd>
                    </div>
                  </dl>
                  <a href={item.href} {...linkProps}>
                    {item.linkLabel}
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>

        <ul className="dtz-lane-list" aria-label="Other working lanes">
          {workLanes.map((lane) => (
            <li key={lane.title}>
              <span className="dtz-lane-label">{lane.label}</span>
              <div>
                <strong>{lane.title}</strong>
                <p>{lane.line}</p>
              </div>
              {lane.href && lane.linkLabel ? (
                <a className="dtz-card-link" href={lane.href}>
                  {lane.linkLabel}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section id="process" className="dtz-section" aria-labelledby="process-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">How I work</p>
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

      <section id="lab" className="dtz-section" aria-labelledby="lab-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">From the lab</p>
          <h2 id="lab-title">Latest writeups, dated and inspectable.</h2>
          <p>
            Technique-first writeups from real challenges: what broke, how it was approached, and what it proves. Flags
            and live details stay redacted.
          </p>
        </div>

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
          Open the lab log
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </section>

      <section id="stack" className="dtz-section dtz-stack-section" aria-labelledby="stack-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Stack</p>
          <h2 id="stack-title">Tools behind the calm handoff.</h2>
          <p>
            Visitors should not have to care about the stack. I use it to make the finished setup fast, reliable,
            secure enough for the job, and easier to maintain.
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
            <h2 id="notes-title">What I&apos;m paying attention to right now.</h2>
            <p>
              This is the living part of the portfolio: systems thinking, practical security habits, useful automation,
              and proof that survives beyond a sales conversation.
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
          <h2 id="contact-title">Start a conversation about the work.</h2>
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
