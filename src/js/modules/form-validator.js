// Form Validation Module
// Handles contact form validation and submission

export class FormValidator {
  constructor(formSelector) {
    this.form = document.querySelector(formSelector);
    this.errors = {};

    if (this.form) {
      this.init();
    }
  }

  init() {
    this.setupValidation();
    this.setupSubmission();
  }

  setupValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearFieldError(input));
    });
  }

  setupSubmission() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.validateForm()) {
      this.handleValidationFailure();
      return;
    }

    this.handleSuccessfulSubmission();
  }

  handleValidationFailure() {
    this.focusFirstErrorField();
    this.trackFormError();
  }

  handleSuccessfulSubmission() {
    this.showSuccessMessage();
    this.trackFormSuccess();
    setTimeout(() => {
      this.resetForm();
    }, 2000);
  }

  focusFirstErrorField() {
    const firstErrorField = this.form.querySelector('.error');
    if (firstErrorField) {
      firstErrorField.focus();
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  trackFormError() {
    if (window.analytics) {
      window.analytics.track('form_validation_error', {
        event_category: 'form',
        event_label: 'contact_form',
        errors: Object.keys(this.errors).join(',')
      });
    }
  }

  trackFormSuccess() {
    if (window.analytics) {
      window.analytics.track('form_submit', {
        event_category: 'contact',
        event_label: 'contact_form'
      });
    }
  }

  validateForm() {
    const requiredFields = this.form.querySelectorAll('[required]');
    let isValid = true;
    this.errors = {};

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const name = field.getAttribute('name');
    const type = field.type;

    // Clear previous error
    this.clearFieldError(field);

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
      this.setFieldError(field, `${name} is required`);
      return false;
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.setFieldError(field, 'Please enter a valid email address');
        return false;
      }
    }

    // Min/Max length validation
    const minLength = field.getAttribute('minlength');
    const maxLength = field.getAttribute('maxlength');

    if (minLength && value.length < parseInt(minLength)) {
      this.setFieldError(field, `Minimum ${minLength} characters required`);
      return false;
    }

    if (maxLength && value.length > parseInt(maxLength)) {
      this.setFieldError(field, `Maximum ${maxLength} characters allowed`);
      return false;
    }

    return true;
  }

  setFieldError(field, message) {
    field.classList.add('error');
    const name = field.getAttribute('name');
    this.errors[name] = message;

    // Create or update error message element
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'field-error';
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorElement.id || 'error-' + name);
  }

  clearFieldError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
    const name = field.getAttribute('name');
    delete this.errors[name];
  }

  showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.textContent = 'Thank you! Your message has been sent.';
    successMessage.setAttribute('role', 'status');
    successMessage.setAttribute('aria-live', 'polite');
    this.form.appendChild(successMessage);

    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

  resetForm() {
    this.form.reset();
    this.errors = {};
    const errorElements = this.form.querySelectorAll('.field-error');
    errorElements.forEach(el => el.remove());
    const errorFields = this.form.querySelectorAll('.error');
    errorFields.forEach(field => {
      field.classList.remove('error');
      field.removeAttribute('aria-invalid');
    });
  }
}

// Export for backward compatibility
if (typeof window !== 'undefined') {
  window.FormValidator = FormValidator;
}