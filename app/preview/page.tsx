"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Play, ChevronDown } from "lucide-react"

import { AIAssistant } from "@/components/ui-creative/ai-assistant"
import { HexGridBackground } from "@/components/ui-creative/hex-grid-bg"
import { TerminalHero } from "@/components/ui-creative/terminal-hero"
import { FloatingDock } from "@/components/ui-creative/floating-dock"
import { OrbitVisualization } from "@/components/ui-creative/orbit-visualization"
import { AnimatedStats } from "@/components/ui-creative/animated-stats"
import { ServiceGrid } from "@/components/ui-creative/service-grid"
import { EcosystemLinks } from "@/components/ui-creative/ecosystem-links"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#060a14] text-white overflow-x-hidden">
      {/* Background */}
      <HexGridBackground />

      {/* AI Assistant */}
      <AIAssistant />

      {/* Floating Dock Navigation */}
      <FloatingDock />

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
              <p className="text-xs text-white/40">AI Automation</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center gap-8"
          >
            {["Services", "Case Studies", "Learning", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm text-white/50 hover:text-white transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2dd4bf] to-[#22d3ee] group-hover:w-full transition-all duration-300" />
              </a>
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
              Book Call
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
                <span className="text-sm text-white/60">AI-Powered Automation</span>
                <span className="w-2 h-2 rounded-full bg-[#2dd4bf] animate-pulse" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
              >
                Ship <span className="gradient-text text-glow-teal">AI automations</span>
                <br />
                that <span className="gradient-text-warm">save hours</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-white/50 mb-10 max-w-lg leading-relaxed"
              >
                Build intelligent workflows with <span className="text-white/80">Typeform</span>,{" "}
                <span className="text-white/80">Zapier</span>, <span className="text-white/80">Notion</span>, and{" "}
                <span className="text-white/80">GPT-4o</span> — plus scraping pipelines and AI security guardrails.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="#contact"
                  className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white font-semibold hover:shadow-xl hover:shadow-[#ff6b6b]/20 transition-all glow-coral"
                >
                  Book discovery call
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#cases"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 font-medium hover:border-white/30 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  View case studies
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
              <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
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
                AI at the center of
                <br />
                <span className="gradient-text">everything you do</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white/50 text-lg leading-relaxed mb-8"
              >
                Your tools orbit around a central AI brain that orchestrates, optimizes, and automates. From form
                submissions to CRM updates, every step is intelligent.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                {["Typeform", "Zapier", "Notion", "GPT-4o", "Security"].map((tool) => (
                  <span key={tool} className="px-4 py-2 rounded-full glass text-sm text-white/70">
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

      {/* Services Section */}
      <section id="services" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#2dd4bf] text-sm font-medium uppercase tracking-wider">Services</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">How we automate your operations</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Four core solutions to eliminate manual work and scale your team without adding headcount
            </p>
          </motion.div>

          <ServiceGrid />
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
            <span className="text-[#22d3ee] text-sm font-medium uppercase tracking-wider">The Network</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">Explore the full ecosystem</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Beyond consulting — education platforms, AI tools, and security testing all connected
            </p>
          </motion.div>

          <EcosystemLinks />
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-8 md:p-12 text-center glow-teal"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center mx-auto mb-8"
            >
              <Sparkles className="w-8 h-8 text-[#060a14]" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to automate your operations?</h2>
            <p className="text-white/50 mb-8 max-w-xl mx-auto">
              Book a free discovery call to discuss your workflows and see how AI automation can save you 10+ hours
              every week.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ff6b6b] to-[#ff8e8e] text-white font-semibold hover:shadow-xl hover:shadow-[#ff6b6b]/20 transition-all"
              >
                Book free call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="mailto:hello@cs-learning.me"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass border border-white/10 font-medium hover:border-white/30 transition-colors"
              >
                Send email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center font-bold text-[#060a14]">
              DO
            </div>
            <div>
              <p className="font-semibold">David Ortiz</p>
              <p className="text-xs text-white/40">AI Automation Specialist</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="https://twitter.com" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="https://linkedin.com" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com" className="hover:text-white transition-colors">
              GitHub
            </a>
          </div>

          <p className="text-sm text-white/30">© 2025 David Ortiz. All rights reserved.</p>
        </div>
      </footer>

      {/* Bottom spacer for dock */}
      <div className="h-24" />
    </div>
  )
}
