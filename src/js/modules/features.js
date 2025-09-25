// Feature Modules (navigation, embeds, chat)
// Generated to isolate feature-specific controllers from core application

import { MemoryLeakPrevention } from './utilities.js';

export class EmbedManager {
  constructor() {
    this.iframes = document.querySelectorAll('.project-embed iframe');
    this.init();
  }
  init() {
    this.iframes.forEach(iframe => {
      iframe.addEventListener('error', () => this.handleEmbedError(iframe));
      iframe.addEventListener('load', () => this.handleEmbedLoad(iframe));
      // Set timeout for loading
      setTimeout(() => {
        if (!iframe.complete) {
          this.handleEmbedError(iframe);
        }
      }, 10000); // 10 second timeout
    });
  }
  handleEmbedError(iframe) {
    const embedContainer = iframe.closest('.project-embed');
    const fallbackLink = embedContainer.querySelector('.embed-fallback, .presentation-fallback');
    if (fallbackLink) {
      iframe.style.display = 'none';
      fallbackLink.style.display = 'block';
      fallbackLink.textContent = 'View Presentation (Embed unavailable)';
      // Track embed failures for analytics
      if (window.analytics) {
        window.analytics.track('embed_error', {
          'event_category': 'error',
          'event_label': iframe.src
        });
      }
    }
  }
  handleEmbedLoad(iframe) {
    const embedContainer = iframe.closest('.project-embed');
    const fallbackLink = embedContainer.querySelector('.embed-fallback, .presentation-fallback');
    if (fallbackLink) {
      fallbackLink.style.display = 'none';
    }
  }
}

export class MobileMenuManager {
  constructor() {
    this.mobileToggle = document.querySelector('.mobile-menu-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.themeToggle = document.querySelector('.theme-toggle');
    this.isOpen = false;
    this.lastFocusedElement = null;
    this.memoryCleanup = new MemoryLeakPrevention();
    if (this.mobileToggle && this.navMenu) {
      this.init();
    }
  }
  init() {
    this.mobileToggle.addEventListener('click', () => this.toggleMenu());
    // Close menu when clicking nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !e.target.closest('.nav-container')) {
        this.closeMenu();
      }
    });
    // Enhanced keyboard navigation and focus trapping
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      // Close menu on escape key
      if (e.key === 'Escape') {
        this.closeMenu();
        this.mobileToggle.focus();
        return;
      }
      // Implement focus trapping
      if (e.key === 'Tab') {
        this.handleTabKey(e);
      }
    });
    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 767 && this.isOpen) {
        this.closeMenu();
      }
    });
  }
  toggleMenu() {
    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  openMenu() {
    // Store current focused element
    this.lastFocusedElement = document.activeElement;
    this.navMenu.classList.add('open');
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    this.mobileToggle.querySelector('.menu-icon').textContent = '✕';
    this.isOpen = true;
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';
    // Focus first navigation link for keyboard users
    setTimeout(() => {
      const firstNavLink = this.navMenu.querySelector('.nav-link');
      if (firstNavLink) {
        firstNavLink.focus();
      }
    }, 100); // Small delay to ensure menu is visible
    // Track menu open for analytics
    if (window.analytics) {
      window.analytics.track('mobile_menu_open', {
        'event_category': 'navigation',
        'event_label': 'mobile_navigation'
      });
    }
  }
  closeMenu() {
    this.navMenu.classList.remove('open');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileToggle.querySelector('.menu-icon').textContent = '☰';
    this.isOpen = false;
    // Restore body scroll
    document.body.style.overflow = '';
    // Restore focus to last focused element
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
      this.lastFocusedElement = null;
    }
  }
  handleTabKey(e) {
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;
    const bounds = this.getFocusableBounds(focusableElements);
    if (e.shiftKey) {
      this.handleBackwardTab(e, bounds);
    } else {
      this.handleForwardTab(e, bounds);
    }
  }
  getFocusableBounds(focusableElements) {
    return {
      first: focusableElements[0],
      last: focusableElements[focusableElements.length - 1]
    };
  }
  handleBackwardTab(e, bounds) {
    if (document.activeElement === bounds.first) {
      e.preventDefault();
      bounds.last.focus();
    }
  }
  handleForwardTab(e, bounds) {
    if (document.activeElement === bounds.last) {
      e.preventDefault();
      bounds.first.focus();
    }
  }
  getFocusableElements() {
    const focusableSelectors = [
      '.mobile-menu-toggle',
      '.theme-toggle',
      '.nav-link'
    ];
    return focusableSelectors
      .map(selector => [...document.querySelectorAll(selector)])
      .flat()
      .filter(element => {
        return element.offsetParent !== null && // Element is visible
               !element.disabled &&
               element.tabIndex !== -1;
      });
  }
}

