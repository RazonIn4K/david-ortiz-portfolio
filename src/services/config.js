// Configuration for API keys and other settings
// Note: This file should not contain sensitive keys in production
// For production, use environment variables or a secure key management system

// Configuration with environment variable support
const CONFIG = {
    // API Keys - loaded from environment variables when available
    GOOGLE_MAPS_API_KEY: '', // Environment variable not available in browser context

    // OpenRouter AI Configuration
    OPENROUTER_API_KEY: (typeof process !== 'undefined' && process.env)
        ? process.env.OPENROUTER_API_KEY || ''
        : '',  // Never hardcode API keys here - use environment variables

    // OpenRouter Models
    OPENROUTER_PRIMARY_MODEL: (typeof process !== 'undefined' && process.env)
        ? process.env.OPENROUTER_PRIMARY_MODEL || 'x-ai/grok-4-fast:free'
        : 'x-ai/grok-4-fast:free',
    OPENROUTER_FALLBACK_MODEL: (typeof process !== 'undefined' && process.env)
        ? process.env.OPENROUTER_FALLBACK_MODEL || 'z-ai/glm-4.5-air:free'
        : 'z-ai/glm-4.5-air:free',

    // MongoDB Configuration
    MONGODB_CONNECTION_STRING: (typeof process !== 'undefined' && process.env)
        ? process.env.MONGODB_CONNECTION_STRING || ''
        : 'mongodb+srv://username:password@cluster.mongodb.net/',
    MONGODB_USERNAME: (typeof process !== 'undefined' && process.env)
        ? process.env.MONGODB_USERNAME || 'your-username'
        : 'your-username',
    MONGODB_DATABASE: (typeof process !== 'undefined' && process.env)
        ? process.env.MONGODB_DATABASE || 'personal_website_cs-learning'
        : 'personal_website_cs-learning',

    // AI Chat Session Limits
    AI_CHAT_SESSION_LIMIT: (typeof process !== 'undefined' && process.env)
        ? parseInt(process.env.AI_CHAT_SESSION_LIMIT) || 3
        : 3,
    AI_CHAT_TOKEN_LIMIT: (typeof process !== 'undefined' && process.env)
        ? parseInt(process.env.AI_CHAT_TOKEN_LIMIT) || 100
        : 100,
    AI_CHAT_COOLDOWN_HOURS: (typeof process !== 'undefined' && process.env)
        ? parseInt(process.env.AI_CHAT_COOLDOWN_HOURS) || 24
        : 24,
    AI_CHAT_RATE_LIMIT_SECONDS: (typeof process !== 'undefined' && process.env)
        ? parseInt(process.env.AI_CHAT_RATE_LIMIT_SECONDS) || 30
        : 30,

    // Performance Settings
    MAX_TILT_ANGLE: 15,
    TILT_UPDATE_INTERVAL: 16,
    STARFIELD_ICON_COUNT: 120,
    ENABLE_STARFIELD: true,
    ENABLE_TILT_EFFECTS: true,

    // Analytics
    ENABLE_ANALYTICS: true,
    ANALYTICS_ID: null, // Set via environment variable

    // Feature Flags
    ENABLE_AI_CHAT: true,
    ENABLE_MONGO_LOGGING: false, // Disabled by default for privacy
    DEBUG_MODE: false
};

// Make CONFIG available globally
window.CONFIG = CONFIG;

// Initialize Google Maps (only if not already set)
document.addEventListener('DOMContentLoaded', function() {
    const mapImg = document.getElementById('location-map');
    if (mapImg && !mapImg.src && CONFIG.GOOGLE_MAPS_API_KEY) {
        const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=Chicago,IL&zoom=11&size=300x200&maptype=roadmap&markers=color:green%7Clabel:D%7CChicago,IL&key=${CONFIG.GOOGLE_MAPS_API_KEY}`;
        mapImg.src = mapUrl;
    }
});