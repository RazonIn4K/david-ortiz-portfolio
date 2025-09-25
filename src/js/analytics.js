/**
 * Official Vercel Analytics Integration
 * Uses the official Vercel Analytics script for web analytics
 */
// Load Vercel Analytics script dynamically
(function() {
  const script = document.createElement('script');
  script.src = 'https://va.vercel-scripts.com/v1/script.js';
  script.defer = true;
  script.dataset.website = window.location.hostname;
  script.onload = function() {
  };
  script.onerror = function() {
  };
  document.head.appendChild(script);
})();
