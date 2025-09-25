// Global Scroll Manager - Centralized scroll event handling
// Provides a single passive scroll listener that all features can subscribe to
// Reduces listener duplication and improves performance
(function () {
  'use strict';
  class GlobalScrollManager {
    constructor() {
      this.handlers = new Map();
      this.lastY = window.scrollY || 0;
      this.lastX = window.scrollX || 0;
      this.ticking = false;
      this.scrollDirection = 'down';
      this.previousY = 0;
      // Bind context
      this.onScroll = this.onScroll.bind(this);
      // Start listening
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onResize.bind(this), { passive: true });
    }
    onScroll() {
      if (this.ticking) return;
      this.ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const x = window.scrollX || 0;
        // Determine scroll direction
        if (y > this.previousY) {
          this.scrollDirection = 'down';
        } else if (y < this.previousY) {
          this.scrollDirection = 'up';
        }
        // Notify all handlers
        this.handlers.forEach(fn => {
          try {
            fn({
              y,
              x,
              direction: this.scrollDirection,
              deltaY: y - this.lastY,
              deltaX: x - this.lastX
            });
          } catch (e) {
          }
        });
        this.previousY = this.lastY;
        this.lastY = y;
        this.lastX = x;
        this.ticking = false;
      });
    }
    onResize() {
      // Update cached values on resize
      this.lastY = window.scrollY || 0;
      this.lastX = window.scrollX || 0;
    }
    addHandler(key, fn) {
      if (typeof fn !== 'function') {
        return;
      }
      this.handlers.set(key, fn);
    }
    removeHandler(key) {
      this.handlers.delete(key);
    }
    // Getter for current scroll position
    get scrollY() {
      return this.lastY;
    }
    get scrollX() {
      return this.lastX;
    }
    get direction() {
      return this.scrollDirection;
    }
    // Check if element is in viewport
    isInViewport(element, offset = 0) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.bottom >= -offset
      );
    }
    // Smooth scroll to position
    scrollTo(target, options = {}) {
      const defaults = {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      };
      if (typeof target === 'number') {
        window.scrollTo({
          top: target,
          ...defaults,
          ...options
        });
      } else if (target instanceof Element) {
        target.scrollIntoView({
          ...defaults,
          ...options
        });
      }
    }
    // Get scroll percentage
    getScrollPercentage() {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      return documentHeight > 0 ? (this.lastY / documentHeight) * 100 : 0;
    }
    // Destroy and cleanup
    destroy() {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
      this.handlers.clear();
    }
  }
  // Expose globally
  window.globalScrollManager = new GlobalScrollManager();
  // Also expose on window for backward compatibility
  window.GlobalScrollManager = GlobalScrollManager;
})();