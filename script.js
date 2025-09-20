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
    const skillCards = document.querySelectorAll('.skill-card');

    // Enhanced project card animations
    projectCards.forEach((card, index) => {
      card.classList.add('fade-in-on-scroll');
      card.style.transitionDelay = `${index * 80}ms`;

      // Observe each card for staggered reveal
      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, index * 80);
            cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      cardObserver.observe(card);
    });

    // Enhanced skill card animations
    skillCards.forEach((card, index) => {
      card.classList.add('fade-in-on-scroll');
      card.style.transitionDelay = `${index * 40}ms`;

      const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, index * 40);
            cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

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

// ===== ADVANCED PERFORMANCE MONITORING SYSTEM =====
class AdvancedPerformanceMonitor {
  constructor() {
    this.fps = 60;
    this.frameTime = 0;
    this.lastTime = performance.now();
    this.frameCount = 0;
    this.isLowPerformance = false;
    this.performanceThreshold = 30; // FPS threshold for quality adjustment
  }

  update() {
    this.frameCount++;
    const now = performance.now();
    this.frameTime = now - this.lastTime;
    this.lastTime = now;

    // Calculate FPS every 60 frames
    if (this.frameCount % 60 === 0) {
      this.fps = Math.round(1000 / this.frameTime);
      this.isLowPerformance = this.fps < this.performanceThreshold;

    }
  }

  shouldReduceQuality() {
    return this.isLowPerformance;
  }

  getAdaptiveDelay() {
    return this.isLowPerformance ? 5000 : 3000; // Slower updates on low performance
  }

  getAdaptiveIconCount() {
    return this.isLowPerformance ? 0.05 : 0.03; // Fewer icons updating on low performance
  }
}

// ===== ADVANCED STARFIELD BACKGROUND EFFECT =====
class StarfieldManager {
  constructor() {
    this.icons = [
      'https://img.icons8.com/fluency/64/react-native.png',
      'https://img.icons8.com/fluency/64/javascript.png',
      'https://img.icons8.com/fluency/64/python.png',
      'https://img.icons8.com/fluency/64/nodejs.png',
      'https://img.icons8.com/fluency/64/docker.png',
      'https://img.icons8.com/fluency/64/amazon-web-services.png',
      'https://img.icons8.com/fluency/64/google-cloud.png',
      'https://img.icons8.com/fluency/64/azure-1.png',
      'https://img.icons8.com/fluency/64/typescript.png',
      'https://img.icons8.com/fluency/64/vue-js.png',
      'https://img.icons8.com/fluency/64/graphql.png',
      'https://img.icons8.com/fluency/64/mongodb.png',
      'https://img.icons8.com/fluency/64/postgresql.png'
    ];
    this.starfieldContainer = null;
    this.totalIcons = 210; // Match target website exactly
    this.isEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Advanced animation properties
    this.animationFrame = null;
    this.twinkleInterval = null;
    this.performanceMonitor = new AdvancedPerformanceMonitor();
    this.iconPool = []; // Object pooling for better performance
    this.lastFrameTime = 0;
    this.frameCount = 0;
    this.adaptiveQuality = true;

    if (this.isEnabled) {
      this.init();
    }
  }

  init() {
    this.createStarfield();
    this.generateRandomOpacities();
    this.addTwinklingEffect();
    this.addMouseInteraction();
    this.addScrollBasedAnimation();
  }

  createStarfield() {
    // Create starfield container
    this.starfieldContainer = document.createElement('div');
    this.starfieldContainer.className = 'starfield-background';
    this.starfieldContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
      gap: 15px;
      padding: 15px;
      overflow: hidden;
    `;

    // Insert before main content
    const body = document.body;
    const firstChild = body.firstChild;
    body.insertBefore(this.starfieldContainer, firstChild);

    // Generate icons
    for (let i = 0; i < this.totalIcons; i++) {
      this.createStarIcon(i);
    }
  }

  createStarIcon(index) {
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'starfield-icon-wrapper';
    iconWrapper.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition-base);
    `;

    const icon = document.createElement('img');
    const randomIcon = this.icons[Math.floor(Math.random() * this.icons.length)];

    icon.src = randomIcon;
    icon.alt = 'tech icon';
    icon.className = 'starfield-icon';
    icon.style.cssText = `
      width: 40px;
      height: 40px;
      opacity: ${Math.random()}; /* Random opacity between 0-1 */
      filter: grayscale(70%) brightness(0.8);
      transition: var(--transition-base);
    `;

    // Add subtle hover effect that doesn't interfere with the random opacity
    iconWrapper.addEventListener('mouseenter', () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        icon.style.transform = 'scale(1.1)';
        icon.style.filter = 'grayscale(30%) brightness(1.1)';
      }
    });

    iconWrapper.addEventListener('mouseleave', () => {
      icon.style.transform = 'scale(1)';
      icon.style.filter = 'grayscale(70%) brightness(0.8)';
    });

    iconWrapper.appendChild(icon);
    this.starfieldContainer.appendChild(iconWrapper);
  }

  generateRandomOpacities() {
    // Re-randomize opacities every 30 seconds for subtle variation
    const icons = this.starfieldContainer.querySelectorAll('.starfield-icon');

    const updateOpacities = () => {
      icons.forEach(icon => {
        const newOpacity = Math.random();
        icon.style.opacity = newOpacity;
      });
    };

    // Uncomment below if you want dynamic opacity changes (optional)
    // setInterval(updateOpacities, 30000);
  }

  addTwinklingEffect() {
    const icons = this.starfieldContainer.querySelectorAll('.starfield-icon');
    this.iconPool = Array.from(icons); // Create icon pool for better performance

    // Advanced twinkling with performance monitoring and color effects
    const performanceTwinkle = () => {
      if (!this.isEnabled) return;

      this.performanceMonitor.update();

      // Adaptive quality based on performance
      const iconUpdatePercent = this.performanceMonitor.getAdaptiveIconCount();
      const iconsToUpdate = Math.floor(icons.length * iconUpdatePercent);

      // Use requestAnimationFrame for smooth updates
      this.animationFrame = requestAnimationFrame(() => {
        for (let i = 0; i < iconsToUpdate; i++) {
          const randomIcon = this.iconPool[Math.floor(Math.random() * this.iconPool.length)];
          const newOpacity = this.generateSmartOpacity();

          // Use CSS transform for GPU acceleration
          randomIcon.style.transition = 'opacity 2s cubic-bezier(0.4, 0, 0.2, 1), filter 3s ease-in-out';
          randomIcon.style.opacity = newOpacity;

          // Add dynamic color-changing effects
          if (!this.performanceMonitor.shouldReduceQuality()) {
            this.addColorChangeEffect(randomIcon);
          }

          // Add subtle scale animation for enhanced effect
          if (!this.performanceMonitor.shouldReduceQuality() && Math.random() < 0.1) {
            randomIcon.style.transform = `scale(${0.95 + Math.random() * 0.1})`;
          }
        }
      });

      // Adaptive interval timing
      const delay = this.performanceMonitor.getAdaptiveDelay();
      this.twinkleInterval = setTimeout(performanceTwinkle, delay);
    };

    // Start the enhanced twinkling effect
    performanceTwinkle();
  }

  addColorChangeEffect(icon) {
    // Generate dynamic color variations
    const time = Date.now() * 0.001;
    const iconIndex = Array.from(this.iconPool).indexOf(icon);

    // Create unique color signature for each icon
    const hueBase = (iconIndex * 137.5) % 360; // Golden angle distribution
    const hueShift = Math.sin(time * 0.5 + iconIndex * 0.1) * 30;
    const finalHue = (hueBase + hueShift) % 360;

    // Dynamic saturation and brightness
    const saturation = 30 + Math.sin(time * 0.3 + iconIndex * 0.05) * 20;
    const brightness = 0.8 + Math.sin(time * 0.2 + iconIndex * 0.03) * 0.3;

    // Apply color filter with smooth transitions
    const grayscale = 50 + Math.sin(time * 0.4 + iconIndex * 0.02) * 30;
    const colorFilter = `hue-rotate(${finalHue}deg) saturate(${saturation}%) brightness(${brightness}) grayscale(${grayscale}%)`;

    // Apply the color transformation
    icon.style.filter = colorFilter;

    // Add occasional burst effects
    if (Math.random() < 0.02) {
      this.createColorBurst(icon);
    }
  }

  createColorBurst(icon) {
    // Create temporary color burst effect
    const originalFilter = icon.style.filter;
    const burstHue = Math.random() * 360;

    // Burst phase
    icon.style.filter = `hue-rotate(${burstHue}deg) saturate(150%) brightness(1.5) grayscale(0%)`;
    icon.style.transform = 'scale(1.3)';

    // Reset after burst
    setTimeout(() => {
      icon.style.filter = originalFilter;
      icon.style.transform = '';
    }, 300);
  }

  // Add advanced rainbow wave effect
  addRainbowWaveEffect() {
    if (!this.iconPool.length) return;

    const waveEffect = () => {
      if (!this.isEnabled) return;

      const time = Date.now() * 0.002;

      this.iconPool.forEach((icon, index) => {
        const wavePosition = (index / this.iconPool.length) * Math.PI * 2;
        const hue = (time * 50 + wavePosition * 180 / Math.PI) % 360;

        // Create wave-like color propagation
        const intensity = (Math.sin(time * 2 + wavePosition) + 1) * 0.5;
        const saturation = intensity * 100;
        const brightness = 0.7 + intensity * 0.4;

        if (Math.random() < 0.1) { // Only update some icons per frame for performance
          icon.style.filter = `hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${brightness}) grayscale(20%)`;
        }
      });

      requestAnimationFrame(waveEffect);
    };

    // Start rainbow wave (can be toggled)
    if (this.enableRainbowMode) {
      waveEffect();
    }
  }

  // Add method to toggle rainbow mode
  toggleRainbowMode(enabled = !this.enableRainbowMode) {
    this.enableRainbowMode = enabled;

    if (enabled) {
      this.addRainbowWaveEffect();
    } else {
      // Reset to default colors
      this.iconPool.forEach(icon => {
        icon.style.filter = 'grayscale(70%) brightness(0.8)';
      });
    }
  }

  generateSmartOpacity() {
    // Generate opacity with weighted distribution for more natural effect
    const random = Math.random();
    if (random < 0.1) return 0.1 + Math.random() * 0.2; // 10% very dim
    if (random < 0.3) return 0.8 + Math.random() * 0.2; // 20% very bright
    return 0.3 + Math.random() * 0.5; // 70% medium range
  }

  addMouseInteraction() {
    if (!this.starfieldContainer) return;

    let mouseX = 0;
    let mouseY = 0;
    let lastInteractionTime = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const now = performance.now();

      // Throttle mouse interactions for performance
      if (now - lastInteractionTime < 100) return;
      lastInteractionTime = now;

      // Find nearby icons and enhance their brightness
      const icons = this.starfieldContainer.querySelectorAll('.starfield-icon-wrapper');
      icons.forEach(iconWrapper => {
        const rect = iconWrapper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));

        if (distance < 150) { // 150px radius
          const icon = iconWrapper.querySelector('.starfield-icon');
          const proximityFactor = 1 - (distance / 150);
          const brightness = 0.8 + (proximityFactor * 0.4);
          icon.style.filter = `grayscale(${70 - proximityFactor * 40}%) brightness(${brightness})`;
        }
      });
    });
  }

  addScrollBasedAnimation() {
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let scrollDirection = 0;

    const scrollHandler = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.abs(currentScrollY - lastScrollY);
      scrollDirection = currentScrollY > lastScrollY ? 1 : -1;
      lastScrollY = currentScrollY;

      // Parallax effect based on scroll
      if (this.starfieldContainer && scrollVelocity > 2) {
        const parallaxOffset = scrollVelocity * scrollDirection * 0.1;
        this.starfieldContainer.style.transform = `translateY(${parallaxOffset}px)`;

        // Add temporary brightness boost during scroll
        this.starfieldContainer.style.filter = `brightness(${1 + Math.min(scrollVelocity * 0.01, 0.3)})`;

        // Reset after a short delay
        setTimeout(() => {
          if (this.starfieldContainer) {
            this.starfieldContainer.style.transform = 'translateY(0)';
            this.starfieldContainer.style.filter = 'brightness(1)';
          }
        }, 300);
      }
    };

    // Throttled scroll listener
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollHandler();
        scrollTimeout = null;
      }, 16); // ~60fps
    }, { passive: true });
  }

  getPerformanceMetrics() {
    return {
      fps: this.performanceMonitor.fps,
      isLowPerformance: this.performanceMonitor.isLowPerformance,
      iconCount: this.totalIcons,
      adaptiveQuality: this.adaptiveQuality
    };
  }

  destroy() {
    // Clean up animations and intervals
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.twinkleInterval) {
      clearTimeout(this.twinkleInterval);
    }

    // Remove DOM elements
    if (this.starfieldContainer) {
      this.starfieldContainer.remove();
    }

    // Clean up references
    this.iconPool = [];
    this.performanceMonitor = null;
  }
}

