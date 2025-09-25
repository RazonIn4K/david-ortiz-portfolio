// Theme Management Module
// Handles dark/light theme switching with localStorage persistence

import { STORAGE_KEYS } from '../constants.js';

export class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.themeIcon = document.querySelector('.theme-icon');
    this.storageKey = STORAGE_KEYS.THEME;
    this.mediaQuery = typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-color-scheme: light)')
      : null;
    this.currentTheme = this.resolveInitialTheme();

    this.applyTheme(this.currentTheme);
    this.bindEvents();
  }

  resolveInitialTheme() {
    const stored = this.getStoredTheme();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return this.mediaQuery && this.mediaQuery.matches ? 'light' : 'dark';
  }

  bindEvents() {
    if (this.themeToggle && this.themeIcon) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    if (this.mediaQuery) {
      const handler = (event) => {
        if (!this.getStoredTheme()) {
          this.applyTheme(event.matches ? 'light' : 'dark');
        }
      };

      if (typeof this.mediaQuery.addEventListener === 'function') {
        this.mediaQuery.addEventListener('change', handler);
      } else if (typeof this.mediaQuery.addListener === 'function') {
        this.mediaQuery.addListener(handler);
      }
    }
  }

  getStoredTheme() {
    try {
      return localStorage.getItem(this.storageKey);
    } catch (error) {
      return null;
    }
  }

  setStoredTheme(theme) {
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch (error) {
      // localStorage can fail in private mode; ignore gracefully
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme = theme;

    if (this.themeIcon) {
      this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    if (this.themeToggle) {
      this.themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    }

    this.setStoredTheme(theme);
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);

    if (window.analytics) {
      window.analytics.track('theme_toggle', {
        event_category: 'engagement',
        event_label: newTheme
      });
    }
  }
}

// Export for backward compatibility
if (typeof window !== 'undefined') {
  window.ThemeManager = ThemeManager;
}