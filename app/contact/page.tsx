import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  Mail,
  MessageCircle,
} from "lucide-react"

import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons/brand-icons"
import {
  followWorkLinks,
  hireMeLinks,
  quickReachLinks,
  type ContactLink,
} from "@/lib/contact-links"
import { personalSitePublicLabel } from "@/lib/site-config"
import { whatsappHref } from "@/data/content"
import { ProtectedWhatsAppLink } from "@/components/contact/protected-whatsapp-link"
import { ThemeShell } from "@/components/theme-shell"

export const metadata: Metadata = {
  title: "Contact | David Ortiz",
  description:
    "Direct contact hub for David Ortiz. Email, booking, and direct work-intake paths.",
}

function iconFor(link: ContactLink) {
  const props = { className: "h-4 w-4", "aria-hidden": true } as const
  switch (link.id) {
    case "email":
      return <Mail {...props} />
    case "calendly":
      return <CalendarDays {...props} />
    case "upwork":
    case "fiverr":
    case "high-encode":
    case "business-inbox":
      return <BriefcaseBusiness {...props} />
    case "facebook":
      return <FacebookIcon {...props} />
    case "instagram":
      return <InstagramIcon {...props} />
    case "linkedin":
      return <LinkedinIcon {...props} />
    case "whatsapp":
      return <MessageCircle {...props} />
    case "github":
      return <GithubIcon {...props} />
    default:
      return <ExternalLink {...props} />
  }
}

function isExternal(href: string) {
  return href.startsWith("http")
}

const tileClass =
  "group flex items-start gap-3 rounded-2xl border px-4 py-4 transition-colors"
const tileStyle = {
  borderColor: "var(--dtz-border)",
  background: "var(--dtz-panel-2)",
} as const
const iconChipStyle = {
  background: "var(--dtz-accent-soft)",
  color: "var(--dtz-accent)",
} as const

function ContactTile({ link }: { link: ContactLink }) {
  const body = (
    <>
      <span
        className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl"
        style={iconChipStyle}
      >
        {iconFor(link)}
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--dtz-fg)" }}>
          {link.label}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            style={{ color: "var(--dtz-subtle)" }}
            aria-hidden="true"
          />
        </span>
        <span className="mt-1 block text-xs leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
          {link.description}
        </span>
      </span>
    </>
  )

  return link.id === "whatsapp" ? (
    <ProtectedWhatsAppLink
      href={link.href}
      target={isExternal(link.href) ? "_blank" : undefined}
      rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
      className={tileClass}
      style={tileStyle}
    >
      {body}
    </ProtectedWhatsAppLink>
  ) : (
    <a
      href={link.href}
      target={isExternal(link.href) ? "_blank" : undefined}
      rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
      className={tileClass}
      style={tileStyle}
    >
      {body}
    </a>
  )
}

export default function ContactPage() {
  const groups = [
    {
      heading: "Quick reach",
      intro: "Best if you want the shortest path to a real conversation.",
      links: quickReachLinks,
    },
    {
      heading: "Hire me",
      intro: "Best if you already know this is a project, engagement, or freelance conversation.",
      links: hireMeLinks,
    },
    {
      heading: "Follow the work",
      intro:
        "Best if you want to inspect the actual code, experiments, and project follow-through.",
      links: followWorkLinks,
    },
  ]

  return (
    <ThemeShell>
      <main className="min-h-screen px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-3xl">
            <p className="dtz-section-label">Contact</p>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">
              A direct path to David, without making people guess
            </h1>
            <p className="mt-5 text-lg leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
              {personalSitePublicLabel} stays personal, experimental, and reflective. This page is the shareable contact hub:
              the fastest confirmed ways to email, book time, start a freelance conversation, or move into a scoped business discussion.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span
                className="rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em]"
                style={{
                  borderColor: "var(--dtz-border)",
                  background: "var(--dtz-accent-soft)",
                  color: "var(--dtz-accent)",
                }}
              >
                English + Español welcome
              </span>
              <Link
                href="/"
                className="rounded-full border px-4 py-2 text-sm transition-colors"
                style={{ borderColor: "var(--dtz-border)", color: "var(--dtz-muted)" }}
              >
                Back to home
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {groups.map(group => (
              <section
                key={group.heading}
                className="rounded-3xl border p-6"
                style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-panel)" }}
              >
                <p className="dtz-section-label">{group.heading}</p>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--dtz-muted)" }}>
                  {group.intro}
                </p>

                <div className="mt-6 space-y-3">
                  {group.links.map(link => (
                    <ContactTile key={link.id} link={link} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div
            className="mt-8 rounded-3xl border px-6 py-5"
            style={{ borderColor: "var(--dtz-border)", background: "var(--dtz-panel)" }}
          >
            <p className="text-sm font-semibold" style={{ color: "var(--dtz-fg)" }}>
              Prefer a structured intake?
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--dtz-muted)" }}>
              I keep the first message short on purpose. If this is a real project, send scope and timeline so I can
              respond quickly with realistic next steps.
            </p>
            <ProtectedWhatsAppLink
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-transform hover:scale-[1.01]"
              style={{ background: "var(--dtz-accent)", color: "var(--dtz-on-accent)" }}
            >
              Start a project on WhatsApp
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ProtectedWhatsAppLink>
          </div>
        </div>
      </main>
    </ThemeShell>
  )
}
