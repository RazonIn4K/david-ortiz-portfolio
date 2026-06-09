import { afterEach, describe, expect, it, vi } from "vitest"
import { createHmac } from "node:crypto"
import { NextRequest } from "next/server"

const APP_SECRET = "test-app-secret"
const VERIFY_TOKEN = "test-verify-token"
const WEBHOOK_URL = "https://example.com/api/whatsapp/webhook"

function signature(body: string) {
  return "sha256=" + createHmac("sha256", APP_SECRET).update(body).digest("hex")
}

// The route reads env at module load, so set env then re-import per test.
async function loadRoute() {
  vi.resetModules()
  vi.stubEnv("N8N_" + "WEBHOOK_URL", "")
  vi.stubEnv("N8N_" + "FORWARD_" + "SECRET", "")
  return import("@/app/api/whatsapp/webhook/route")
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe("GET /api/whatsapp/webhook — Meta verification handshake", () => {
  it("returns 500 when the verify token is not configured", async () => {
    vi.stubEnv("WHATSAPP_WEBHOOK_VERIFY_TOKEN", "")
    const { GET } = await loadRoute()
    const res = await GET(
      new NextRequest(`${WEBHOOK_URL}?hub.mode=subscribe&hub.verify_token=any&hub.challenge=123`),
    )
    expect(res.status).toBe(500)
  })

  it("echoes hub.challenge when mode and token match", async () => {
    vi.stubEnv("WHATSAPP_WEBHOOK_VERIFY_TOKEN", VERIFY_TOKEN)
    const { GET } = await loadRoute()
    const res = await GET(
      new NextRequest(
        `${WEBHOOK_URL}?hub.mode=subscribe&hub.verify_token=${VERIFY_TOKEN}&hub.challenge=echo-me`,
      ),
    )
    expect(res.status).toBe(200)
    expect(await res.text()).toBe("echo-me")
  })

  it("returns 403 on a wrong verify token", async () => {
    vi.stubEnv("WHATSAPP_WEBHOOK_VERIFY_TOKEN", VERIFY_TOKEN)
    const { GET } = await loadRoute()
    const res = await GET(
      new NextRequest(`${WEBHOOK_URL}?hub.mode=subscribe&hub.verify_token=WRONG&hub.challenge=echo-me`),
    )
    expect(res.status).toBe(403)
  })
})

describe("POST /api/whatsapp/webhook — payload signature verification", () => {
  const body = JSON.stringify({ object: "whatsapp_business_account", entry: [] })

  it("returns 500 when the app secret is not configured", async () => {
    vi.stubEnv("WHATSAPP_APP_SECRET", "")
    const { POST } = await loadRoute()
    const res = await POST(new NextRequest(WEBHOOK_URL, { method: "POST", body }))
    expect(res.status).toBe(500)
  })

  it("rejects an unsigned payload with 401", async () => {
    vi.stubEnv("WHATSAPP_APP_SECRET", APP_SECRET)
    const { POST } = await loadRoute()
    const res = await POST(new NextRequest(WEBHOOK_URL, { method: "POST", body }))
    expect(res.status).toBe(401)
  })

  it("rejects a payload with a bad signature with 401", async () => {
    vi.stubEnv("WHATSAPP_APP_SECRET", APP_SECRET)
    const { POST } = await loadRoute()
    const res = await POST(
      new NextRequest(WEBHOOK_URL, {
        method: "POST",
        body,
        headers: { "x-hub-signature-256": "sha256=deadbeef" },
      }),
    )
    expect(res.status).toBe(401)
  })

  it("accepts a correctly signed payload with 200", async () => {
    vi.stubEnv("WHATSAPP_APP_SECRET", APP_SECRET)
    const { POST } = await loadRoute()
    const res = await POST(
      new NextRequest(WEBHOOK_URL, {
        method: "POST",
        body,
        headers: { "x-hub-signature-256": signature(body) },
      }),
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ received: true })
  })
})
