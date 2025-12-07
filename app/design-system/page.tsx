"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check, Palette, Type, Layers, Zap, Grid3X3, ExternalLink } from "lucide-react"
import { tokens } from "@/lib/design-system/tokens"
import { siteConfigs, type SiteKey } from "@/lib/design-system/site-configs"
import { DSButton } from "@/components/design-system/ds-button"
import { DSCard } from "@/components/design-system/ds-card"
import { DSBadge } from "@/components/design-system/ds-badge"
import { DSInput } from "@/components/design-system/ds-input"
import { DSEcosystemNav } from "@/components/design-system/ds-ecosystem-nav"
import {
  AutomationIcon,
  ChatbotIcon,
  SecurityIcon,
  LearningIcon,
  BrainIcon,
} from "@/components/design-system/ds-icon-set"

const siteKeys: SiteKey[] = ["csLearning", "highEncode", "csBrainAI", "promptDefenders"]

function ColorSwatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  const [copied, setCopied] = React.useState(false)

  const copyHex = () => {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.button
      onClick={copyHex}
      className="group flex flex-col items-center gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="w-16 h-16 rounded-xl shadow-md group-hover:shadow-lg transition-shadow relative"
        style={{ background: color }}
      >
        {copied && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl"
          >
            <Check className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </div>
      <span className="text-xs font-medium text-neutral-600">{name}</span>
      <span className="text-xs text-neutral-400 font-mono">{hex}</span>
    </motion.button>
  )
}

