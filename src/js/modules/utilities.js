// Utilities Module
// Contains performance monitoring, error handling, and accessibility features
import { PERFORMANCE_CONFIG } from '../constants.js';

export class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }
  init() {
    if (typeof window !== 'undefined' && window.performance) {
      this.collectMetrics();
      this.reportWebVitals();
    }
  }
  collectMetrics() {
    window.addEventListener('load', () => {
      const perfData = performance.getEntriesByType('navigation')[0];
      if (perfData) {
        this.metrics = {
          dns: perfData.domainLookupEnd - perfData.domainLookupStart,
          tcp: perfData.connectEnd - perfData.connectStart,
          ttfb: perfData.responseStart - perfData.requestStart,
          download: perfData.responseEnd - perfData.responseStart,
          domInteractive: perfData.domInteractive - perfData.fetchStart,
          domComplete: perfData.domComplete - perfData.fetchStart,
          loadComplete: perfData.loadEventEnd - perfData.fetchStart
        };
        // Track performance metrics
        if (window.analytics) {
          window.analytics.track('page_load_time', {
            event_category: 'performance',
            event_value: Math.round(this.metrics.loadComplete),
            ...this.metrics
          });
        }
      }
    });
  }
  reportWebVitals() {
    // Report Core Web Vitals if available
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        // First Input Delay
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            this.metrics.fid = entry.processingStart - entry.startTime;
          });
        }).observe({ entryTypes: ['first-input'] });
        // Cumulative Layout Shift
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
              this.metrics.cls = cls;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Silently fail if Performance Observer is not supported
      }
    }
  }
  getMetrics() {
    return this.metrics;
  }
}
export class AccessibilityManager {
  constructor() {
    this.init();
  }
  init() {
    this.setupSkipLinks();
    this.setupAriaLiveRegions();
    this.setupFocusManagement();
    this.setupKeyboardShortcuts();
  }
  setupSkipLinks() {
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(skipLink.getAttribute('href'));
        if (target) {
          target.tabIndex = -1;
          target.focus();
          target.scrollIntoView();
        }
      });
    }
  }
  setupAriaLiveRegions() {
    // Create a screen reader announcement region
    const liveRegion = document.createElement('div');
    liveRegion.className = 'sr-only';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    document.body.appendChild(liveRegion);
    // Store reference for announcements
    this.liveRegion = liveRegion;
  }
  announce(message) {
    if (this.liveRegion) {
      this.liveRegion.textContent = message;
      // Clear after announcement
      setTimeout(() => {
        this.liveRegion.textContent = '';
      }, 1000);
    }
  }
  setupFocusManagement() {
    // Add focus visible class for keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
      }
    });
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-nav');
    });
  }
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Alt + 1: Go to home
      if (e.altKey && e.key === '1') {
        e.preventDefault();
        window.location.hash = '#home';
      }
      // Alt + 2: Go to projects
      if (e.altKey && e.key === '2') {
        e.preventDefault();
        window.location.hash = '#projects';
      }
      // Alt + 3: Go to contact
      if (e.altKey && e.key === '3') {
        e.preventDefault();
        window.location.hash = '#contact';
      }
    });
  }
}
export class ErrorHandler {
  constructor() {
    this.errorCount = 0;
    this.errorLog = [];
    this.init();
  }
  init() {
    this.setupErrorHandlers();
    this.setupUnhandledRejectionHandler();
  }
  setupErrorHandlers() {
    window.addEventListener('error', (event) => {
      this.logError({
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      });
      // Track JavaScript errors
      if (window.analytics) {
        window.analytics.track('javascript_error', {
          event_category: 'error',
          event_label: event.message,
          error_source: event.filename,
          error_line: event.lineno
        });
      }
    });
  }
  setupUnhandledRejectionHandler() {
    window.addEventListener('unhandledrejection', (event) => {
      this.logError({
        message: 'Unhandled Promise Rejection',
        error: event.reason
      });
      // Track promise rejections
      if (window.analytics) {
        window.analytics.track('unhandled_rejection', {
          event_category: 'error',
          event_label: event.reason?.message || 'Unknown promise rejection',
          error_type: 'promise_rejection'
        });
      }
    });
  }
  logError(errorInfo) {
    this.errorCount++;
    this.errorLog.push({
      ...errorInfo,
      timestamp: new Date().toISOString()
    });
    // Limit error log size
    if (this.errorLog.length > 50) {
      this.errorLog.shift();
    }
    // Log to console in development
    if (window.CONFIG?.DEBUG) {
    }
  }
  getErrorLog() {
    return this.errorLog;
  }
  clearErrorLog() {
    this.errorLog = [];
    this.errorCount = 0;
  }
}

