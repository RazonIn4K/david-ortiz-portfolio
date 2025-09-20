/**
 * Official Vercel Analytics Integration
 * Replaces custom Speed Insights with official @vercel/analytics package
 */

import { inject } from '@vercel/analytics';

// Initialize Vercel Analytics
inject();

console.log('✅ Vercel Analytics initialized');

// Export for potential future use
export { inject };