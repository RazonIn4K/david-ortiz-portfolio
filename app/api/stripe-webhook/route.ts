import { NextResponse } from 'next/server';

/**
 * Stripe Webhook Handler
 *
 * This endpoint receives webhook events from Stripe for payment processing.
 * It validates the webhook signature and processes various event types.
 *
 * Required Environment Variables:
 * - STRIPE_WEBHOOK_SECRET: Webhook signing secret from Stripe Dashboard
 * - STRIPE_SECRET_KEY: Stripe secret key (for API calls if needed)
 *
 * @see https://stripe.com/docs/webhooks
 */

// Supported Stripe event types for this integration
const SUPPORTED_EVENTS = [
  'checkout.session.completed',
  'checkout.session.expired',
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'invoice.paid',
  'invoice.payment_failed',
] as const;

type SupportedEventType = typeof SUPPORTED_EVENTS[number];

interface WebhookPayload {
  id: string;
  object: string;
  type: string;
  data: {
    object: Record<string, unknown>;
  };
  created: number;
  livemode: boolean;
}

/**
 * Verify Stripe webhook signature using the raw body
 * This is a manual implementation - consider using stripe npm package for production
 */
async function verifyStripeSignature(
  payload: string,
  signature: string | null,
  secret: string
): Promise<{ valid: boolean; error?: string }> {
  if (!signature) {
    return { valid: false, error: 'Missing stripe-signature header' };
  }

  try {
    // Parse the signature header
    const elements = signature.split(',');
    const signatureData: Record<string, string> = {};

    for (const element of elements) {
      const [key, value] = element.split('=');
      if (key && value) {
        signatureData[key] = value;
      }
    }

    const timestamp = signatureData['t'];
    const signatures = elements
      .filter(e => e.startsWith('v1='))
      .map(e => e.substring(3));

    if (!timestamp || signatures.length === 0) {
      return { valid: false, error: 'Invalid signature format' };
    }

    // Check timestamp tolerance (5 minutes)
    const timestampAge = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
    if (Math.abs(timestampAge) > 300) {
      return { valid: false, error: 'Webhook timestamp too old' };
    }

    // Compute expected signature
    const signedPayload = `${timestamp}.${payload}`;
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(signedPayload)
    );

    const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // Constant-time comparison
    const isValid = signatures.some(sig => {
      if (sig.length !== expectedSignature.length) return false;
      let result = 0;
      for (let i = 0; i < sig.length; i++) {
        result |= sig.charCodeAt(i) ^ expectedSignature.charCodeAt(i);
      }
      return result === 0;
    });

    if (!isValid) {
      return { valid: false, error: 'Signature verification failed' };
    }

    return { valid: true };
  } catch (error) {
    console.error('[Stripe Webhook] Signature verification error:', error);
    return { valid: false, error: 'Signature verification error' };
  }
}

/**
 * Handle checkout.session.completed event
 * Triggered when a customer completes the checkout process
 */
async function handleCheckoutCompleted(session: Record<string, unknown>): Promise<void> {
  const sessionId = session.id as string;
  const customerEmail = session.customer_email as string || session.customer_details?.toString();
  const amountTotal = session.amount_total as number;
  const currency = session.currency as string;
  const metadata = session.metadata as Record<string, string> | undefined;

  console.log('[Stripe Webhook] Checkout completed:', {
    sessionId,
    customerEmail,
    amount: amountTotal ? `${(amountTotal / 100).toFixed(2)} ${currency?.toUpperCase()}` : 'N/A',
    metadata,
  });

  // TODO: Implement your business logic here
  // Examples:
  // - Send confirmation email
  // - Provision access to services
  // - Update database records
  // - Trigger automation workflows
}

/**
 * Handle checkout.session.expired event
 * Triggered when a checkout session expires without completion
 */
async function handleCheckoutExpired(session: Record<string, unknown>): Promise<void> {
  const sessionId = session.id as string;

  console.log('[Stripe Webhook] Checkout expired:', { sessionId });

  // TODO: Implement your business logic here
  // Examples:
  // - Send abandoned cart email
  // - Update analytics
}

/**
 * Handle payment_intent.succeeded event
 * Triggered when a payment is successfully processed
 */
async function handlePaymentSucceeded(paymentIntent: Record<string, unknown>): Promise<void> {
  const paymentIntentId = paymentIntent.id as string;
  const amount = paymentIntent.amount as number;
  const currency = paymentIntent.currency as string;

  console.log('[Stripe Webhook] Payment succeeded:', {
    paymentIntentId,
    amount: `${(amount / 100).toFixed(2)} ${currency?.toUpperCase()}`,
  });

  // TODO: Implement your business logic here
}

/**
 * Handle payment_intent.payment_failed event
 * Triggered when a payment attempt fails
 */
