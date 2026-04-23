"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { HexGridBackground } from "@/components/ui-creative/hex-grid-bg";
import { TerminalHero } from "@/components/ui-creative/terminal-hero";
import { OrbitVisualization } from "@/components/ui-creative/orbit-visualization";
import { AnimatedStats } from "@/components/ui-creative/animated-stats";
import { ServiceGrid } from "@/components/ui-creative/service-grid";
import { EcosystemLinks } from "@/components/ui-creative/ecosystem-links";
import {
  footerEcosystemLinks,
  footerPrimaryLinks,
  followWorkLinks,
  hireMeLinks,
  quickReachLinks,
  type ContactLink,
} from "@/lib/contact-links";
import { businessSiteUrl, personalSitePublicLabel } from "@/lib/site-config";

function iconFor(link: ContactLink) {
  switch (link.id) {
    case "email":
      return Mail;
    case "calendly":
      return CalendarDays;
    case "upwork":
    case "fiverr":
    case "high-encode":
    case "business-inbox":
      return BriefcaseBusiness;
    case "facebook":
      return Facebook;
    case "instagram":
      return Instagram;
    case "linkedin":
      return Linkedin;
    case "github":
      return Github;
    default:
      return ExternalLink;
  }
}

function isExternal(href: string) {
  return href.startsWith("http");
}

const hernandezHighlights = [
  {
    title: "Bilingual website",
    description: "English and Spanish paths for a local landscaping audience.",
  },
  {
    title: "Prefilled quote flow",
    description:
      "Service chips and form fields move visitors toward the right estimate request faster.",
  },
  {
    title: "Sourced trust proof",
    description:
      "Real work photos and public review proof give prospects something specific to inspect.",
  },
];

