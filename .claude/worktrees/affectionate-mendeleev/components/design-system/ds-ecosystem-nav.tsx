"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ExternalLink, Sparkles, BookOpen, Brain, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SiteKey } from "@/lib/design-system/site-configs"
import { siteConfigs } from "@/lib/design-system/site-configs"

interface DSEcosystemNavProps {
  currentSite: SiteKey
}

const ecosystemSites = [
  {
    key: "csLearning" as SiteKey,
    icon: Sparkles,
    label: "Consulting",
    description: "AI Automation Services",
  },
  {
    key: "highEncode" as SiteKey,
    icon: BookOpen,
    label: "Learning",
    description: "CS & Cybersecurity Education",
  },
  {
    key: "csBrainAI" as SiteKey,
    icon: Brain,
    label: "CSBrain AI",
    description: "AI Learning Assistant",
  },
  {
    key: "promptDefenders" as SiteKey,
    icon: Shield,
    label: "Prompt Defenders",
    description: "Security Testing",
  },
]

export function DSEcosystemNav({ currentSite }: DSEcosystemNavProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const config = siteConfigs[currentSite]
  const isDark = config.theme === "dark"

  return (
    <div className="relative">
      {/* Trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
          isDark
            ? "bg-white/5 hover:bg-white/10 text-white/70"
            : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600",
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: config.colors.primary }} />
        Ecosystem
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute top-full mt-2 right-0 z-50 w-80 rounded-2xl p-2 shadow-2xl",
                isDark ? "bg-[#0d1424] border border-white/10" : "bg-white border border-neutral-200",
              )}
            >
              {ecosystemSites.map((site) => {
                const siteConfig = siteConfigs[site.key]
                const isCurrent = site.key === currentSite
                const Icon = site.icon

                return (
                  <motion.a
                    key={site.key}
                    href={`https://${siteConfig.domain}`}
                    target={isCurrent ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center gap-4 p-3 rounded-xl transition-colors group",
                      isDark ? "hover:bg-white/5" : "hover:bg-neutral-50",
                      isCurrent && (isDark ? "bg-white/5" : "bg-neutral-50"),
                    )}
                    whileHover={{ x: 4 }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${siteConfig.colors.primary}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: siteConfig.colors.primary }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={cn("font-medium", isDark ? "text-white" : "text-neutral-900")}>
                          {site.label}
                        </span>
                        {isCurrent && (
                          <span
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{
                              background: `${siteConfig.colors.primary}20`,
                              color: siteConfig.colors.primary,
                            }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <p className={cn("text-sm", isDark ? "text-white/50" : "text-neutral-500")}>{site.description}</p>
                    </div>
                    {!isCurrent && (
                      <ExternalLink
                        className={cn(
                          "w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity",
                          isDark ? "text-white/30" : "text-neutral-400",
                        )}
                      />
                    )}
                  </motion.a>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
