"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { GithubIcon } from "@/components/icons/brand-icons"
import { ProtectedWhatsAppLink } from "@/components/contact/protected-whatsapp-link"
import { AIAssistant } from "@/components/ai-assistant"
import { useSiteTheme } from "@/components/use-site-theme"
import { contact, whatsappHref } from "@/data/content"
import {
  ArrowUpRight,
  AtSign,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Compass,
  FileText,
  Globe,
  LockKeyhole,
  Mail,
  MessageCircle,
  Moon,
  ShieldCheck,
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

const proofSignals = [
  "Selected work people can inspect",
  "Operating notes on real systems",
  "Automation and AI-security checks",
  "Clear handoff, not hidden complexity",
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
    body: "Small-business flows for owners and customers who live on mobile, WhatsApp, and social.",
    image: "/visuals/local-business-system.svg",
    href: "/demo",
    alt: "Illustrated local business system showing connected website, social, and contact paths.",
  },
  {
    label: "Setup layer",
    title: "Domain, inbox, social, handoff",
    body: "The professional pieces around the site are part of the work, not an afterthought.",
    image: "/visuals/generated-workbench.webp",
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
    detail: "Facebook, Instagram, WhatsApp paths",
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
    title: "Social And WhatsApp Paths",
    body: "Connecting the site to the places customers already use, with a guarded WhatsApp path so the phone number is not exposed to scrapers.",
    points: ["WhatsApp guard route", "Social profile buttons", "Google/local links"],
    icon: Smartphone,
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
    label: "Web",
    title: "Local Business Sites",
    body: "Selected proof: customer-facing sites with clear services, forms, and bilingual-friendly copy. Used to show how I think about layout, contact paths, and owner handoff.",
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
    image: "/visuals/generated-lanes.webp",
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

const contactGuardrails = [
  "Public links start with project context instead of a bare phone number.",
  "A future WhatsApp/n8n screener can label spam, ask one clarifying question, and keep human approval on replies.",
  "Direct calls should happen after context, not as the first public CTA bots can scrape.",
]

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
            Selected work, operating notes, and systems thinking
          </p>
          <h1 id="hero-title">I build practical web, automation, and AI-security systems.</h1>
          <p className="dtz-lede">
            I&apos;m David Ortiz. This is my personal proof hub: selected work, operating notes, and the decisions behind
            the systems I build, test, and hand off.
          </p>

          <ul className="dtz-hero-badges" aria-label="What David can set up">
            {heroHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="dtz-hero-actions" aria-label="Primary actions">
            <a className="dtz-button primary" href="#work">
              View selected work
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="dtz-button secondary" href="#notes">
              Read operating notes
              <BookOpen aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="dtz-hero-visual dtz-overhaul-visual dtz-showcase-stage"
          aria-label="Website design and setup proof"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <div className="dtz-stage-topline">
            <span>Live screens, not just claims</span>
            <Link href="/portfolio">
              View portfolio
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <div className="dtz-stage-grid">
            <Link className="dtz-live-preview" href="/portfolio">
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

            <div className="dtz-stage-column">
              <Link className="dtz-mini-preview" href="/portfolio">
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

              <div className="dtz-handoff-panel">
                <span>Owner handoff</span>
                <strong>Domain, inbox, social, recovery</strong>
                <p>Set up around the tools the owner already uses.</p>
              </div>
            </div>
          </div>

          <div className="dtz-stage-checks" aria-label="Setup path">
            {launchFlow.map((item) => {
              const Icon = item.icon

              return (
                <div className="dtz-stage-check" key={item.title}>
                  <span aria-hidden="true">
                    <Icon aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </section>

      <section className="dtz-section dtz-proof-section" aria-labelledby="proof-title">
        <div className="dtz-section-heading dtz-proof-heading">
          <div>
            <p className="dtz-section-label">Proof of work</p>
            <h2 id="proof-title">Make the work visible before someone has to ask.</h2>
          </div>
          <p>
            I show the customer-facing surface and the practical setup behind it: domain, email, WhatsApp/social paths,
            security basics, and a plain handoff. The proof is inspectable, not just claimed.
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

        <div className="dtz-proof-surface-grid">
          {proofSurfaces.map((item, index) => (
            <motion.article
              className={index === 0 ? "dtz-proof-surface is-featured" : "dtz-proof-surface"}
              key={item.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.06 }}
            >
              <Link className="dtz-proof-surface-media" href={item.href}>
                <Image src={item.image} alt={item.alt} width={1440} height={index === 0 ? 1000 : 729} />
              </Link>
              <div className="dtz-proof-surface-copy">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Link href={item.href}>
                  Inspect it
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="setup" className="dtz-section dtz-services-section" aria-labelledby="setup-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Selected proof</p>
          <h2 id="setup-title">The practical layer behind the site.</h2>
          <p>
            A working local-business site needs more than a homepage. These are the pieces I connect and document so the
            owner can keep the system running after handoff.
          </p>
        </div>

        <div className="dtz-setup-grid">
          {setupCards.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.article
                className="dtz-setup-card"
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
              >
                <span className="dtz-setup-icon">
                  <Icon aria-hidden="true" />
                </span>
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
        </div>
      </section>

      <section id="work" className="dtz-section" aria-labelledby="work-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Selected work</p>
          <h2 id="work-title">Working lanes and proof people can inspect.</h2>
          <p>
            These are categories and proof cards, not a brand directory. Each one points to a practical thing I can
            design, connect, test, and explain clearly.
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
