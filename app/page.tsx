"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { AIAssistant } from "@/components/ui-creative/ai-assistant"
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  Github,
  Mail,
  Moon,
  Network,
  PanelsTopLeft,
  ShieldCheck,
  Sparkles,
  Sun,
  Wrench,
} from "lucide-react"

const navItems = [
  { label: "Start", href: "#start" },
  { label: "Work", href: "#work" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
]

const routes = [
  {
    title: "HighEncode",
    label: "Client work",
    href: "https://highencodelearning.com",
    description: "The business side: websites, lead capture, bilingual pages, and owner-friendly workflow cleanup.",
    icon: BriefcaseBusiness,
    visual: "/visuals/local-business-system.svg",
  },
  {
    title: "GitHub",
    label: "Build log",
    href: "https://github.com/RazonIn4K",
    description: "Repos, experiments, and unfinished trails that are better seen as code than as polished copy.",
    icon: Github,
    visual: "/visuals/project-board.svg",
  },
  {
    title: "CSBrainAI",
    label: "RAG proof",
    href: "https://csbrainai.vercel.app",
    description: "A privacy-first RAG assistant demo with cited answers, validation, rate limits, and hash-only logging.",
    icon: BookOpen,
    visual: "/visuals/notes-map.svg",
  },
  {
    title: "Prompt Defenders",
    label: "AI safety track",
    href: "https://prompt-defenders.vercel.app",
    description: "A separate lane for prompt-injection tests, guardrails, and AI security experiments.",
    icon: ShieldCheck,
    visual: "/visuals/ai-guardrails.svg",
  },
]

const currentThreads = [
  "Cleaning up public-facing sites so the story finally matches the work.",
  "Replacing manual follow-up with small automations that owners can still understand.",
  "Keeping notes on AI tooling, security boundaries, and deployment decisions before I forget the tradeoffs.",
]

const visualStories = [
  {
    title: "Client systems",
    label: "HighEncode lane",
    body: "Public site, quote flow, service pages, follow-up, and the boring handoff details that make the work usable.",
    visual: "/visuals/local-business-system.svg",
    alt: "Illustration of a local business website connected to quote intake and follow-up steps.",
    icon: PanelsTopLeft,
  },
  {
    title: "Personal notes",
    label: "Learning lane",
    body: "Rough notes, diagrams, and the reasoning behind what I am testing instead of pretending everything is final.",
    visual: "/visuals/notes-map.svg",
    alt: "Illustration of notes, branches, and learning paths connected into a map.",
    icon: BookOpen,
  },
  {
    title: "Security experiments",
    label: "AI lane",
    body: "Prompt safety, RAG behavior, and guardrail tests stay separate from local-business delivery so the message is cleaner.",
    visual: "/visuals/ai-guardrails.svg",
    alt: "Illustration of AI guardrails protecting a prompt workflow.",
    icon: ShieldCheck,
  },
  {
    title: "Proof assets",
    label: "Ecosystem lane",
    body: "HighEncode, CSBrainAI, Prompt Defenders, and this personal site each have a clear job instead of sharing one confused pitch.",
    visual: "/visuals/proof-asset-gallery.svg",
    alt: "Gallery map showing HighEncode, CSBrainAI, Prompt Defenders, and davidtiz.com as separate proof assets.",
    icon: Network,
  },
]

const proofPoints = [
  {
    title: "Local-business systems",
    body: "Public proof, quote flow, service pages, and follow-up are treated as one system instead of separate chores.",
    stat: "Sites + ops",
    icon: Wrench,
  },
  {
    title: "AI and security notes",
    body: "Prompt safety, RAG behavior, and workflow guardrails are tracked as experiments, not as vague branding.",
    stat: "AI notes",
    icon: ShieldCheck,
  },
  {
    title: "Personal vs business split",
    body: "This site stays casual and personal. HighEncode stays focused on client-facing delivery.",
    stat: "Clear lanes",
    icon: Network,
  },
]

export default function HomePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const shouldReduceMotion = useReducedMotion()
  const hoverLift = shouldReduceMotion ? undefined : { y: -4 }

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
              <small>personal hub</small>
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

            <a className="dtz-nav-cta" href="https://highencodelearning.com/contact">
              Business site
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </nav>
      </header>

      <section id="start" className="dtz-hero" aria-labelledby="hero-title">
        <motion.div
          className="dtz-hero-copy"
          initial={false}
        >
          <p className="dtz-kicker">
            <Sparkles aria-hidden="true" />
            Personal site. Real work. Cleaner routes.
          </p>
          <h1 id="hero-title">I&apos;m David. I build systems, then write down what happened.</h1>
          <p className="dtz-lede">
            This is the casual hub: client work goes to HighEncode, code goes to GitHub, and the half-formed lessons
            stay here without turning into agency brochure language.
          </p>
          <div className="dtz-hero-actions" aria-label="Primary actions">
            <a className="dtz-button primary" href="#work">
              See the work lanes
              <ArrowUpRight aria-hidden="true" />
            </a>
            <a className="dtz-button secondary" href="mailto:hello@highencodelearning.com">
              Email me
              <Mail aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="dtz-hero-visual"
          aria-label="Visual portfolio workbench"
          initial={false}
        >
          <div className="dtz-workbench-frame">
            <Image
              src="/visuals/generated-workbench.webp"
              alt="Generated desk scene with a laptop, notebook, project cards, routing lines, and a circuit-style mark."
              width={1536}
              height={1024}
              priority
            />
          </div>

          <div className="dtz-logo-tile">
            <Image src="/logo-v1.png" alt="Generated David Ortiz circuit logo mark." width={1024} height={1024} />
            <div>
              <span>Generated mark</span>
              <strong>DO / systems</strong>
            </div>
          </div>

          <div className="dtz-stack-card">
            <span>Current lanes</span>
            <div>
              <strong>HighEncode</strong>
              <small>client delivery</small>
            </div>
            <div>
              <strong>Notes</strong>
              <small>learning log</small>
            </div>
            <div>
              <strong>CSBrainAI</strong>
              <small>RAG proof</small>
            </div>
            <div>
              <strong>AI safety</strong>
              <small>separate track</small>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="dtz-band" aria-labelledby="plain-title">
        <div>
          <p className="dtz-section-label">Plain version</p>
          <h2 id="plain-title">This should answer one question fast: where should someone go next?</h2>
        </div>
        <p>
          If someone wants client work, send them to HighEncode. If they want to understand how I think, this page is
          enough. If they want code, GitHub is the trail.
        </p>
      </section>

      <section className="dtz-section dtz-showcase" aria-labelledby="showcase-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Visual index</p>
          <h2 id="showcase-title">Three lanes, shown instead of overexplained.</h2>
          <p>
            The point is not to make everything sound bigger than it is. The point is to separate the work so each link
            makes sense on its own.
          </p>
        </div>

        <div className="dtz-generated-banner">
          <Image
            src="/visuals/gemini-ecosystem-hero.webp"
            alt="Gemini-generated hero illustration showing connected browser windows, secure data paths, cloud infrastructure, and AI workflow components."
            width={1800}
            height={900}
            loading="eager"
          />
        </div>

        <div className="dtz-generated-banner">
          <Image
            src="/visuals/ecosystem-layer-map.svg"
            alt="Diagram mapping davidtiz.com, HighEncode, CSBrainAI, Prompt Defenders, GitHub notes, and shared infrastructure layers."
            width={1400}
            height={820}
            loading="lazy"
          />
        </div>

        <div className="dtz-generated-banner">
          <Image
            src="/visuals/proof-asset-gallery.svg"
            alt="Gallery-style visual showing each public surface as a separate proof asset with a shared deployment layer."
            width={1400}
            height={820}
            loading="lazy"
          />
        </div>

        <div className="dtz-showcase-grid">
          {visualStories.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.article
                className="dtz-showcase-card"
                key={item.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.05 }}
              >
                <div className="dtz-showcase-media">
                  <Image src={item.visual} alt={item.alt} width={900} height={640} />
                </div>
                <div className="dtz-showcase-copy">
                  <span className="dtz-card-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="dtz-card-label">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>

      <section id="work" className="dtz-section" aria-labelledby="work-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Work surfaces</p>
          <h2 id="work-title">The important links, without making you decode the whole brand map.</h2>
        </div>

        <div className="dtz-card-grid">
          {routes.map((route) => {
            const Icon = route.icon

            return (
              <motion.a
                className="dtz-card dtz-route-card link-card"
                href={route.href}
                key={route.href}
                whileHover={hoverLift}
                transition={{ duration: 0.16, ease: "easeOut" }}
              >
                <span className="dtz-card-media" aria-hidden="true">
                  <Image src={route.visual} alt="" width={900} height={640} />
                </span>
                <span className="dtz-card-icon" aria-hidden="true">
                  <Icon />
                </span>
                <span className="dtz-card-label">{route.label}</span>
                <strong>{route.title}</strong>
                <span>{route.description}</span>
                <span className="dtz-card-link">
                  Open
                  <ArrowUpRight aria-hidden="true" />
                </span>
              </motion.a>
            )
          })}
        </div>
      </section>

      <section id="notes" className="dtz-section dtz-two-col" aria-labelledby="notes-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Notebook</p>
          <h2 id="notes-title">What I&apos;m paying attention to right now.</h2>
          <p>
            Keeping this simple is the point: fewer claims, more useful notes, and cleaner boundaries between personal
            learning and client work.
          </p>
        </div>

        <div className="dtz-notes-panel">
          <Image src="/visuals/notes-map.svg" alt="" width={900} height={640} aria-hidden="true" />
          <ul className="dtz-check-list">
            {currentThreads.map((thread) => (
              <li key={thread}>
                <CheckCircle2 aria-hidden="true" />
                <span>{thread}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="dtz-section" aria-labelledby="proof-title">
        <div className="dtz-section-heading">
          <p className="dtz-section-label">Proof points</p>
          <h2 id="proof-title">What the work is actually about.</h2>
        </div>

        <div className="dtz-proof-grid">
          {proofPoints.map((item) => {
            const Icon = item.icon

            return (
              <article className="dtz-proof" key={item.title}>
                <span>{item.stat}</span>
                <Icon aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section id="contact" className="dtz-contact" aria-labelledby="contact-title">
        <div>
          <p className="dtz-section-label">Contact</p>
          <h2 id="contact-title">Send the messy version. A rough description is enough.</h2>
          <p>
            Share the link, what feels off, and what outcome you want. If it is business-facing, I will route it through
            HighEncode so the scope stays clean.
          </p>
        </div>
        <div className="dtz-contact-panel">
          <Image src="/visuals/systems-routing.svg" alt="" width={900} height={640} aria-hidden="true" />
          <div className="dtz-contact-actions">
            <a className="dtz-button primary" href="mailto:hello@highencodelearning.com">
              hello@highencodelearning.com
              <Mail aria-hidden="true" />
            </a>
            <a className="dtz-button secondary" href="https://highencodelearning.com">
              Visit HighEncode
              <Network aria-hidden="true" />
            </a>
          </div>
          <p>
            I would rather start with a plain note and scope it honestly than pretend every idea is ready for a sales
            page.
          </p>
        </div>
      </section>

      <footer className="dtz-footer">
        <span>David Ortiz</span>
        <span>Personal hub for notes, experiments, and routing the right work to the right place.</span>
      </footer>

      <AIAssistant />
    </div>
  )
}
