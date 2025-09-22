// Performance optimization script for critical rendering path
// Implements advanced lazy loading and resource prioritization

/**
 * Critical Performance Optimizer
 * Addresses LCP and FCP performance issues identified in Lighthouse audit
 */
class PerformanceOptimizer {
  constructor() {
    this.config = {
      lazyLoadOffset: 100,
      criticalFontTimeout: 3000,
      imageQualityThreshold: 0.8,
      enableWebP: this.supportsWebP(),
      enablePrefetch: true
    };

    this.metrics = {
      startTime: performance.now(),
      lcpCandidates: [],
      fcpTime: null,
      resourceTimes: new Map()
    };

    this.init();
  }

  /**
   * Initialize performance optimizations
   */
  init() {
    // Optimize critical rendering path
    this.optimizeCriticalPath();

    // Implement advanced lazy loading
    this.setupAdvancedLazyLoading();

    // Optimize font loading
    this.optimizeFontLoading();

    // Implement resource preloading
    this.setupResourcePreloading();

    // Monitor performance metrics
    this.monitorCoreWebVitals();

    console.log('🚀 Performance Optimizer initialized');
  }

  /**
   * Optimize critical rendering path
   */
  optimizeCriticalPath() {
    // Defer non-critical CSS
    const nonCriticalStyles = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    nonCriticalStyles.forEach(link => {
      const href = link.href;
      link.remove();

      // Load asynchronously after page load
      window.addEventListener('load', () => {
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = href;
        document.head.appendChild(newLink);
      });
    });

    // Inline critical CSS (this would be done at build time in production)
    this.inlineCriticalCSS();

    // Optimize above-the-fold content
    this.prioritizeAboveFold();
  }

  /**
   * Inline critical CSS for faster FCP
   */
  inlineCriticalCSS() {
    const criticalCSS = `
      /* Critical CSS for above-the-fold content */
      body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      .hero-section { min-height: 100vh; display: flex; align-items: center; }
      .navigation { position: fixed; top: 0; width: 100%; z-index: 1000; }
      .loading-spinner { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); }
      .above-fold { visibility: visible; }
      .below-fold { visibility: hidden; }
    `;

    const style = document.createElement('style');
    style.textContent = criticalCSS;
    document.head.insertBefore(style, document.head.firstChild);
  }

