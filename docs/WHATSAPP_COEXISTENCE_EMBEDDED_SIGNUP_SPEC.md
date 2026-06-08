# WhatsApp 779 Coexistence Embedded Signup Spec

## Purpose

Prepare the safe path for connecting David's real WhatsApp Business number, `+1 779 212 4220`, to the official WhatsApp Cloud API without breaking the WhatsApp Business mobile app workflow.

This is intentionally a planning and build spec. Do not run a number migration, takeover, or deregistration flow from this document.

## Hard stop warning

Do not click any dashboard link or wizard action that says or implies:

- disconnect it from the existing account
- migrate this number
- transfer this number
- remove this number from WhatsApp Business
- deregister this number
- free up this number first
- this number will stop working in the WhatsApp Business app

Those labels indicate the classic takeover/migration path, not coexistence. That path can break the daily business workflow by removing `779` from the WhatsApp Business app.

## Current verified architecture

- Production site: `https://davidtiz.com`
- Privacy URL: `https://davidtiz.com/privacy`
- Meta app: `Dizera Connect API`
- Meta app ID: `1758499281981568`
- Business portfolio ID: `945482735193509`
- Test WhatsApp Business Account ID: `1557177959449302`
- Test phone number ID: `1132688973264321`
- Facebook Login for Business configuration ID: `1536935691425567`
- App Domain: `davidtiz.com`
- Website platform Site URL: `https://davidtiz.com/`
- Valid OAuth Redirect URI: `https://davidtiz.com/api/meta/embedded-signup/callback`
- n8n URL: `https://n8n-983174953258.us-east4.run.app`
- Current official lane: Meta test number to Vercel webhook to n8n Brain v1
- Current real-number lane: WhatsApp Business app plus local bridge/MCP visibility

The production webhook and n8n Brain already support:

- Meta webhook signature validation
- Vercel to n8n forwarding with `N8N_FORWARD_SECRET`
- inbound parsing
- status-event filtering
- LLM classification
- lead storage
- LLM reply drafting
- Gmail approval
- Cloud API send only after approval

The dormant coexistence launcher is deployed at:

- `https://davidtiz.com/admin/whatsapp-coexistence?key=<WHATSAPP_COEXISTENCE_ADMIN_KEY>`
- `https://davidtiz.com/api/meta/embedded-signup/status`
- `https://davidtiz.com/api/meta/embedded-signup/callback`

## Goal

Use the official Meta coexistence path so `779` can remain active in the WhatsApp Business app while also becoming available to the WhatsApp Cloud API.

Live attempt note: Meta currently blocks this app from running Embedded Signup with the message that Embedded Signup is only available for BSPs or TPs. Treat Embedded Signup as parked until David has a BSP/TP path or Meta exposes a direct first-party coexistence path for this business.

The desired final state:

- David keeps using the WhatsApp Business app normally.
- Inbound messages to `779` reach the existing Vercel webhook.
- n8n Brain v1 creates a draft and waits for approval.
- No outbound automation happens without an explicit approve click.
- Approved replies can be sent through the official Cloud API for `779`.

## Non-goals

- Do not replace the mobile WhatsApp Business app.
- Do not build cold outbound automation.
- Do not bypass the approval gate.
- Do not change the current production webhook until coexistence succeeds.
- Do not change the local bridge/MCP lane unless it becomes redundant later.

## Preconditions

- Meta app remains published.
- `https://davidtiz.com/privacy` remains live.
- Webhook callback remains subscribed to `messages`.
- System user token remains stored outside the repo.
- n8n Cloud Run remains healthy.
- n8n Brain v1 remains active.
- `779` has normal recent activity in the WhatsApp Business app.
- David has admin access to the business portfolio and Meta app.

## Correct entry path

Use Meta Embedded Signup configured for WhatsApp Business Platform and coexistence, not the classic "add phone number" or "take over existing number" wizard.

The exact Meta UI labels can change. Before clicking through with `779`, verify that the screen explicitly describes coexistence or keeping the WhatsApp Business app connected.

If the screen says the number must be disconnected, migrated, transferred, deregistered, or removed first, stop.

## Mini-project design

Build a private operator-only signup launcher and callback handler.

### Suggested files

- `app/admin/whatsapp-coexistence/page.tsx`
- `app/admin/whatsapp-coexistence/launcher.tsx`
- `app/api/meta/embedded-signup/callback/route.ts`
- `app/api/meta/embedded-signup/status/route.ts`
- `lib/meta-embedded-signup.ts`
- `docs/WHATSAPP_COEXISTENCE_RUNBOOK.md`

