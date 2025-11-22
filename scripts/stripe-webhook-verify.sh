#!/bin/bash

# =============================================================================
# Stripe Webhook Verification Script
# =============================================================================
# This script helps verify Stripe webhook configuration and test the transition
# from test mode to live mode.
#
# Usage:
#   ./scripts/stripe-webhook-verify.sh [command] [options]
#
# Commands:
#   check-local     - Verify local development setup
#   check-staging   - Verify staging deployment
#   check-production - Verify production deployment
#   test-events     - Trigger test events via Stripe CLI
#   compare-config  - Compare test vs live webhook configuration
#
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
LOCAL_URL="http://localhost:3000"
STAGING_URL="${STAGING_URL:-}"
PRODUCTION_URL="https://cs-learning.me"
WEBHOOK_PATH="/api/stripe-webhook"

# Helper functions
print_header() {
    echo ""
    echo -e "${BLUE}==================================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}==================================================${NC}"
    echo ""
}

print_success() {
    echo -e "${GREEN}[PASS]${NC} $1"
}

print_error() {
    echo -e "${RED}[FAIL]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

# Check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
check_prerequisites() {
    print_header "Checking Prerequisites"

    local all_good=true

    # Check curl
    if command_exists curl; then
        print_success "curl is installed"
    else
        print_error "curl is not installed"
        all_good=false
    fi

    # Check jq (for JSON parsing)
    if command_exists jq; then
        print_success "jq is installed"
    else
        print_warning "jq is not installed (some features may not work)"
    fi

    # Check Stripe CLI
    if command_exists stripe; then
        print_success "Stripe CLI is installed"

        # Check if authenticated
        if stripe config --list 2>/dev/null | grep -q "account_id"; then
            print_success "Stripe CLI is authenticated"
        else
            print_warning "Stripe CLI may not be authenticated. Run 'stripe login'"
        fi
    else
        print_warning "Stripe CLI is not installed (required for test events)"
        echo "  Install with: brew install stripe/stripe-cli/stripe"
    fi

    # Check Doppler (optional)
    if command_exists doppler; then
        print_success "Doppler CLI is installed"
    else
        print_info "Doppler CLI is not installed (optional)"
    fi

    if [ "$all_good" = false ]; then
        echo ""
        print_error "Some prerequisites are missing. Please install them and try again."
        exit 1
    fi
}

# Check webhook endpoint health
check_endpoint_health() {
    local url="$1"
    local name="$2"

    print_header "Checking $name Webhook Endpoint"

    echo "URL: ${url}${WEBHOOK_PATH}"
    echo ""

    # Make request
    local response
    local http_code

    response=$(curl -s -w "\n%{http_code}" "${url}${WEBHOOK_PATH}" 2>/dev/null) || {
        print_error "Failed to connect to ${url}${WEBHOOK_PATH}"
        return 1
    }

    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    # Check HTTP status
    if [ "$http_code" = "200" ]; then
        print_success "Endpoint returned 200 OK"
    else
        print_error "Endpoint returned HTTP $http_code"
        return 1
    fi

    # Parse response if jq is available
    if command_exists jq; then
        local configured
        configured=$(echo "$body" | jq -r '.configured' 2>/dev/null)

        if [ "$configured" = "true" ]; then
            print_success "Webhook is configured (STRIPE_WEBHOOK_SECRET is set)"
        else
            print_error "Webhook is NOT configured (STRIPE_WEBHOOK_SECRET is missing)"
            return 1
        fi

        # Show supported events
        echo ""
        echo "Supported events:"
        echo "$body" | jq -r '.supportedEvents[]' 2>/dev/null | while read -r event; do
            echo "  - $event"
        done
    else
        echo "Response: $body"
    fi

    return 0
}

# Check local development setup
check_local() {
    print_header "Verifying Local Development Setup"

    # Check if local server is running
    if curl -s "${LOCAL_URL}" >/dev/null 2>&1; then
        print_success "Local development server is running"
    else
        print_error "Local development server is not running"
        echo "  Start with: npm run dev"
        echo "  Or with Doppler: doppler run -- npm run dev"
        return 1
    fi

    # Check endpoint
    check_endpoint_health "$LOCAL_URL" "Local"

    # Check environment variables
    echo ""
    print_info "Environment Variable Check:"

    if [ -n "$STRIPE_WEBHOOK_SECRET" ]; then
        print_success "STRIPE_WEBHOOK_SECRET is set in environment"
    elif [ -f ".env.local" ] && grep -q "STRIPE_WEBHOOK_SECRET" .env.local; then
        print_success "STRIPE_WEBHOOK_SECRET found in .env.local"
    elif command_exists doppler; then
        if doppler secrets get STRIPE_WEBHOOK_SECRET --plain >/dev/null 2>&1; then
            print_success "STRIPE_WEBHOOK_SECRET found in Doppler"
        else
            print_warning "STRIPE_WEBHOOK_SECRET not found in Doppler"
        fi
    else
        print_warning "Could not verify STRIPE_WEBHOOK_SECRET"
    fi
}

# Check staging deployment
check_staging() {
    if [ -z "$STAGING_URL" ]; then
        print_error "STAGING_URL environment variable not set"
        echo "  Usage: STAGING_URL=https://your-staging.vercel.app $0 check-staging"
        exit 1
    fi

    check_endpoint_health "$STAGING_URL" "Staging"
}

# Check production deployment
check_production() {
    check_endpoint_health "$PRODUCTION_URL" "Production"
}

# Trigger test events
test_events() {
    print_header "Triggering Test Events via Stripe CLI"

    if ! command_exists stripe; then
        print_error "Stripe CLI is required for this command"
        echo "  Install with: brew install stripe/stripe-cli/stripe"
        exit 1
    fi

    local target_url="${1:-$LOCAL_URL}"

    echo "Target URL: ${target_url}${WEBHOOK_PATH}"
    echo ""

    # Check if webhook forwarding is needed
    if [[ "$target_url" == *"localhost"* ]]; then
        print_info "For local testing, you need to run webhook forwarding in another terminal:"
        echo ""
        echo "  stripe listen --forward-to ${target_url}${WEBHOOK_PATH}"
        echo ""
        read -p "Press Enter when webhook forwarding is running..."
    fi

    # Test events to trigger
    local events=(
        "checkout.session.completed"
        "payment_intent.succeeded"
        "payment_intent.payment_failed"
        "customer.subscription.created"
        "invoice.paid"
    )

    echo ""
    print_info "Triggering test events..."
    echo ""

    for event in "${events[@]}"; do
        echo -n "  Triggering $event... "
        if stripe trigger "$event" 2>/dev/null; then
            echo -e "${GREEN}OK${NC}"
        else
            echo -e "${RED}FAILED${NC}"
        fi
        sleep 1
    done

    echo ""
    print_info "Check your server logs and Stripe CLI output for event delivery status"
}

# Compare test vs live configuration
compare_config() {
    print_header "Comparing Test vs Live Webhook Configuration"

    if ! command_exists stripe; then
        print_error "Stripe CLI is required for this command"
        exit 1
    fi

    echo "Fetching webhook endpoints from Stripe..."
    echo ""

    # Get test mode endpoints
    print_info "Test Mode Webhooks:"
    stripe webhook_endpoints list --limit 5 2>/dev/null || {
        print_warning "Could not fetch test mode webhooks"
    }

    echo ""

    # Get live mode endpoints (requires live mode auth)
    print_info "Live Mode Webhooks:"
    echo "  (Switch to live mode with: stripe login --live)"
    echo "  (Then run: stripe webhook_endpoints list)"

    echo ""
    print_header "Configuration Comparison Checklist"

    cat << 'EOF'
Before going live, verify the following match between test and live:

[ ] Webhook endpoint URL is correct
    - Test: https://your-staging-url.vercel.app/api/stripe-webhook
    - Live: https://cs-learning.me/api/stripe-webhook

[ ] All required events are selected:
    - checkout.session.completed
    - checkout.session.expired
    - payment_intent.succeeded
    - payment_intent.payment_failed
    - customer.subscription.created
    - customer.subscription.updated
    - customer.subscription.deleted
    - invoice.paid
    - invoice.payment_failed

[ ] Webhook signing secrets are different:
    - Test secret starts with: whsec_test_...
    - Live secret starts with: whsec_live_...

[ ] Environment variables updated for production:
    - STRIPE_WEBHOOK_SECRET contains live secret
    - STRIPE_SECRET_KEY contains sk_live_... (if used)

[ ] Code is identical between environments
    - Same event handlers
    - Same error handling
    - Same logging

EOF
}

# Show usage
show_usage() {
    cat << EOF
Stripe Webhook Verification Script

Usage: $0 <command> [options]

Commands:
  check-local       Verify local development setup
  check-staging     Verify staging deployment (requires STAGING_URL env var)
  check-production  Verify production deployment
  test-events       Trigger test events via Stripe CLI
  compare-config    Compare test vs live webhook configuration
  help              Show this help message

Examples:
  $0 check-local
  STAGING_URL=https://preview.vercel.app $0 check-staging
  $0 check-production
  $0 test-events
  $0 compare-config

Environment Variables:
  STAGING_URL       URL of staging deployment (for check-staging)

EOF
}

# Main command handler
main() {
    local command="${1:-help}"

    case "$command" in
        check-local)
            check_prerequisites
            check_local
            ;;
        check-staging)
            check_prerequisites
            check_staging
            ;;
        check-production)
            check_prerequisites
            check_production
            ;;
        test-events)
            check_prerequisites
            test_events "${2:-}"
            ;;
        compare-config)
            check_prerequisites
            compare_config
            ;;
        help|--help|-h)
            show_usage
            ;;
        *)
            print_error "Unknown command: $command"
            echo ""
            show_usage
            exit 1
            ;;
    esac
}

# Run main
main "$@"