// ===== BROWSER COMPATIBILITY DETECTOR =====
class BrowserCompatibilityDetector {
  constructor() {
    this.features = this.detectFeatures();
    this.browser = this.detectBrowser();
    this.performance = this.detectPerformance();
  }

  detectFeatures() {
    return {
      webgl: this.checkWebGL(),
      webgl2: this.checkWebGL2(),
      requestAnimationFrame: !!window.requestAnimationFrame,
      intersectionObserver: !!window.IntersectionObserver,
      visibilityAPI: typeof document.hidden !== 'undefined',
      classList: !!document.createElement('div').classList,
      addEventListener: !!window.addEventListener,
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
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  checkWebGL2() {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2');
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  checkLocalStorage() {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  checkSessionStorage() {
    try {
      const test = '__sessionStorage_test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
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
    return el.style.display !== undefined && CSS.supports('display', 'grid');
  }

  checkES6Support() {
    try {
      return typeof Symbol !== 'undefined' && typeof Promise !== 'undefined';
    } catch (e) {
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
    const hardwareConcurrency = navigator.hardwareConcurrency || 2;
    const deviceMemory = navigator.deviceMemory || 4;

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

// ===== WEBGL PARTICLE SYSTEM WITH FALLBACKS =====
class WebGLParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.compatibilityDetector = new BrowserCompatibilityDetector();
    this.gl = null;
    this.isWebGLSupported = false;
    this.particles = [];
    this.particleCount = 100;
    this.animationId = null;
    this.fallbackMode = false;

    this.initWithFallback();
  }

  initWithFallback() {
    // Try WebGL first
    if (this.compatibilityDetector.features.webgl) {
      try {
        this.gl = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
        this.isWebGLSupported = !!this.gl;

        if (this.isWebGLSupported) {
          this.init();
          return;
        }
      } catch (e) {
        console.warn('WebGL initialization failed, falling back to Canvas 2D:', e);
      }
    }

    // Fallback to Canvas 2D
    this.fallbackMode = true;
    this.initCanvasFallback();
  }

  initCanvasFallback() {
    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      console.warn('Canvas 2D not supported, disabling particle system');
      return;
    }

    // Reduce particle count for performance
    this.particleCount = Math.min(50, this.particleCount);
    this.initParticles();
    this.renderCanvasFallback();
  }

  init() {
    if (!this.isWebGLSupported) return;

    try {
      // WebGL setup for high-performance particle rendering
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

      // Create particle buffer
      this.initParticles();
      this.createShaders();
      this.render();
    } catch (e) {
      console.warn('WebGL setup failed, switching to Canvas fallback:', e);
      this.fallbackMode = true;
      this.initCanvasFallback();
    }
  }

  renderCanvasFallback() {
    if (!this.ctx) return;

    const animate = () => {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      // Update and render particles with 2D canvas
      this.particles.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;

        // Update opacity
        particle.opacity = 0.3 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2;

        // Draw particle
        this.ctx.save();
        this.ctx.globalAlpha = particle.opacity;
        this.ctx.fillStyle = `rgb(${Math.floor(particle.color[0] * 255)}, ${Math.floor(particle.color[1] * 255)}, ${Math.floor(particle.color[2] * 255)})`;
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
      });

      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  initParticles() {
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        size: Math.random() * 3 + 1,
        color: [Math.random(), Math.random(), Math.random()],
        life: 1.0
      });
    }
  }

  createShaders() {
    // Simple vertex shader for particles
    const vertexShaderSource = `
      attribute vec2 position;
      attribute float size;
      attribute float opacity;
      attribute vec3 color;

      varying float vOpacity;
      varying vec3 vColor;

      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
        gl_PointSize = size;
        vOpacity = opacity;
        vColor = color;
      }
    `;

    // Fragment shader for particles
    const fragmentShaderSource = `
      precision mediump float;

      varying float vOpacity;
      varying vec3 vColor;

      void main() {
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;

        float alpha = (1.0 - dist * 2.0) * vOpacity;
        gl_FragColor = vec4(vColor, alpha);
      }
    `;

    this.program = this.createProgram(vertexShaderSource, fragmentShaderSource);
  }

  createProgram(vertexSource, fragmentSource) {
    const program = this.gl.createProgram();
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fragmentSource);

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    return program;
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    return shader;
  }

  render() {
    if (!this.isWebGLSupported) return;

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);

    // Update and render particles
    this.updateParticles();
    this.renderParticles();

    this.animationId = requestAnimationFrame(() => this.render());
  }

  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around screen
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      // Subtle opacity variation
      particle.opacity = 0.3 + Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2;
    });
  }

  renderParticles() {
    // Convert screen coordinates to WebGL coordinates and render
    const positions = [];
    const sizes = [];
    const opacities = [];
    const colors = [];

    this.particles.forEach(particle => {
      positions.push(
        (particle.x / this.canvas.width) * 2 - 1,
        -((particle.y / this.canvas.height) * 2 - 1)
      );
      sizes.push(particle.size);
      opacities.push(particle.opacity);
      colors.push(...particle.color);
    });

    // Bind and render (simplified for brevity)
    this.gl.drawArrays(this.gl.POINTS, 0, this.particleCount);
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// ===== ADVANCED CURSOR TRAIL SYSTEM =====
class AdvancedCursorTrail {
  constructor() {
    this.trail = [];
    this.maxTrailLength = 20;
    this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];
    this.currentColorIndex = 0;
    this.isActive = true;

    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => this.addTrailPoint(e));
    this.animate();
  }

  addTrailPoint(e) {
    if (!this.isActive) return;

    const point = {
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
      color: this.colors[this.currentColorIndex],
      size: 8
    };

    this.trail.push(point);

    if (this.trail.length > this.maxTrailLength) {
      this.trail.shift();
    }

    // Cycle through colors
    this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
  }

  animate() {
    // Remove old trail points
    const now = Date.now();
    this.trail = this.trail.filter(point => now - point.timestamp < 1000);

    // Update existing trail elements
    this.trail.forEach((point, index) => {
      const age = (now - point.timestamp) / 1000;
      const opacity = Math.max(0, 1 - age);
      const scale = Math.max(0.1, 1 - age * 0.8);

      let element = document.querySelector(`[data-trail-id="${index}"]`);
      if (!element) {
        element = document.createElement('div');
        element.className = 'cursor-trail-point';
        element.setAttribute('data-trail-id', index);
        document.body.appendChild(element);
      }

      element.style.cssText = `
        position: fixed;
        left: ${point.x - point.size/2}px;
        top: ${point.y - point.size/2}px;
        width: ${point.size}px;
        height: ${point.size}px;
        background: ${point.color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: ${opacity};
        transform: scale(${scale});
        transition: all 0.1s ease-out;
        box-shadow: 0 0 10px ${point.color}40;
      `;
    });

    requestAnimationFrame(() => this.animate());
  }

  setActive(active) {
    this.isActive = active;
    if (!active) {
      // Clear trail
      document.querySelectorAll('.cursor-trail-point').forEach(el => el.remove());
      this.trail = [];
    }
  }
}

