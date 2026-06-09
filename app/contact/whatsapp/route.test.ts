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

afterEach(() => {
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
