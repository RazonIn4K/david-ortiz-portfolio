// =============================================================================
// ANIMATION DEFINITIONS
// Reusable animation keyframes and utilities for all sites
// =============================================================================

// Base keyframes that can be used across all sites
export const baseKeyframes = {
  // Floating effect
  float: {
    "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
    "50%": { transform: "translateY(-15px) rotate(1deg)" },
  },

  // Pulse ring (for live indicators)
  pulseRing: {
    "0%": { transform: "scale(0.8)", opacity: 1 },
    "100%": { transform: "scale(2)", opacity: 0 },
  },

  // Gradient animation
  gradientX: {
    "0%, 100%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
  },

  // Shimmer effect
  shimmer: {
    "0%": { backgroundPosition: "-200% 0" },
    "100%": { backgroundPosition: "200% 0" },
  },

  // Bounce subtle
  bounceSubtle: {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-5px)" },
  },

  // Morph blob
  morph: {
    "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
    "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
  },

  // Rotate slow
  rotateSlow: {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },

  // Fade in up
  fadeInUp: {
    "0%": { opacity: 0, transform: "translateY(20px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
  },

  // Scale in
  scaleIn: {
    "0%": { opacity: 0, transform: "scale(0.9)" },
    "100%": { opacity: 1, transform: "scale(1)" },
  },
}

// Site-specific keyframes
export const siteKeyframes = {
  // CS-LEARNING.ME specific
  csLearning: {
    scanLine: {
      "0%": { transform: "translateY(-100%)" },
      "100%": { transform: "translateY(100vh)" },
    },
    hexPulse: {
      "0%, 100%": { opacity: 0.03 },
      "50%": { opacity: 0.08 },
    },
    typingCursor: {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0 },
    },
    dataFlow: {
      "0%": { strokeDashoffset: 100, opacity: 0 },
      "50%": { opacity: 1 },
      "100%": { strokeDashoffset: 0, opacity: 0 },
    },
  },

  // HIGH ENCODE specific
  highEncode: {
    checkmarkDraw: {
      "0%": { strokeDashoffset: 100 },
      "100%": { strokeDashoffset: 0 },
    },
    progressFill: {
      "0%": { width: "0%" },
      "100%": { width: "var(--progress-width)" },
    },
    cardFloat: {
      "0%, 100%": { transform: "translateY(0) rotateX(0)" },
      "50%": { transform: "translateY(-10px) rotateX(2deg)" },
    },
  },

  // CSBRAINAI specific
  csBrainAI: {
    synapsePulse: {
      "0%": { opacity: 0.2, transform: "scale(1)" },
      "50%": { opacity: 1, transform: "scale(1.5)" },
      "100%": { opacity: 0.2, transform: "scale(1)" },
    },
    nodeConnect: {
      "0%": { strokeDashoffset: 100, opacity: 0 },
      "50%": { opacity: 1 },
      "100%": { strokeDashoffset: 0, opacity: 0.5 },
    },
    brainWave: {
      "0%, 100%": { transform: "scaleY(1)" },
      "50%": { transform: "scaleY(1.3)" },
    },
  },

  // PROMPT DEFENDERS specific
  promptDefenders: {
    radarSweep: {
      "0%": { transform: "rotate(0deg)" },
      "100%": { transform: "rotate(360deg)" },
    },
    threatBlink: {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0.3 },
    },
    shieldPulse: {
      "0%, 100%": { transform: "scale(1)", opacity: 0.8 },
      "50%": { transform: "scale(1.1)", opacity: 1 },
    },
    matrixFall: {
      "0%": { transform: "translateY(-100%)", opacity: 1 },
      "100%": { transform: "translateY(100vh)", opacity: 0 },
    },
  },
}

// Framer Motion variants
export const motionVariants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
}