function SitePreview({ siteKey }: { siteKey: SiteKey }) {
  const config = siteConfigs[siteKey]
  const isDark = config.theme === "dark"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl overflow-hidden"
      style={{ background: config.colors.bg }}
    >
      {/* Header */}
      <div className="p-6 border-b" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
              style={{
                background: config.gradients.primary,
                color: isDark ? config.colors.bg : "#ffffff",
              }}
            >
              {config.name.charAt(0)}
            </div>
            <div>
              <p className={isDark ? "text-white font-semibold" : "text-neutral-900 font-semibold"}>{config.name}</p>
              <p className={isDark ? "text-white/50 text-sm" : "text-neutral-500 text-sm"}>{config.tagline}</p>
            </div>
          </div>
          <a
            href={`https://${config.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 text-sm ${isDark ? "text-white/50 hover:text-white" : "text-neutral-500 hover:text-neutral-900"}`}
          >
            {config.domain}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Buttons */}
        <div>
          <p className={`text-xs uppercase tracking-wider mb-3 ${isDark ? "text-white/40" : "text-neutral-400"}`}>
            Buttons
          </p>
          <div className="flex flex-wrap gap-3">
            <DSButton site={siteKey} variant="primary">
              Primary
            </DSButton>
            <DSButton site={siteKey} variant="secondary">
              Secondary
            </DSButton>
            <DSButton site={siteKey} variant="ghost">
              Ghost
            </DSButton>
            <DSButton site={siteKey} variant="outline">
              Outline
            </DSButton>
          </div>
        </div>

        {/* Badges */}
        <div>
          <p className={`text-xs uppercase tracking-wider mb-3 ${isDark ? "text-white/40" : "text-neutral-400"}`}>
            Badges
          </p>
          <div className="flex flex-wrap gap-2">
            <DSBadge site={siteKey} variant="default" pulse>
              Live
            </DSBadge>
            <DSBadge site={siteKey} variant="success">
              Success
            </DSBadge>
            <DSBadge site={siteKey} variant="warning">
              Warning
            </DSBadge>
            <DSBadge site={siteKey} variant="error">
              Error
            </DSBadge>
            <DSBadge site={siteKey} variant="info">
              Info
            </DSBadge>
          </div>
        </div>

        {/* Cards */}
        <div>
          <p className={`text-xs uppercase tracking-wider mb-3 ${isDark ? "text-white/40" : "text-neutral-400"}`}>
            Cards
          </p>
          <div className="grid grid-cols-2 gap-3">
            <DSCard site={siteKey} variant="glass" className="p-4">
              <p className={isDark ? "text-white/70 text-sm" : "text-neutral-600 text-sm"}>Glass Card</p>
            </DSCard>
            <DSCard site={siteKey} variant="bordered" className="p-4">
              <p className={isDark ? "text-white/70 text-sm" : "text-neutral-600 text-sm"}>Bordered Card</p>
            </DSCard>
          </div>
        </div>

        {/* Input */}
        <div>
          <p className={`text-xs uppercase tracking-wider mb-3 ${isDark ? "text-white/40" : "text-neutral-400"}`}>
            Input
          </p>
          <DSInput site={siteKey} placeholder="Enter your email..." />
        </div>

        {/* Icons */}
        <div>
          <p className={`text-xs uppercase tracking-wider mb-3 ${isDark ? "text-white/40" : "text-neutral-400"}`}>
            Icons
          </p>
          <div className="flex gap-4">
            <AutomationIcon site={siteKey} className="w-6 h-6" />
            <ChatbotIcon site={siteKey} className="w-6 h-6" />
            <SecurityIcon site={siteKey} className="w-6 h-6" />
            <LearningIcon site={siteKey} className="w-6 h-6" />
            <BrainIcon site={siteKey} className="w-6 h-6" />
          </div>
        </div>

        {/* Unique Features */}
        <div>
          <p className={`text-xs uppercase tracking-wider mb-3 ${isDark ? "text-white/40" : "text-neutral-400"}`}>
            Unique Animations
          </p>
          <div className="flex flex-wrap gap-2">
            {config.uniqueFeatures.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1.5 rounded-full text-xs"
                style={{
                  background: `${config.colors.primary}15`,
                  color: config.colors.primary,
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function DesignSystemPage() {
  const [currentSite, setCurrentSite] = React.useState<SiteKey>("csLearning")

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center font-bold text-white">
              DS
            </div>
            <div>
              <h1 className="font-semibold text-neutral-900">Design System</h1>
              <p className="text-sm text-neutral-500">David Ortiz Ecosystem</p>
            </div>
          </div>
          <DSEcosystemNav currentSite={currentSite} />
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2dd4bf]/10 text-[#2dd4bf] text-sm font-medium mb-6"
          >
            <Layers className="w-4 h-4" />
            Unified Design System
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6"
          >
            One system,
            <br />
            <span className="bg-gradient-to-r from-[#2dd4bf] via-[#3b82f6] to-[#a78bfa] bg-clip-text text-transparent">
              four unique identities
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-500 max-w-2xl mx-auto mb-12"
          >
            Shared design tokens, reusable components, and site-specific animations that maintain brand consistency
            while preserving individual character.
          </motion.p>

          {/* Site Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {siteKeys.map((key) => {
              const config = siteConfigs[key]
              return (
                <button
                  key={key}
                  onClick={() => setCurrentSite(key)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                    currentSite === key ? "text-white shadow-lg" : "bg-white text-neutral-600 hover:bg-neutral-100"
                  }`}
                  style={currentSite === key ? { background: config.gradients.primary } : undefined}
                >
                  {config.name}
                </button>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Color Tokens */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Color Tokens</h2>
              <p className="text-neutral-500">Shared palette across all properties</p>
            </div>
          </div>

          {/* Brand Colors */}
          <div className="mb-10">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Brand Colors</h3>
            <div className="flex flex-wrap gap-6">
              <ColorSwatch color={tokens.colors.brand.teal} name="Teal" hex="#2dd4bf" />
              <ColorSwatch color={tokens.colors.brand.cyan} name="Cyan" hex="#22d3ee" />
              <ColorSwatch color={tokens.colors.brand.coral} name="Coral" hex="#ff6b6b" />
              <ColorSwatch color={tokens.colors.brand.purple} name="Purple" hex="#a78bfa" />
              <ColorSwatch color={tokens.colors.brand.blue} name="Blue" hex="#3b82f6" />
              <ColorSwatch color={tokens.colors.brand.navy} name="Navy" hex="#060a14" />
            </div>
          </div>

          {/* Site Colors */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Site-Specific</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {siteKeys.map((key) => {
                const config = siteConfigs[key]
                return (
                  <div key={key} className="space-y-3">
                    <p className="text-sm font-medium text-neutral-600">{config.name}</p>
                    <div className="flex gap-2">
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{ background: config.colors.primary }}
                        title="Primary"
                      />
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{ background: config.colors.secondary }}
                        title="Secondary"
                      />
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{ background: config.colors.accent }}
                        title="Accent"
                      />
                      <div
                        className="w-10 h-10 rounded-lg border border-neutral-200"
                        style={{ background: config.colors.bg }}
                        title="Background"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <Type className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Typography</h2>
              <p className="text-neutral-500">Font families and scale</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Font Families */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Font Families</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Sans (Primary)</p>
                  <p className="text-2xl font-semibold" style={{ fontFamily: tokens.typography.fonts.sans }}>
                    Inter / SF Pro Display
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Mono (Code)</p>
                  <p className="text-2xl" style={{ fontFamily: tokens.typography.fonts.mono }}>
                    JetBrains Mono
                  </p>
                </div>
              </div>
            </div>

            {/* Type Scale */}
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4">Type Scale</h3>
              <div className="space-y-2">
                {Object.entries(tokens.typography.sizes)
                  .slice(0, 8)
                  .map(([key, value]) => (
                    <div key={key} className="flex items-baseline gap-4">
                      <span className="text-xs text-neutral-400 w-12 font-mono">{key}</span>
                      <span style={{ fontSize: value }} className="text-neutral-900">
                        The quick brown fox
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Component Previews */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Component Library</h2>
              <p className="text-neutral-500">Reusable components with site-specific themes</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {siteKeys.map((key) => (
              <SitePreview key={key} siteKey={key} />
            ))}
          </div>
        </div>
      </section>

      {/* Animation Catalog */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Animation Catalog</h2>
              <p className="text-neutral-500">Site-specific motion and effects</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteKeys.map((key) => {
              const config = siteConfigs[key]
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6"
                >
                  <div
                    className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                    style={{ background: config.gradients.primary }}
                  >
                    <span className="text-white font-bold">{config.name.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1">{config.name}</h3>
                  <p className="text-sm text-neutral-500 mb-4">{config.domain}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400">Hero:</span>
                      <code className="text-xs bg-neutral-100 px-2 py-0.5 rounded">{config.animations.hero}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400">Hover:</span>
                      <code className="text-xs bg-neutral-100 px-2 py-0.5 rounded">{config.animations.hover}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400">BG:</span>
                      <code className="text-xs bg-neutral-100 px-2 py-0.5 rounded">{config.animations.background}</code>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center font-bold text-white text-sm">
              DO
            </div>
            <span className="text-neutral-600">David Ortiz Design System</span>
          </div>
          <p className="text-sm text-neutral-400">
            Powering cs-learning.me, highencodelearning.com, csbrainai.com, and promptdefenders.com
          </p>
        </div>
      </footer>
    </div>
  )
}
