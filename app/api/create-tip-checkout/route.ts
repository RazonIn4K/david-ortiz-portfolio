import { NextResponse } from 'next/server';

/**
 * Create Tip Checkout API Route
 *
 * Creates a Stripe Checkout Session for custom tip amounts.
 * This solves the limitation that Stripe Payment Links don't support
 * "customer chooses price" pricing models.
 *
 * Required Environment Variables:
 * - STRIPE_SECRET_KEY: Stripe secret API key (sk_test_... or sk_live_...)
 *
 * @example
 * POST /api/create-tip-checkout
 * Body: { "amount": 25 }
 * Response: { "url": "https://checkout.stripe.com/..." }
 */

// Validation constants
const MIN_AMOUNT = 1; // Minimum $1
const MAX_AMOUNT = 10000; // Maximum $10,000
const CURRENCY = 'usd';

interface TipCheckoutRequest {
  amount: number;
  message?: string;
}

interface StripeCheckoutSession {
  id: string;
  url: string;
}

function validateRequest(body: unknown): { valid: true; data: TipCheckoutRequest } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { amount, message } = body as Record<string, unknown>;

  // Validate amount
  if (amount === undefined || amount === null) {
    return { valid: false, error: 'Amount is required' };
  }

  if (typeof amount !== 'number' || isNaN(amount)) {
    return { valid: false, error: 'Amount must be a number' };
  }

  if (amount < MIN_AMOUNT) {
    return { valid: false, error: `Minimum amount is $${MIN_AMOUNT}` };
  }

  if (amount > MAX_AMOUNT) {
    return { valid: false, error: `Maximum amount is $${MAX_AMOUNT.toLocaleString()}` };
  }

  // Validate optional message
  if (message !== undefined && typeof message !== 'string') {
    return { valid: false, error: 'Message must be a string' };
  }

  if (typeof message === 'string' && message.length > 500) {
    return { valid: false, error: 'Message must be 500 characters or less' };
  }

  return {
    valid: true,
    data: {
      amount: Math.round(amount * 100) / 100, // Round to 2 decimal places
      message: typeof message === 'string' ? message.trim() : undefined,
    },
  };
}

async function createStripeCheckoutSession(
  amount: number,
  message?: string
): Promise<StripeCheckoutSession> {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    throw new Error('Stripe is not configured');
  }

  const siteUrl = process.env.SITE_URL || 'https://cs-learning.me';

  // Convert amount to cents for Stripe
  const amountInCents = Math.round(amount * 100);

  // Build the line item
  const lineItem = {
    price_data: {
      currency: CURRENCY,
      product_data: {
        name: 'Tip / Support',
        description: message || 'Thank you for your support!',
        // Optional: Add images
        // images: [`${siteUrl}/images/tip-jar.png`],
      },
      unit_amount: amountInCents,
    },
    quantity: 1,
  };

  // Create checkout session via Stripe API
  const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      'mode': 'payment',
      'success_url': `${siteUrl}?tip=success`,
      'cancel_url': `${siteUrl}?tip=cancelled`,
      'line_items[0][price_data][currency]': CURRENCY,
      'line_items[0][price_data][product_data][name]': 'Tip / Support',
      'line_items[0][price_data][product_data][description]': message || 'Thank you for your support!',
      'line_items[0][price_data][unit_amount]': amountInCents.toString(),
      'line_items[0][quantity]': '1',
      'payment_method_types[0]': 'card',
      'submit_type': 'donate',
      // Optional: Collect billing address
      // 'billing_address_collection': 'auto',
      // Optional: Allow customer to adjust quantity (not applicable for tips)
      // 'allow_promotion_codes': 'true',
      // Metadata for webhook processing
      'metadata[type]': 'tip',
      'metadata[amount_usd]': amount.toString(),
      ...(message ? { 'metadata[message]': message } : {}),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('[Tip Checkout] Stripe API error:', errorData);
    throw new Error(errorData.error?.message || 'Failed to create checkout session');
  }

  const session = await response.json();

  return {
    id: session.id,
    url: session.url,
  };
}

/**
 * POST /api/create-tip-checkout
 *
 * Creates a Stripe Checkout Session for a custom tip amount.
 *
 * Request body:
 * - amount: number (required) - Tip amount in USD (1-10000)
 * - message: string (optional) - Optional message from tipper
 *
 * Response:
 * - url: string - Stripe Checkout URL to redirect the user to
 * - sessionId: string - Checkout session ID for tracking
 */
export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json().catch(() => null);

    // Validate request
    const validation = validateRequest(body);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { amount, message } = validation.data;

    // Create Stripe Checkout Session
    const session = await createStripeCheckoutSession(amount, message);

    // Return checkout URL
    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
    });

  } catch (error) {
    console.error('[Tip Checkout] Error:', error);

    // Check if Stripe is not configured
    if (error instanceof Error && error.message === 'Stripe is not configured') {
      return NextResponse.json(
        { error: 'Payment processing is not available' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/create-tip-checkout
 *
 * Health check endpoint
 */
export async function GET() {
  const isConfigured = !!process.env.STRIPE_SECRET_KEY;

  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/create-tip-checkout',
    configured: isConfigured,
    limits: {
      min: MIN_AMOUNT,
      max: MAX_AMOUNT,
      currency: CURRENCY.toUpperCase(),
    },
  });
}