export class AdvancedPerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.frameTime = 0;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.isLowPerformance = false;
    this.performanceThreshold = PERFORMANCE_CONFIG.MIN_FPS || 30;
  }

  update() {
    this.frameCount += 1;
    const now = performance.now();
    this.frameTime = now - this.lastTime;
    this.lastTime = now;

    if (this.frameCount % 60 === 0 && this.frameTime > 0) {
      this.fps = Math.round(1000 / this.frameTime);
      this.isLowPerformance = this.fps < this.performanceThreshold;
    }
  }

  shouldReduceQuality() {
    return this.isLowPerformance;
  }

  getAdaptiveDelay() {
    return this.isLowPerformance ? 5000 : 3000;
  }

  getAdaptiveIconCount() {
    return this.isLowPerformance ? 0.05 : 0.03;
  }
}

export class BrowserCompatibilityDetector {
  constructor() {
    this.features = this.detectFeatures();
    this.browser = this.detectBrowser();
    this.performance = this.detectPerformance();
  }

  detectFeatures() {
    return {
      webgl: this.checkWebGL(),
      webgl2: this.checkWebGL2(),
      requestAnimationFrame: typeof window.requestAnimationFrame === 'function',
      intersectionObserver: typeof window.IntersectionObserver === 'function',
      visibilityAPI: typeof document.hidden !== 'undefined',
      classList: typeof document.createElement('div').classList !== 'undefined',
      addEventListener: typeof window.addEventListener === 'function',
      localStorage: this.checkLocalStorage(),
      sessionStorage: this.checkSessionStorage(),
      touchEvents: 'ontouchstart' in window,
      cssTransforms: this.checkCSSTransforms(),
      cssFilters: this.checkCSSFilters(),
      cssBlendModes: this.checkCSSBlendModes(),
      cssGridSupport: this.checkCSSGrid(),
      es6Support: this.checkES6Support()
    };
  }

  checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return Boolean(gl);
    } catch (_error) {
      return false;
    }
  }

  checkWebGL2() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      return Boolean(gl);
    } catch (_error) {
      return false;
    }
  }

  checkLocalStorage() {
    try {
      const testKey = '__localStorage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (_error) {
      return false;
    }
  }

  checkSessionStorage() {
    try {
      const testKey = '__sessionStorage_test__';
      sessionStorage.setItem(testKey, testKey);
      sessionStorage.removeItem(testKey);
      return true;
    } catch (_error) {
      return false;
    }
  }

  checkCSSTransforms() {
    const el = document.createElement('div');
    const transforms = ['transform', 'webkitTransform', 'mozTransform', 'msTransform'];
    return transforms.some(prop => el.style[prop] !== undefined);
  }

  checkCSSFilters() {
    const el = document.createElement('div');
    const filters = ['filter', 'webkitFilter', 'mozFilter', 'msFilter'];
    return filters.some(prop => el.style[prop] !== undefined);
  }

  checkCSSBlendModes() {
    const el = document.createElement('div');
    return el.style.mixBlendMode !== undefined;
  }

  checkCSSGrid() {
    const el = document.createElement('div');
    return el.style.display !== undefined && typeof CSS !== 'undefined' && CSS.supports('display', 'grid');
  }

  checkES6Support() {
    try {
      return typeof Symbol !== 'undefined' && typeof Promise !== 'undefined';
    } catch (_error) {
      return false;
    }
  }

  detectBrowser() {
    const ua = navigator.userAgent;
    const browsers = {
      chrome: /Chrome/.test(ua) && /Google Inc/.test(navigator.vendor),
      firefox: /Firefox/.test(ua),
      safari: /Safari/.test(ua) && /Apple Computer/.test(navigator.vendor),
      edge: /Edg/.test(ua),
      ie: /MSIE|Trident/.test(ua),
      opera: /OPR/.test(ua) || /Opera/.test(ua),
      mobile: /Mobi|Android/i.test(ua)
    };
    return Object.keys(browsers).find(key => browsers[key]) || 'unknown';
  }

  detectPerformance() {
    const hardwareConcurrency = navigator.hardwareConcurrency || PERFORMANCE_CONFIG.DEVICE_SCORE_THRESHOLD;
    const deviceMemory = navigator.deviceMemory || (PERFORMANCE_CONFIG.MAX_MEMORY_MB / 25);
    return {
      cores: hardwareConcurrency,
      memory: deviceMemory,
      connectionType: this.getConnectionType(),
      level: this.getPerformanceLevel(hardwareConcurrency, deviceMemory)
    };
  }

  getConnectionType() {
    if (navigator.connection) {
      return navigator.connection.effectiveType || 'unknown';
    }
    return 'unknown';
  }

  getPerformanceLevel(cores, memory) {
    if (cores >= 8 && memory >= 8) return 'high';
    if (cores >= 4 && memory >= 4) return 'medium';
    return 'low';
  }
}