export class MapManager {
  constructor() {
    this.mapElement = document.querySelector('.location-map');
    if (!this.mapElement) return;
    this.placeholderSrc = this.mapElement.getAttribute('data-placeholder-src') || 'assets/chicago-map.svg';
    this.apiKey = (typeof window.CONFIG !== 'undefined' && window.CONFIG.GOOGLE_MAPS_API_KEY) ? window.CONFIG.GOOGLE_MAPS_API_KEY : null;
    if (this.apiKey) {
      this.attachErrorHandler();
      this.loadStaticMap();
    } else {
      this.showPlaceholder('missing_api_key');
    }
  }
  attachErrorHandler() {
    this.boundErrorHandler = this.handleMapError.bind(this);
    this.mapElement.addEventListener('error', this.boundErrorHandler, { once: true });
  }
  loadStaticMap() {
    const mapParams = {
      center: 'Chicago,IL',
      zoom: 11,
      size: '300x200',
      maptype: 'roadmap',
      markers: 'color:green|label:D|Chicago,IL',
      key: this.apiKey
    };
    const mapUrl = 'https://maps.googleapis.com/maps/api/staticmap?' +
      Object.entries(mapParams)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
    this.mapElement.classList.remove('map-placeholder');
    this.mapElement.alt = 'Google Maps static map of Chicago, Illinois';
    this.mapElement.src = mapUrl;
  }
  handleMapError() {
    this.showPlaceholder('load_error');
    if (window.analytics) {
      window.analytics.track('map_error', {
        event_category: 'error',
        event_label: 'google_maps_static'
      });
    }
  }
  showPlaceholder(reason = 'missing_api_key') {
    this.mapElement.classList.add('map-placeholder');
    this.mapElement.alt = 'Stylized map illustration of Chicago, Illinois';
    this.mapElement.src = this.placeholderSrc;
    if (reason === 'missing_api_key' && typeof gtag !== 'undefined') {
      window.analytics.track('map_api_key_missing', {
        event_category: 'info',
        event_label: 'google_maps_no_key'
      });
    }
  }
}

export class GlobalScrollManager {
  constructor() {
    this.handlers = new Map();
    this.isScrolling = false;
    this.lastScrollY = 0;
    this.animationFrame = null;
    this.setupScrollListener();
  }
  setupScrollListener() {
    let ticking = false;
    let scrollTimeout = null;
    const handleScroll = () => {
      // Add scrolling class for performance optimizations
      document.body.classList.add('is-scrolling');
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      // Remove scrolling class after scroll ends
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 150);
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Execute all registered handlers efficiently
          this.handlers.forEach((handler, name) => {
            try {
              handler(currentScrollY);
            } catch (error) {
            }
          });
          this.lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
  addHandler(name, handler) {
    this.handlers.set(name, handler);
  }
  removeHandler(name) {
    this.handlers.delete(name);
  }
  getHandlerCount() {
    return this.handlers.size;
  }
}

export class ChatSystemManager {
  constructor() {
    this.init();
  }
  init() {
    // Handle Start Chat button
    const startChatButton = document.getElementById('start-chat');
    const chatInput = document.getElementById('chat-input');
    if (startChatButton && chatInput) {
      startChatButton.addEventListener('click', () => {
        this.enableChat(chatInput, startChatButton);
      });
    }
  }
  enableChat(chatInput, startChatButton) {
    // Enable the chat input
    chatInput.disabled = false;
    chatInput.focus();
    // Update button text and state
    const buttonSpan = startChatButton.querySelector('span');
    if (buttonSpan) {
      buttonSpan.textContent = 'Send Message';
    }
    // Change button type to submit for form submission
    startChatButton.type = 'submit';
    // Add visual feedback
    chatInput.classList.add('chat-enabled');
    startChatButton.classList.add('chat-active');
  }
}
// Export for backward compatibility
if (typeof window !== 'undefined') {
  window.EmbedManager = EmbedManager;
  window.MobileMenuManager = MobileMenuManager;
  window.MapManager = MapManager;
  window.GlobalScrollManager = GlobalScrollManager;
  window.ChatSystemManager = ChatSystemManager;
}
