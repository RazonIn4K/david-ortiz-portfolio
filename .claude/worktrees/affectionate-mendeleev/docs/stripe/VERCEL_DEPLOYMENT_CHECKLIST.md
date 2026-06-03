# Vercel Deployment Checklist for Stripe Webhooks

Step-by-step checklist for deploying Stripe webhook integration to Vercel.

## Pre-Deployment Checklist

### 1. Code Review

- [ ] All webhook handlers implemented and tested locally
- [ ] Error handling in place for all event types
- [ ] Logging configured (no sensitive data logged)
- [ ] No hardcoded secrets in code
- [ ] TypeScript types complete and accurate

### 2. Environment Variables Ready

- [ ] `STRIPE_WEBHOOK_SECRET` obtained from Stripe Dashboard
- [ ] `STRIPE_SECRET_KEY` ready (if needed for API calls)
- [ ] Secrets added to Doppler for target environment
- [ ] Doppler-Vercel integration configured

### 3. Stripe Dashboard Setup

- [ ] Stripe account in correct mode (test for staging, live for production)
- [ ] Webhook endpoint URL determined:
  - Staging: `https://your-preview-url.vercel.app/api/stripe-webhook`
  - Production: `https://cs-learning.me/api/stripe-webhook`

## Deployment Steps

### Step 1: Verify Local Build

```bash
# Ensure build succeeds
npm run build

# Run production server locally
npm run start

# Test webhook endpoint
curl http://localhost:3000/api/stripe-webhook
```

- [ ] Build completes without errors
- [ ] Webhook health check returns 200

### Step 2: Deploy to Vercel

#### Option A: Via Doppler + Vercel Integration (Recommended)

```bash
# Secrets are synced automatically
# Just deploy
vercel --prod
```

#### Option B: Manual Environment Variables

```bash
# Set environment variables during deploy
vercel --prod \
  -e STRIPE_WEBHOOK_SECRET=whsec_xxx \
  -e STRIPE_SECRET_KEY=sk_xxx
```

- [ ] Deployment initiated
- [ ] Build logs show no errors
- [ ] Deployment URL received

### Step 3: Verify Deployment

```bash
# Get deployment URL
DEPLOY_URL=$(vercel ls --json | jq -r '.[0].url')

# Test health endpoint
curl "https://$DEPLOY_URL/api/stripe-webhook"
```

Expected response:
```json
{
  "status": "ok",
  "endpoint": "/api/stripe-webhook",
  "configured": true,
  "supportedEvents": [...],
  "timestamp": "..."
}
```

- [ ] Health check returns `configured: true`
- [ ] All supported events listed

### Step 4: Configure Stripe Webhook Endpoint

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/webhooks)
   - Use `/test/webhooks` for test mode
   - Use `/webhooks` for live mode

2. Click "Add endpoint"

3. Enter endpoint URL:
   - **Production:** `https://cs-learning.me/api/stripe-webhook`
   - **Staging:** `https://your-staging-url.vercel.app/api/stripe-webhook`

4. Select events to send:
   - [x] checkout.session.completed
   - [x] checkout.session.expired
   - [x] payment_intent.succeeded
   - [x] payment_intent.payment_failed
   - [x] customer.subscription.created
   - [x] customer.subscription.updated
   - [x] customer.subscription.deleted
   - [x] invoice.paid
   - [x] invoice.payment_failed

5. Click "Add endpoint"

- [ ] Endpoint created successfully
- [ ] Events configured
- [ ] Signing secret displayed

### Step 5: Update Webhook Secret (If New Endpoint)

If you created a new webhook endpoint, update the signing secret:

```bash
# Update in Doppler
doppler secrets set STRIPE_WEBHOOK_SECRET="whsec_new_secret"

# Redeploy to pick up new secret
vercel --prod
```

- [ ] New signing secret saved to Doppler
- [ ] Redeployment completed

### Step 6: Send Test Webhook

