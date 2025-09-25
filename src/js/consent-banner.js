// GDPR-compliant Cookie Consent Manager
import { STORAGE_KEYS } from './constants.js';

class ConsentManager {
  constructor() {
    this.consentKey = STORAGE_KEYS.CONSENT;
    this.consent = this.loadConsent();
    this.init();
  }

  init() {
    if (!this.hasConsent()) {
      this.showBanner();
    } else {
      this.applyConsent();
    }
  }

  loadConsent() {
    try {
      const stored = localStorage.getItem(this.consentKey);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  saveConsent(preferences) {
    this.consent = {
      ...preferences,
      timestamp: Date.now(),
      version: '1.0'
    };
    localStorage.setItem(this.consentKey, JSON.stringify(this.consent));
    this.applyConsent();

    // Notify unified analytics immediately
    if (window.analytics) {
      window.analytics.setConsent(this.consent);
    }

    // Dispatch custom event for other listeners
    window.dispatchEvent(new CustomEvent('consentChanged', { detail: this.consent }));
  }

  hasConsent() {
    return this.consent && this.consent.timestamp;
  }

  applyConsent() {
    if (!this.consent) return;

    // Control analytics based on consent
    if (this.consent.analytics) {
      window.analyticsEnabled = true;
      if (window.analyticsTracker && typeof window.analyticsTracker.enable === 'function') {
        window.analyticsTracker.enable();
      }
    } else {
      window.analyticsEnabled = false;
      if (window.analyticsTracker && typeof window.analyticsTracker.disable === 'function') {
        window.analyticsTracker.disable();
      }
    }

    // Control third-party services
    if (this.consent.thirdParty) {
      // Enable Vercel Analytics, etc.
      window.thirdPartyEnabled = true;
    } else {
      window.thirdPartyEnabled = false;
    }
  }

  showBanner() {
    const banner = document.createElement('div');
    banner.className = 'consent-banner';
    banner.innerHTML = `
      <div class="consent-content">
        <h3>Cookie Consent</h3>
        <p>We use cookies to improve your experience and analyze site usage.</p>
        <div class="consent-options">
          <label>
            <input type="checkbox" id="consent-necessary" checked disabled>
            Necessary (Required)
          </label>
          <label>
            <input type="checkbox" id="consent-analytics" checked>
            Analytics
          </label>
          <label>
            <input type="checkbox" id="consent-third-party">
            Third-party services
          </label>
        </div>
        <div class="consent-actions">
          <button id="consent-accept-all">Accept All</button>
          <button id="consent-accept-selected">Accept Selected</button>
          <button id="consent-reject">Reject Non-Essential</button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    // Event handlers
    document.getElementById('consent-accept-all').addEventListener('click', () => {
      this.saveConsent({
        necessary: true,
        analytics: true,
        thirdParty: true
      });
      banner.remove();
    });

    document.getElementById('consent-accept-selected').addEventListener('click', () => {
      this.saveConsent({
        necessary: true,
        analytics: document.getElementById('consent-analytics').checked,
        thirdParty: document.getElementById('consent-third-party').checked
      });
      banner.remove();
    });

    document.getElementById('consent-reject').addEventListener('click', () => {
      this.saveConsent({
        necessary: true,
        analytics: false,
        thirdParty: false
      });
      banner.remove();
    });
  }

  revokeConsent() {
    localStorage.removeItem(this.consentKey);
    this.consent = null;
    window.location.reload();
  }
}

// Initialize consent manager
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.consentManager = new ConsentManager();
  });
} else {
  window.consentManager = new ConsentManager();
}