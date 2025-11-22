# Stripe Environment Variables Setup

This document describes all environment variables required for Stripe integration, including the Tip Jar checkout and webhook handling.

## Required Variables

### STRIPE_SECRET_KEY

The Stripe secret API key. **Required** for creating Checkout Sessions (Tip Jar) and making Stripe API calls.

| Property | Value |
|----------|-------|
| Required | **Yes** (for Tip Jar / Checkout) |
| Format | `sk_test_...` or `sk_live_...` |
| Where to find | Stripe Dashboard > Developers > API keys |
| Used by | `/api/create-tip-checkout` |

**Test Mode:**
```
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

**Live Mode:**
```
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
```

### STRIPE_WEBHOOK_SECRET

The webhook signing secret used to verify that webhook requests come from Stripe.

| Property | Value |
|----------|-------|
| Required | Yes (for webhooks) |
| Format | `whsec_...` |
| Where to find | Stripe Dashboard > Webhooks > Endpoint > Signing secret |
| Used by | `/api/stripe-webhook` |

**Test Mode:**
```
STRIPE_WEBHOOK_SECRET=whsec_test_xxxxxxxxxxxxx
```

**Live Mode:**
```
STRIPE_WEBHOOK_SECRET=whsec_live_xxxxxxxxxxxxx
```

**Local Development (Stripe CLI):**
```
# Run this command and copy the secret shown
stripe listen --forward-to localhost:3000/api/stripe-webhook
# Output: Your webhook signing secret is whsec_xxxxx
```

## Optional Variables

### NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

The Stripe publishable key for client-side Stripe.js. Only needed if you implement client-side Stripe Elements or embedded checkout.

| Property | Value |
|----------|-------|
| Required | No (only for Stripe.js / Elements) |
| Format | `pk_test_...` or `pk_live_...` |
| Where to find | Stripe Dashboard > Developers > API keys |
| Client-accessible | Yes (NEXT_PUBLIC_ prefix) |

**Test Mode:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
```

**Live Mode:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
```

> **Note:** The Tip Jar currently uses Stripe Checkout (redirect), so the publishable key is not required. It would be needed for embedded checkout or Stripe Elements.

## Environment-Specific Configuration

### Local Development

Create `.env.local` (not committed to git):

```bash
# Stripe Webhook (get from Stripe CLI output)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Optional: For making Stripe API calls
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

Or use Doppler:

```bash
# Set up Doppler for local development
doppler setup --project david-ortiz-portfolio --config dev --no-interactive

# Add secrets
doppler secrets set STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxx"
doppler secrets set STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxx"

# Run with Doppler
doppler run -- npm run dev
```

### Staging/Preview Environment

Using Doppler (recommended):

```bash
# Switch to staging config
doppler setup --project david-ortiz-portfolio --config stg --no-interactive

# Set staging secrets (use test mode keys)
doppler secrets set STRIPE_WEBHOOK_SECRET="whsec_test_xxxxxxxxxxxxx"
doppler secrets set STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxx"
```

### Production Environment

Using Doppler (recommended):

```bash
# Switch to production config
doppler setup --project david-ortiz-portfolio --config prd --no-interactive

# Set production secrets (use LIVE mode keys)
doppler secrets set STRIPE_WEBHOOK_SECRET="whsec_live_xxxxxxxxxxxxx"
doppler secrets set STRIPE_SECRET_KEY="sk_live_xxxxxxxxxxxxx"
```

## Doppler Configuration

### Initial Setup

```bash
# 1. Install Doppler CLI
brew install dopplerhq/cli/doppler

# 2. Authenticate
doppler login

# 3. Configure for this project
doppler setup --project david-ortiz-portfolio --config dev --no-interactive
```

### Viewing Secrets

```bash
# List all secrets (masked)
doppler secrets

# View specific secret
doppler secrets get STRIPE_WEBHOOK_SECRET
```

### Syncing to Vercel

The Doppler-Vercel integration automatically syncs secrets:

