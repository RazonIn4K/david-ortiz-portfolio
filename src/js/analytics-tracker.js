// Modern Analytics Tracker for Portfolio Website
// Uses Web APIs for optimal performance and reliability

/**
 * Analytics Tracker using modern Web APIs
 * Features: Beacon API, requestIdleCallback, batch processing
 */
class AnalyticsTracker {
  constructor(options = {}) {
    this.config = {
      batchSize: options.batchSize || 10,
      flushInterval: options.flushInterval || 5000,
      maxRetries: options.maxRetries || 3,
      endpoint: options.endpoint || '/api/analytics',
      debug: options.debug || false,
      ...options
    };

    // Event queue for batching
    this.eventQueue = [];
    this.isOnline = navigator.onLine;
    this.sessionId = this.generateSessionId();
    this.deviceInfo = this.getDeviceInfo();

    // Feature detection
    this.features = {
      beacon: 'sendBeacon' in navigator,
      idle: 'requestIdleCallback' in window,
      observer: 'IntersectionObserver' in window,
      performance: 'performance' in window && 'getEntriesByType' in performance
    };

    this.init();
  }

  /**
   * Initialize tracker
   */
  init() {
    this.setupEventListeners();
    this.startBatchProcessor();
    this.trackPageLoad();

    if (this.config.debug) {
      console.log('📊 Analytics Tracker initialized', this.features);
    }
  }

  /**
   * Track an event
   */
  track(event, data = {}) {
    const payload = {
      event,
      data,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      url: window.location.href,
      referrer: document.referrer,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      device: this.deviceInfo,
      userAgent: navigator.userAgent
    };

    this.addToQueue(payload);

    if (this.config.debug) {
      console.log('📊 Event tracked:', event, data);
    }
  }

  /**
   * Track page view
   */
  trackPageView(page = window.location.pathname) {
    this.track('page_view', {
      page,
      title: document.title,
      loadTime: this.getPageLoadTime()
    });
  }

  /**
   * Track user interaction
   */
  trackInteraction(element, action, data = {}) {
    this.track('user_interaction', {
      element: element.tagName.toLowerCase(),
      action,
      elementId: element.id,
      elementClass: element.className,
      ...data
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformance() {
    if (!this.features.performance) return;

    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');

    const metrics = {
      loadTime: navigation?.loadEventEnd - navigation?.loadEventStart,
      domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
      transferSize: navigation?.transferSize,
      connectionType: navigator.connection?.effectiveType
    };

    this.track('performance_metrics', metrics);
  }

  /**
   * Track scroll depth
   */
  trackScrollDepth() {
    let maxScroll = 0;
    const thresholds = [25, 50, 75, 100];
    const fired = new Set();

    const trackScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      maxScroll = Math.max(maxScroll, scrollPercent);

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          this.track('scroll_depth', { depth: threshold });
        }
      });
    };

    // Use requestIdleCallback for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        if (this.features.idle) {
          requestIdleCallback(trackScroll);
        } else {
          requestAnimationFrame(trackScroll);
        }
        ticking = true;
        setTimeout(() => { ticking = false; }, 100);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Track max scroll on page unload
    window.addEventListener('beforeunload', () => {
      this.track('session_end', { maxScrollDepth: maxScroll });
    });
  }

  /**
   * Track element visibility
   */
  trackElementVisibility(elements, callback) {
    if (!this.features.observer) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const data = {
            element: entry.target.tagName.toLowerCase(),
            elementId: entry.target.id,
            visibilityRatio: entry.intersectionRatio
          };

          this.track('element_visible', data);

          if (callback) callback(entry.target, data);
        }
      });
    }, {
      threshold: [0.1, 0.5, 0.9] // Track different visibility levels
    });

    elements.forEach(element => observer.observe(element));
    return observer;
  }

  /**
   * Add event to queue
   */
  addToQueue(payload) {
    this.eventQueue.push(payload);

    // Immediate flush if queue is full
    if (this.eventQueue.length >= this.config.batchSize) {
      this.flush();
    }
  }

  /**
   * Flush events to server
   */
  async flush() {
    if (this.eventQueue.length === 0) return;

    const batch = this.eventQueue.splice(0, this.config.batchSize);

    try {
      await this.sendBatch(batch);

      if (this.config.debug) {
        console.log('📊 Batch sent successfully:', batch.length, 'events');
      }
    } catch (error) {
      console.error('📊 Failed to send analytics batch:', error);

      // Re-add failed events to queue for retry
      this.eventQueue.unshift(...batch);
    }
  }

  /**
   * Send batch to server
   */
  async sendBatch(batch) {
    const payload = JSON.stringify(batch);

    // Use Beacon API for guaranteed delivery (especially on page unload)
    if (this.features.beacon && document.visibilityState === 'hidden') {
      const sent = navigator.sendBeacon(this.config.endpoint, payload);
      if (!sent) throw new Error('Beacon send failed');
      return;
    }

    // Use fetch for normal requests
    const response = await fetch(this.config.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: payload,
      keepalive: true // Keep request alive during page transitions
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.track('connection_restored');
      this.flush(); // Send queued events
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.track('connection_lost');
    });

    // Page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.track('page_hidden');
        this.flush(); // Ensure events are sent before page hides
      } else {
        this.track('page_visible');
      }
    });

    // Page unload - guarantee event delivery
    window.addEventListener('beforeunload', () => {
      this.flush();
    });

    // Track scroll depth
    this.trackScrollDepth();
  }

  /**
   * Start batch processor
   */
  startBatchProcessor() {
    setInterval(() => {
      if (this.eventQueue.length > 0) {
        this.flush();
      }
    }, this.config.flushInterval);
  }

  /**
   * Track page load event
   */
  trackPageLoad() {
    if (document.readyState === 'complete') {
      this.trackPageView();
      this.trackPerformance();
    } else {
      window.addEventListener('load', () => {
        this.trackPageView();
        this.trackPerformance();
      });
    }
  }

  /**
   * Get device information
   */
  getDeviceInfo() {
    return {
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth
      },
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      connectionType: navigator.connection?.effectiveType || 'unknown'
    };
  }

  /**
   * Get page load time
   */
  getPageLoadTime() {
    if (!this.features.performance) return null;

    const navigation = performance.getEntriesByType('navigation')[0];
    return navigation ? navigation.loadEventEnd - navigation.loadEventStart : null;
  }

  /**
   * Generate session ID
   */
  generateSessionId() {
    // Try to get existing session ID
    const existing = sessionStorage.getItem('analytics_session_id');
    if (existing) return existing;

    // Generate new session ID
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);

    return sessionId;
  }

  /**
   * Enable debug mode
   */
  enableDebug() {
    this.config.debug = true;
    console.log('📊 Analytics debug mode enabled');
  }

  /**
   * Disable debug mode
   */
  disableDebug() {
    this.config.debug = false;
  }

  /**
   * Get current queue status
   */
  getStatus() {
    return {
      queueLength: this.eventQueue.length,
      sessionId: this.sessionId,
      isOnline: this.isOnline,
      features: this.features,
      config: this.config
    };
  }
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
  window.AnalyticsTracker = AnalyticsTracker;
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnalyticsTracker;
}