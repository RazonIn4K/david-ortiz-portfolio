// Progressive Enhancement Integration
// Seamlessly integrates MongoDB functionality with existing classes

/**
 * Progressive Enhancement Wrapper
 * Extends existing classes without breaking functionality
 */
class ProgressiveEnhancement {
  static enhance(ExistingClass, enhancements) {
    return class extends ExistingClass {
      constructor(...args) {
        super(...args);

        // Add MongoDB integration
        this.mongodb = null;
        this.analytics = null;

        // Initialize enhancements
        this.initializeEnhancements(enhancements);
      }

      /**
       * Initialize enhancement features
       */
      async initializeEnhancements(enhancements = {}) {
        // Initialize analytics if available
        if (typeof AnalyticsTracker !== 'undefined' && enhancements.analytics !== false) {
          this.analytics = new AnalyticsTracker({
            debug: enhancements.debug || false
          });
        }

        // Feature detection and graceful degradation
        this.features = {
          mongodb: this.isMongoDBAvaible(),
          analytics: !!this.analytics,
          localStorage: this.isLocalStorageAvailable(),
          serviceWorker: 'serviceWorker' in navigator
        };

        if (enhancements.debug) {
          console.log('🔧 Progressive Enhancement initialized:', this.features);
        }
      }

      /**
       * Enhanced method wrapper
       */
      async enhancedMethod(originalMethod, methodName, ...args) {
        const startTime = Date.now();

        try {
          // Track method execution
          if (this.analytics) {
            this.analytics.track('method_execution_start', {
              method: methodName,
              className: this.constructor.name
            });
          }

          // Execute original method
          const result = await originalMethod.apply(this, args);

          // Track success
          if (this.analytics) {
            this.analytics.track('method_execution_success', {
              method: methodName,
              className: this.constructor.name,
              executionTime: Date.now() - startTime
            });
          }

          return result;

        } catch (error) {
          // Track error
          if (this.analytics) {
            this.analytics.track('method_execution_error', {
              method: methodName,
              className: this.constructor.name,
              error: error.message,
              executionTime: Date.now() - startTime
            });
          }

          throw error;
        }
      }

      /**
       * Feature detection methods
       */
      isMongoDBAvaible() {
        return typeof fetch !== 'undefined' &&
               window.location.protocol !== 'file:';
      }

      isLocalStorageAvailable() {
        try {
          const test = '__test__';
          localStorage.setItem(test, test);
          localStorage.removeItem(test);
          return true;
        } catch (error) {
          return false;
        }
      }
    };
  }

  /**
   * Enhance FormValidator with MongoDB integration
   */
  static enhanceFormValidator(FormValidator) {
    return this.enhance(FormValidator, { analytics: true });
  }

  /**
   * Enhance ThemeManager with analytics
   */
  static enhanceThemeManager(ThemeManager) {
    const EnhancedThemeManager = this.enhance(ThemeManager, { analytics: true });

    return class extends EnhancedThemeManager {
      toggleTheme() {
        const oldTheme = this.currentTheme;
        const result = super.toggleTheme();

        // Track theme change
        if (this.analytics) {
          this.analytics.track('theme_changed', {
            from: oldTheme,
            to: this.currentTheme,
            timestamp: Date.now()
          });
        }

        return result;
      }
    };
  }

  /**
   * Enhance SmoothNavigation with analytics
   */
  static enhanceSmoothNavigation(SmoothNavigation) {
    const EnhancedSmoothNavigation = this.enhance(SmoothNavigation, { analytics: true });

    return class extends EnhancedSmoothNavigation {
      handleNavClick(e) {
        const targetId = e.target.getAttribute('href');

        // Track navigation
        if (this.analytics) {
          this.analytics.track('navigation_click', {
            target: targetId,
            source: 'smooth_navigation'
          });
        }

        return super.handleNavClick(e);
      }
    };
  }
}

/**
 * Enhanced Form Validator with MongoDB integration
 */
class EnhancedFormValidator {
  constructor(formSelector, options = {}) {
    this.form = document.querySelector(formSelector);
    this.errors = {};
    this.options = {
      enableMongoDB: true,
      enableAnalytics: true,
      apiEndpoint: '/api/contact',
      ...options
    };

    // Initialize analytics
    if (this.options.enableAnalytics && typeof AnalyticsTracker !== 'undefined') {
      this.analytics = new AnalyticsTracker();
    }

    if (this.form) {
      this.init();
    }
  }

  init() {
    this.setupValidation();
    this.setupSubmission();

    // Track form initialization
    if (this.analytics) {
      this.analytics.track('form_initialized', {
        formType: this.form.getAttribute('name') || 'contact'
      });
    }
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');

    inputs.forEach(input => {
      // Real-time validation
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      // Clear errors on input
      input.addEventListener('input', () => {
        this.clearFieldError(input);
      });
    });
  }

