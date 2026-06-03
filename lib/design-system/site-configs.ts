// =============================================================================
// SITE-SPECIFIC CONFIGURATIONS
// Each site has unique animations, gradients, and visual treatments
// =============================================================================

import { tokens } from "./tokens"

export type SiteKey = "csLearning" | "highEncode" | "csBrainAI" | "promptDefenders"

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
  // CS-LEARNING.ME - Dark cyber tech aesthetic
  // ---------------------------------------------------------------------------
  csLearning: {
    name: "David Ortiz",
    domain: "cs-learning.me",
    tagline: "AI Automation Specialist",
    theme: "dark",
    colors: tokens.colors.sites.csLearning,
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
  // HIGHENCODELEARNING.COM - Clean educational light theme
  // ---------------------------------------------------------------------------
  highEncode: {
    name: "High Encode Learning",
    domain: "highencodelearning.com",
    tagline: "CS & Cybersecurity Education",
    theme: "light",
    colors: tokens.colors.sites.highEncode,
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
      "Learning path progress tracker",
      "AI copilot chat widget",
      "Certificate badge animations",
      "Checkmark micro-interactions",
    ],
  },

  // ---------------------------------------------------------------------------
  // CSBRAINAI.COM - Neural/AI purple theme
  // ---------------------------------------------------------------------------
  csBrainAI: {
    name: "CSBrain AI",
    domain: "csbrainai.com",
    tagline: "AI-Powered CS Learning Assistant",
    theme: "dark",
    colors: tokens.colors.sites.csBrainAI,
    gradients: {
      primary: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)",
      secondary: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)",
      text: "linear-gradient(135deg, #c4b5fd 0%, #a78bfa 50%, #7c3aed 100%)",
    },
    animations: {
      hero: "neuralNetwork", // Animated neural network nodes
      hover: "pulseGlow", // Pulsing glow effect
      background: "synapseFire", // Synapse firing animations
    },
    glassEffect: {
      bg: "rgba(26, 16, 37, 0.85)",
      border: "rgba(167, 139, 250, 0.2)",
      blur: "24px",
    },
    uniqueFeatures: [
      "Neural network visualization",
      "AI thinking indicator",
      "Code explanation overlays",
      "Brain pulse animations",
    ],
  },

  // ---------------------------------------------------------------------------
  // PROMPTDEFENDERS.COM - Security-focused red/green theme
  // ---------------------------------------------------------------------------
  promptDefenders: {
    name: "Prompt Defenders",
    domain: "promptdefenders.com",
    tagline: "AI Security Testing Platform",
    theme: "dark",
    colors: tokens.colors.sites.promptDefenders,
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
