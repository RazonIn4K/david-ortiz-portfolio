import { createHmac, timingSafeEqual } from "node:crypto"
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

    console.info("WhatsApp webhook received", {
      object: payload.object,
      entryCount,
      changeCount,
    })

    await forwardToN8n(rawBody)

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Invalid WhatsApp webhook payload", error)
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
}

async function forwardToN8n(rawBody: string) {
  if (!N8N_WEBHOOK_URL) {
    return
  }

  if (!N8N_FORWARD_SECRET) {
    console.error("N8N_WEBHOOK_URL is configured but N8N_FORWARD_SECRET is missing")
    return
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 1500)

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forward-secret": N8N_FORWARD_SECRET,
      },
      body: rawBody,
      signal: controller.signal,
    })

    if (!response.ok) {
      console.error("n8n WhatsApp forward failed", { status: response.status })
    }
  } catch (error) {
    console.error("n8n WhatsApp forward error", error)
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
