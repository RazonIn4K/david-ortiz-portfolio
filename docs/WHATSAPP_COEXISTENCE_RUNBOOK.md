# WhatsApp 779 Coexistence Runbook

## Current safe state

The real number `+1 779 212 4220` stays on the WhatsApp Business app. Do not move it through a takeover or migration wizard.

The official Cloud API lane remains active through the Meta test number and the n8n Brain approval workflow.

## Added dormant tooling

The repo now contains a protected launcher scaffold:

- `/admin/whatsapp-coexistence?key=<WHATSAPP_COEXISTENCE_ADMIN_KEY>`
- `/api/meta/embedded-signup/callback`
- `/api/meta/embedded-signup/status?key=<WHATSAPP_COEXISTENCE_ADMIN_KEY>`

The launcher is deployed on production and configured.

Current Facebook Login for Business configuration:

- App ID: `1758499281981568`
- Business ID: `945482735193509`
- Configuration ID: `1536935691425567`
- Redirect URI: `https://davidtiz.com/api/meta/embedded-signup/callback`
- App Domain: `davidtiz.com`
- Website platform Site URL: `https://davidtiz.com/`
- Valid OAuth Redirect URI: `https://davidtiz.com/api/meta/embedded-signup/callback`

## 2026-06-04 live attempt result

The launcher reached Meta's Facebook Login for Business dialog after adding the app domain, website platform, and OAuth redirect URI.

Meta then blocked the flow with:

```text
It looks like this app isn't available
Embedded signup is only available for BSPs or TPs.
```

Meaning: the Embedded Signup launcher/config is wired correctly enough to reach Meta, but this app/business is not currently eligible to run Embedded Signup because it is not enrolled as a Business Solution Provider or Tech Provider.

Do not keep retrying this flow until the app/business has a BSP/TP path, or until Meta exposes a first-party coexistence path for this business directly.

Security cleanup completed after testing:

- `WHATSAPP_COEXISTENCE_ADMIN_KEY` was rotated in Doppler and Vercel Production.
- Production was redeployed after the rotation.
- Old test URL now returns `404`.
- New key returns `200` and `configured: true`.
- The launcher remains dormant and should not be used again until BSP/TP eligibility changes.

## Required environment variables

Set these only when you are ready to test the safe Embedded Signup path:

```bash
WHATSAPP_COEXISTENCE_ADMIN_KEY=<long random operator key>
META_APP_ID=1758499281981568
META_BUSINESS_ID=945482735193509
META_EMBEDDED_SIGNUP_CONFIG_ID=1536935691425567
META_GRAPH_VERSION=v25.0
META_EMBEDDED_SIGNUP_REDIRECT_URI=https://davidtiz.com/api/meta/embedded-signup/callback
```

The operator key is stored in Doppler:

```bash
doppler secrets get WHATSAPP_COEXISTENCE_ADMIN_KEY \
  --project david-ortiz-portfolio \
  --config dev_personal \
  --plain | pbcopy
```

Existing secrets remain required for the production webhook and n8n lane:

```bash
WHATSAPP_ACCESS_TOKEN=<stored outside repo>
WHATSAPP_APP_SECRET=<stored outside repo>
WHATSAPP_WEBHOOK_VERIFY_TOKEN=<stored outside repo>
N8N_WEBHOOK_URL=<stored outside repo>
N8N_FORWARD_SECRET=<stored outside repo>
```

## Safe test sequence

1. Confirm the app/business is eligible for Embedded Signup as a BSP or TP, or confirm Meta has exposed a direct first-party coexistence path for this business.
2. Open `/api/meta/embedded-signup/status?key=<key>` and confirm `configured: true`.
3. Open `/admin/whatsapp-coexistence?key=<key>`.
4. Click the launcher only with David watching the wording.
5. Stop if Meta says disconnect, migrate, transfer, remove, deregister, or free up the number.
6. Stop if Meta says Embedded Signup is only available for BSPs or TPs.
7. Continue only if Meta explicitly offers coexistence or keeping the WhatsApp Business app connected.
8. After completion, confirm `779` still works in the WhatsApp Business app.
9. Confirm the callback captured the returned WABA ID and phone number ID.
10. Update production identifiers manually only after the app remains connected.
11. Send one inbound message to `779`.
12. Confirm Vercel receives the webhook and n8n Brain reaches the approval wait state.
13. Approve one reply and confirm it lands once.

## What the launcher does not do

- It does not deregister `779`.
- It does not migrate `779`.
- It does not exchange the returned authorization code for a token.
- It does not store long-lived tokens.
- It does not update Vercel or Doppler env values.
- It does not send messages.

## If the safe path is not available

Leave `779` on the WhatsApp Business app and keep using the current two-lane setup:

- Lane A: real-number WhatsApp Business app plus local bridge/MCP.
- Lane B: official Cloud API test number plus Vercel and n8n Brain.

Do not sacrifice the real business inbox just to force official API access.

Practical next options:

- Keep Lane A for the real number and use it for live leads today.
- Keep Lane B as the official Cloud API/n8n proving lane.
- If full official automation for `779` is required, evaluate becoming a Meta Tech Provider or using a qualified BSP that supports WhatsApp Business App coexistence.
- Do not use the classic migration/takeover wizard unless David explicitly decides to move `779` off the WhatsApp Business app.

Lane A operating instructions now live in:

- `docs/WHATSAPP_LANE_A_REAL_NUMBER_TRIAGE_RUNBOOK.md`