  setupSubmission() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSubmit();
    });
  }

  async handleSubmit() {
    if (!this.validateForm()) {
      return;
    }

    const formData = this.getFormData();
    const startTime = Date.now();

    try {
      // Show loading state
      this.setLoadingState(true);

      // Track form submission start
      if (this.analytics) {
        this.analytics.track('form_submission_start', {
          formType: this.form.getAttribute('name') || 'contact'
        });
      }

      let result;

      // Try MongoDB submission if enabled
      if (this.options.enableMongoDB) {
        result = await this.submitToMongoDB(formData);
      } else {
        // Fallback to traditional submission
        result = await this.submitTraditional(formData);
      }

      // Track successful submission
      if (this.analytics) {
        this.analytics.track('form_submission_success', {
          formType: this.form.getAttribute('name') || 'contact',
          submissionTime: Date.now() - startTime,
          method: this.options.enableMongoDB ? 'mongodb' : 'traditional'
        });
      }

      this.showSuccess(result.message || 'Thank you for your message!');
      this.resetForm();

    } catch (error) {
      console.error('Form submission error:', error);

      // Track submission error
      if (this.analytics) {
        this.analytics.track('form_submission_error', {
          formType: this.form.getAttribute('name') || 'contact',
          error: error.message,
          submissionTime: Date.now() - startTime
        });
      }

      this.showError('Failed to send message. Please try again.');

    } finally {
      this.setLoadingState(false);
    }
  }

  async submitToMongoDB(formData) {
    const response = await fetch(this.options.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  }

  async submitTraditional(formData) {
    // Fallback to Formspree or other traditional methods
    const formAction = this.form.getAttribute('action');

    if (!formAction) {
      throw new Error('No submission endpoint configured');
    }

    const response = await fetch(formAction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return { success: true, message: 'Message sent successfully!' };
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(input) {
    const value = input.value.trim();
    const fieldName = input.getAttribute('name');

    // Clear previous errors
    this.clearFieldError(input);

    // Required field validation
    if (input.hasAttribute('required') && !value) {
      this.setFieldError(input, `${fieldName} is required`);
      return false;
    }

    // Email validation
    if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.setFieldError(input, 'Please enter a valid email address');
        return false;
      }
    }

    // Length validation
    if (value.length > 0) {
      const minLength = input.getAttribute('minlength');
      const maxLength = input.getAttribute('maxlength');

      if (minLength && value.length < parseInt(minLength)) {
        this.setFieldError(input, `Minimum ${minLength} characters required`);
        return false;
      }

      if (maxLength && value.length > parseInt(maxLength)) {
        this.setFieldError(input, `Maximum ${maxLength} characters allowed`);
        return false;
      }
    }

    return true;
  }

  setFieldError(input, message) {
    input.classList.add('error');

    let errorElement = input.parentNode.querySelector('.field-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error';
      input.parentNode.appendChild(errorElement);
    }

    errorElement.textContent = message;
  }

  clearFieldError(input) {
    input.classList.remove('error');
    const errorElement = input.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  getFormData() {
    const formData = new FormData(this.form);
    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    return data;
  }

  setLoadingState(loading) {
    const submitButton = this.form.querySelector('button[type="submit"]');

    if (loading) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      this.form.classList.add('loading');
    } else {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
      this.form.classList.remove('loading');
    }
  }

  showSuccess(message) {
    this.showMessage(message, 'success');
  }

  showError(message) {
    this.showMessage(message, 'error');
  }

  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = this.form.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-message-${type}`;
    messageElement.textContent = message;

    this.form.appendChild(messageElement);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
  }

  resetForm() {
    this.form.reset();
    this.clearAllErrors();
  }

  clearAllErrors() {
    const errorElements = this.form.querySelectorAll('.field-error');
    errorElements.forEach(element => element.remove());

    const errorInputs = this.form.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
  }
}

// Auto-initialize enhanced components
if (typeof window !== 'undefined') {
  window.ProgressiveEnhancement = ProgressiveEnhancement;
  window.EnhancedFormValidator = EnhancedFormValidator;

  // Auto-enhance existing components when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize enhanced form validator if contact form exists
    const contactForm = document.querySelector('#contact-form, .contact-form');
    if (contactForm) {
      window.enhancedFormValidator = new EnhancedFormValidator('#contact-form, .contact-form');
    }
  });
}

// Export for modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ProgressiveEnhancement,
    EnhancedFormValidator
  };
}

export { ProgressiveEnhancement, EnhancedFormValidator };