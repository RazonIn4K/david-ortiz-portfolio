import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CalendarDays, ExternalLink, Mail } from "lucide-react"

import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/brand-icons"
import { ThemeShell } from "@/components/theme-shell"
import { followWorkLinks, quickReachLinks, type ContactLink } from "@/lib/contact-links"

export const metadata: Metadata = {
  title: "Contact | David Ortiz",
  description: "Email David Ortiz or connect through his professional and creative profiles.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | David Ortiz",
    description: "Email David Ortiz or connect through his professional and creative profiles.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact | David Ortiz",
    description: "Email David Ortiz or connect through his professional and creative profiles.",
  },
}

function iconFor(link: ContactLink) {
  const props = { className: "h-4 w-4", "aria-hidden": true } as const

  switch (link.id) {
    case "email":
      return <Mail {...props} />
    case "calendly":
      return <CalendarDays {...props} />
    case "facebook":
      return <FacebookIcon {...props} />
    case "instagram":
      return <InstagramIcon {...props} />
    case "linkedin":
      return <LinkedinIcon {...props} />
    case "github":
      return <GithubIcon {...props} />
    default:
      return <ExternalLink {...props} />
  }
}

function ContactTile({ link }: { link: ContactLink }) {
  const external = link.href.startsWith("http")

  return (
    <a
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-t py-5"
      style={{ borderColor: "var(--dtz-border)" }}
    >
      <span
        className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: "var(--dtz-accent-soft)", color: "var(--dtz-accent)" }}
      >
        {iconFor(link)}
      </span>
      <span>
        <strong className="block text-sm" style={{ color: "var(--dtz-fg)" }}>
          {link.label}
        </strong>
        <span className="mt-1 block text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
          {link.description}
        </span>
      </span>
      <ArrowRight
        className="mt-2 h-4 w-4 transition-transform group-hover:translate-x-1"
        style={{ color: "var(--dtz-accent)" }}
        aria-hidden="true"
      />
    </a>
  )
}

export default function ContactPage() {
  return (
    <ThemeShell>
      <div className="min-h-screen px-6 py-10 md:py-16">
        <div className="mx-auto max-w-5xl">
          <nav>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm"
              style={{ color: "var(--dtz-muted)" }}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to home
            </Link>
          </nav>

          <header className="grid gap-8 border-b py-16 md:grid-cols-[1.35fr_0.65fr] md:items-end md:py-24" style={{ borderColor: "var(--dtz-border)" }}>
            <div>
              <p className="dtz-section-label">Contact</p>
              <h1 className="mt-5 max-w-[10ch] font-serif text-5xl font-medium leading-[0.98] tracking-[-0.045em] md:text-7xl">
                Let&apos;s start with a simple hello.
              </h1>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
              If you have a role, collaboration, question, or idea that feels like a good fit, email is the best place
              to begin. English and Spanish are both welcome.
            </p>
          </header>

          <section className="grid gap-10 py-12 md:grid-cols-[0.65fr_1.35fr] md:py-16" aria-labelledby="reach-title">
            <div>
              <p className="dtz-section-label">Start here</p>
              <h2 id="reach-title" className="mt-3 text-2xl font-semibold">
                Direct ways to connect
              </h2>
            </div>
            <div>
              {quickReachLinks.map((link) => (
                <ContactTile key={link.id} link={link} />
              ))}
            </div>
          </section>

          <section className="grid gap-10 border-t py-12 md:grid-cols-[0.65fr_1.35fr] md:py-16" style={{ borderColor: "var(--dtz-border)" }} aria-labelledby="follow-title">
            <div>
              <p className="dtz-section-label">Elsewhere</p>
              <h2 id="follow-title" className="mt-3 text-2xl font-semibold">
                Follow the work
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                Code, recordings, technical notes, and the public trail behind what I&apos;m learning.
              </p>
            </div>
            <div>
              {followWorkLinks.map((link) => (
                <ContactTile key={link.id} link={link} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </ThemeShell>
  )
}