1. In Stripe Dashboard, go to your webhook endpoint
2. Click "Send test webhook"
3. Select an event type (e.g., `checkout.session.completed`)
4. Click "Send test webhook"

- [ ] Webhook sent successfully
- [ ] Response shows "Succeeded" in Stripe Dashboard

### Step 7: Verify Vercel Logs

1. Go to Vercel Dashboard
2. Select project "david-ortiz-portfolio"
3. Click "Logs" tab
4. Filter by "/api/stripe-webhook"

- [ ] Webhook received log entry visible
- [ ] No error logs
- [ ] Event processed successfully

## Post-Deployment Verification

### Functional Tests

```bash
# Production health check
curl https://cs-learning.me/api/stripe-webhook

# Should return configured: true
```

- [ ] Health endpoint accessible
- [ ] Returns correct configuration

### End-to-End Payment Test (Test Mode Only)

1. Use test card `4242 4242 4242 4242`
2. Complete checkout flow
3. Verify webhook received

- [ ] Payment processed
- [ ] Webhook delivered
- [ ] Event handled correctly

### Monitoring Setup

- [ ] Vercel function logs accessible
- [ ] Stripe webhook logs monitored
- [ ] Error alerting configured (if applicable)

## Production Go-Live Checklist

### Switch from Test to Live Mode

1. **Create Live Webhook Endpoint**
   - Go to Stripe Dashboard (live mode - no `/test/` in URL)
   - Add endpoint: `https://cs-learning.me/api/stripe-webhook`
   - Select same events as test

2. **Update Environment Variables**
   ```bash
   # Switch Doppler to production config
   doppler setup --config prd --no-interactive

   # Update with LIVE secrets
   doppler secrets set STRIPE_WEBHOOK_SECRET="whsec_live_xxx"
   doppler secrets set STRIPE_SECRET_KEY="sk_live_xxx"
   ```

3. **Redeploy**
   ```bash
   vercel --prod
   ```

4. **Verify Live Webhook**
   - Check health endpoint shows `configured: true`
   - Monitor first few live transactions

### Go-Live Verification

- [ ] Live webhook endpoint created in Stripe
- [ ] Live signing secret in Doppler/Vercel
- [ ] Production deployment updated
- [ ] First live webhook received successfully
- [ ] Business logic executing correctly

## Rollback Procedure

If issues occur after deployment:

### Quick Rollback

```bash
# List recent deployments
vercel ls

# Rollback to previous deployment
vercel rollback
```

### Webhook Endpoint Rollback

1. Disable problematic webhook endpoint in Stripe Dashboard
2. Re-enable previous working endpoint (if applicable)

## Troubleshooting

### Webhook Not Receiving Events

1. Check endpoint URL is correct in Stripe Dashboard
2. Verify endpoint is enabled (not disabled)
3. Check Vercel deployment is active
4. Review Stripe webhook logs for errors

### 401 Unauthorized Errors

1. Webhook signing secret mismatch
2. Update `STRIPE_WEBHOOK_SECRET` in Doppler
3. Redeploy application

### 500 Internal Server Errors

1. Check Vercel function logs
2. Verify environment variables are set
3. Check for code errors in webhook handler

### Timeout Errors

1. Webhook handler taking too long (> 10s Vercel limit)
2. Move heavy processing to background jobs
3. Return 200 immediately, process async

## Quick Commands Reference

```bash
# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Rollback
vercel rollback

# Set environment variable
vercel env add STRIPE_WEBHOOK_SECRET production

# Remove environment variable
vercel env rm STRIPE_WEBHOOK_SECRET production
```

## Sign-Off

| Step | Completed By | Date | Notes |
|------|--------------|------|-------|
| Pre-Deployment Review | | | |
| Staging Deployment | | | |
| Staging Testing | | | |
| Production Deployment | | | |
| Go-Live Verification | | | |

---

**Last Updated:** _Date_
**Deployed To:** cs-learning.me
**Vercel Project:** david-ortiz-portfolio
