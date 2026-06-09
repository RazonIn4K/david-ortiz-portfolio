import { afterEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

const URL = "https://davidtiz.com/api/chat"
const validBody = { messages: [{ role: "user", content: "hi" }] }

function post(body: unknown, headers: Record<string, string> = {}) {
  return new NextRequest(URL, {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
    headers: { "content-type": "application/json", ...headers },
  })
}

// Fresh module per test => fresh in-memory rate-limit bucket.
async function loadRoute() {
  vi.resetModules()
  return import("@/app/api/chat/route")
}

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

describe("POST /api/chat — validation (rejects before any model call)", () => {
  it("400 on invalid JSON", async () => {
    const { POST } = await loadRoute()
    expect((await POST(post("{ not json"))).status).toBe(400)
  })

  it("400 when messages is missing or empty", async () => {
    const a = await loadRoute()
    expect((await a.POST(post({}))).status).toBe(400)
    const b = await loadRoute()
    expect((await b.POST(post({ messages: [] }))).status).toBe(400)
  })

  it("400 when a message has an invalid role or non-string content", async () => {
    const a = await loadRoute()
    expect((await a.POST(post({ messages: [{ role: "bot", content: "x" }] }))).status).toBe(400)
    const b = await loadRoute()
    expect((await b.POST(post({ messages: [{ role: "user", content: 123 }] }))).status).toBe(400)
  })

  it("400 over the message-count cap (50)", async () => {
    const { POST } = await loadRoute()
    const messages = Array.from({ length: 51 }, () => ({ role: "user", content: "x" }))
    expect((await POST(post({ messages }))).status).toBe(400)
  })

  it("400 over the total-character cap (8000)", async () => {
    const { POST } = await loadRoute()
    const messages = [{ role: "user", content: "x".repeat(8001) }]
    expect((await POST(post({ messages }))).status).toBe(400)
  })
})

describe("POST /api/chat — behavior", () => {
  it("falls back to a canned reply (200, fallback:true) when no API key is set", async () => {
    vi.stubEnv("OPENROUTER_API_KEY", "")
    const { POST } = await loadRoute()
    const res = await POST(post(validBody))
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.fallback).toBe(true)
    expect(typeof data.message).toBe("string")
  })

  it("rate-limits after 15 requests from the same IP (429 + retryAfter)", async () => {
    vi.stubEnv("OPENROUTER_API_KEY", "") // keep allowed requests on the no-network fallback path
    const { POST } = await loadRoute()
    const sameIp = { "x-forwarded-for": "203.0.113.7" }

    let last: Response | undefined
    for (let i = 0; i < 16; i++) {
      last = await POST(post(validBody, sameIp))
    }

    expect(last!.status).toBe(429)
    expect((await last!.json()).retryAfter).toBeGreaterThanOrEqual(0)
  })
})
