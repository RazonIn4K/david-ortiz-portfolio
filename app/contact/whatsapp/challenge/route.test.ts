import { describe, expect, it } from "vitest"
import { NextRequest } from "next/server"
import { GET } from "@/app/contact/whatsapp/challenge/route"

const URL = "https://davidtiz.com/contact/whatsapp/challenge"

describe("GET /contact/whatsapp/challenge", () => {
  it("returns a token and sets a matching HttpOnly challenge cookie", async () => {
    const res = GET(new NextRequest(URL))
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body.token).toMatch(/^[a-f0-9]{32}\.\d+$/)

    const setCookie = res.headers.get("set-cookie") ?? ""
    expect(setCookie).toContain(`dzt-contact-challenge=${body.token}`)
    expect(setCookie).toContain("HttpOnly")
    expect(setCookie).toContain("Path=/contact/whatsapp")
    // Cookie attribute values are case-insensitive; Next's cookie serializer
    // emits `SameSite=lax` while a raw header would say `SameSite=Lax`.
    expect(setCookie).toMatch(/samesite=lax/i)
  })

  it("marks the token response no-store so tokens are never cached", () => {
    const res = GET(new NextRequest(URL))
    expect(res.headers.get("cache-control")).toBe("no-store")
  })

  it("sets the Secure attribute over https", () => {
    const res = GET(new NextRequest(URL))
    expect(res.headers.get("set-cookie") ?? "").toContain("Secure")
  })

  it("mints a unique token per request", async () => {
    const a = await GET(new NextRequest(URL)).json()
    const b = await GET(new NextRequest(URL)).json()
    expect(a.token).not.toBe(b.token)
  })
})