async function handlePaymentFailed(paymentIntent: Record<string, unknown>): Promise<void> {
  const paymentIntentId = paymentIntent.id as string;
  const lastError = paymentIntent.last_payment_error as Record<string, unknown> | undefined;

  console.log('[Stripe Webhook] Payment failed:', {
    paymentIntentId,
    error: lastError?.message || 'Unknown error',
  });

  // TODO: Implement your business logic here
  // Examples:
  // - Notify customer of failed payment
  // - Retry logic
}

/**
 * Handle subscription events
 */
async function handleSubscriptionEvent(
  subscription: Record<string, unknown>,
  eventType: string
): Promise<void> {
  const subscriptionId = subscription.id as string;
  const status = subscription.status as string;
  const customerId = subscription.customer as string;

  console.log(`[Stripe Webhook] Subscription ${eventType}:`, {
    subscriptionId,
    status,
    customerId,
  });

  // TODO: Implement your business logic here
  // Examples:
  // - Update user subscription status
  // - Provision/revoke access
  // - Send notification emails
}

/**
 * Handle invoice events
 */
async function handleInvoiceEvent(
  invoice: Record<string, unknown>,
  eventType: string
): Promise<void> {
  const invoiceId = invoice.id as string;
  const amountPaid = invoice.amount_paid as number;
  const currency = invoice.currency as string;
  const customerEmail = invoice.customer_email as string;

  console.log(`[Stripe Webhook] Invoice ${eventType}:`, {
    invoiceId,
    amount: amountPaid ? `${(amountPaid / 100).toFixed(2)} ${currency?.toUpperCase()}` : 'N/A',
    customerEmail,
  });

  // TODO: Implement your business logic here
}

/**
 * Process webhook event based on type
 */
async function processWebhookEvent(event: WebhookPayload): Promise<{ success: boolean; message: string }> {
  const eventType = event.type as SupportedEventType;
  const eventData = event.data.object;

  // Log the event receipt
  console.log(`[Stripe Webhook] Received event: ${event.type}`, {
    eventId: event.id,
    livemode: event.livemode,
    created: new Date(event.created * 1000).toISOString(),
  });

  try {
    switch (eventType) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(eventData);
        break;

      case 'checkout.session.expired':
        await handleCheckoutExpired(eventData);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentSucceeded(eventData);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(eventData);
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        await handleSubscriptionEvent(eventData, eventType.split('.').pop() || '');
        break;

      case 'invoice.paid':
      case 'invoice.payment_failed':
        await handleInvoiceEvent(eventData, eventType.split('.').pop() || '');
        break;

      default:
        // Log unhandled events for debugging
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
        return { success: true, message: `Event type ${event.type} received but not processed` };
    }

    return { success: true, message: `Event ${event.type} processed successfully` };
  } catch (error) {
    console.error(`[Stripe Webhook] Error processing ${event.type}:`, error);
    return { success: false, message: `Error processing event: ${error instanceof Error ? error.message : 'Unknown error'}` };
  }
}

/**
 * POST /api/stripe-webhook
 *
 * Receives and processes Stripe webhook events.
 * Must return 200 quickly to acknowledge receipt.
 */
export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Verify webhook secret is configured
  if (!webhookSecret) {
    console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    );
  }

  try {
    // Get raw body for signature verification
    const rawBody = await request.text();

    if (!rawBody) {
      return NextResponse.json(
        { error: 'Empty request body' },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const signature = request.headers.get('stripe-signature');
    const verification = await verifyStripeSignature(rawBody, signature, webhookSecret);

    if (!verification.valid) {
      console.warn('[Stripe Webhook] Signature verification failed:', verification.error);
      return NextResponse.json(
        { error: verification.error },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    let event: WebhookPayload;
    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    // Validate event structure
    if (!event.id || !event.type || !event.data?.object) {
      return NextResponse.json(
        { error: 'Invalid event structure' },
        { status: 400 }
      );
    }

    // Process the event
    const result = await processWebhookEvent(event);

    // Always return 200 to acknowledge receipt
    // Stripe will retry on non-2xx responses
    return NextResponse.json({
      received: true,
      eventId: event.id,
      eventType: event.type,
      ...result,
    });

  } catch (error) {
    console.error('[Stripe Webhook] Unexpected error:', error);

    // Return 500 to trigger Stripe retry
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/stripe-webhook
 *
 * Health check endpoint - useful for verifying the route is deployed
 */
export async function GET() {
  const isConfigured = !!process.env.STRIPE_WEBHOOK_SECRET;

  return NextResponse.json({
    status: 'ok',
    endpoint: '/api/stripe-webhook',
    configured: isConfigured,
    supportedEvents: SUPPORTED_EVENTS,
    timestamp: new Date().toISOString(),
  });
}