// ===== MAGNETIC FIELD EFFECTS =====
class MagneticFieldController {
  constructor() {
    this.magneticElements = [];
    this.strength = 50;
    this.maxDistance = 150;
    this.isActive = true;

    this.init();
  }

  init() {
    // Find elements that should have magnetic effects
    this.magneticElements = Array.from(document.querySelectorAll(
      '.project-card, .skill-item, .social-link, .starfield-icon'
    ));

    document.addEventListener('mousemove', (e) => this.updateMagneticField(e));
  }

  updateMagneticField(e) {
    if (!this.isActive) return;

    this.magneticElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < this.maxDistance) {
        const force = (this.maxDistance - distance) / this.maxDistance;
        const moveX = (deltaX / distance) * force * this.strength;
        const moveY = (deltaY / distance) * force * this.strength;

        element.style.transform = `translate(${moveX * 0.3}px, ${moveY * 0.3}px) scale(${1 + force * 0.1})`;
        element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

        // Add glow effect
        element.style.boxShadow = `0 0 ${20 * force}px rgba(255, 255, 255, ${0.2 * force})`;
      } else {
        element.style.transform = '';
        element.style.boxShadow = '';
      }
    });
  }

  setActive(active) {
    this.isActive = active;
    if (!active) {
      this.magneticElements.forEach(element => {
        element.style.transform = '';
        element.style.boxShadow = '';
      });
    }
  }
}

