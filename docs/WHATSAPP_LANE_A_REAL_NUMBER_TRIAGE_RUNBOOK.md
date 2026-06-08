# WhatsApp Lane A Real-Number Triage Runbook

## Purpose

Use David's real WhatsApp Business number, `+1 779 212 4220`, safely while Meta's official Embedded Signup/coexistence path is blocked by BSP/TP eligibility.

Lane A is the live business lane today:

- Real number: `779`
- Client surface: WhatsApp Business app
- Local automation surface: local WhatsApp bridge/MCP
- Storage: local SQLite under `~/Git-Projects/whatsapp-mcp/whatsapp-bridge/store/`
- LaunchAgent: `com.davidtiz.whatsapp-bridge`

Lane B remains the official Cloud API proving lane:

- Meta test number
- Vercel webhook
- n8n Brain
- Gmail approval
- Cloud API send

Do not confuse these lanes. Lane A is the only lane that sees real customer messages to `779` today.

## Current blocker for Lane B real-number cutover

Meta Embedded Signup was wired and tested, but Meta blocked the flow with:

```text
Embedded signup is only available for BSPs or TPs.
```

Until BSP/TP eligibility changes, keep `779` on Lane A.

## Start Lane A

Lane A is installed as a macOS LaunchAgent and should start automatically when David logs in.

From the install kit directory:

```bash
cd ~/Git-Projects/Upwork-Hourly-Dec11/whatsapp_mcp_setup
bash start_whatsapp_bridge.sh --background
```

If running manually:

```bash
cd ~/Git-Projects/whatsapp-mcp/whatsapp-bridge
./whatsapp-bridge
```

The bridge exposes:

- `POST http://127.0.0.1:8080/api/send`
- `POST http://127.0.0.1:8080/api/download`

The bridge stores messages locally:

- `~/Git-Projects/whatsapp-mcp/whatsapp-bridge/store/messages.db`
- `~/Git-Projects/whatsapp-mcp/whatsapp-bridge/store/whatsapp.db`

LaunchAgent logs:

- `~/Library/Logs/whatsapp-bridge.log`
- `~/Library/Logs/whatsapp-bridge.err.log`

## Check bridge health

```bash
lsof -nP -iTCP:8080 -sTCP:LISTEN
pgrep -af whatsapp-bridge
```

If port `8080` is already in use by the bridge, do not start a second copy.

Use the repo health check for the full safety sweep:

```bash
cd ~/Git-Projects/david-ortiz-portfolio
bash scripts/whatsapp_lane_a_health_check.sh
```

This check fails if the bridge is not listening on `127.0.0.1:8080`, if the send endpoint does not reject an empty payload, or if the local message database is unreadable.

A Codex local automation named `WhatsApp Lane A health check` now runs this check daily in the morning. Do not create a duplicate; update that automation if the script path or schedule needs to change.

## Inspect recent inbound messages

Recent messages, newest first:

```bash
sqlite3 -header -column ~/Git-Projects/whatsapp-mcp/whatsapp-bridge/store/messages.db "
SELECT
  datetime(timestamp) AS time,
  chat_jid,
  sender,
  CASE is_from_me WHEN 1 THEN 'me' ELSE 'them' END AS direction,
  substr(replace(content, char(10), ' '), 1, 120) AS preview,
  media_type,
  filename
FROM messages
ORDER BY timestamp DESC
LIMIT 50;
"
```

Inbound only:

```bash
sqlite3 -header -column ~/Git-Projects/whatsapp-mcp/whatsapp-bridge/store/messages.db "
SELECT
  datetime(timestamp) AS time,
  chat_jid,
  sender,
  substr(replace(content, char(10), ' '), 1, 160) AS preview,
  media_type,
  filename
FROM messages
WHERE is_from_me = 0
ORDER BY timestamp DESC
LIMIT 50;
"
```

Active chats:

```bash
sqlite3 -header -column ~/Git-Projects/whatsapp-mcp/whatsapp-bridge/store/messages.db "
SELECT
  datetime(last_message_time) AS last_seen,
  jid,
  name
FROM chats
ORDER BY last_message_time DESC
LIMIT 50;
"
```

## Daily triage workflow

1. Start or confirm the bridge.
2. Pull recent inbound messages.
3. Group messages by `chat_jid`.
4. Classify each active thread:
   - `lead`: asking for website, automation, AI workflow, quote, help, service.
   - `client`: existing project/client coordination.
   - `personal`: family/friend/non-business.
   - `noise`: tests, read receipts, low-signal, accidental messages.
5. Draft replies only; do not send automatically.
6. David approves each exact recipient and exact message.
7. Send approved replies through the WhatsApp Business app or through `/api/send`.
8. Record meaningful leads in the working lead tracker or Postgres/n8n lane if needed.

## Safe send command

Only use after David approves the exact recipient and text:

```bash
curl -i -X POST http://127.0.0.1:8080/api/send \
  -H "Content-Type: application/json" \
  -d '{"recipient":"17792124220","message":"Approved message text here"}'
```

Rules:

- Use phone numbers with country code and no symbols when possible.
- Do not batch-send.
- Do not cold-outbound more than a few contacts per day.
- Prefer replying to people who already messaged first.
- If a message has legal, medical, payment, or high-stakes content, draft only and review manually.

## Media download

If a message has media and needs inspection:

```bash
curl -i -X POST http://127.0.0.1:8080/api/download \
  -H "Content-Type: application/json" \
  -d '{"message_id":"<message-id>","chat_jid":"<chat-jid>"}'
```

The bridge requires both message ID and chat JID.

## Guardrails

- Human approval before every send.
- No scheduler that sends messages without review.
- No scraping or exporting full message history unless David explicitly asks.
- Keep message content local unless it is needed for a specific approved workflow.
- Do not use the classic Meta migration/takeover wizard for `779`.
- Do not treat Lane B test-number success as real-number production readiness.

## Recommended daily prompt

Use this with Codex/Claude after the bridge is running:

```text
Run my WhatsApp Lane A triage.

Use the local bridge message store only. Summarize active inbound threads from the last 24 hours, classify each as lead/client/personal/noise, identify urgent replies, and draft responses. Do not send anything. For each proposed reply, show the exact recipient, exact draft, and why it should be sent.
```

## Recommended follow-up prompt for approved sends

```text
Send only the replies I approve below through the local WhatsApp bridge. Before sending each one, restate the recipient and message. Stop if any recipient or message is ambiguous.
```

## When to revisit Lane B

Revisit official Cloud API cutover for `779` only if one of these becomes true:

- Meta grants BSP/TP eligibility.
- A qualified BSP supports WhatsApp Business App coexistence for this number.
- David intentionally decides to migrate `779` off the WhatsApp Business app.
- Meta exposes a first-party coexistence path that does not require BSP/TP status.
