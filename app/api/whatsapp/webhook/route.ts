import { createHmac, randomUUID, timingSafeEqual } from "node:crypto"
import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN
const APP_SECRET = process.env.WHATSAPP_APP_SECRET
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL
const N8N_FORWARD_SECRET = process.env.N8N_FORWARD_SECRET

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const mode = searchParams.get("hub.mode")
  const token = searchParams.get("hub.verify_token")
  const challenge = searchParams.get("hub.challenge")

  if (!VERIFY_TOKEN) {
    console.error("WHATSAPP_WEBHOOK_VERIFY_TOKEN is not configured")
    return NextResponse.json(
      { error: "Webhook verify token is not configured" },
      { status: 500 }
    )
  }

  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    })
  }

  return NextResponse.json({ error: "Forbidden" }, { status: 403 })
}

export async function POST(request: NextRequest) {
  if (!APP_SECRET) {
    console.error("WHATSAPP_APP_SECRET is not configured - rejecting webhook event")
    return NextResponse.json(
      { error: "Webhook signature secret is not configured" },
      { status: 500 }
    )
  }

  const rawBody = await request.text()

  if (!isValidMetaSignature(rawBody, request.headers.get("x-hub-signature-256"))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  try {
    const payload = JSON.parse(rawBody)
    const entryCount = Array.isArray(payload.entry) ? payload.entry.length : 0
    const changeCount = Array.isArray(payload.entry)
      ? payload.entry.reduce((total: number, entry: { changes?: unknown[] }) => {
          return total + (Array.isArray(entry.changes) ? entry.changes.length : 0)
        }, 0)
      : 0

    const correlationId = randomUUID()
    console.info("WhatsApp webhook received", {
      correlationId,
      object: payload.object,
      entryCount,
      changeCount,
    })

    await forwardToN8n(rawBody, correlationId)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Invalid WhatsApp webhook payload", error)
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
}

const N8N_FORWARD_TIMEOUT_MS = 1500

// Forwards the raw Meta payload to n8n and logs the OUTCOME only: status,
// duration, a correlation id (also sent on to n8n for cross-system tracing),
// and a failure reason. Never logs the payload body, request headers, the
// target URL, or secrets, so the logs stay privacy-safe.
async function forwardToN8n(rawBody: string, correlationId: string) {
  if (!N8N_WEBHOOK_URL) {
    return
  }

  if (!N8N_FORWARD_SECRET) {
    console.error("n8n WhatsApp forward skipped", {
      correlationId,
      reason: "missing-N8N_FORWARD_SECRET",
    })
    return
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), N8N_FORWARD_TIMEOUT_MS)
  const startedAt = Date.now()

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forward-secret": N8N_FORWARD_SECRET,
        "x-correlation-id": correlationId,
      },
      body: rawBody,
      signal: controller.signal,
    })

    const durationMs = Date.now() - startedAt
    await response.body?.cancel()

    if (response.ok) {
      console.info("n8n WhatsApp forward ok", {
        correlationId,
        status: response.status,
        durationMs,
      })
    } else {
      console.error("n8n WhatsApp forward failed", {
        correlationId,
        status: response.status,
        durationMs,
        reason: "non-2xx-response",
      })
    }
  } catch (error) {
    const durationMs = Date.now() - startedAt
    const reason =
      error instanceof Error && error.name === "AbortError" ? "timeout" : "network-error"
    console.error("n8n WhatsApp forward error", {
      correlationId,
      durationMs,
      reason,
    })
  } finally {
    clearTimeout(timeout)
  }
}

function isValidMetaSignature(rawBody: string, signatureHeader: string | null) {
  if (!signatureHeader?.startsWith("sha256=")) {
    return false
  }

  const expected = Buffer.from(signatureHeader.slice("sha256=".length), "hex")
  const actual = Buffer.from(
    createHmac("sha256", APP_SECRET as string).update(rawBody).digest("hex"),
    "hex"
  )

  return expected.length === actual.length && timingSafeEqual(expected, actual)
}