const homeNavItems = [
  { label: "Focus", href: "#focus" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Learning", href: "#learning" },
  { label: "Contact", href: "#contact" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#060a14] text-white overflow-x-hidden">
      {/* Background */}
      <HexGridBackground />

      {/* Header */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center font-bold text-[#060a14] text-lg">
              DO
            </div>
            <div>
              <span className="font-semibold text-white">David Ortiz</span>
              <p className="text-xs text-white/40">Personal notebook</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center gap-8"
          >
            {homeNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-white/50 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2dd4bf] to-[#22d3ee] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <a
              href="#contact"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white font-medium text-sm hover:shadow-lg hover:shadow-[#ff6b6b]/25 transition-shadow"
            >
              Contact
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-12 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left column - Text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8"
              >
                <Sparkles className="w-4 h-4 text-[#2dd4bf]" />
                <span className="text-sm text-white/60">
                  Portfolio + build notes
                </span>
                <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
              >
                Documenting{" "}
                <span className="gradient-text text-glow-teal">AI systems</span>
                <br />
                and{" "}
                <span className="gradient-text-warm">abstraction layers</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/50 mb-10 max-w-lg leading-relaxed"
              >
                Start with the portfolio if you need proof of work. The rest of
                this site keeps the build logs, experiments, demos, and notes
                behind the web systems, automations, and local-business
                workflows I ship.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/portfolio"
                  className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] px-8 py-4 font-semibold text-white transition-all hover:shadow-xl hover:shadow-[#ff6b6b]/20"
                >
                  View portfolio
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://hernandezlandscapeservices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-2 rounded-lg border border-white/10 px-8 py-4 font-medium transition-colors hover:border-white/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Hernandez site
                </a>
              </motion.div>
            </div>

            {/* Right column - Terminal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="hidden lg:block"
            >
              <TerminalHero />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="flex flex-col items-center gap-2 text-white/30"
            >
              <span className="text-xs uppercase tracking-wider">
                Scroll to explore
              </span>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedStats />
        </div>
      </section>

      {/* How It Works - Orbit Visualization */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-[#2dd4bf] text-sm font-medium uppercase tracking-wider"
              >
                The Ecosystem
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mt-4 mb-6"
              >
                A working system is more than
                <br />
                <span className="gradient-text">frontend vs backend</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/50 text-lg leading-relaxed mb-8"
              >
                I use this section to think through the layers around a web
                system: browser runtime, frontend UX, APIs, storage, deployment,
                and the business rules that sit above the code.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  "Browser",
                  "Frontend",
                  "API",
                  "Infrastructure",
                  "Business Layer",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 rounded-full glass text-sm text-white/70"
                  >
                    {tool}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <OrbitVisualization />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Focus Section */}
      <section id="focus" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#2dd4bf] text-sm font-medium uppercase tracking-wider">
              Focus Areas
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              What I&apos;m building and testing
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              These are the themes I keep returning to while I study, prototype,
              and document how systems behave in the real world.
            </p>
          </motion.div>

          <ServiceGrid />
        </div>
      </section>

      {/* Portfolio Proof Section */}
      <section id="portfolio" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/8 bg-[#08101e]/80 p-4 shadow-2xl shadow-black/30"
            >
              <Image
                src="/portfolio/hernandez/site-screenshot.png"
                alt="Hernandez Landscape website design screenshot"
                width={1440}
                height={1000}
                className="h-auto w-full rounded-2xl border border-white/10"
                priority={false}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center rounded-full border border-[#7ac943]/25 bg-[#7ac943]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#b8f28e]">
                Portfolio proof
              </span>
              <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
                Hernandez Landscape is the local-business example to show first
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-white/50">
                This is a real landscaping website build, not a generic mockup.
                It gives prospects a concrete reference for bilingual messaging,
                service pages, prefilled quote capture, project photos, and
                sourced trust signals for a local contractor.
              </p>

              <div className="mt-8 grid gap-4">
                {hernandezHighlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
                  >
                    <p className="text-sm font-semibold text-white">
                      {highlight.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/45">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="https://hernandezlandscapeservices.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7ac943] to-[#2dd4bf] px-6 py-3 font-semibold text-[#06140e] transition-transform hover:scale-[1.01]"
                >
                  View Hernandez site
                  <ExternalLink className="h-4 w-4" />
                </a>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-3 font-semibold text-white/75 transition-colors hover:border-white/25 hover:text-white"
                >
                  Open portfolio page
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`${businessSiteUrl}/work`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#2dd4bf]/25 bg-[#2dd4bf]/10 px-6 py-3 font-semibold text-[#9ae6db] transition-colors hover:border-[#2dd4bf]/45 hover:bg-[#2dd4bf]/15"
                >
                  High Encode proof chain
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03]"
            >
              <Image
                src="/portfolio/hernandez/landscape-work-hero.jpeg"
                alt="Hernandez Landscape real project photo"
                width={1600}
                height={1000}
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="p-6">
                <p className="text-sm font-semibold text-white">
                  Real work imagery
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  The design uses actual project photos so the site feels
                  grounded and specific to the business.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="overflow-hidden rounded-3xl border border-white/8 bg-white/[0.03]"
            >
              <Image
                src="/portfolio/hernandez/sergio-landscaping-marketing-clean.png"
                alt="Clean marketing visual for landscaping and snow removal outreach"
                width={1080}
                height={1080}
                className="aspect-square w-full object-cover"
              />
              <div className="p-6">
                <p className="text-sm font-semibold text-white">
                  Outreach-ready collateral
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  Text is rendered cleanly by the site workflow, avoiding
                  distorted AI lettering in sales images.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section id="learning" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#22d3ee] text-sm font-medium uppercase tracking-wider">
              The Ecosystem
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              How the sites connect
            </h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              The {personalSitePublicLabel} is personal and reflective. High
              Encode Learning is the business-facing layer. The other tools sit
              between learning, testing, and delivery.
            </p>
          </motion.div>

          <EcosystemLinks />
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 md:p-12 glow-teal"
          >
            <div className="mb-10 text-center">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee]"
              >
                <Sparkles className="h-8 w-8 text-[#060a14]" />
              </motion.div>

              <span className="inline-flex items-center rounded-full border border-[#2dd4bf]/20 bg-[#2dd4bf]/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[#9ae6db]">
                Direct contact hub
              </span>
              <h2 className="mt-6 text-3xl font-bold md:text-4xl">
                If this site gets passed around, it should still be easy to
                reach me
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/50">
                This site stays personal, but contact does not need to be
                buried. Use the fastest confirmed paths below for follow-up,
                booking, hiring, or seeing the work that sits behind the notes.
              </p>
              <p className="mx-auto mt-3 max-w-xl text-sm text-white/35">
                English-first, async-friendly, and ready for local business
                follow-up without forcing people to hunt for the right page.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <span className="rounded-full border border-[#2dd4bf]/20 bg-[#2dd4bf]/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-[#9ae6db]">
                  English + Español welcome
                </span>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  Open shareable contact page
                </Link>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {[
                {
                  heading: "Quick reach",
                  intro:
                    "Best if you want to talk soon or need the cleanest next step.",
                  links: quickReachLinks,
                },
                {
                  heading: "Hire me",
                  intro:
                    "Best if you already know you want a scoped project or freelance path.",
                  links: hireMeLinks,
                },
                {
                  heading: "Follow the work",
                  intro:
                    "Best if you want to inspect the code, experiments, and ecosystem.",
                  links: followWorkLinks,
                },
              ].map((group) => (
                <div
                  key={group.heading}
                  className="rounded-3xl border border-white/8 bg-white/[0.03] p-6 text-left"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-[#22d3ee]">
                    {group.heading}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {group.intro}
                  </p>

                  <div className="mt-6 space-y-3">
                    {group.links.map((link) => {
                      const Icon = iconFor(link);

                      return (
                        <a
                          key={link.id}
                          href={link.href}
                          target={isExternal(link.href) ? "_blank" : undefined}
                          rel={
                            isExternal(link.href)
                              ? "noopener noreferrer"
                              : undefined
                          }
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
                            <span className="mt-1 block text-xs leading-relaxed text-white/50">
                              {link.description}
                            </span>
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/8 bg-[#08101e]/75 px-6 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">
                  Want the formal business-facing version?
                </p>
                <p className="mt-1 text-sm text-white/45">
                  High Encode Learning is still the cleanest place for scoping,
                  demos, and formal project conversations.
                </p>
              </div>
              <a
                href={businessSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#2dd4bf] to-[#22d3ee] px-6 py-3 font-semibold text-[#060a14] transition-transform hover:scale-[1.01]"
              >
                Visit High Encode Learning
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-[1.1fr_1fr_1fr_auto] lg:items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center font-bold text-[#060a14]">
              DO
            </div>
            <div>
              <p className="font-semibold">David Ortiz</p>
              <p className="text-xs text-white/40">
                Personal notebook and experiment layer
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
              Reach out
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/45">
              {footerPrimaryLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={isExternal(link.href) ? "_blank" : undefined}
                  rel={
                    isExternal(link.href) ? "noopener noreferrer" : undefined
                  }
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/35">
              Ecosystem
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/45">
              {footerEcosystemLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target={isExternal(link.href) ? "_blank" : undefined}
                  rel={
                    isExternal(link.href) ? "noopener noreferrer" : undefined
                  }
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <p className="text-sm text-white/30 lg:text-right">
            © {new Date().getFullYear()} David Ortiz. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Bottom spacer for dock */}
      <div className="h-24" />
    </div>
  );
}
