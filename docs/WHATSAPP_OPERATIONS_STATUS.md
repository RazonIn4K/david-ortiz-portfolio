# WhatsApp Operations Status

Last updated: 2026-06-04

## Active lanes

### Lane A: real 779 number

Purpose: live business messages for `+1 779 212 4220`.

Runtime:

- WhatsApp Business app on phone
- Local WhatsApp bridge on the Mac
- Local MCP access through the bridge
- Local SQLite message/session stores

Current state:

- Bridge installed as LaunchAgent: `com.davidtiz.whatsapp-bridge`
- LaunchAgent plist: `~/Library/LaunchAgents/com.davidtiz.whatsapp-bridge.plist`
- Program: `~/Git-Projects/whatsapp-mcp/whatsapp-bridge/whatsapp-bridge`
- Working directory: `~/Git-Projects/whatsapp-mcp/whatsapp-bridge`
- REST bind: `127.0.0.1:8080`
- Logs:
  - `~/Library/Logs/whatsapp-bridge.log`
  - `~/Library/Logs/whatsapp-bridge.err.log`
- Health check: `scripts/whatsapp_lane_a_health_check.sh`
- Daily Codex automation: `WhatsApp Lane A health check`

Databases:

- Messages: `~/Git-Projects/whatsapp-mcp/whatsapp-bridge/store/messages.db`
- WhatsApp session: `~/Git-Projects/whatsapp-mcp/whatsapp-bridge/store/whatsapp.db`

Security posture:

- REST API is loopback-only.
- `/api/send` can send from the real business number, so it must never bind to `*:8080` or `0.0.0.0:8080`.
- Human approval remains required before every send.

Useful commands:

```bash
launchctl print gui/$(id -u)/com.davidtiz.whatsapp-bridge
lsof -nP -iTCP:8080 -sTCP:LISTEN
tail -f ~/Library/Logs/whatsapp-bridge.log
cd ~/Git-Projects/david-ortiz-portfolio && ./scripts/whatsapp_lane_a_health_check.sh
```

To stop the LaunchAgent:

```bash
launchctl bootout gui/$(id -u) ~/Library/LaunchAgents/com.davidtiz.whatsapp-bridge.plist
```

To start it again:

```bash
launchctl bootstrap gui/$(id -u) ~/Library/LaunchAgents/com.davidtiz.whatsapp-bridge.plist
launchctl kickstart -k gui/$(id -u)/com.davidtiz.whatsapp-bridge
```

### Lane B: official Cloud API proving lane

Purpose: official Meta Cloud API testing and n8n Brain workflow.

Runtime:

- Meta test number
- Vercel webhook
- n8n on Cloud Run
- Cloud SQL Postgres
- Gmail approval

Current state:

- n8n URL: `https://n8n-983174953258.us-east4.run.app`
- Vercel production: `https://davidtiz.com`
- Webhook: `https://davidtiz.com/api/whatsapp/webhook`
- Meta app: `Dizera Connect API`
- Meta app ID: `1758499281981568`
- Test WABA ID: `1557177959449302`
- Test phone number ID: `1132688973264321`

Database:

- Cloud SQL instance: `n8n-db`
- Project: `dizera-n8n-prod-1758`
- Connection name: `dizera-n8n-prod-1758:us-east4:n8n-db`
- Engine: Postgres 16
- Database used by n8n: `n8n`
- Business table: `leads`

Security posture:

- Backups enabled daily at `06:00`.
- Cloud SQL SSL mode: `ENCRYPTED_ONLY`.
- Cloud Run uses the Cloud SQL connector/socket.
- n8n health remained `200` after SSL hardening.
- Stored n8n credentials depend on `N8N_ENCRYPTION_KEY`.

Useful commands:

```bash
gcloud sql instances describe n8n-db \
  --project=dizera-n8n-prod-1758 \
  --format='json(state,settings.ipConfiguration.sslMode,settings.backupConfiguration)'
```

```bash
curl -i https://n8n-983174953258.us-east4.run.app/health
```

```bash
export PGPASSWORD="$(gcloud secrets versions access latest \
  --secret=n8n-db-password \
  --project=dizera-n8n-prod-1758)"

gcloud sql connect n8n-db \
  --user=n8n-user \
  --database=n8n \
  --project=dizera-n8n-prod-1758 \
  --quiet <<< "SELECT id,name,category,lang,intent,received_at FROM leads ORDER BY created_at DESC LIMIT 20;"

unset PGPASSWORD
```

## Current blocked path

The Meta Embedded Signup/coexistence path is blocked for this app/business:

```text
Embedded signup is only available for BSPs or TPs.
```

Do not retry the Embedded Signup flow until one of these changes:

- Meta grants BSP/Tech Provider eligibility.
- A qualified BSP supports WhatsApp Business App coexistence for this number.
- Meta exposes a direct first-party coexistence path.
- David intentionally decides to migrate `779` off the WhatsApp Business app.

Do not use the classic migration/takeover wizard casually. It can disconnect `779` from the WhatsApp Business app.