export class MemoryLeakPrevention {
  constructor() {
    this.timeouts = new Set();
    this.intervals = new Set();
    this.animationFrames = new Set();
    this.eventListeners = new Set();
    this.observers = new Set();

    this.startCleanupMonitoring();
  }

  safeSetTimeout(callback, delay, ...args) {
    const timer = window.setTimeout(() => {
      this.timeouts.delete(timer);
      callback.apply(this, args);
    }, delay);
    this.timeouts.add(timer);
    return timer;
  }

  safeSetInterval(callback, delay, ...args) {
    const timer = window.setInterval(() => callback.apply(this, args), delay);
    this.intervals.add(timer);
    return timer;
  }

  safeRequestAnimationFrame(callback) {
    const frame = window.requestAnimationFrame(() => {
      this.animationFrames.delete(frame);
      callback();
    });
    this.animationFrames.add(frame);
    return frame;
  }

  safeAddEventListener(element, event, callback, options = {}) {
    element.addEventListener(event, callback, options);
    this.eventListeners.add({ element, event, callback, options });
    return () => element.removeEventListener(event, callback, options);
  }

  safeObserve(observer, element, options = {}) {
    observer.observe(element, options);
    this.observers.add({ observer, element });
    return () => observer.unobserve(element);
  }

  cleanup() {
    this.timeouts.forEach(timeout => clearTimeout(timeout));
    this.timeouts.clear();

    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals.clear();

    this.animationFrames.forEach(frame => cancelAnimationFrame(frame));
    this.animationFrames.clear();

    this.eventListeners.forEach(({ element, event, callback, options }) => {
      element.removeEventListener(event, callback, options);
    });
    this.eventListeners.clear();

    this.observers.forEach(({ observer }) => observer.disconnect());
    this.observers.clear();
  }

  startCleanupMonitoring() {
    this.safeSetInterval(() => this.checkMemoryUsage(), 300000);

    window.addEventListener('beforeunload', () => this.cleanup());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.cleanup();
      }
    });
  }

  checkMemoryUsage() {
    if ('memory' in performance) {
      const { usedJSHeapSize, jsHeapSizeLimit } = performance.memory;
      const usedMB = Math.round(usedJSHeapSize / 1048576);
      const totalMB = Math.round(jsHeapSizeLimit / 1048576);

      if ('gc' in window) {
        window.gc();
      }

      if (usedMB > totalMB * 0.8) {
        this.forceCleanup();
      }
    }
  }

  forceCleanup() {
    document.querySelectorAll('[data-temp], .temp-element').forEach(el => el.remove());

    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('temp_') || key.startsWith('debug_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (_error) {
      // Gracefully ignore storage access issues
    }
  }
}

// Export for backward compatibility
if (typeof window !== 'undefined') {
  window.PerformanceMonitor = PerformanceMonitor;
  window.AccessibilityManager = AccessibilityManager;
  window.ErrorHandler = ErrorHandler;
  window.AdvancedPerformanceMonitor = AdvancedPerformanceMonitor;
  window.BrowserCompatibilityDetector = BrowserCompatibilityDetector;
  window.MemoryLeakPrevention = MemoryLeakPrevention;
}