1. Go to [Doppler Dashboard](https://dashboard.doppler.com)
2. Navigate to your project
3. Click "Integrations" tab
4. Select "Vercel"
5. Connect and map environments:
   - `dev` -> Preview
   - `stg` -> Preview (staging branch)
   - `prd` -> Production

## Security Best Practices

1. **Never commit secrets to git**
   - Use `.env.local` (in `.gitignore`)
   - Use Doppler for all environments

2. **Use separate keys for each environment**
   - Test keys for development/staging
   - Live keys only in production

3. **Rotate keys periodically**
   - Stripe Dashboard > Developers > API keys > Roll key
   - Update Doppler immediately after rolling

4. **Restrict key permissions** (if using restricted keys)
   - Only enable required permissions
   - Use separate keys for webhooks vs. frontend

5. **Monitor key usage**
   - Check Stripe Dashboard > Developers > Logs
   - Set up alerts for unusual activity

## Verification

### Check if variables are set correctly

```bash
# Local (with Doppler)
doppler run -- node -e "console.log('Secret key exists:', !!process.env.STRIPE_SECRET_KEY)"
doppler run -- node -e "console.log('Webhook secret exists:', !!process.env.STRIPE_WEBHOOK_SECRET)"

# Check the health endpoints
curl http://localhost:3000/api/stripe-webhook
# Should show: "configured": true

curl http://localhost:3000/api/create-tip-checkout
# Should show: "configured": true
```

### Verify in Vercel

1. Go to Vercel Dashboard
2. Select project "david-ortiz-portfolio"
3. Settings > Environment Variables
4. Verify both keys are set for correct environments:
   - `STRIPE_SECRET_KEY` (required for Tip Jar)
   - `STRIPE_WEBHOOK_SECRET` (required for webhooks)

## Troubleshooting

### "Payment processing is not available" error (Tip Jar)

The `STRIPE_SECRET_KEY` environment variable is missing.

```bash
# Check if set
doppler secrets get STRIPE_SECRET_KEY

# If not set, add it
doppler secrets set STRIPE_SECRET_KEY="sk_test_xxx"
```

### "Webhook not configured" error

The `STRIPE_WEBHOOK_SECRET` environment variable is missing.

```bash
# Check if set
doppler secrets get STRIPE_WEBHOOK_SECRET

# If not set, add it
doppler secrets set STRIPE_WEBHOOK_SECRET="whsec_xxx"
```

### "Signature verification failed" error

1. Wrong webhook secret - ensure you're using the correct secret for the environment
2. Mismatched environments - test webhook calling production endpoint (or vice versa)
3. Secret not updated after rotation

```bash
# Verify the secret matches Stripe Dashboard
# Go to Stripe > Webhooks > Your endpoint > Reveal signing secret
# Compare with:
doppler secrets get STRIPE_WEBHOOK_SECRET --plain
```

### Secrets not syncing to Vercel

1. Check Doppler-Vercel integration is active
2. Trigger manual sync in Doppler dashboard
3. Redeploy the Vercel project

```bash
# Force redeploy
vercel --prod
```

## Quick Reference

| Environment | STRIPE_SECRET_KEY | STRIPE_WEBHOOK_SECRET | NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY |
|-------------|-------------------|----------------------|-----------------------------------|
| Local (CLI) | `sk_test_...` | `whsec_...` (from CLI) | `pk_test_...` (optional) |
| Development | `sk_test_...` | `whsec_test_...` | `pk_test_...` (optional) |
| Staging | `sk_test_...` | `whsec_test_...` | `pk_test_...` (optional) |
| Production | `sk_live_...` | `whsec_live_...` | `pk_live_...` (optional) |

## API Endpoints

| Endpoint | Required Variables | Purpose |
|----------|-------------------|---------|
| `/api/create-tip-checkout` | `STRIPE_SECRET_KEY` | Create Checkout Sessions for tips |
| `/api/stripe-webhook` | `STRIPE_WEBHOOK_SECRET` | Handle Stripe webhook events |
