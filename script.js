// ===== THEME MANAGEMENT =====
class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.themeIcon = document.querySelector('.theme-icon');
    this.currentTheme = this.getStoredTheme() || 'dark'; // Default to dark theme

    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
  }

  getStoredTheme() {
    return sessionStorage.getItem('theme');
  }

  setStoredTheme(theme) {
    sessionStorage.setItem('theme', theme);
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;
    this.updateThemeIcon(theme);
    this.setStoredTheme(theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);

    // Track theme toggle for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'theme_toggle', {
        'event_category': 'engagement',
        'event_label': newTheme
      });
    }
  }

  updateThemeIcon(theme) {
    this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    this.themeToggle.setAttribute('aria-label',
      `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  }
}

// ===== SMOOTH NAVIGATION =====
class SmoothNavigation {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavClick(e));
    });
  }

  handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Track navigation clicks for analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'navigation_click', {
          'event_category': 'engagement',
          'event_label': targetId
        });
      }
    }
  }
}

// ===== FORM VALIDATION =====
class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.errors = {};

    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Real-time validation
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    this.clearFieldError(field);

    // Required field validation
    if (field.hasAttribute('required') && !value) {
      errorMessage = `${this.getFieldLabel(field)} is required.`;
      isValid = false;
    }

    // Email validation
    else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address.';
        isValid = false;
      }
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
      this.errors[fieldName] = errorMessage;
    } else {
      delete this.errors[fieldName];
    }

    return isValid;
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  handleSubmit(e) {
    if (!this.validateForm()) {
      e.preventDefault();

      // Focus on first error field
      const firstErrorField = this.form.querySelector('.form-input:invalid, .form-textarea:invalid');
      if (firstErrorField) {
        firstErrorField.focus();
      }

      // Track form validation errors for analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_validation_error', {
          'event_category': 'form',
          'event_label': 'contact_form',
          'value': Object.keys(this.errors).length
        });
      }
    } else {
      // Track successful form submission for analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          'event_category': 'contact',
          'event_label': 'contact_form'
        });
      }
    }
  }

  showFieldError(field, message) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }

    field.setAttribute('aria-invalid', 'true');
    field.style.borderColor = 'var(--error-color)';
  }

  clearFieldError(field) {
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
      errorElement.textContent = '';
      errorElement.style.display = 'none';
    }

    field.removeAttribute('aria-invalid');
    field.style.borderColor = '';
  }

  getFieldLabel(field) {
    const label = document.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : field.name;
  }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
class AnimationController {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        this.observerOptions
      );

      // Observe sections for animations
      const sections = document.querySelectorAll('section');
      sections.forEach(section => this.observer.observe(section));

      // Set up staggered project card animations
      this.setupProjectCardAnimations();
    }
  }

  setupProjectCardAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `all 250ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 80}ms`;

      // Observe each card for staggered reveal
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, index * 80);
            cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      cardObserver.observe(card);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';

        // Track section views for analytics
        if (typeof gtag !== 'undefined') {
          const sectionId = entry.target.id || 'unknown';
          gtag('event', 'section_view', {
            'event_category': 'engagement',
            'event_label': sectionId
          });
        }
      }
    });
  }
}

// ===== EMBED ERROR HANDLING =====
class EmbedManager {
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
    const fallbackLink = embedContainer.querySelector('.embed-fallback');

    if (fallbackLink) {
      iframe.style.display = 'none';
      fallbackLink.style.display = 'block';
      fallbackLink.textContent = 'View Presentation (Embed unavailable)';

      // Track embed failures for analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'embed_error', {
          'event_category': 'error',
          'event_label': iframe.src
        });
      }
    }
  }

  handleEmbedLoad(iframe) {
    const embedContainer = iframe.closest('.project-embed');
    const fallbackLink = embedContainer.querySelector('.embed-fallback');

    if (fallbackLink) {
      fallbackLink.style.display = 'none';
    }
  }
}

// ===== PERFORMANCE MONITORING =====
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    // Monitor Core Web Vitals
    if ('web-vitals' in window) {
      // This would require importing web-vitals library
      // For now, we'll use basic performance monitoring
    }

    // Basic performance tracking
    window.addEventListener('load', () => {
      this.trackLoadTime();
    });
  }

  trackLoadTime() {
    if ('performance' in window) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;

      if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
          'event_category': 'performance',
          'value': Math.round(loadTime)
        });
      }
    }
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
    this.setupAccessibleTooltips();
  }

  setupKeyboardNavigation() {
    // Enhanced keyboard navigation for skill cards and project cards
    const cards = document.querySelectorAll('.skill-card, .project-card');

    cards.forEach(card => {
      card.setAttribute('tabindex', '0');

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const link = card.querySelector('a');
          if (link) {
            link.click();
          }
        }
      });
    });
  }

  setupFocusManagement() {
    // Trap focus in modals (if any are added later)
    // Ensure focus is visible
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  setupScreenReaderSupport() {
    // Announce theme changes to screen readers
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        this.announceToScreenReader(`Switched to ${currentTheme} theme`);
      });
    }
  }

  announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }

  setupAccessibleTooltips() {
    // Enhance skill cards with screen reader accessible tooltips
    const skillCards = document.querySelectorAll('.skill-card[data-tooltip]');

    skillCards.forEach((card, index) => {
      const tooltipId = `tooltip-${index}`;
      const tooltip = card.getAttribute('data-tooltip');

      // Add aria-describedby to the card
      card.setAttribute('aria-describedby', tooltipId);

      // Create hidden tooltip text for screen readers
      const hiddenTooltip = document.createElement('span');
      hiddenTooltip.id = tooltipId;
      hiddenTooltip.classList.add('sr-only');
      hiddenTooltip.textContent = tooltip;
      card.appendChild(hiddenTooltip);

      // Announce tooltip content on focus for screen readers
      card.addEventListener('focus', () => {
        this.announceToScreenReader(`${card.querySelector('.skill-name').textContent}: ${tooltip}`);
      });
    });
  }
}

// ===== ERROR BOUNDARY =====
class ErrorHandler {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('error', (e) => this.handleError(e));
    window.addEventListener('unhandledrejection', (e) => this.handlePromiseRejection(e));
  }

  handleError(e) {
    console.error('JavaScript Error:', e.error);

    // Track errors for analytics (but don't send sensitive information)
    if (typeof gtag !== 'undefined') {
      gtag('event', 'javascript_error', {
        'event_category': 'error',
        'event_label': e.error?.name || 'unknown_error'
      });
    }
  }

  handlePromiseRejection(e) {
    console.error('Unhandled Promise Rejection:', e.reason);

    // Track promise rejections for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'promise_rejection', {
        'event_category': 'error',
        'event_label': 'unhandled_promise_rejection'
      });
    }
  }
}

// ===== ADVANCED MICRO-INTERACTIONS =====
class CursorTrailManager {
  constructor() {
    this.trail = [];
    this.maxTrailLength = 8;
    this.isEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.isEnabled && !window.matchMedia('(pointer: coarse)').matches) {
      this.init();
    }
  }

  init() {
    this.createTrailElements();
    this.bindEvents();
  }

  createTrailElements() {
    for (let i = 0; i < this.maxTrailLength; i++) {
      const trailElement = document.createElement('div');
      trailElement.className = 'cursor-trail';
      trailElement.style.cssText = `
        position: fixed;
        width: ${12 - i}px;
        height: ${12 - i}px;
        background: var(--tech-emerald);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: ${(this.maxTrailLength - i) / this.maxTrailLength * 0.6};
        transition: transform 0.1s ease-out;
        transform: translate(-50%, -50%);
      `;

      document.body.appendChild(trailElement);
      this.trail.push({
        element: trailElement,
        x: 0,
        y: 0
      });
    }
  }

  bindEvents() {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Use requestAnimationFrame for smooth animation
    const updateTrail = () => {
      for (let i = 0; i < this.trail.length; i++) {
        const trail = this.trail[i];
        const targetX = i === 0 ? mouseX : this.trail[i - 1].x;
        const targetY = i === 0 ? mouseY : this.trail[i - 1].y;

        // Smooth interpolation for organic movement
        trail.x += (targetX - trail.x) * 0.3;
        trail.y += (targetY - trail.y) * 0.3;

        trail.element.style.left = `${trail.x}px`;
        trail.element.style.top = `${trail.y}px`;
      }

      requestAnimationFrame(updateTrail);
    };

    updateTrail();
  }
}

class EnhancedTiltManager {
  constructor() {
    this.isEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (this.isEnabled) {
      this.init();
    }
  }

  init() {
    const tiltCards = document.querySelectorAll('[data-tilt]');

    tiltCards.forEach(card => {
      this.setupDynamicTilt(card);
    });
  }

  setupDynamicTilt(element) {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      const rotateX = deltaY * -8; // Reduced intensity for subtlety
      const rotateY = deltaX * 8;

      element.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-5px)
      `;
      element.style.transition = 'transform 0.1s ease-out';
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
      element.style.transition = 'transform 0.3s ease-out';
    });

    // Ensure keyboard accessibility
    element.addEventListener('focus', () => {
      element.style.transform = 'perspective(1000px) translateY(-3px)';
    });

    element.addEventListener('blur', () => {
      element.style.transform = '';
    });
  }
}

