import { afterEach, describe, expect, it, vi } from "vitest"
import { NextRequest } from "next/server"

// A browser-like UA that does not trip the bot patterns, plus headers that
// keep the abuse score at 0 so a valid challenge reaches the redirect.
const GOOD_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
  referer: "https://davidtiz.com/",
  "sec-fetch-site": "same-origin",
}

function url(query = "") {
  return `https://davidtiz.com/contact/whatsapp${query}`
}

// Fresh module per test => fresh rate/replay state.
async function loadRoute() {
  vi.resetModules()
  return import("@/app/contact/whatsapp/route")
}

let tokenCounter = 0

function validChallengeRequest(params: Record<string, string> = {}) {
  const tokenId = (++tokenCounter).toString(16).padStart(32, "0")
  const token = `${tokenId}.${Date.now()}`
  const searchParams = new URLSearchParams({ ...params, challenge: token })

  return new NextRequest(url(`?${searchParams.toString()}`), {
    headers: { ...GOOD_HEADERS, cookie: `dzt-contact-challenge=${token}` },
  })
}

function redirectTarget(response: Response) {
  const location = response.headers.get("location")
  expect(location).not.toBeNull()
  return new URL(location!)
}

afterEach(() => {
  tokenCounter = 0
  vi.resetModules()
})

describe("GET /contact/whatsapp — challenge guard", () => {
  it("blocks a request with no challenge (403)", async () => {
    const { GET } = await loadRoute()
    const res = await GET(new NextRequest(url("?intent=portfolio")))
    expect(res.status).toBe(403)
  })

  it("blocks when the query token and cookie token do not match (403)", async () => {
    const { GET } = await loadRoute()
    const cookieToken = `${"a".repeat(32)}.${Date.now()}`
    const queryToken = `${"b".repeat(32)}.${Date.now()}`
    const res = await GET(
      new NextRequest(url(`?intent=portfolio&challenge=${queryToken}`), {
        headers: { ...GOOD_HEADERS, cookie: `dzt-contact-challenge=${cookieToken}` },
      }),
    )
    expect(res.status).toBe(403)
  })

  it("blocks when the query timestamp does not match the cookie timestamp (403)", async () => {
    const { GET } = await loadRoute()
    const token = "c".repeat(32)
    const cookieToken = `${token}.${Date.now() - 20 * 60_000}`
    const queryToken = `${token}.${Date.now()}`
    const res = await GET(
      new NextRequest(url(`?intent=portfolio&challenge=${queryToken}`), {
        headers: { ...GOOD_HEADERS, cookie: `dzt-contact-challenge=${cookieToken}` },
      }),
    )
    expect(res.status).toBe(403)
  })

  it("redirects a valid challenge to wa.me (302), then rejects the replay (403)", async () => {
    const { GET } = await loadRoute()
    const token = `${"a1b2c3d4".repeat(4)}.${Date.now()}`
    const request = () =>
      new NextRequest(url(`?intent=portfolio&challenge=${token}`), {
        headers: { ...GOOD_HEADERS, cookie: `dzt-contact-challenge=${token}` },
      })

    const ok = await GET(request())
    expect(ok.status).toBe(302)
    expect(ok.headers.get("location")).toContain("wa.me")

    // Same single-use token again — now consumed.
    const replay = await GET(request())
    expect(replay.status).toBe(403)
  })

  it("uses the portfolio message for a valid portfolio intent", async () => {
    const { GET } = await loadRoute()
    const res = await GET(validChallengeRequest({ intent: "portfolio" }))

    expect(res.status).toBe(302)
    const target = redirectTarget(res)
    expect(target.hostname).toBe("wa.me")
    expect(target.searchParams.get("text")).toBe("Hola David, vi tu portafolio")
  })

  it("falls back to the portfolio message for an unknown intent", async () => {
    const { GET } = await loadRoute()
    const portfolio = await GET(validChallengeRequest({ intent: "portfolio" }))
    const unknown = await GET(validChallengeRequest({ intent: "garbage" }))

    expect(unknown.status).toBe(302)
    expect(redirectTarget(unknown).searchParams.get("text")).toBe(
      redirectTarget(portfolio).searchParams.get("text"),
    )
  })

  it("uses sanitized custom text when text is provided", async () => {
    const { GET } = await loadRoute()
    const res = await GET(
      validChallengeRequest({
        intent: "portfolio",
        text: "  Hola David, quiero hablar esta semana  ",
      }),
    )

    expect(res.status).toBe(302)
    const target = redirectTarget(res)
    expect(target.searchParams.get("text")).toBe("Hola David, quiero hablar esta semana")
  })

  it("blocks an expired challenge (403)", async () => {
    const { GET } = await loadRoute()
    const expired = `${"a".repeat(32)}.${Date.now() - 20 * 60_000}` // 20 min old
    const res = await GET(
      new NextRequest(url(`?intent=portfolio&challenge=${expired}`), {
        headers: { ...GOOD_HEADERS, cookie: `dzt-contact-challenge=${expired}` },
      }),
    )
    expect(res.status).toBe(403)
  })
})