### Required environment variables

- `WHATSAPP_COEXISTENCE_ADMIN_KEY`
- `META_APP_ID=1758499281981568`
- `META_BUSINESS_ID=945482735193509`
- `META_EMBEDDED_SIGNUP_CONFIG_ID=1536935691425567`
- `META_EMBEDDED_SIGNUP_REDIRECT_URI=https://davidtiz.com/api/meta/embedded-signup/callback`
- `META_GRAPH_VERSION=v25.0`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_WEBHOOK_VERIFY_TOKEN`
- `WHATSAPP_APP_SECRET`

Do not expose `WHATSAPP_ACCESS_TOKEN` or `WHATSAPP_APP_SECRET` to client code.

The first implementation is intentionally record-only. It does not exchange the returned OAuth code for a token. Add server-side token exchange only after the UI proves this is coexistence and `779` remains active in the WhatsApp Business app.

### Launcher route behavior

- Require operator authentication or a one-time admin secret.
- Generate a random `state` value.
- Store the `state` server-side or in a signed HTTP-only cookie.
- Launch Meta Embedded Signup using the app ID, config ID, redirect URI, and state.
- Show a hard warning before launch that the user must stop if Meta presents takeover language.

### Callback behavior

- Validate `state`.
- Exchange the returned code server-side if Meta returns an OAuth code.
- Capture returned WABA and phone-number identifiers.
- Store only identifiers, timestamps, and status.
- Do not send messages during callback.
- Do not update production env automatically.

### Status route behavior

- Show the latest captured identifiers and status.
- Show whether `779` is still expected to remain active in WhatsApp Business app.
- Show the manual post-success commands needed to update production env.

## Implementation sequence

1. Re-check current official Meta docs and dashboard labels for WhatsApp Business app coexistence and Embedded Signup.
2. Create or confirm the Embedded Signup configuration in the Meta app dashboard.
3. Add the private launcher and callback routes.
4. Deploy the launcher.
5. Test the launcher using a non-production/test path if Meta allows it.
6. Open the launcher with David present.
7. Stop if any takeover/migration wording appears.
8. Continue only if Meta explicitly presents coexistence or keeping the app connected.
9. After success, record the returned WABA ID and phone number ID.
10. Update production secrets manually.
11. Send one inbound message to `779`.
12. Confirm Vercel receives the webhook.
13. Confirm n8n Brain reaches the approval wait state.
14. Approve one reply.
15. Confirm the approved reply lands and the WhatsApp Business app still works.

## Production env update shape

These are examples only. Do not paste secrets into chat.

```bash
vercel env add WHATSAPP_PHONE_NUMBER_ID production
vercel env add WHATSAPP_BUSINESS_ACCOUNT_ID production
vercel env add WHATSAPP_ACCESS_TOKEN production
vercel --prod
```

If Doppler remains the source of truth:

```bash
doppler secrets set WHATSAPP_PHONE_NUMBER_ID --project david-ortiz-portfolio --config dev_personal
doppler secrets set WHATSAPP_BUSINESS_ACCOUNT_ID --project david-ortiz-portfolio --config dev_personal
doppler secrets set WHATSAPP_ACCESS_TOKEN --project david-ortiz-portfolio --config dev_personal
```

## Verification checklist

- `779` still sends and receives inside the WhatsApp Business app.
- Meta dashboard shows `779` connected through coexistence, not migrated away from the app.
- Vercel logs show `WhatsApp webhook received` for a real inbound `779` message.
- n8n execution history shows Brain v1 triggered by the real inbound event.
- Approval email arrives.
- Reject link ends without sending.
- Approve link sends only once.
- Approved reply appears in the WhatsApp conversation.
- Lead row is inserted in Postgres.
- No automatic send node is reachable without approval.

## v2 guardrails before real volume

- Add inbound deduplication by Meta `wamid`.
- Add daily send cap.
- Add quality-rating monitor.
- Add template-only first-touch path after production template approval.
- Add explicit business-hours handling.
- Add per-contact suppression notes.

## Decision rule

If Meta offers coexistence, proceed through the private launcher and keep `779` active in the WhatsApp Business app.

If Meta only offers takeover/migration, do not proceed. Keep Lane A for the real number and Lane B for the official test-number Brain until coexistence is available.