// ===== ANIMATION PRESET SYSTEM =====
class AnimationPresetManager {
  constructor() {
    this.presets = {
      minimal: {
        name: 'Minimal',
        starfieldEnabled: false,
        cursorTrail: false,
        magneticField: false,
        particleSystem: false,
        transitionDuration: '0.2s'
      },
      balanced: {
        name: 'Balanced',
        starfieldEnabled: true,
        cursorTrail: false,
        magneticField: true,
        particleSystem: false,
        transitionDuration: '0.4s'
      },
      enhanced: {
        name: 'Enhanced',
        starfieldEnabled: true,
        cursorTrail: true,
        magneticField: true,
        particleSystem: false,
        transitionDuration: '0.6s'
      },
      ultimate: {
        name: 'Ultimate',
        starfieldEnabled: true,
        cursorTrail: true,
        magneticField: true,
        particleSystem: true,
        transitionDuration: '0.8s'
      }
    };

    this.currentPreset = 'balanced';
    this.controllers = {};
  }

  init(controllers) {
    this.controllers = controllers;
    this.applyPreset(this.currentPreset);
    this.createPresetSelector();
  }

  createPresetSelector() {
    const selector = document.createElement('div');
    selector.className = 'animation-preset-selector';
    selector.innerHTML = `
      <div class="preset-selector-wrapper">
        <label for="animation-preset">Animation Level:</label>
        <select id="animation-preset">
          ${Object.keys(this.presets).map(key =>
            `<option value="${key}" ${key === this.currentPreset ? 'selected' : ''}>${this.presets[key].name}</option>`
          ).join('')}
        </select>
      </div>
    `;

    // Add to DOM (preferably in settings area)
    const settingsArea = document.querySelector('.settings') || document.body;
    settingsArea.appendChild(selector);

    selector.querySelector('select').addEventListener('change', (e) => {
      this.setPreset(e.target.value);
    });
  }