// ===== MOBILE NAVIGATION =====
class MobileMenuManager {
  constructor() {
    this.mobileToggle = document.querySelector('.mobile-menu-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.themeToggle = document.querySelector('.theme-toggle');
    this.isOpen = false;
    this.lastFocusedElement = null;

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
    if (typeof gtag !== 'undefined') {
      gtag('event', 'mobile_menu_open', {
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
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab (backward)
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab (forward)
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
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

// ===== GOOGLE MAPS INTEGRATION =====
class MapManager {
  constructor() {
    this.mapElement = document.querySelector('.location-map');
    this.apiKey = 'AIzaSyCrdRj7eIsTgstMpDMQ_KkxS9-n47JEtVk';

    if (this.mapElement && this.apiKey) {
      this.init();
    }
  }

  init() {
    this.loadStaticMap();
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

    this.mapElement.src = mapUrl;

    // Handle map load errors gracefully
    this.mapElement.addEventListener('error', () => {
      this.handleMapError();
    });

    this.mapElement.addEventListener('load', () => {
      console.log('Google Maps static image loaded successfully');
    });
  }

  handleMapError() {
    const mapContainer = this.mapElement.closest('.map-container');
    if (mapContainer) {
      // Replace with a fallback solution
      mapContainer.innerHTML = `
        <div class="map-fallback">
          <div class="fallback-content">
            <span class="location-icon">📍</span>
            <div class="fallback-text">
              <strong>Chicago, Illinois</strong>
              <p>Central Standard Time (CST)</p>
              <a href="https://www.google.com/maps/place/Chicago,+IL"
                 target="_blank"
                 rel="noopener"
                 class="map-link"
                 aria-label="View Chicago location on Google Maps">
                📍 View on Google Maps
              </a>
            </div>
          </div>
        </div>
      `;
    }

    // Track map loading errors for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'map_error', {
        'event_category': 'error',
        'event_label': 'google_maps_static'
      });
    }
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Progressive enhancement: Remove no-js class when JavaScript loads
    document.body.classList.remove('no-js');

    // Initialize all components
    new ThemeManager();
    new MobileMenuManager();
    new SmoothNavigation();
    new FormValidator('.contact-form');
    new AnimationController();
    new EmbedManager();
    new PerformanceMonitor();
    new AccessibilityManager();
    new ErrorHandler();
    new MapManager(); // Initialize Google Maps integration

    // Initialize 2025 advanced micro-interactions
    new CursorTrailManager();
    new EnhancedTiltManager();

    // Track page load for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        'event_category': 'engagement',
        'event_label': 'home_page'
      });
    }

    console.log('Portfolio website with 2025 enhancements initialized successfully');
  } catch (error) {
    console.error('Error initializing portfolio website:', error);
  }
});

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Enhanced scroll behavior for better UX with scroll-based header state
window.addEventListener('scroll', throttle(() => {
  const header = document.querySelector('.header');
  if (window.scrollY > 24) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, 100));

// Handle prefers-reduced-motion with respect for user preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable animations for users who prefer reduced motion
  const style = document.createElement('style');
  style.textContent = `
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

    /* Keep essential hover transitions but reduce them */
    .project-card[data-tilt]:hover,
    .skill-card:hover,
    .hero-cta:hover,
    .contact-link-item:hover {
      transition-duration: 0.1ms !important;
      transform: none !important;
    }

    /* Disable cursor trail and advanced micro-interactions */
    .cursor-trail {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    MobileMenuManager,
    SmoothNavigation,
    FormValidator,
    AnimationController,
    EmbedManager,
    PerformanceMonitor,
    AccessibilityManager,
    ErrorHandler,
    debounce,
    throttle,
    isInViewport
  };
}