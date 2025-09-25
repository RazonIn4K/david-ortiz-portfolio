// Main Orchestration Module - Bootstrap and coordinate all site features
// Handles initialization order, delegated events, and feature instantiation
(function () {
  'use strict';
  // Performance mark for initialization timing
  if (window.performance && window.performance.mark) {
    window.performance.mark('main-init-start');
  }
  // Remove no-js indicators immediately
  document.documentElement.classList.remove('no-js');
  if (document.body) {
    document.body.classList.remove('no-js');
  } else {
    // If body isn't ready, wait for it
    document.addEventListener('DOMContentLoaded', function() {
      document.body.classList.remove('no-js');
    });
  }
  /**
   * Delegated click handler for analytics tracking
   * Elements with data-track attributes will automatically send events
   */
  function setupDelegatedAnalytics() {
    document.addEventListener('click', function(event) {
      const trackableElement = event.target?.closest?.('[data-track]');
      if (!trackableElement || !trackableElement.dataset.track) {
        return;
      }
      const eventName = trackableElement.dataset.track;
      const eventParams = buildTrackParams(trackableElement);
      window.analytics?.track(eventName, eventParams);
    }, true);
  }

  function buildTrackParams(element) {
    const params = {
      event_category: element.dataset.trackCategory || 'engagement',
      event_label: element.dataset.trackLabel ||
        element.textContent?.trim() ||
        element.id ||
        'unknown'
    };

    Object.keys(element.dataset).forEach((key) => {
      if (!key.startsWith('track') || ['track', 'trackCategory', 'trackLabel'].includes(key)) {
        return;
      }
      const paramKey = key.replace('track', '').toLowerCase();
      params[paramKey] = element.dataset[key];
    });

    return params;
  }

  const CONTACT_FORM_SELECTOR = '#contact-form';

  const featureDefinitions = [
    {
      label: 'ThemeManager',
      assign: 'themeManager',
      isAvailable: () => typeof window.ThemeManager !== 'undefined',
      init: () => new window.ThemeManager()
    },
    {
      label: 'SmoothNavigation',
      assign: 'smoothNav',
      isAvailable: () => typeof window.SmoothNavigation !== 'undefined',
      init: () => new window.SmoothNavigation()
    },
    {
      label: 'AnimationController',
      assign: 'animCtrl',
      isAvailable: () => typeof window.AnimationController !== 'undefined',
      init: () => new window.AnimationController()
    },
    {
      label: 'MobileMenuManager',
      assign: 'mobileMenu',
      isAvailable: () => typeof window.MobileMenuManager !== 'undefined',
      init: () => new window.MobileMenuManager()
    },
    {
      label: 'EmbedManager',
      assign: 'embedMgr',
      isAvailable: () => typeof window.EmbedManager !== 'undefined',
      init: () => new window.EmbedManager()
    },
    {
      label: 'PerformanceMonitor',
      assign: 'perfMon',
      isAvailable: () => typeof window.PerformanceMonitor !== 'undefined',
      init: () => new window.PerformanceMonitor()
    },
    {
      label: 'AccessibilityManager',
      assign: 'a11y',
      isAvailable: () => typeof window.AccessibilityManager !== 'undefined',
      init: () => new window.AccessibilityManager()
    },
    {
      label: 'ErrorHandler',
      assign: 'errors',
      isAvailable: () => typeof window.ErrorHandler !== 'undefined',
      init: () => new window.ErrorHandler()
    },
    {
      label: 'FormValidator',
      assign: 'formValidator',
      isAvailable: () => Boolean(document.querySelector(CONTACT_FORM_SELECTOR) && typeof window.FormValidator !== 'undefined'),
      init: () => new window.FormValidator(CONTACT_FORM_SELECTOR)
    },
    {
      label: 'EnhancedFormValidator',
      assign: 'enhancedFormValidator',
      isAvailable: () => Boolean(document.querySelector(CONTACT_FORM_SELECTOR) && typeof window.EnhancedFormValidator !== 'undefined'),
      init: () => new window.EnhancedFormValidator(CONTACT_FORM_SELECTOR, {
        useApiSubmission: true,
        apiEndpoint: '/api/contact',
        enableAnalytics: true
      })
    },
    {
      label: 'LazyLoader',
      assign: 'lazyLoader',
      isAvailable: () => typeof window.LazyLoader !== 'undefined',
      init: () => new window.LazyLoader()
    },
    {
      label: 'EnhancedAIChat',
      assign: 'enhancedChat',
      isAvailable: () => Boolean(window.CONFIG?.ENABLE_AI_CHAT && typeof window.EnhancedAIChat !== 'undefined'),
      init: () => new window.EnhancedAIChat({
        enableAnalytics: true,
        debug: window.CONFIG?.DEBUG || false
      })
    }
  ];

  function initializeFeatures() {
    const initializedFeatures = [];

    featureDefinitions.forEach((feature) => {
      if (!feature.isAvailable()) {
        return;
      }
      try {
        const instance = feature.init();
        if (feature.assign) {
          window[feature.assign] = instance;
        }
        initializedFeatures.push(feature.label);
      } catch (error) {
        if (window.CONFIG?.DEBUG) {
          console.error(`Failed to initialize ${feature.label}`, error);
        }
      }
    });

    return initializedFeatures;
  }

  const SHORTCUT_IGNORE_SELECTOR = 'input, textarea, select, [contenteditable]';

  const shortcutDefinitions = [
    {
      matches: (event) => matchesShortcut(event, { key: 't', ctrlOrMeta: true, shift: true }),
      handler: () => {
        if (!window.themeManager) {
          return;
        }
        window.themeManager.toggleTheme();
        trackShortcutUsage('theme_toggle');
      }
    },
    {
      matches: (event) => matchesShortcut(event, { key: 'k', ctrlOrMeta: true }),
      handler: () => {
        const contactInput = document.querySelector(`${CONTACT_FORM_SELECTOR} input[type="text"], ${CONTACT_FORM_SELECTOR} input[type="email"]`);
        if (!contactInput) {
          return;
        }
        contactInput.focus();
        contactInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        trackShortcutUsage('focus_contact');
      }
    }
  ];

  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
      if (shouldIgnoreShortcut(event)) {
        return;
      }

      const shortcut = shortcutDefinitions.find((definition) => definition.matches(event));
      if (!shortcut) {
        return;
      }

      event.preventDefault();
      shortcut.handler(event);
    });
  }

  function shouldIgnoreShortcut(event) {
    return Boolean(event.target?.closest?.(SHORTCUT_IGNORE_SELECTOR));
  }

  // Helper functions for keyboard shortcut matching (reduces CC from 11 to 3)
  function isCorrectKey(pressedKey, expectedKey) {
    return pressedKey === expectedKey.toLowerCase();
  }

  function hasRequiredModifiers(event, ctrlOrMeta) {
    if (ctrlOrMeta) {
      return event.ctrlKey || event.metaKey;
    }
    return !event.ctrlKey && !event.metaKey;
  }

  function hasExactModifiers(event, shift, alt) {
    return shift === event.shiftKey && alt === event.altKey;
  }

  function matchesShortcut(event, { key, ctrlOrMeta = false, shift = false, alt = false }) {
    const pressedKey = event.key?.toLowerCase();

    return isCorrectKey(pressedKey, key) &&
           hasRequiredModifiers(event, ctrlOrMeta) &&
           hasExactModifiers(event, shift, alt);
  }

  function trackShortcutUsage(eventLabel) {
    window.analytics?.track('keyboard_shortcut', {
      event_category: 'interaction',
      event_label: eventLabel
    });
  }
  // Constants for better maintainability
  const HOUR_IN_MS = 60 * 60 * 1000;
  const SECOND_IN_MS = 1000;

  // Helper functions for page tracking (reduces CC from 9 to 3)
  function trackInitialPageView() {
    window.analytics?.pageview();
  }

  function handleVisibilityChange() {
    const eventType = document.hidden ? 'page_hidden' : 'page_visible';
    const params = {
      event_category: 'engagement'
    };

    if (document.hidden) {
      params.time_on_page = Math.round(performance.now() / SECOND_IN_MS);
    }

    window.analytics?.track(eventType, params);
  }

  function setupVisibilityTracking() {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  function sendUnloadBeacon(timeOnSite) {
    if (!navigator.sendBeacon || !window.analytics.localTracker) {
      return;
    }

    const payload = JSON.stringify({
      event: 'page_unload',
      params: {
        event_category: 'engagement',
        time_on_site: timeOnSite,
        session_id: window.analytics.getSessionId()
      }
    });

    navigator.sendBeacon('/api/analytics', payload);
  }

  function handleBeforeUnload() {
    if (!window.analytics || !window.performance) {
      return;
    }

    const timeOnSite = Math.round(performance.now() / SECOND_IN_MS);
    sendUnloadBeacon(timeOnSite);
  }

  function setupUnloadTracking() {
    window.addEventListener('beforeunload', handleBeforeUnload);
  }

  /**
   * Track initial pageview and setup page visibility tracking
   */
  function setupPageTracking() {
    trackInitialPageView();
    setupVisibilityTracking();
    setupUnloadTracking();
  }
  /**
   * Register service worker for offline support
   */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator && !window.CONFIG?.IS_GITHUB_PAGES) {
      // Only register SW if not on GitHub Pages (or if you want basic offline support)
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
          .then(registration => {
            // Check for updates periodically
            setInterval(() => {
              registration.update();
            }, HOUR_IN_MS); // Check every hour
          })
          .catch(error => {
          });
      });
    }
  }
  /**
   * Main initialization
   */
  function initialize() {
    // Setup delegated analytics first
    setupDelegatedAnalytics();
    // Initialize features
    const initializedFeatures = initializeFeatures();
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    // Setup page tracking
    setupPageTracking();
    // Register service worker
    registerServiceWorker();
    // Log initialization complete
    if (window.performance && window.performance.mark) {
      window.performance.mark('main-init-end');
      window.performance.measure('main-init', 'main-init-start', 'main-init-end');
      const measure = window.performance.getEntriesByName('main-init')[0];
      if (measure && window.CONFIG?.DEBUG) {
        console.debug(`Main initialization completed in ${Math.round(measure.duration)}ms`);
      }
    }
    // Dispatch custom event for other scripts
    window.dispatchEvent(new CustomEvent('mainInitialized', {
      detail: { features: initializedFeatures }
    }));
  }
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // DOM is already ready
    initialize();
  }
})();