// Progressive Enhancement Integration
// Seamlessly integrates enhancements with existing classes (no DB required)
/**
 * Progressive Enhancement Wrapper
 * Extends existing classes without breaking functionality
 */
class ProgressiveEnhancement {
  static enhance(ExistingClass, enhancements) {
    return class extends ExistingClass {
      constructor(...args) {
        super(...args);
        // Enhanced analytics integration (no DB references)
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
          analytics: !!this.analytics,
          localStorage: this.isLocalStorageAvailable(),
          serviceWorker: 'serviceWorker' in navigator
        };
        if (enhancements.debug) {
        }
      }
      /**
       * Enhanced method wrapper with analytics tracking
       * @param {Function} originalMethod - Original method to wrap
       * @param {string} methodName - Name of the method
       * @param {...any} args - Method arguments
       * @returns {Promise<any>} Method result
       */
      async enhancedMethod(originalMethod, methodName, ...args) {
        const startTime = Date.now();
        try {
          this.trackMethodStart(methodName);
          const result = await originalMethod.apply(this, args);
          this.trackMethodSuccess(methodName, startTime);
          return result;
        } catch (error) {
          this.trackMethodError(methodName, error, startTime);
          throw error;
        }
      }
      /**
       * Track method execution start
       * @param {string} methodName - Name of the method
       */
      trackMethodStart(methodName) {
        if (this.analytics) {
          this.analytics.track(ANALYTICS_EVENTS.METHOD_START, {
            method: methodName,
            className: this.constructor.name
          });
        }
      }
      /**
       * Track method execution success
       * @param {string} methodName - Name of the method
       * @param {number} startTime - Method start timestamp
       */
      trackMethodSuccess(methodName, startTime) {
        if (this.analytics) {
          this.analytics.track(ANALYTICS_EVENTS.METHOD_SUCCESS, {
            method: methodName,
            className: this.constructor.name,
            executionTime: Date.now() - startTime
          });
        }
      }
      /**
       * Track method execution error
       * @param {string} methodName - Name of the method
       * @param {Error} error - Error that occurred
       * @param {number} startTime - Method start timestamp
       */
      trackMethodError(methodName, error, startTime) {
        if (this.analytics) {
          this.analytics.track(ANALYTICS_EVENTS.METHOD_ERROR, {
            method: methodName,
            className: this.constructor.name,
            error: error.message,
            executionTime: Date.now() - startTime
          });
        }
      }
      // No DB feature detection needed
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
   * Enhance FormValidator
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
          this.analytics.track(ANALYTICS_EVENTS.THEME_CHANGED, {
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
          this.analytics.track(ANALYTICS_EVENTS.NAV_CLICK, {
            target: targetId,
            source: 'smooth_navigation'
          });
        }
      }
    };
  }
}
  // Constants for Enhanced Form Validator
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const MESSAGE_DISPLAY_TIMEOUT = 5000;
  const DEFAULT_API_ENDPOINT = '/api/contact';
  const LOADING_TEXT = 'Sending...';
  const DEFAULT_SUBMIT_TEXT = 'Send Message';
  const SUCCESS_MESSAGE = 'Thank you for your message!';
  const ERROR_MESSAGE = 'Failed to send message. Please try again.';
  const ANALYTICS_EVENTS = {
    FORM_INIT: 'form_initialized',
    SUBMISSION_START: 'form_submission_start',
    SUBMISSION_SUCCESS: 'form_submission_success',
    SUBMISSION_ERROR: 'form_submission_error',
    METHOD_START: 'method_execution_start',
    METHOD_SUCCESS: 'method_execution_success',
    METHOD_ERROR: 'method_execution_error',
    THEME_CHANGED: 'theme_changed',
    NAV_CLICK: 'navigation_click'
  };
  /**
   * Enhanced Form Validator
   */
  class EnhancedFormValidator {
    constructor(formSelector, options = {}) {
      this.form = document.querySelector(formSelector);
      this.errors = {};
      this.options = {
      // Use API submission path (serverless), or fallback to traditional form action
      useApiSubmission: true,
      apiEndpoint: DEFAULT_API_ENDPOINT,
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
      this.analytics.track(ANALYTICS_EVENTS.FORM_INIT, {
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
  /**
   * Main form submission handler
   * @returns {Promise<void>}
   */
  async handleSubmit() {
    if (!this.validateForm()) {
      return;
    }
    const formData = this.getFormData();
    const startTime = Date.now();
    try {
      this.setLoadingState(true);
      this.trackSubmissionStart();
      const result = await this.executeSubmission(formData);
      this.handleSubmissionSuccess(result, startTime);
    } catch (error) {
      this.handleSubmissionError(error, startTime);
    } finally {
      this.setLoadingState(false);
    }
  }
  /**
   * Track form submission start event
   */
  trackSubmissionStart() {
    if (this.analytics) {
      this.analytics.track(ANALYTICS_EVENTS.SUBMISSION_START, {
        formType: this.getFormType()
      });
    }
  }
  /**
   * Execute form submission based on configured method
   * @param {Object} formData - Form data to submit
   * @returns {Promise<Object>} Submission result
   */
  async executeSubmission(formData) {
    if (this.options.useApiSubmission) {
      return await this.submitToAPI(formData);
    } else {
      return await this.submitTraditional(formData);
    }
  }
  /**
   * Handle successful form submission
   * @param {Object} result - Submission result
   * @param {number} startTime - Submission start timestamp
   */
  handleSubmissionSuccess(result, startTime) {
    this.trackSubmissionSuccess(startTime);
    this.showSuccess(result.message || SUCCESS_MESSAGE);
    this.resetForm();
  }
  /**
   * Handle form submission error
   * @param {Error} error - Submission error
   * @param {number} startTime - Submission start timestamp
   */
  handleSubmissionError(error, startTime) {
    this.trackSubmissionError(error, startTime);
    this.showError(ERROR_MESSAGE);
  }
  /**
   * Track successful submission analytics
   * @param {number} startTime - Submission start timestamp
   */
  trackSubmissionSuccess(startTime) {
    if (this.analytics) {
      this.analytics.track(ANALYTICS_EVENTS.SUBMISSION_SUCCESS, {
        formType: this.getFormType(),
        submissionTime: Date.now() - startTime,
        method: this.options.useApiSubmission ? 'api' : 'traditional'
      });
    }
  }
  /**
   * Track submission error analytics
   * @param {Error} error - Submission error
   * @param {number} startTime - Submission start timestamp
   */
  trackSubmissionError(error, startTime) {
    if (this.analytics) {
      this.analytics.track(ANALYTICS_EVENTS.SUBMISSION_ERROR, {
        formType: this.getFormType(),
        error: error.message,
        submissionTime: Date.now() - startTime
      });
    }
  }
  /**
   * Get form type identifier
   * @returns {string} Form type
   */
  getFormType() {
    return this.form.getAttribute('name') || 'contact';
  }
  async submitToAPI(formData) {
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
  /**
   * Validate a single form field
   * @param {HTMLElement} input - Input element to validate
   * @returns {boolean} Validation result
   */
  validateField(input) {
    const value = input.value.trim();
    const fieldName = input.getAttribute('name');
    // Clear previous errors
    this.clearFieldError(input);
    // Check required field
    if (this.isFieldRequiredAndEmpty(input, value)) {
      this.setFieldError(input, `${fieldName} is required`);
      return false;
    }
    // Check email format
    if (this.isInvalidEmail(input, value)) {
      this.setFieldError(input, 'Please enter a valid email address');
      return false;
    }
    // Check length requirements
    const lengthError = this.getLengthValidationError(input, value);
    if (lengthError) {
      this.setFieldError(input, lengthError);
      return false;
    }
    return true;
  }
  /**
   * Check if field is required and empty
   * @param {HTMLElement} input - Input element
   * @param {string} value - Field value
   * @returns {boolean} True if field is required but empty
   */
  isFieldRequiredAndEmpty(input, value) {
    return input.hasAttribute('required') && !value;
  }
  /**
   * Check if email field has invalid format
   * @param {HTMLElement} input - Input element
   * @param {string} value - Field value
   * @returns {boolean} True if email is invalid
   */
  isInvalidEmail(input, value) {
    return input.type === 'email' && value && !this.isValidEmailFormat(value);
  }
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if email format is valid
   */
  isValidEmailFormat(email) {
    return EMAIL_REGEX.test(email);
  }
  /**
   * Get length validation error message if applicable
   * @param {HTMLElement} input - Input element
   * @param {string} value - Field value
   * @returns {string|null} Error message or null if valid
   */
  getLengthValidationError(input, value) {
    if (value.length === 0) {
      return null;
    }
    const minLength = input.getAttribute('minlength');
    const maxLength = input.getAttribute('maxlength');
    if (minLength && value.length < parseInt(minLength)) {
      return `Minimum ${minLength} characters required`;
    }
    if (maxLength && value.length > parseInt(maxLength)) {
      return `Maximum ${maxLength} characters allowed`;
    }
    return null;
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
  /**
   * Set form loading state
   * @param {boolean} loading - Loading state
   */
  setLoadingState(loading) {
    const submitButton = this.getSubmitButton();
    if (!submitButton) return;
    this.updateSubmitButton(submitButton, loading);
    this.updateFormClasses(loading);
  }
  /**
   * Get form submit button
   * @returns {HTMLElement|null} Submit button element
   */
  getSubmitButton() {
    return this.form.querySelector('button[type="submit"]');
  }
  /**
   * Update submit button state
   * @param {HTMLElement} button - Submit button
   * @param {boolean} loading - Loading state
   */
  updateSubmitButton(button, loading) {
    button.disabled = loading;
    button.textContent = loading ? LOADING_TEXT : DEFAULT_SUBMIT_TEXT;
  }
  /**
   * Update form CSS classes
   * @param {boolean} loading - Loading state
   */
  updateFormClasses(loading) {
    if (loading) {
      this.form.classList.add('loading');
    } else {
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
    }, MESSAGE_DISPLAY_TIMEOUT);
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
