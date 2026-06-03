"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const ecosystemSites = [
  {
    name: "Consulting",
    href: "https://cs-learning.me",
    description: "AI Automation Services",
  },
  {
    name: "Learning",
    href: "https://highencodelearning.com",
    description: "CS & Security Education",
  },
  {
    name: "CSBrainAI",
    href: "https://csbrain.ai",
    description: "AI Learning Assistant",
  },
  {
    name: "Prompt Defenders",
    href: "https://prompt-defenders.com",
    description: "Security Testing",
  },
]

interface EcosystemBannerLightProps {
  currentSite?: "consulting" | "learning" | "csbrain" | "prompt-defenders"
}

export function EcosystemBannerLight({ currentSite = "learning" }: EcosystemBannerLightProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full bg-[#f8fafc] border-b border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Desktop */}
        <div className="hidden md:flex items-center justify-center gap-1 py-2 text-xs">
          <span className="text-[#64748b] mr-2">Explore:</span>
          {ecosystemSites.map((site, i) => {
            const isActive =
              (currentSite === "consulting" && site.name === "Consulting") ||
              (currentSite === "learning" && site.name === "Learning") ||
              (currentSite === "csbrain" && site.name === "CSBrainAI") ||
              (currentSite === "prompt-defenders" && site.name === "Prompt Defenders")

            return (
              <div key={site.name} className="flex items-center">
                <a
                  href={site.href}
                  className={`px-3 py-1.5 rounded-full transition-all font-medium ${
                    isActive ? "bg-[#3b82f6] text-white" : "text-[#475569] hover:text-[#1e293b] hover:bg-[#e2e8f0]"
                  }`}
                >
                  {site.name}
                </a>
                {i < ecosystemSites.length - 1 && <span className="text-[#cbd5e1] mx-1">·</span>}
              </div>
            )
          })}
        </div>

        {/* Mobile */}
        <div className="md:hidden py-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full text-xs text-[#64748b]"
          >
            <span>
              <span className="text-[#94a3b8]">You&apos;re viewing:</span>{" "}
              <span className="text-[#3b82f6] font-medium">
                {currentSite === "consulting"
                  ? "Consulting"
                  : currentSite === "learning"
                    ? "Learning"
                    : currentSite === "csbrain"
                      ? "CSBrainAI"
                      : "Prompt Defenders"}
              </span>
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {isOpen && (
            <div className="mt-2 pt-2 border-t border-[#e2e8f0] space-y-1">
              {ecosystemSites.map((site) => (
                <a
                  key={site.name}
                  href={site.href}
                  className="flex items-center justify-between py-2 px-3 rounded-lg text-[#475569] hover:bg-[#f1f5f9] hover:text-[#1e293b] transition-colors"
                >
                  <span className="text-sm font-medium">{site.name}</span>
                  <span className="text-xs text-[#94a3b8]">{site.description}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