  setPreset(presetName) {
    if (!this.presets[presetName]) return;

    this.currentPreset = presetName;
    this.applyPreset(presetName);

    // Store preference
    localStorage.setItem('animationPreset', presetName);
  }

  applyPreset(presetName) {
    const preset = this.presets[presetName];

    // Apply global transition duration
    document.documentElement.style.setProperty('--transition-base', preset.transitionDuration);

    // Toggle systems based on preset
    if (this.controllers.starfield) {
      this.controllers.starfield.isEnabled = preset.starfieldEnabled;
      if (!preset.starfieldEnabled) {
        this.controllers.starfield.destroy();
      }
    }

    if (this.controllers.cursorTrail) {
      this.controllers.cursorTrail.setActive(preset.cursorTrail);
    }

    if (this.controllers.magneticField) {
      this.controllers.magneticField.setActive(preset.magneticField);
    }

    if (this.controllers.particleSystem) {
      preset.particleSystem ?
        this.controllers.particleSystem.init() :
        this.controllers.particleSystem.destroy();
    }
  }

  getStoredPreset() {
    return localStorage.getItem('animationPreset') || 'balanced';
  }
}

// ===== ADVANCED ANIMATION CONTROLLER =====
class AdvancedAnimationController {
  constructor() {
    this.animations = new Map();
    this.observers = new Map();
    this.isVisible = true;
    this.performanceMode = 'auto'; // 'auto', 'high', 'low'
    this.globalPerformanceMonitor = new AdvancedPerformanceMonitor();

    this.init();
  }

