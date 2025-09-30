// Unified Analytics Module - Single consent-aware interface for all analytics
// Manages GA4, Vercel Analytics, and custom beacon tracking
// Only loads third-party scripts after explicit consent
(function () {
  "use strict";
  class UnifiedAnalytics {
    constructor(config = {}) {
      // Configuration
      this.gaId =
        config.gaId ||
        (window.CONFIG && window.CONFIG.ANALYTICS_ID) ||
        "G-506106497";
      this.endpoint = config.endpoint || "/api/analytics";
      this.debug = config.debug || false;
      this.sessionId = this.generateSessionId();
      // Provider states
      this.providers = {
        ga: false,
        vercel: false,
        local: false,
      };
      // Consent state (defaults to privacy-first)
      this.consent = {
        necessary: true,
        analytics: false,
        thirdParty: false,
      };
      // Event queue for events before consent
      this.eventQueue = [];
      // Initialize local tracker if available
      this.initializeLocalTracker();
      // Load consent from storage
      this.loadStoredConsent();
      // Expose globally
      window.analytics = this;
      if (this.debug) {
      }
    }
    generateSessionId() {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).slice(2, 7);
      return `s_${timestamp}_${random}`;
    }
    initializeLocalTracker() {
      // Only initialize local tracker if enabled and not on GitHub Pages
      if (!window.CONFIG?.ENABLE_LOCAL_ANALYTICS) {
        return;
      }
      // Reuse existing AnalyticsTracker if present
      if (typeof window.AnalyticsTracker !== "undefined") {
        try {
          this.localTracker = new window.AnalyticsTracker({
            endpoint: this.endpoint,
            debug: this.debug,
          });
          this.providers.local = true;
          if (this.debug) {
            console.debug("Local AnalyticsTracker initialized");
          }
        } catch (e) {
          if (this.debug) {
            console.debug("Failed to initialize local tracker:", e);
          }
        }
      }
    }
    loadStoredConsent() {
      try {
        // Check ConsentManager storage
        const consentData = localStorage.getItem("cs-learning-consent");
        if (consentData) {
          const parsed = JSON.parse(consentData);
          this.setConsent(parsed);
        }
      } catch (e) {
        if (this.debug) {
          console.debug("Failed to load stored consent:", e);
        }
      }
    }
    setConsent(consent) {
      if (!consent || typeof consent !== "object") return;
      const previousConsent = { ...this.consent };
      this.consent = { ...this.consent, ...consent };
      // Load/unload providers based on consent changes
      if (this.consent.analytics && !previousConsent.analytics) {
        this.loadGoogleAnalytics();
        this.processEventQueue();
      }
      if (this.consent.thirdParty && !previousConsent.thirdParty) {
        this.loadVercelAnalytics();
      }
      // If consent is revoked, we don't unload scripts (they're already loaded)
      // but we stop sending new events
      if (!this.consent.analytics && previousConsent.analytics) {
        this.eventQueue = []; // Clear queue
      }
      if (this.debug) {
      }
    }
    loadGoogleAnalytics() {
      if (this.providers.ga || !this.gaId) return;
      try {
        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        // Define gtag function
        window.gtag =
          window.gtag ||
          function () {
            window.dataLayer.push(arguments);
          };
        // Set up initial configuration
        window.gtag("js", new Date());
        window.gtag("config", this.gaId, {
          send_page_view: false, // We'll send manually
          session_id: this.sessionId,
        });
        // Load the script
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(this.gaId)}`;
        script.onload = () => {
          this.providers.ga = true;
          if (this.debug) {
            console.debug("Google Analytics loaded");
          }
          // Send initial pageview
          this.pageview();
        };
        script.onerror = () => {
          if (this.debug) {
            console.debug("Failed to load Google Analytics script");
          }
        };
        document.head.appendChild(script);
      } catch (e) {
        if (this.debug) {
          console.debug("Failed to load Google Analytics:", e);
        }
      }
    }
    loadVercelAnalytics() {
      if (this.providers.vercel) return;
      try {
        const script = document.createElement("script");
        script.defer = true;
        script.src = "https://va.vercel-scripts.com/v1/script.js";
        script.dataset.website = window.location.hostname;
        script.onload = () => {
          this.providers.vercel = true;
          if (this.debug) {
            console.debug("Vercel Analytics loaded");
          }
        };
        script.onerror = () => {
          if (this.debug) {
            console.debug("Failed to load Vercel Analytics");
          }
        };
        document.head.appendChild(script);
      } catch (e) {}
    }
    processEventQueue() {
      if (!this.consent.analytics || this.eventQueue.length === 0) return;
      if (this.debug) {
      }
      while (this.eventQueue.length > 0) {
        const { event, params } = this.eventQueue.shift();
        this.track(event, params);
      }
    }
    pageview(path) {
      const pageviewPath = path || window.location.pathname;
      const pageviewParams = {
        page_location: window.location.href,
        page_path: pageviewPath,
        page_title: document.title,
        session_id: this.sessionId,
      };
      if (!this.consent.analytics) {
        this.eventQueue.push({ event: "page_view", params: pageviewParams });
        return;
      }
      // Google Analytics
      if (this.providers.ga && window.gtag) {
        window.gtag("event", "page_view", pageviewParams);
      }
      // Local tracker
      if (this.providers.local && this.localTracker) {
        this.localTracker.track("page_view", pageviewParams);
      }
      if (this.debug) {
      }
    }
    track(event, params = {}) {
      if (!event) return;
      // Enrich params with session info
      const enrichedParams = {
        ...params,
        session_id: this.sessionId,
        timestamp: Date.now(),
      };
      // If no consent, queue the event
      if (!this.consent.analytics) {
        this.eventQueue.push({ event, params: enrichedParams });
        if (this.debug) {
          console.debug("Event queued (no analytics consent):", event);
        }
        return;
      }
      // Google Analytics
      if (this.providers.ga && window.gtag) {
        window.gtag("event", event, enrichedParams);
      }
      // Local tracker (always send if available, for first-party analytics)
      if (this.providers.local && this.localTracker) {
        this.localTracker.track(event, enrichedParams);
      }
      if (this.debug) {
      }
    }
    // Utility method to check if analytics is enabled
    isEnabled() {
      return this.consent.analytics;
    }
    // Get current session ID
    getSessionId() {
      return this.sessionId;
    }
    // Clear all queued events
    clearQueue() {
      const count = this.eventQueue.length;
      this.eventQueue = [];
      if (this.debug && count > 0) {
      }
    }
    // Get provider status
    getProviderStatus() {
      return { ...this.providers };
    }
    // Custom event helpers
    trackClick(label, category = "engagement") {
      this.track("click", {
        event_category: category,
        event_label: label,
      });
    }
    trackScroll(percentage) {
      this.track("scroll", {
        event_category: "engagement",
        scroll_percentage: Math.round(percentage),
      });
    }
    trackTiming(category, variable, value, label) {
      this.track("timing_complete", {
        event_category: category,
        name: variable,
        value: Math.round(value),
        event_label: label,
      });
    }
    trackError(error, fatal = false) {
      this.track("exception", {
        description: error.message || error,
        fatal: fatal,
      });
    }
  }
  // Initialize immediately
  const analytics = new UnifiedAnalytics({
    endpoint: "/api/analytics",
    debug: window.CONFIG?.DEBUG || false,
  });
  // Listen for consent changes from ConsentManager
  window.addEventListener("consentChanged", (e) => {
    if (e.detail) {
      analytics.setConsent(e.detail);
    }
  });
})();
