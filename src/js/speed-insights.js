/**
 * Static-friendly Speed Insights Integration
 * Provides Web Vitals monitoring alongside Vercel Analytics
 */
// Initialize Speed Insights for performance monitoring
(function() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;
  // Load Vercel Speed Insights script
  const script = document.createElement('script');
  script.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
  script.defer = true;
  script.dataset.endpoint = 'https://vitals.vercel-insights.com/v1/vitals';
  script.onload = function() {
  };
  script.onerror = function() {
  };
  document.head.appendChild(script);
})();
// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {};
}