  init() {
    this.setupVisibilityAPI();
    this.setupIntersectionObservers();
    this.startGlobalPerformanceTracking();
  }

  setupVisibilityAPI() {
    document.addEventListener('visibilitychange', () => {
      this.isVisible = !document.hidden;

      // Pause/resume animations based on visibility
      this.animations.forEach((animation, name) => {
        if (animation.pauseOnHidden) {
          if (this.isVisible) {
            animation.resume?.();
          } else {
            animation.pause?.();
          }
        }
      });
    });
  }

  setupIntersectionObservers() {
    // Enhanced intersection observer for smooth animations
    const observerOptions = {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const visibilityRatio = entry.intersectionRatio;

        // Trigger different animation intensities based on visibility
        if (visibilityRatio > 0.1 && !element.classList.contains('animated-in')) {
          this.triggerElementAnimation(element, 'fadeInUp');
          element.classList.add('animated-in');
        }

        // Add parallax effect based on scroll position
        if (visibilityRatio > 0) {
          const translateY = (0.5 - entry.intersectionRatio) * 20;
          element.style.transform = `translateY(${translateY}px)`;
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('[data-animate], .project-card, .skill-card').forEach(el => {
      observer.observe(el);
    });
  }

  triggerElementAnimation(element, animationType) {
    switch (animationType) {
      case 'fadeInUp':
        element.style.cssText += `
          opacity: 1;
          transform: translateY(0);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        break;
      case 'scaleIn':
        element.style.cssText += `
          opacity: 1;
          transform: scale(1);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
        break;
    }
  }

  startGlobalPerformanceTracking() {
    const trackPerformance = () => {
      this.globalPerformanceMonitor.update();

      // Auto-adjust performance mode
      if (this.performanceMode === 'auto') {
        const shouldReduce = this.globalPerformanceMonitor.shouldReduceQuality();
        this.adjustGlobalAnimationQuality(shouldReduce);
      }

      requestAnimationFrame(trackPerformance);
    };

    trackPerformance();
  }

  adjustGlobalAnimationQuality(reduce) {
    const root = document.documentElement;

    if (reduce) {
      root.style.setProperty('--animation-duration', '0.3s');
      root.style.setProperty('--animation-easing', 'ease');
      root.classList.add('reduced-motion-override');
    } else {
      root.style.setProperty('--animation-duration', '0.8s');
      root.style.setProperty('--animation-easing', 'cubic-bezier(0.4, 0, 0.2, 1)');
      root.classList.remove('reduced-motion-override');
    }
  }

  registerAnimation(name, animationObject) {
    this.animations.set(name, animationObject);
  }

  unregisterAnimation(name) {
    const animation = this.animations.get(name);
    if (animation && animation.destroy) {
      animation.destroy();
    }
    this.animations.delete(name);
  }

  getGlobalMetrics() {
    return {
      ...this.globalPerformanceMonitor,
      activeAnimations: this.animations.size,
      visibilityState: this.isVisible ? 'visible' : 'hidden',
      performanceMode: this.performanceMode
    };
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

    // Initialize browser compatibility detector
    const compatibilityDetector = new BrowserCompatibilityDetector();

    // Initialize advanced animation system
    const advancedAnimationController = new AdvancedAnimationController();

    // Initialize enhanced starfield background effect with color animations
    const starfieldManager = new StarfieldManager();
    starfieldManager.enableRainbowMode = false; // Start with default mode

    // Adjust starfield based on browser capabilities
    if (compatibilityDetector.performance.level === 'low' || compatibilityDetector.browser === 'ie') {
      starfieldManager.totalIcons = Math.min(100, starfieldManager.totalIcons);
    }

    advancedAnimationController.registerAnimation('starfield', starfieldManager);

    // Initialize WebGL particle system with compatibility checks
    let webglParticleSystem = null;
    if (compatibilityDetector.features.webgl || compatibilityDetector.features.requestAnimationFrame) {
      const particleCanvas = document.createElement('canvas');
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
      particleCanvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
        opacity: 0.3;
      `;
      document.body.appendChild(particleCanvas);
      webglParticleSystem = new WebGLParticleSystem(particleCanvas);
    }

    // Initialize advanced cursor trail system (only on desktop)
    let advancedCursorTrail = null;
    if (!compatibilityDetector.features.touchEvents && compatibilityDetector.features.addEventListener) {
      advancedCursorTrail = new AdvancedCursorTrail();
    }

    // Initialize magnetic field controller (reduced intensity on mobile)
    const magneticFieldController = new MagneticFieldController();
    if (compatibilityDetector.features.touchEvents || compatibilityDetector.performance.level === 'low') {
      magneticFieldController.strength = 25; // Reduce strength on mobile/low-end devices
      magneticFieldController.maxDistance = 100;
    }

    // Initialize animation preset manager with null-safe systems
    const animationPresetManager = new AnimationPresetManager();
    const animationSystems = {
      starfield: starfieldManager,
      cursorTrail: advancedCursorTrail,
      magneticField: magneticFieldController,
      particleSystem: webglParticleSystem
    };

    // Auto-adjust preset based on browser capabilities
    let defaultPreset = 'balanced';
    if (compatibilityDetector.performance.level === 'low' || compatibilityDetector.browser === 'ie') {
      defaultPreset = 'minimal';
    } else if (compatibilityDetector.performance.level === 'high' && !compatibilityDetector.features.touchEvents) {
      defaultPreset = 'enhanced';
    }

    animationPresetManager.currentPreset = defaultPreset;
    animationPresetManager.init(animationSystems);

    // Register all systems with the advanced controller
    advancedAnimationController.registerAnimation('starfield', starfieldManager);
    advancedAnimationController.registerAnimation('particles', webglParticleSystem);
    advancedAnimationController.registerAnimation('cursorTrail', advancedCursorTrail);
    advancedAnimationController.registerAnimation('magneticField', magneticFieldController);

    // Initialize 2025 advanced micro-interactions (existing systems)
    const cursorTrailManager = new CursorTrailManager();
    const enhancedTiltManager = new EnhancedTiltManager();

    advancedAnimationController.registerAnimation('legacyCursorTrail', cursorTrailManager);
    advancedAnimationController.registerAnimation('tiltEffects', enhancedTiltManager);

    // Add keyboard shortcuts for animation control
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
          case 'r':
            e.preventDefault();
            starfieldManager.toggleRainbowMode();
            break;
          case 't':
            e.preventDefault();
            advancedCursorTrail.setActive(!advancedCursorTrail.isActive);
            break;
          case 'm':
            e.preventDefault();
            magneticFieldController.setActive(!magneticFieldController.isActive);
            break;
        }
      }
    });

    // Expose enhanced performance metrics and controls to global scope
    window.getAnimationMetrics = () => ({
      starfield: starfieldManager.getPerformanceMetrics(),
      global: advancedAnimationController.getGlobalMetrics(),
      systems: {
        webglSupported: webglParticleSystem.isWebGLSupported,
        activeAnimations: advancedAnimationController.animations.size,
        currentPreset: animationPresetManager.currentPreset
      }
    });

    // Expose animation controls for debugging
    window.animationControls = {
      toggleRainbow: () => starfieldManager.toggleRainbowMode(),
      toggleCursorTrail: () => advancedCursorTrail.setActive(!advancedCursorTrail.isActive),
      toggleMagnetic: () => magneticFieldController.setActive(!magneticFieldController.isActive),
      setPreset: (preset) => animationPresetManager.setPreset(preset),
      getPresets: () => Object.keys(animationPresetManager.presets)
    };

    // Track page load for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        'event_category': 'engagement',
        'event_label': 'home_page'
      });
    }

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