// =============================================================================
// DESIGN SYSTEM TOKENS
// Shared across: cs-learning.me, highencodelearning.com, csbrainai.com, promptdefenders.com
// =============================================================================

export const tokens = {
  // -------------------------------------------------------------------------
  // COLOR PALETTE - Core brand colors used across all properties
  // -------------------------------------------------------------------------
  colors: {
    // Primary brand colors
    brand: {
      teal: "#2dd4bf",
      cyan: "#22d3ee",
      coral: "#ff6b6b",
      navy: "#060a14",
      navyLight: "#0d1424",
      purple: "#a78bfa",
      blue: "#3b82f6",
    },

    // Site-specific accent colors
    sites: {
      csLearning: {
        primary: "#2dd4bf", // Teal
        secondary: "#ff6b6b", // Coral
        accent: "#22d3ee", // Cyan
        bg: "#060a14",
        bgLight: "#0d1424",
      },
      highEncode: {
        primary: "#3b82f6", // Blue
        secondary: "#1d4ed8", // Darker blue
        accent: "#60a5fa", // Light blue
        bg: "#ffffff",
        bgLight: "#f8fafc",
      },
      csBrainAI: {
        primary: "#a78bfa", // Purple
        secondary: "#7c3aed", // Violet
        accent: "#c4b5fd", // Light purple
        bg: "#0f0a1a",
        bgLight: "#1a1025",
      },
      promptDefenders: {
        primary: "#ef4444", // Red
        secondary: "#dc2626", // Darker red
        accent: "#22c55e", // Green (shield)
        bg: "#0a0a0a",
        bgLight: "#171717",
      },
    },

    // Semantic colors
    semantic: {
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },

    // Neutral scale
    neutral: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
      950: "#09090b",
    },
  },

  // -------------------------------------------------------------------------
  // TYPOGRAPHY - Font families and scales
  // -------------------------------------------------------------------------
  typography: {
    fonts: {
      sans: "'Geist', 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'Geist Mono', 'JetBrains Mono', 'Fira Code', 'Monaco', monospace",
      display: "'Geist', 'Clash Display', 'Inter', sans-serif",
    },
    sizes: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
      "7xl": "4.5rem", // 72px
    },
    lineHeights: {
      tight: "1.1",
      snug: "1.25",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    },
    fontWeights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
    },
  },

  // -------------------------------------------------------------------------
  // SPACING - Consistent spacing scale
  // -------------------------------------------------------------------------
  spacing: {
    px: "1px",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem",
    2: "0.5rem",
    2.5: "0.625rem",
    3: "0.75rem",
    3.5: "0.875rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    11: "2.75rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    28: "7rem",
    32: "8rem",
  },

  // -------------------------------------------------------------------------
  // BORDER RADIUS - Rounded corners
  // -------------------------------------------------------------------------
  borderRadius: {
    none: "0",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    "3xl": "1.5rem",
    full: "9999px",
  },

  // -------------------------------------------------------------------------
  // SHADOWS - Elevation levels
  // -------------------------------------------------------------------------
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    glow: {
      teal: "0 0 20px rgba(45, 212, 191, 0.3), 0 0 40px rgba(45, 212, 191, 0.15)",
      coral: "0 0 20px rgba(255, 107, 107, 0.3), 0 0 40px rgba(255, 107, 107, 0.15)",
      purple: "0 0 20px rgba(167, 139, 250, 0.3), 0 0 40px rgba(167, 139, 250, 0.15)",
      blue: "0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.15)",
      red: "0 0 20px rgba(239, 68, 68, 0.3), 0 0 40px rgba(239, 68, 68, 0.15)",
    },
  },

  // -------------------------------------------------------------------------
  // TRANSITIONS - Animation timings
  // -------------------------------------------------------------------------
  transitions: {
    fast: "150ms ease",
    normal: "300ms ease",
    slow: "500ms ease",
    slower: "700ms ease",
  },

  // -------------------------------------------------------------------------
  // Z-INDEX - Layering scale
  // -------------------------------------------------------------------------
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    fixed: 300,
    modalBackdrop: 400,
    modal: 500,
    popover: 600,
    tooltip: 700,
    toast: 800,
    max: 9999,
  },

  // -------------------------------------------------------------------------
  // BREAKPOINTS - Responsive design
  // -------------------------------------------------------------------------
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const

// Type exports for TypeScript usage
export type SiteTheme = keyof typeof tokens.colors.sites
export type ColorToken = keyof typeof tokens.colors.brand
export type SpacingToken = keyof typeof tokens.spacing
