#!/usr/bin/env bash
set -euo pipefail

BRIDGE_DIR="${WHATSAPP_BRIDGE_DIR:-$HOME/Git-Projects/whatsapp-mcp/whatsapp-bridge}"
DB_PATH="$BRIDGE_DIR/store/messages.db"
PORT="${WHATSAPP_BRIDGE_PORT:-8080}"
HOST="127.0.0.1"
SEND_URL="http://$HOST:$PORT/api/send"

fail() {
  printf 'FAIL: %s\n' "$*" >&2
  exit 1
}

warn() {
  printf 'WARN: %s\n' "$*" >&2
}

ok() {
  printf 'OK: %s\n' "$*"
}

printf 'WhatsApp Lane A health check\n'
printf 'Bridge dir: %s\n' "$BRIDGE_DIR"
printf 'Database: %s\n\n' "$DB_PATH"

command -v lsof >/dev/null 2>&1 || fail "lsof is required"
command -v sqlite3 >/dev/null 2>&1 || fail "sqlite3 is required"
command -v curl >/dev/null 2>&1 || fail "curl is required"

listener="$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN 2>/dev/null || true)"

if [[ -z "$listener" ]]; then
  fail "nothing is listening on TCP port $PORT"
fi

printf '%s\n\n' "$listener"

if printf '%s\n' "$listener" | grep -Eq '(\*:|0\.0\.0\.0:)'"$PORT"'[[:space:]]|\[::\]:'"$PORT"; then
  fail "bridge is exposed beyond localhost; expected $HOST:$PORT only"
fi

if printf '%s\n' "$listener" | grep -Fq "$HOST:$PORT"; then
  ok "bridge is bound to $HOST:$PORT"
else
  fail "bridge listener did not show $HOST:$PORT"
fi

http_code="$(
  curl -sS -o /tmp/whatsapp_lane_a_send_probe.txt -w '%{http_code}' \
    -X POST "$SEND_URL" \
    -H 'Content-Type: application/json' \
    -d '{}' || true
)"

if [[ "$http_code" != "400" ]]; then
  cat /tmp/whatsapp_lane_a_send_probe.txt >&2 || true
  fail "send endpoint probe expected HTTP 400 for empty payload, got $http_code"
fi

if grep -Fq "Recipient is required" /tmp/whatsapp_lane_a_send_probe.txt; then
  ok "send endpoint is reachable locally and rejects empty payload"
else
  cat /tmp/whatsapp_lane_a_send_probe.txt >&2 || true
  fail "send endpoint probe did not return the expected validation message"
fi

[[ -f "$DB_PATH" ]] || fail "messages database not found at $DB_PATH"

total_messages="$(sqlite3 "$DB_PATH" 'SELECT COUNT(*) FROM messages;' 2>/dev/null || printf '0')"
total_chats="$(sqlite3 "$DB_PATH" 'SELECT COUNT(*) FROM chats;' 2>/dev/null || printf '0')"
recent_inbound="$(
  sqlite3 "$DB_PATH" "SELECT COUNT(*) FROM messages WHERE is_from_me = 0 AND timestamp >= datetime('now', '-24 hours');" 2>/dev/null || printf '0'
)"

ok "database readable: $total_chats chats, $total_messages messages"
printf 'Recent inbound messages in last 24h: %s\n\n' "$recent_inbound"

printf 'Latest messages:\n'
sqlite3 -header -column "$DB_PATH" "
SELECT
  datetime(timestamp) AS time,
  chat_jid,
  CASE is_from_me WHEN 1 THEN 'me' ELSE 'them' END AS direction,
  substr(replace(content, char(10), ' '), 1, 90) AS preview,
  media_type
FROM messages
ORDER BY timestamp DESC
LIMIT 10;
"

printf '\nHealth check complete.\n'
