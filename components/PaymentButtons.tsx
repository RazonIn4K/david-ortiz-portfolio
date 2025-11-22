'use client';

import { clsx } from 'clsx';

/**
 * Payment Link Button Components
 *
 * Simple buttons that link to Stripe Payment Links.
 * URLs are configured via environment variables for easy updates.
 *
 * To update Payment Link URLs:
 * 1. Create/update Payment Links in Stripe Dashboard
 * 2. Set environment variables in Doppler or .env.local
 * 3. Redeploy
 */

interface PaymentButtonProps {
  className?: string;
}

// Payment Link URLs - set via environment variables
const PHOTO_RESTORATION_URL = process.env.NEXT_PUBLIC_PHOTO_RESTORATION_PAYMENT_LINK || '#';
const TIP_JAR_URL = process.env.NEXT_PUBLIC_TIP_JAR_PAYMENT_LINK || '#';

/**
 * Photo Restoration Button
 *
 * Links to Stripe Payment Link for photo restoration service.
 * $7 per photo with adjustable quantity.
 */
export function PhotoRestorationButton({ className }: PaymentButtonProps) {
  const isConfigured = PHOTO_RESTORATION_URL !== '#';

  return (
    <a
      href={PHOTO_RESTORATION_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 shadow-lg',
        isConfigured
          ? 'bg-gradient-to-r from-teal-500 to-cyan-400 text-navy hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] shadow-teal-500/20'
          : 'bg-white/10 text-white/40 cursor-not-allowed',
        className
      )}
      onClick={(e) => {
        if (!isConfigured) {
          e.preventDefault();
        }
      }}
    >
      {/* Image/Photo Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span>Restore Photos - $7/photo</span>
    </a>
  );
}

/**
 * Tip Jar Button
 *
 * Links to Stripe Payment Link with "customer chooses price" option.
 */
export function TipJarButton({ className }: PaymentButtonProps) {
  const isConfigured = TIP_JAR_URL !== '#';

  return (
    <a
      href={TIP_JAR_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx(
        'group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 shadow-lg',
        isConfigured
          ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm'
          : 'bg-white/5 border border-white/10 text-white/40 cursor-not-allowed',
        className
      )}
      onClick={(e) => {
        if (!isConfigured) {
          e.preventDefault();
        }
      }}
    >
      {/* Heart Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      <span>Support My Work</span>
    </a>
  );
}

/**
 * Combined Payment Buttons
 *
 * Renders both buttons together in a flex container.
 */
export function PaymentButtons({ className }: PaymentButtonProps) {
  return (
    <div className={clsx('flex flex-wrap items-center gap-3', className)}>
      <PhotoRestorationButton />
      <TipJarButton />
    </div>
  );
}
