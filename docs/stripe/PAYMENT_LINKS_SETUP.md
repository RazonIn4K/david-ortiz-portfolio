# Stripe Payment Links Setup

This document explains how to set up and configure Stripe Payment Links for the portfolio site.

## Overview

We use Stripe Payment Links for accepting payments - no custom backend required!

| Service | Pricing Model | Payment Link Type |
|---------|--------------|-------------------|
| Photo Restoration | $7 per photo (adjustable quantity) | Fixed price with quantity |
| Tip Jar | Customer chooses amount | Customer chooses price |

## Creating Payment Links in Stripe

### 1. Photo Restoration Payment Link

1. Go to [Stripe Dashboard > Payment Links](https://dashboard.stripe.com/payment-links)
2. Click **"+ New"**
3. Select **"Products or subscriptions"**
4. Create a new product:
   - **Name:** Photo Restoration
   - **Description:** Professional AI-powered photo restoration service
   - **Price:** $7.00 USD (one-time)
   - **Let customers adjust quantity:** Yes
5. Click **"Create link"**
6. Copy the Payment Link URL (e.g., `https://buy.stripe.com/xxx`)

### 2. Tip Jar Payment Link

1. Go to [Stripe Dashboard > Payment Links](https://dashboard.stripe.com/payment-links)
2. Click **"+ New"**
3. Select **"Products or subscriptions"**
4. Create a new product:
   - **Name:** Support / Tip
   - **Description:** Thank you for supporting my work!
5. For pricing, select **"Customers choose what to pay"**
   - Set minimum amount (e.g., $1)
   - Optionally set suggested amounts (e.g., $5, $10, $20)
6. Click **"Create link"**
7. Copy the Payment Link URL (e.g., `https://buy.stripe.com/yyy`)

## Configuring Environment Variables

### Required Variables

```bash
# Photo Restoration Payment Link
NEXT_PUBLIC_PHOTO_RESTORATION_PAYMENT_LINK=https://buy.stripe.com/xxx

# Tip Jar Payment Link
NEXT_PUBLIC_TIP_JAR_PAYMENT_LINK=https://buy.stripe.com/yyy
```

> **Note:** These use the `NEXT_PUBLIC_` prefix because they're used client-side.

### Setting Up with Doppler

```bash
# Development
doppler secrets set NEXT_PUBLIC_PHOTO_RESTORATION_PAYMENT_LINK="https://buy.stripe.com/test_xxx"
doppler secrets set NEXT_PUBLIC_TIP_JAR_PAYMENT_LINK="https://buy.stripe.com/test_yyy"

# Production
doppler setup --config prd --no-interactive
doppler secrets set NEXT_PUBLIC_PHOTO_RESTORATION_PAYMENT_LINK="https://buy.stripe.com/live_xxx"
doppler secrets set NEXT_PUBLIC_TIP_JAR_PAYMENT_LINK="https://buy.stripe.com/live_yyy"
```

### Setting Up with .env.local

Create `.env.local` in project root:

```bash
NEXT_PUBLIC_PHOTO_RESTORATION_PAYMENT_LINK=https://buy.stripe.com/test_xxx
NEXT_PUBLIC_TIP_JAR_PAYMENT_LINK=https://buy.stripe.com/test_yyy
```

### Setting Up in Vercel

1. Go to Vercel Dashboard > Project > Settings > Environment Variables
2. Add both variables for Preview and Production environments
3. Redeploy

## Using the Components

### Import and Use

```tsx
import {
  PhotoRestorationButton,
  TipJarButton,
  PaymentButtons
} from '@/components/PaymentButtons';

// Individual buttons
<PhotoRestorationButton />
<TipJarButton />

// Both buttons together
<PaymentButtons />

// With custom className
<TipJarButton className="mt-4" />
```

### Button Variants

**PhotoRestorationButton:**
- Gradient teal/cyan background
- Primary CTA style
- Shows "$7/photo" pricing

**TipJarButton:**
- Glassmorphism style (transparent with border)
- Secondary CTA style
- Shows "Support My Work" text

## Test Mode vs Live Mode

### Test Mode

1. Create Payment Links in Stripe **Test Mode** (toggle in dashboard)
2. URLs will contain `test_` in the path
3. Use test card: `4242 4242 4242 4242`

### Live Mode

1. Create Payment Links in Stripe **Live Mode**
2. URLs will contain `live_` in the path
3. Update environment variables with live URLs
4. Redeploy

## Customizing Payment Links

You can customize Payment Links in Stripe Dashboard:

- **Branding:** Add logo, colors, custom domain
- **After payment:** Redirect URL, confirmation page
- **Collect info:** Phone number, billing/shipping address
- **Limits:** Quantity limits, payment method restrictions
- **Promotion codes:** Enable discount codes

### Setting Success/Cancel URLs

In Stripe Dashboard > Payment Link > Settings:

```
After payment redirect: https://cs-learning.me?payment=success
```

## Updating Payment Links

To update a Payment Link URL:

1. Create a new Payment Link in Stripe (or edit existing)
2. Copy the new URL
3. Update environment variable:
   ```bash
   doppler secrets set NEXT_PUBLIC_TIP_JAR_PAYMENT_LINK="https://buy.stripe.com/new_xxx"
   ```
4. Redeploy: `vercel --prod`

## Troubleshooting

### Button Shows as Disabled

The Payment Link URL is not configured. Set the environment variable:

```bash
doppler secrets set NEXT_PUBLIC_TIP_JAR_PAYMENT_LINK="https://buy.stripe.com/xxx"
```

### Link Opens But Shows Error

1. Check if using test vs live mode URL
2. Verify the Payment Link is active in Stripe Dashboard
3. Check Stripe Dashboard for any issues with the product

### Changes Not Appearing

1. Environment variables require redeploy
2. For local dev, restart the dev server
3. Check Vercel deployment logs

## Quick Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_PHOTO_RESTORATION_PAYMENT_LINK` | Photo service checkout | `https://buy.stripe.com/xxx` |
| `NEXT_PUBLIC_TIP_JAR_PAYMENT_LINK` | Tip jar checkout | `https://buy.stripe.com/yyy` |

## Webhooks (Optional)

If you need to track successful payments:

1. Payment Links automatically send `checkout.session.completed` events
2. Configure webhook endpoint in Stripe Dashboard
3. The existing `/api/stripe-webhook` route will handle these events

See `docs/stripe/ENVIRONMENT_VARIABLES.md` for webhook setup.
