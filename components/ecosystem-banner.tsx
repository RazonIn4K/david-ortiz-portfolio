"use client"

import { useState } from "react"
import { ExternalLinkIcon } from "./icons/ecosystem-icons"

interface EcosystemLink {
  name: string
  href: string
  description: string
}

const ecosystemLinks: EcosystemLink[] = [
  {
    name: "Consulting",
    href: "https://cs-learning.me",
    description: "AI automation services",
  },
  {
    name: "Learning",
    href: "https://highencodelearning.com",
    description: "CS & Cybersecurity education",
  },
  {
    name: "CSBrainAI",
    href: "https://csbrain.ai",
    description: "AI learning assistant",
  },
  {
    name: "Prompt Defenders",
    href: "https://prompt-defenders.com",
    description: "Security testing tool",
  },
]

interface EcosystemBannerProps {
  currentSite?: "consulting" | "learning" | "csbrain" | "prompt-defenders"
}

export function EcosystemBanner({ currentSite = "consulting" }: EcosystemBannerProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getCurrentIndex = () => {
    switch (currentSite) {
      case "consulting":
        return 0
      case "learning":
        return 1
      case "csbrain":
        return 2
      case "prompt-defenders":
        return 3
      default:
        return 0
    }
  }

  return (
    <div className="bg-slate-950 text-slate-200 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop view */}
        <div className="hidden sm:flex items-center justify-center gap-1 py-2 text-sm">
          <span className="text-slate-400 mr-2">David Ortiz Ecosystem:</span>
          {ecosystemLinks.map((link, index) => (
            <span key={link.name} className="flex items-center">
              {index > 0 && <span className="mx-2 text-slate-700">|</span>}
              <a
                href={link.href}
                className={`inline-flex items-center gap-1 transition-colors hover:text-sky-400 ${
                  index === getCurrentIndex() ? "text-sky-400 font-medium" : "text-slate-200"
                }`}
                target={index === getCurrentIndex() ? undefined : "_blank"}
                rel={index === getCurrentIndex() ? undefined : "noopener noreferrer"}
              >
                {link.name}
                {index !== getCurrentIndex() && <ExternalLinkIcon className="h-3 w-3 opacity-50" />}
              </a>
            </span>
          ))}
        </div>

        {/* Mobile view - collapsible */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-2 text-sm"
          >
            <span className="text-slate-400">Part of the David Ortiz Ecosystem</span>
            <svg
              className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded && (
            <div className="pb-3 space-y-2">
              {ecosystemLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                    index === getCurrentIndex() ? "bg-sky-500/10 text-sky-400" : "hover:bg-white/5"
                  }`}
                  target={index === getCurrentIndex() ? undefined : "_blank"}
                  rel={index === getCurrentIndex() ? undefined : "noopener noreferrer"}
                >
                  <div>
                    <div className="font-medium">{link.name}</div>
                    <div className="text-xs text-slate-400">{link.description}</div>
                  </div>
                  {index !== getCurrentIndex() && <ExternalLinkIcon className="h-4 w-4 opacity-50" />}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
