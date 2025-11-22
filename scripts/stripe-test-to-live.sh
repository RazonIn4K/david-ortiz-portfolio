#!/bin/bash

# =============================================================================
# Stripe Test Mode to Live Mode Transition Script
# =============================================================================
# Interactive script to guide through the process of switching from Stripe
# test mode to live mode for webhook integration.
#
# Usage:
#   ./scripts/stripe-test-to-live.sh
#
# This script will:
# 1. Verify current test mode configuration
# 2. Guide through live mode setup
# 3. Validate the transition
# 4. Provide rollback instructions
#
# =============================================================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
PRODUCTION_URL="https://cs-learning.me"
WEBHOOK_PATH="/api/stripe-webhook"

# State tracking
STEP=1
TOTAL_STEPS=7

# Helper functions
print_step() {
    echo ""
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${CYAN}Step $STEP of $TOTAL_STEPS: $1${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    ((STEP++))
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}!${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

confirm() {
    local prompt="$1"
    local response

    echo ""
    read -p "$prompt [y/N]: " response
    case "$response" in
        [yY][eE][sS]|[yY])
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

wait_for_enter() {
    echo ""
    read -p "Press Enter to continue..."
}

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# =============================================================================
# Step Functions
# =============================================================================

step_introduction() {
    clear
    echo ""
    echo -e "${BLUE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                                                              ║${NC}"
    echo -e "${BLUE}║       Stripe Test → Live Mode Transition Guide               ║${NC}"
    echo -e "${BLUE}║                                                              ║${NC}"
    echo -e "${BLUE}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "This interactive script will guide you through transitioning your"
    echo "Stripe webhook integration from test mode to live mode."
    echo ""
    echo -e "${YELLOW}⚠  IMPORTANT: This process involves handling live payment data.${NC}"
    echo -e "${YELLOW}   Ensure you have thoroughly tested in test mode first.${NC}"
    echo ""
    echo "Prerequisites:"
    echo "  • Stripe account with live mode enabled"
    echo "  • Test mode webhooks working correctly"
    echo "  • Access to Stripe Dashboard"
    echo "  • Access to Doppler (or Vercel env vars)"
    echo ""

    if ! confirm "Are you ready to proceed?"; then
        echo ""
        echo "Transition cancelled. Run this script again when ready."
        exit 0
    fi
}

step_verify_test_mode() {
    print_step "Verify Test Mode Configuration"

    echo "First, let's verify your test mode setup is working correctly."
    echo ""

    # Check production endpoint
    echo "Checking production endpoint health..."
    echo ""

    local response
    response=$(curl -s "${PRODUCTION_URL}${WEBHOOK_PATH}" 2>/dev/null) || {
        print_error "Could not connect to ${PRODUCTION_URL}${WEBHOOK_PATH}"
        echo ""
        echo "Please ensure:"
        echo "  1. Your application is deployed to Vercel"
        echo "  2. The webhook route is accessible"
        exit 1
    }

    if command_exists jq; then
        local configured
        configured=$(echo "$response" | jq -r '.configured' 2>/dev/null)

        if [ "$configured" = "true" ]; then
            print_success "Webhook endpoint is configured"
        else
            print_error "Webhook endpoint is NOT configured"
            echo ""
            echo "Please set STRIPE_WEBHOOK_SECRET in your environment."
            exit 1
        fi
    else
        print_info "Response: $response"
    fi

    echo ""
    echo "Verification checklist for test mode:"
    echo ""
    echo "  [ ] Test payments work with card 4242 4242 4242 4242"
    echo "  [ ] Webhooks are received (check Stripe Dashboard > Webhooks)"
    echo "  [ ] All event types process correctly"
    echo "  [ ] No errors in Vercel logs"
    echo ""

    if ! confirm "Has test mode been fully verified and working?"; then
        echo ""
        print_warning "Please complete test mode verification before going live."
        echo "Run test payments and check webhook delivery in Stripe Dashboard."
        exit 1
    fi
}

step_stripe_live_mode() {
    print_step "Enable Stripe Live Mode"

    echo "Now we'll set up live mode in Stripe Dashboard."
    echo ""
    echo "Action required in Stripe Dashboard:"
    echo ""
    echo "  1. Go to: https://dashboard.stripe.com/webhooks"
    echo "     (Note: URL should NOT contain '/test/')"
    echo ""
    echo "  2. Click 'Add endpoint'"
    echo ""
    echo "  3. Enter endpoint URL:"
    echo "     ${PRODUCTION_URL}${WEBHOOK_PATH}"
    echo ""
    echo "  4. Select events:"
    echo "     • checkout.session.completed"
    echo "     • checkout.session.expired"
    echo "     • payment_intent.succeeded"
    echo "     • payment_intent.payment_failed"
    echo "     • customer.subscription.created"
    echo "     • customer.subscription.updated"
    echo "     • customer.subscription.deleted"
    echo "     • invoice.paid"
    echo "     • invoice.payment_failed"
    echo ""
    echo "  5. Click 'Add endpoint'"
    echo ""
    echo "  6. Click 'Reveal' under 'Signing secret'"
    echo "     Copy this secret - you'll need it in the next step"
    echo ""

    wait_for_enter

    echo ""
    if ! confirm "Have you created the live mode webhook endpoint in Stripe?"; then
        print_warning "Please create the endpoint before continuing."
        exit 1
    fi
}

step_update_secrets() {
    print_step "Update Environment Variables"

    echo "Now update your production secrets with live mode values."
    echo ""

    if command_exists doppler; then
        echo "Detected Doppler CLI. Recommended approach:"
        echo ""
        echo "  # Switch to production config"
        echo "  doppler setup --project david-ortiz-portfolio --config prd --no-interactive"
        echo ""
        echo "  # Update webhook secret (paste your live signing secret)"
        echo "  doppler secrets set STRIPE_WEBHOOK_SECRET=\"whsec_live_xxxxx\""
        echo ""
        echo "  # If using Stripe API key, update it too"
        echo "  doppler secrets set STRIPE_SECRET_KEY=\"sk_live_xxxxx\""
        echo ""
    else
        echo "Update secrets in Vercel Dashboard:"
        echo ""
        echo "  1. Go to: https://vercel.com/razs-projects-29d4f2e6/david-ortiz-portfolio/settings/environment-variables"
        echo ""
        echo "  2. Update STRIPE_WEBHOOK_SECRET:"
        echo "     • Click the variable"
        echo "     • Replace with live signing secret (whsec_live_...)"
        echo "     • Ensure 'Production' is selected"
        echo "     • Save"
        echo ""
        echo "  3. If using STRIPE_SECRET_KEY, update it too with sk_live_..."
        echo ""
    fi

    wait_for_enter

    if ! confirm "Have you updated the environment variables with live mode secrets?"; then
        print_warning "Please update secrets before continuing."
        exit 1
    fi
}

step_redeploy() {
    print_step "Redeploy Application"

    echo "Redeploy your application to pick up the new environment variables."
    echo ""

    if command_exists vercel; then
        echo "Run the following command:"
        echo ""
        echo "  vercel --prod"
        echo ""

        if confirm "Would you like to run 'vercel --prod' now?"; then
            echo ""
            vercel --prod
            echo ""
            print_success "Deployment initiated"
        else
            echo ""
            print_info "Please run 'vercel --prod' manually"
        fi
    else
        echo "Deploy via Vercel Dashboard or CLI:"
        echo ""
        echo "  Option 1: Push to main branch (triggers auto-deploy)"
        echo ""
        echo "  Option 2: Vercel Dashboard > Deployments > Redeploy"
        echo ""
        echo "  Option 3: Install Vercel CLI and run 'vercel --prod'"
        echo ""
    fi

    wait_for_enter

    if ! confirm "Has the application been redeployed?"; then
        print_warning "Please redeploy before continuing."
        exit 1
    fi
}

step_verify_live() {
    print_step "Verify Live Mode Configuration"

    echo "Verifying live mode is working..."
    echo ""

    # Wait for deployment
    echo "Waiting 10 seconds for deployment to propagate..."
    sleep 10

    # Check endpoint
    echo ""
    echo "Checking endpoint..."

    local response
    response=$(curl -s "${PRODUCTION_URL}${WEBHOOK_PATH}" 2>/dev/null) || {
        print_error "Could not connect to endpoint"
        exit 1
    }

    if command_exists jq; then
        local configured
        configured=$(echo "$response" | jq -r '.configured' 2>/dev/null)

        if [ "$configured" = "true" ]; then
            print_success "Endpoint is configured with new secrets"
        else
            print_error "Endpoint configuration failed"
            exit 1
        fi
    fi

    echo ""
    echo "Send a test webhook from Stripe Dashboard (live mode):"
    echo ""
    echo "  1. Go to: https://dashboard.stripe.com/webhooks"
    echo "  2. Click on your endpoint"
    echo "  3. Click 'Send test webhook'"
    echo "  4. Select 'checkout.session.completed'"
    echo "  5. Click 'Send test webhook'"
    echo "  6. Verify it shows 'Succeeded'"
    echo ""

    wait_for_enter

    if ! confirm "Did the test webhook succeed?"; then
        echo ""
        print_error "Test webhook failed. Troubleshooting steps:"
        echo ""
        echo "  1. Check Vercel function logs for errors"
        echo "  2. Verify webhook signing secret is correct"
        echo "  3. Ensure endpoint URL matches exactly"
        echo "  4. Check for any 401 or 500 errors"
        echo ""

        if confirm "Would you like to rollback to test mode?"; then
            rollback_instructions
        fi
        exit 1
    fi

    print_success "Live mode webhook is working!"
}

step_monitor() {
    print_step "Post-Go-Live Monitoring"

    echo "Live mode is now active! Here's what to monitor:"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Immediate (First 24 hours):"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "  • Stripe Dashboard > Webhooks > Your endpoint"
    echo "    Watch for failed deliveries"
    echo ""
    echo "  • Vercel Dashboard > Logs"
    echo "    Filter by /api/stripe-webhook"
    echo "    Watch for errors"
    echo ""
    echo "  • First real payment"
    echo "    Verify webhook received and processed"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Ongoing:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "  • Weekly: Review webhook success rate"
    echo "  • Monthly: Check for any failed webhooks"
    echo "  • Quarterly: Rotate webhook signing secret"
    echo ""

    wait_for_enter
}

rollback_instructions() {
    echo ""
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}ROLLBACK INSTRUCTIONS${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "To rollback to test mode:"
    echo ""
    echo "  1. Disable live webhook endpoint in Stripe Dashboard"
    echo "     (Webhooks > Your endpoint > ... > Disable)"
    echo ""
    echo "  2. Update STRIPE_WEBHOOK_SECRET to test mode secret"

    if command_exists doppler; then
        echo "     doppler secrets set STRIPE_WEBHOOK_SECRET=\"whsec_test_xxx\""
    else
        echo "     (Update in Vercel Dashboard)"
    fi

    echo ""
    echo "  3. Redeploy"
    echo "     vercel --prod"
    echo ""
    echo "  4. Verify test mode is working"
    echo "     curl ${PRODUCTION_URL}${WEBHOOK_PATH}"
    echo ""
}

complete_transition() {
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                                                              ║${NC}"
    echo -e "${GREEN}║       🎉 Transition Complete!                                ║${NC}"
    echo -e "${GREEN}║                                                              ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo "Your Stripe webhook integration is now in LIVE mode."
    echo ""
    echo "Summary:"
    echo "  ✓ Live webhook endpoint created"
    echo "  ✓ Environment variables updated"
    echo "  ✓ Application redeployed"
    echo "  ✓ Live webhook verified"
    echo ""
    echo "Production endpoint: ${PRODUCTION_URL}${WEBHOOK_PATH}"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Quick Reference:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "  Stripe Dashboard (Live):"
    echo "    https://dashboard.stripe.com/webhooks"
    echo ""
    echo "  Vercel Logs:"
    echo "    https://vercel.com/razs-projects-29d4f2e6/david-ortiz-portfolio/logs"
    echo ""
    echo "  Rollback (if needed):"
    echo "    ./scripts/stripe-test-to-live.sh rollback"
    echo ""

    # Save completion timestamp
    echo "Transition completed: $(date)" >> .stripe-live-transition.log 2>/dev/null || true
}

# =============================================================================
# Main
# =============================================================================

main() {
    local command="${1:-}"

    case "$command" in
        rollback)
            rollback_instructions
            exit 0
            ;;
        "")
            step_introduction
            step_verify_test_mode
            step_stripe_live_mode
            step_update_secrets
            step_redeploy
            step_verify_live
            step_monitor
            complete_transition
            ;;
        *)
            echo "Usage: $0 [rollback]"
            echo ""
            echo "Run without arguments for interactive transition guide."
            echo "Run with 'rollback' for rollback instructions."
            exit 1
            ;;
    esac
}

main "$@"
