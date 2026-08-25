"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowDownRight, ArrowUpRight, BookOpen, Mail, MapPin, Moon, Sun } from "lucide-react"

import { GithubIcon, LinkedinIcon } from "@/components/icons/brand-icons"
import { useSiteTheme } from "@/components/use-site-theme"
import { contact } from "@/data/content"
import { homeNavigation, homePrimaryActions, homeProofRecords } from "@/data/home-content"

const principles = [
  {
    number: "01",
    title: "Look closely first.",
    body: "I start with the page, workflow, source, or evidence that actually exists. The right change usually becomes clearer once the real surface is understood.",
  },
  {
    number: "02",
    title: "Make the choice legible.",
    body: "A polished result matters, but so does the reasoning behind it. I explain what I chose, what I left out, and why.",
  },
  {
    number: "03",
    title: "Leave a useful trail.",
    body: "I document enough for another person—or future me—to inspect the work and continue without reconstructing the whole story.",
  },
]

const workingWith = [
  "Next.js",
  "React",
  "TypeScript",
  "Cloudflare",
  "APIs",
  "Shell",
  "Ghidra",
  "Technical writing",
]

const currentQuestions = [
  "How should AI agents prove what they were actually authorized to do?",
  "What makes a technical handoff easy for the next person to trust and continue?",
  "How can a small web experience feel simpler without hiding the decisions underneath it?",
]

export default function PersonalHomepage() {
  const { theme, updateTheme } = useSiteTheme()

  return (
    <div className={`dtz-site dtz-${theme} dtz-editorial-site`}>
      <header className="dtz-editorial-header">
        <nav className="dtz-editorial-nav" aria-label="Primary navigation">
          <Link className="dtz-editorial-brand" href="#start" aria-label="David Ortiz home">
            <Image
              src="/davidtiz-logo-transparent.png"
              alt=""
              width={42}
              height={42}
              priority
              aria-hidden="true"
            />
            <span>
              <strong>David Ortiz</strong>
              <small>Builder · learner · documentarian</small>
            </span>
          </Link>

          <ul className="dtz-editorial-nav-links">
            {homeNavigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          <fieldset className="dtz-editorial-theme" aria-label="Color theme">
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
                  <span className="sr-only">{option.label}</span>
                </label>
              )
            })}
          </fieldset>
        </nav>
      </header>

      <main>
        <section id="start" className="dtz-editorial-hero" aria-labelledby="hero-title">
          <div className="dtz-editorial-hero-main">
            <p className="dtz-editorial-overline">Independent work · August 2026</p>
            <h1 id="hero-title">I make complicated systems easier to understand—and easier to use.</h1>
            <p className="dtz-editorial-lede">
              I&apos;m David, a technical builder in DeKalb, Illinois. My work moves between web interfaces,
              automation, and security research, with a steady focus on turning messy problems into something people
              can inspect, use, and continue.
            </p>

            <div className="dtz-editorial-actions" aria-label="Primary actions">
              {homePrimaryActions.map((action, index) => (
                <a className={index === 0 ? "is-primary" : "is-secondary"} href={action.href} key={action.href}>
                  {action.label}
                  {index === 0 ? <ArrowDownRight aria-hidden="true" /> : <BookOpen aria-hidden="true" />}
                </a>
              ))}
            </div>
          </div>

          <aside className="dtz-editorial-intro-card" aria-label="A short introduction">
            <span className="dtz-editorial-intro-number">DO / 01</span>
            <blockquote>
              “I like work that asks me to understand the whole path—not just the screen in front of me.”
            </blockquote>
            <div>
              <MapPin aria-hidden="true" />
              <span>DeKalb, Illinois</span>
            </div>
          </aside>
        </section>

        <section id="work" className="dtz-editorial-section dtz-editorial-work" aria-labelledby="work-title">
          <header className="dtz-editorial-section-heading">
            <p>Selected work</p>
            <div>
              <h2 id="work-title">A few things I&apos;ve built and documented.</h2>
              <p>
                Small enough to inspect, specific enough to show how I think. Each piece links to the actual record or
                writeup.
              </p>
            </div>
          </header>

          <div className="dtz-editorial-work-grid">
            {homeProofRecords.map((record, index) => (
              <article className={index === 0 ? "is-featured" : ""} id={`proof-${record.id}`} key={record.id}>
                <div className="dtz-editorial-work-meta">
                  <span>{record.sequence}</span>
                  <span>{record.eyebrow}</span>
                  <span>{record.year}</span>
                </div>
                <div className="dtz-editorial-work-copy">
                  <h3>{record.title}</h3>
                  <p>{record.summary}</p>
                </div>
                <footer>
                  <ul aria-label={`${record.title} themes`}>
                    {record.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <Link href={record.evidence.href}>
                    {record.evidence.label}
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section id="approach" className="dtz-editorial-section dtz-editorial-approach" aria-labelledby="approach-title">
          <div className="dtz-editorial-approach-intro">
            <p>My approach</p>
            <h2 id="approach-title">Curious about the details. Careful about the claim.</h2>
            <p>
              I enjoy the moment when a complicated system starts to make sense. The process is practical: observe,
              make a clear choice, test it, and write down what matters.
            </p>
          </div>

          <ol className="dtz-editorial-principles">
            {principles.map((principle) => (
              <li key={principle.number}>
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="dtz-editorial-tools" aria-label="Tools and disciplines David works with">
            <p>Usually working with</p>
            <ul>
              {workingWith.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="notes" className="dtz-editorial-section dtz-editorial-notes" aria-labelledby="notes-title">
          <div className="dtz-editorial-notes-lead">
            <p>Field notes</p>
            <h2 id="notes-title">Questions shaping the work right now.</h2>
            <Link href="/writeups">
              Read all seven security writeups
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>

          <ol>
            {currentQuestions.map((question, index) => (
              <li key={question}>
                <span>0{index + 1}</span>
                <p>{question}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="contact" className="dtz-editorial-contact" aria-labelledby="contact-title">
          <div>
            <p>Say hello</p>
            <h2 id="contact-title">Have something worth talking through?</h2>
            <p>Work, collaborations, and thoughtful technical conversations are always welcome.</p>
          </div>
          <div className="dtz-editorial-contact-actions">
            <a className="is-primary" href={`mailto:${contact.email}`}>
              <span>Email me</span>
              <strong>{contact.email}</strong>
              <Mail aria-hidden="true" />
            </a>
            <a href={contact.github} target="_blank" rel="noreferrer">
              GitHub
              <GithubIcon aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/davidortiz-dekalb/" target="_blank" rel="noreferrer">
              LinkedIn
              <LinkedinIcon aria-hidden="true" />
            </a>
            <Link href="/contact">
              More ways to connect
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="dtz-editorial-footer">
        <span>© 2026 David Ortiz</span>
        <span>Built with care in DeKalb, Illinois.</span>
        <nav aria-label="Footer navigation">
          <Link href="/portfolio">Portfolio</Link>
          <Link href="/writeups">Writeups</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </footer>
    </div>
  )
}
