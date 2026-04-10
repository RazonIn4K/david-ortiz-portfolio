import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react"

import { followWorkLinks, hireMeLinks, quickReachLinks, type ContactLink } from "@/lib/contact-links"
import { businessSiteUrl, personalSitePublicLabel } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Contact | David Ortiz",
  description:
    "Direct contact hub for David Ortiz. Email, booking, freelance platforms, and links into the rest of the ecosystem.",
}

function iconFor(link: ContactLink) {
  switch (link.id) {
    case "email":
      return Mail
    case "calendly":
      return CalendarDays
    case "upwork":
    case "fiverr":
    case "high-encode":
    case "business-inbox":
      return BriefcaseBusiness
    case "facebook":
      return Facebook
    case "instagram":
      return Instagram
    case "linkedin":
      return Linkedin
    case "github":
      return Github
    default:
      return ExternalLink
  }
}

function isExternal(href: string) {
  return href.startsWith("http")
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
      intro: "Best if you want to inspect the actual code, experiments, and ecosystem around the work.",
      links: followWorkLinks,
    },
  ]

  return (
    <main className="min-h-screen bg-[#060a14] px-6 py-20 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-[#2dd4bf]">Contact</p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">A direct path to David, without making people guess</h1>
          <p className="mt-5 text-lg leading-relaxed text-white/55">
            {personalSitePublicLabel} stays personal, experimental, and reflective. This page is the shareable contact hub:
            the fastest confirmed ways to email, book time, start a freelance conversation, or move into the
            business-facing layer when it makes sense.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/40">
            WhatsApp is the only missing direct channel right now. Once the phone-based business link is finalized, it can slot in here without changing the rest of the layout.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full border border-[#2dd4bf]/20 bg-[#2dd4bf]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#9ae6db]">
              English + Español welcome
            </span>
            <Link
              href="/"
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-colors hover:text-white"
            >
              Back to home
            </Link>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {groups.map(group => (
            <section key={group.heading} className="rounded-3xl border border-white/8 bg-white/[0.03] p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-[#22d3ee]">{group.heading}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{group.intro}</p>

              <div className="mt-6 space-y-3">
                {group.links.map(link => {
                  const Icon = iconFor(link)

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target={isExternal(link.href) ? "_blank" : undefined}
                      rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
                      className="group flex items-start gap-3 rounded-2xl border border-white/8 bg-[#0b1424]/75 px-4 py-4 transition-colors hover:border-white/20 hover:bg-[#0f1a2f]"
                    >
                      <span className="mt-0.5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff6b6b] to-[#ff8e8e] text-white shadow-lg shadow-[#ff6b6b]/10">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="flex items-center gap-2 text-sm font-semibold text-white">
                          {link.label}
                          <ArrowRight className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5" />
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-white/50">{link.description}</span>
                      </span>
                    </a>
                  )
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-white/8 bg-[#08101e]/75 px-6 py-5">
          <p className="text-sm font-semibold text-white">Need the formal business-facing layer?</p>
          <p className="mt-2 text-sm text-white/45">
            High Encode Learning is still the clearest place for scoped work, demos, proposals, and business-side
            conversations. Use this personal site for notes, experiments, and direct human reach.
          </p>
          <a
            href={businessSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#2dd4bf] to-[#22d3ee] px-5 py-3 font-semibold text-[#060a14] transition-transform hover:scale-[1.01]"
          >
            Visit High Encode Learning
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </main>
  )
}
