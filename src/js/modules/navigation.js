// Navigation Module
// Handles smooth scrolling between sections with analytics tracking

export class SmoothNavigation {
  constructor() {
    this.navLinks = document.querySelectorAll('.nav-link');
    this.init();
  }

  init() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (event) => this.handleNavClick(event));
    });
  }

  handleNavClick(event) {
    const href = event.currentTarget.getAttribute('href');

    if (!href || !href.startsWith('#')) {
      return;
    }

    event.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) {
      return;
    }

    const headerOffset = 70;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    if (window.analytics) {
      window.analytics.track('navigation_click', {
        event_category: 'engagement',
        event_label: targetId
      });
    }

    if (history.pushState) {
      history.pushState(null, null, href);
    }
  }
}

// Export for backward compatibility
if (typeof window !== 'undefined') {
  window.SmoothNavigation = SmoothNavigation;
}
