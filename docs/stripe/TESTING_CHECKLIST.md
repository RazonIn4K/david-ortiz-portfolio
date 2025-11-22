# Stripe Webhook Testing Checklist

Comprehensive testing checklist for validating Stripe webhook integration before going live.

## Prerequisites

- [ ] Stripe CLI installed (`brew install stripe/stripe-cli/stripe` or download from https://stripe.com/docs/stripe-cli)
- [ ] Stripe CLI authenticated (`stripe login`)
- [ ] Local development server running (`npm run dev`)
- [ ] Test mode API keys configured in Doppler

## 1. Local Development Testing

### 1.1 Stripe CLI Webhook Forwarding

```bash
# Start webhook forwarding to local server
stripe listen --forward-to localhost:3000/api/stripe-webhook

# Note the webhook signing secret (whsec_...) and add to .env.local:
# STRIPE_WEBHOOK_SECRET=whsec_...
```

- [ ] Stripe CLI connects successfully
- [ ] Webhook signing secret noted and configured
- [ ] Terminal shows "Ready! Your webhook signing secret is whsec_..."

### 1.2 Health Check Endpoint

```bash
curl http://localhost:3000/api/stripe-webhook
```

- [ ] Returns 200 OK
- [ ] Response includes `configured: true`
- [ ] Response lists supported events

### 1.3 Trigger Test Events

```bash
# Test checkout completion
stripe trigger checkout.session.completed

# Test payment success
stripe trigger payment_intent.succeeded

# Test payment failure
stripe trigger payment_intent.payment_failed

# Test subscription lifecycle
stripe trigger customer.subscription.created
stripe trigger customer.subscription.updated
stripe trigger customer.subscription.deleted

# Test invoice events
stripe trigger invoice.paid
stripe trigger invoice.payment_failed
```

For each event, verify:
- [ ] Event received (check server logs)
- [ ] Signature verification passed
- [ ] Event handler executed
- [ ] No errors in console
- [ ] 200 response returned to Stripe CLI

### 1.4 Signature Verification Tests

```bash
# Test with invalid signature (should fail)
curl -X POST http://localhost:3000/api/stripe-webhook \
  -H "Content-Type: application/json" \
  -H "stripe-signature: invalid_signature" \
  -d '{"type": "test"}'
```

- [ ] Returns 401 Unauthorized
- [ ] Error message: "Missing stripe-signature header" or "Signature verification failed"

### 1.5 Invalid Payload Tests

```bash
# Test with empty body
curl -X POST http://localhost:3000/api/stripe-webhook \
  -H "Content-Type: application/json" \
  -d ''

# Test with invalid JSON
curl -X POST http://localhost:3000/api/stripe-webhook \
  -H "Content-Type: application/json" \
  -d 'not-json'
```

- [ ] Returns appropriate error codes (400)
- [ ] No server crashes

## 2. Staging Environment Testing

### 2.1 Deploy to Staging

```bash
# Deploy to preview/staging
vercel --env STRIPE_WEBHOOK_SECRET=whsec_test_xxx
```

- [ ] Deployment successful
- [ ] Environment variables configured
- [ ] Health check endpoint accessible

### 2.2 Configure Stripe Test Webhook

1. Go to [Stripe Dashboard > Webhooks](https://dashboard.stripe.com/test/webhooks)
2. Click "Add endpoint"
3. Enter your staging URL: `https://your-staging-url.vercel.app/api/stripe-webhook`
4. Select events to listen for:
   - checkout.session.completed
   - checkout.session.expired
   - payment_intent.succeeded
   - payment_intent.payment_failed
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.paid
   - invoice.payment_failed

- [ ] Webhook endpoint created
- [ ] All required events selected
- [ ] Signing secret saved to Doppler

### 2.3 Test with Stripe Dashboard

1. Send test webhooks from Stripe Dashboard
2. Check webhook delivery status

- [ ] Events show as "Succeeded" in Stripe Dashboard
- [ ] Check Vercel function logs for processing
- [ ] No timeout errors (function completes < 10s)

### 2.4 End-to-End Payment Test

1. Use Stripe test card: `4242 4242 4242 4242`
2. Complete a test checkout flow

- [ ] Payment processed successfully
- [ ] Webhook received
- [ ] checkout.session.completed handled
- [ ] Business logic executed (if implemented)

## 3. Load Testing

### 3.1 Concurrent Webhooks

```bash
# Install artillery for load testing
npm install -g artillery

# Run load test (create artillery.yml first)
artillery quick --count 10 --num 5 -p POST \
  -H "Content-Type: application/json" \
  http://localhost:3000/api/stripe-webhook
```

- [ ] No errors under concurrent load
- [ ] Response times acceptable (< 500ms)
- [ ] No memory leaks

### 3.2 Retry Handling

Simulate webhook retries:
1. Temporarily return 500 from webhook
2. Observe Stripe retry behavior
3. Restore normal operation

- [ ] Stripe retries failed webhooks
- [ ] Idempotency maintained (no duplicate processing)

## 4. Error Handling Tests

### 4.1 Missing Environment Variables

```bash
# Temporarily remove STRIPE_WEBHOOK_SECRET
# Restart server
# Send webhook request
```

- [ ] Returns 500 with "Webhook not configured"
- [ ] No secrets leaked in error response

### 4.2 Malformed Events

```bash
# Test with missing required fields
curl -X POST http://localhost:3000/api/stripe-webhook \
  -H "Content-Type: application/json" \
  -H "stripe-signature: t=123,v1=abc" \
  -d '{"id": "evt_test"}'
```

- [ ] Returns 400 with "Invalid event structure"
- [ ] Error logged for debugging

### 4.3 Handler Errors

1. Add a bug to one event handler
2. Trigger that event
3. Verify error handling

- [ ] Error caught and logged
- [ ] Other events still processed
- [ ] 500 returned (triggers Stripe retry)

## 5. Security Tests

### 5.1 Replay Attack Prevention

- [ ] Old signatures (> 5 minutes) rejected
- [ ] Timestamp validation working

### 5.2 IP Filtering (Optional)

If implemented:
- [ ] Only Stripe IPs accepted
- [ ] Other IPs rejected

### 5.3 Rate Limiting (If Implemented)

- [ ] Excessive requests throttled
- [ ] Legitimate traffic unaffected

## 6. Monitoring Setup

### 6.1 Logging

- [ ] All events logged with event ID
- [ ] Errors logged with stack traces
- [ ] No sensitive data in logs (no full card numbers, etc.)

### 6.2 Alerts (If Applicable)

- [ ] Alert on webhook failures
- [ ] Alert on high error rate
- [ ] Alert on signature verification failures

## 7. Documentation Review

- [ ] Environment variables documented
- [ ] Supported events documented
- [ ] Error codes documented
- [ ] Deployment process documented

## Sign-Off

| Test Phase | Tester | Date | Status |
|------------|--------|------|--------|
| Local Development | | | |
| Staging Environment | | | |
| Load Testing | | | |
| Error Handling | | | |
| Security | | | |
| Monitoring | | | |

## Notes

Add any testing notes, issues found, or deviations here:

---

**Last Updated:** _Date_
**Tested Against Stripe API Version:** _Version_
