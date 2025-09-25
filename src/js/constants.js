// Centralized Constants and Configuration
// All hardcoded values and configuration options in one place

// API Endpoints
export const API_ENDPOINTS = {
  CHAT: '/api/chat',
  ANALYTICS: '/api/analytics',
  CONTACT: '/api/contact',
  STORAGE: '/api/lightweight-storage'
};

// Rate Limiting
export const RATE_LIMITS = {
  CONTACT_FORM: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 5
  },
  CHAT: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 10
  },
  ANALYTICS: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100
  }
};

// Animation Thresholds
export const ANIMATION_CONFIG = {
  SCROLL_THRESHOLD: 100,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 150,
  THROTTLE_DELAY: 16, // ~60fps
  INTERSECTION_THRESHOLD: 0.1,
  PARALLAX_SPEED: 0.5
};

// Performance Thresholds
export const PERFORMANCE_CONFIG = {
  DEVICE_SCORE_THRESHOLD: 5,
  MIN_FPS: 30,
  MAX_MEMORY_MB: 100,
  LAZY_LOAD_OFFSET: 50,
  IMAGE_LOAD_TIMEOUT: 5000
};

// Form Validation
export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z\s'-]+$/
  },
  EMAIL: {
    MAX_LENGTH: 254,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  MESSAGE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 5000
  },
  SUBJECT: {
    MAX_LENGTH: 200
  }
};

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 480,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1440,
  XLARGE: 1920
};

// Colors (for JS animations)
export const COLORS = {
  PRIMARY: '#4F46E5',
  SECONDARY: '#7C3AED',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  DARK_BG: '#0F172A',
  LIGHT_BG: '#F8FAFC'
};

// Storage Keys
export const STORAGE_KEYS = {
  THEME: 'david-theme-preference',
  CONSENT: 'cs-learning-consent',
  SESSION: 'chat_session_id',
  CHAT_HISTORY: 'chat_history',
  ANALYTICS_QUEUE: 'analytics_queue'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  VALIDATION: 'Please check your input and try again.',
  RATE_LIMIT: 'Too many requests. Please wait a moment.',
  GENERIC: 'Something went wrong. Please try again later.',
  OFFLINE: 'You appear to be offline. Some features may be limited.',
  NOT_SUPPORTED: 'This feature is not supported in your browser.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  FORM_SENT: 'Thank you! Your message has been sent successfully.',
  COPIED: 'Copied to clipboard!',
  SAVED: 'Your preferences have been saved.',
  UPDATED: 'Successfully updated.'
};

// Accessibility
export const A11Y = {
  FOCUS_TRAP_SELECTORS: 'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
  SKIP_LINK_TARGET: '#main',
  ANNOUNCE_DELAY: 100,
  DEBOUNCE_ANNOUNCE: 500
};

// Feature Flags (can be overridden by CONFIG)
export const FEATURES = {
  ENABLE_ANALYTICS: true,
  ENABLE_CHAT: false, // Disabled for GitHub Pages
  ENABLE_ANIMATIONS: true,
  ENABLE_PARTICLES: false,
  ENABLE_CURSOR_TRAIL: false,
  ENABLE_SERVICE_WORKER: true,
  ENABLE_LAZY_LOADING: true
};

// Timing Constants
export const TIMING = {
  DEBOUNCE_INPUT: 300,
  THROTTLE_SCROLL: 16,
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 5000,
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  CACHE_DURATION: 24 * 60 * 60 * 1000 // 24 hours
};

// External URLs
export const EXTERNAL_URLS = {
  GITHUB: 'https://github.com/RazonIn4K',
  LINKEDIN: 'https://www.linkedin.com/in/david-ortiz-210190205/',
  ANALYTICS_DOCS: 'https://developers.google.com/analytics',
  VERCEL_DOCS: 'https://vercel.com/docs'
};

// SEO Metadata
export const SEO_DEFAULTS = {
  TITLE: 'David Ortiz - Cloud Support Engineer & Database Specialist',
  DESCRIPTION: 'Professional portfolio showcasing 87% query performance improvements, $40K annual savings, and expertise in AWS, GCP, Azure, PostgreSQL, and database optimization.',
  KEYWORDS: 'cloud support engineer, database specialist, AWS, GCP, Azure, PostgreSQL, MySQL, SQL optimization',
  OG_IMAGE: 'https://www.cs-learning.me/assets/og-image.png'
};

// Export all constants as a single object for convenience
export const CONSTANTS = {
  API_ENDPOINTS,
  RATE_LIMITS,
  ANIMATION_CONFIG,
  PERFORMANCE_CONFIG,
  VALIDATION_RULES,
  BREAKPOINTS,
  COLORS,
  STORAGE_KEYS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  A11Y,
  FEATURES,
  TIMING,
  EXTERNAL_URLS,
  SEO_DEFAULTS
};

// Make available globally for backward compatibility
if (typeof window !== 'undefined') {
  window.CONSTANTS = CONSTANTS;
}