  /**
   * Prioritize above-the-fold content
   */
  prioritizeAboveFold() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.visibility = 'visible';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // Mark below-fold content
    const belowFoldElements = document.querySelectorAll('.skills-section, .projects-section, .contact-section');
    belowFoldElements.forEach(element => {
      element.classList.add('below-fold');
      observer.observe(element);
    });
  }

  /**
   * Advanced lazy loading implementation
   */
  setupAdvancedLazyLoading() {
    // Lazy load images with WebP support
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          imageObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: `${this.config.lazyLoadOffset}px`,
      threshold: 0.01
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });

    // Lazy load heavy animations
    this.setupAnimationLazyLoading();
  }

  /**
   * Load images with WebP optimization
   */
  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;

    // Check if WebP is supported and available
    if (this.config.enableWebP && src.includes('.jpg') || src.includes('.png')) {
      const webpSrc = src.replace(/\.(jpg|png)$/i, '.webp');

      // Try WebP first, fallback to original
      const testImg = new Image();
      testImg.onload = () => {
        img.src = webpSrc;
        img.classList.add('loaded');
      };
      testImg.onerror = () => {
        img.src = src;
        img.classList.add('loaded');
      };
      testImg.src = webpSrc;
    } else {
      img.src = src;
      img.classList.add('loaded');
    }

    // Remove data-src to prevent reprocessing
    delete img.dataset.src;
  }

  /**
   * Lazy load heavy animations based on device capabilities
   */
  setupAnimationLazyLoading() {
    const canHandleAnimations = this.assessDeviceCapabilities();

    if (!canHandleAnimations) {
      // Disable heavy animations on low-end devices
      document.documentElement.style.setProperty('--animation-duration', '0s');
      document.documentElement.style.setProperty('--transition-duration', '0.1s');
      return;
    }

    // Progressive animation loading
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadAnimations(entry.target);
          animationObserver.unobserve(entry.target);
        }
      });
    });

    document.querySelectorAll('[data-animate]').forEach(element => {
      animationObserver.observe(element);
    });
  }

  /**
   * Assess device capabilities for animation optimization
   */
  assessDeviceCapabilities() {
    const memory = navigator.deviceMemory || 4; // GB
    const cores = navigator.hardwareConcurrency || 4;
    const connection = navigator.connection;

    // Basic capability assessment
    const hasLowMemory = memory < 4;
    const hasSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    const isLowEnd = cores < 4;

    return !(hasLowMemory || hasSlowConnection || isLowEnd);
  }

  /**
   * Load animations progressively
   */
  loadAnimations(element) {
    const animationType = element.dataset.animate;

    switch (animationType) {
      case 'fade-in':
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease-in-out';
        requestAnimationFrame(() => {
          element.style.opacity = '1';
        });
        break;

      case 'slide-up':
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        element.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
        requestAnimationFrame(() => {
          element.style.transform = 'translateY(0)';
          element.style.opacity = '1';
        });
        break;

      default:
        element.classList.add('animate-loaded');
    }
  }

  /**
   * Optimize font loading
   */
  optimizeFontLoading() {
    // Use font-display: swap for custom fonts
    if ('fonts' in document) {
      // Preload critical fonts
      const criticalFonts = [
        { family: 'Inter', weight: '400', display: 'swap' },
        { family: 'Inter', weight: '600', display: 'swap' }
      ];

      criticalFonts.forEach(font => {
        const fontFace = new FontFace(font.family, `url(/fonts/${font.family}-${font.weight}.woff2)`, {
          weight: font.weight,
          display: font.display
        });

        fontFace.load().then(loadedFont => {
          document.fonts.add(loadedFont);
        }).catch(error => {
          console.warn(`Failed to load font ${font.family}-${font.weight}:`, error);
        });
      });

      // Timeout for font loading
      setTimeout(() => {
        document.documentElement.classList.add('fonts-loaded');
      }, this.config.criticalFontTimeout);
    }
  }

  /**
   * Setup resource preloading
   */
  setupResourcePreloading() {
    if (!this.config.enablePrefetch) return;

    // Preload critical resources
    const criticalResources = [
      { href: '/src/js/script.min.js', as: 'script' },
      { href: '/src/css/styles.css', as: 'style' },
      { href: '/assets/david-ortiz-avatar.svg', as: 'image' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.as === 'script') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });

    // Intelligent prefetching based on user behavior
    this.setupIntelligentPrefetch();
  }

  /**
   * Intelligent prefetching based on hover/focus
   */
  setupIntelligentPrefetch() {
    const prefetchMap = new Map();

    document.addEventListener('mouseover', (e) => {
      const link = e.target.closest('a[href]');
      if (link && !prefetchMap.has(link.href)) {
        prefetchMap.set(link.href, true);

        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
      }
    });
  }

  /**
   * Monitor Core Web Vitals
   */
  monitorCoreWebVitals() {
    // FCP (First Contentful Paint)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcpTime = entry.startTime;
          console.log(`🎨 FCP: ${entry.startTime.toFixed(2)}ms`);
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // LCP (Largest Contentful Paint)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.metrics.lcpCandidates.push({
          element: entry.element,
          time: entry.startTime,
          size: entry.size
        });
        console.log(`🖼️ LCP candidate: ${entry.startTime.toFixed(2)}ms`);
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // CLS (Cumulative Layout Shift)
    new PerformanceObserver((entryList) => {
      let cls = 0;
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      }
      if (cls > 0) {
        console.log(`📐 CLS: ${cls.toFixed(4)}`);
      }
    }).observe({ entryTypes: ['layout-shift'] });

    // Report final metrics
    window.addEventListener('beforeunload', () => {
      this.reportMetrics();
    });
  }

  /**
   * Report performance metrics
   */
  reportMetrics() {
    const totalTime = performance.now() - this.metrics.startTime;
    const finalLCP = this.metrics.lcpCandidates.length > 0
      ? this.metrics.lcpCandidates[this.metrics.lcpCandidates.length - 1].time
      : null;

    console.log('📊 Performance Report:', {
      totalLoadTime: `${totalTime.toFixed(2)}ms`,
      fcp: this.metrics.fcpTime ? `${this.metrics.fcpTime.toFixed(2)}ms` : 'Not measured',
      lcp: finalLCP ? `${finalLCP.toFixed(2)}ms` : 'Not measured',
      lcpCandidates: this.metrics.lcpCandidates.length
    });
  }

  /**
   * Check WebP support
   */
  supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('webp') !== -1;
  }

  /**
   * Get performance recommendations
   */
  getRecommendations() {
    const recommendations = [];

    if (this.metrics.fcpTime > 1800) {
      recommendations.push('Consider inlining critical CSS and reducing render-blocking resources');
    }

    if (this.metrics.lcpCandidates.length > 0) {
      const finalLCP = this.metrics.lcpCandidates[this.metrics.lcpCandidates.length - 1];
      if (finalLCP.time > 2500) {
        recommendations.push('Optimize LCP element loading - consider preloading critical images');
      }
    }

    return recommendations;
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new PerformanceOptimizer();
  });
} else {
  window.performanceOptimizer = new PerformanceOptimizer();
}

export default PerformanceOptimizer;