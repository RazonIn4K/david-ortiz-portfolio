// =============================================================================
// SITE-SPECIFIC CONFIGURATIONS
// Each site has unique animations, gradients, and visual treatments
// =============================================================================

import { tokens } from "./tokens"

export type SiteKey = "teal" | "blue" | "violet" | "crimson"

export interface SiteConfig {
  name: string
  domain: string
  tagline: string
  theme: "dark" | "light"
  colors: {
    primary: string
    secondary: string
    accent: string
    bg: string
    bgLight: string
  }
  gradients: {
    primary: string
    secondary: string
    text: string
  }
  animations: {
    hero: string
    hover: string
    background: string
  }
  glassEffect: {
    bg: string
    border: string
    blur: string
  }
  uniqueFeatures: string[]
}

export const siteConfigs: Record<SiteKey, SiteConfig> = {
  // ---------------------------------------------------------------------------
  // DAVIDTIZ.COM - Dark personal-notes aesthetic
  // ---------------------------------------------------------------------------
  teal: {
    name: "David Ortiz",
    domain: "davidtiz.com",
    tagline: "Personal notes and systems work",
    theme: "dark",
    colors: tokens.colors.sites.teal,
    gradients: {
      primary: "linear-gradient(135deg, #2dd4bf 0%, #22d3ee 100%)",
      secondary: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)",
      text: "linear-gradient(135deg, #2dd4bf 0%, #22d3ee 50%, #a78bfa 100%)",
    },
    animations: {
      hero: "hexGrid", // Animated hexagonal grid background
      hover: "magneticPull", // Buttons attract to cursor
      background: "scanLine", // CRT scan line effect
    },
    glassEffect: {
      bg: "rgba(13, 20, 36, 0.8)",
      border: "rgba(45, 212, 191, 0.15)",
      blur: "20px",
    },
    uniqueFeatures: [
      "Live automation dashboard widget",
      "Terminal-style code blocks",
      "Particle field interactions",
      "Glowing neon accents",
    ],
  },

  // ---------------------------------------------------------------------------
  // PORTFOLIO WORK - Local-business delivery theme
  // ---------------------------------------------------------------------------
  blue: {
    name: "Local Business Work",
    domain: "davidtiz.com",
    tagline: "Local-business websites and workflow cleanup",
    theme: "light",
    colors: tokens.colors.sites.blue,
    gradients: {
      primary: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      secondary: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
      text: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)",
    },
    animations: {
      hero: "floatingCards", // Gentle floating card elements
      hover: "springBounce", // Bouncy spring effect on buttons
      background: "gradientShift", // Subtle gradient color shifts
    },
    glassEffect: {
      bg: "rgba(255, 255, 255, 0.9)",
      border: "rgba(59, 130, 246, 0.1)",
      blur: "12px",
    },
    uniqueFeatures: [
      "Local-service proof sections",
      "Quote-path and follow-up cards",
      "Bilingual service-page patterns",
      "Owner handoff micro-interactions",
    ],
  },

  // ---------------------------------------------------------------------------
  // KNOWLEDGE WORKBENCH - Private RAG assistant proof asset
  // ---------------------------------------------------------------------------
  violet: {
    name: "Knowledge Workbench",
    domain: "davidtiz.com",
    tagline: "Private RAG assistant with citations",
    theme: "dark",
    colors: tokens.colors.sites.violet,
    gradients: {
      primary: "linear-gradient(135deg, #20c7b6 0%, #7dd3fc 100%)",
      secondary: "linear-gradient(135deg, #f2a93b 0%, #fb923c 100%)",
      text: "linear-gradient(135deg, #20c7b6 0%, #7dd3fc 60%, #f2a93b 100%)",
    },
    animations: {
      hero: "retrievalFlow",
      hover: "citationLift",
      background: "vectorGrid",
    },
    glassEffect: {
      bg: "rgba(17, 25, 35, 0.82)",
      border: "rgba(32, 199, 182, 0.18)",
      blur: "18px",
    },
    uniqueFeatures: [
      "Cited answer interface",
      "Supabase pgvector retrieval",
      "Hash-only query telemetry",
      "Validation and rate-limit states",
    ],
  },

  // ---------------------------------------------------------------------------
  // SAFETY RESEARCH - Security-focused red/green theme
  // ---------------------------------------------------------------------------
  crimson: {
    name: "Safety Research",
    domain: "davidtiz.com",
    tagline: "AI Security Testing Platform",
    theme: "dark",
    colors: tokens.colors.sites.crimson,
    gradients: {
      primary: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
      secondary: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
      text: "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
    },
    animations: {
      hero: "matrixRain", // Matrix-style falling characters
      hover: "shieldPulse", // Defensive shield pulse
      background: "threatScan", // Scanning/radar effect
    },
    glassEffect: {
      bg: "rgba(23, 23, 23, 0.9)",
      border: "rgba(239, 68, 68, 0.2)",
      blur: "16px",
    },
    uniqueFeatures: [
      "Threat detection animations",
      "Shield/defense visualizations",
      "Attack vector diagrams",
      "Security score meter",
    ],
  },
}

// Helper to get config by domain
export function getConfigByDomain(domain: string): SiteConfig | undefined {
  return Object.values(siteConfigs).find((config) => config.domain === domain)
}
