import { afterEach, describe, expect, it, vi } from "vitest"
import {
  createCoexistenceSignupState,
  exchangeCoexistenceCode,
  isTokenExchangeEnabled,
  isValidCoexistenceAdminKey,
  redactIdentifier,
  verifyCoexistenceSignupState,
} from "@/lib/meta-embedded-signup"

const ADMIN_KEY = "test-admin-key-0123456789abcdef"

afterEach(() => {
  vi.unstubAllEnvs()
})

describe("redactIdentifier", () => {
  it("returns null for empty input", () => {
    expect(redactIdentifier(null)).toBeNull()
    expect(redactIdentifier(undefined)).toBeNull()
    expect(redactIdentifier("")).toBeNull()
  })

  it("reports short identifiers as 'configured' without leaking them", () => {
    expect(redactIdentifier("12345678")).toBe("configured")
  })

  it("shows only the first and last four characters of long identifiers", () => {
    expect(redactIdentifier("1234567890abcd")).toBe("1234...abcd")
  })
})

describe("isValidCoexistenceAdminKey", () => {
  it("rejects everything when no admin key is configured", () => {
    vi.stubEnv("WHATSAPP_COEXISTENCE_ADMIN_KEY", "")
    expect(isValidCoexistenceAdminKey("anything")).toBe(false)
  })

  it("accepts the configured key and rejects others (constant-time compare)", () => {
    vi.stubEnv("WHATSAPP_COEXISTENCE_ADMIN_KEY", ADMIN_KEY)
    expect(isValidCoexistenceAdminKey(ADMIN_KEY)).toBe(true)
    expect(isValidCoexistenceAdminKey("wrong-key")).toBe(false)
    expect(isValidCoexistenceAdminKey(null)).toBe(false)
  })
})

describe("isTokenExchangeEnabled", () => {
  it("is OFF by default and only enabled by the exact string 'true'", () => {
    vi.stubEnv("META_EMBEDDED_SIGNUP_ALLOW_TOKEN_EXCHANGE", "")
    expect(isTokenExchangeEnabled()).toBe(false)
    vi.stubEnv("META_EMBEDDED_SIGNUP_ALLOW_TOKEN_EXCHANGE", "1")
    expect(isTokenExchangeEnabled()).toBe(false)
    vi.stubEnv("META_EMBEDDED_SIGNUP_ALLOW_TOKEN_EXCHANGE", "true")
    expect(isTokenExchangeEnabled()).toBe(true)
  })
})

describe("exchangeCoexistenceCode", () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function stubCreds() {
    vi.stubEnv("META_APP_ID", "123456")
    vi.stubEnv("WHATSAPP_APP_SECRET", "app-secret")
    vi.stubEnv("META_GRAPH_VERSION", "v25.0")
    vi.stubEnv("META_EMBEDDED_SIGNUP_REDIRECT_URI", "https://davidtiz.com/api/meta/embedded-signup/callback")
  }

  it("fails fast without app credentials (no network call)", async () => {
    vi.stubEnv("META_APP_ID", "")
    vi.stubEnv("WHATSAPP_APP_SECRET", "")
    const fetchSpy = vi.fn()
    vi.stubGlobal("fetch", fetchSpy)

    const result = await exchangeCoexistenceCode("code-123")
    expect(result).toEqual({ ok: false, error: "missing-app-credentials" })
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it("exchanges a code against the Graph oauth endpoint and returns the token", async () => {
    stubCreds()
    const fetchSpy = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ access_token: "tok-abc", token_type: "bearer", expires_in: 5183944 }),
        { status: 200 },
      ),
    )
    vi.stubGlobal("fetch", fetchSpy)

    const result = await exchangeCoexistenceCode("code-123")
    expect(result).toEqual({ ok: true, accessToken: "tok-abc", tokenType: "bearer", expiresIn: 5183944 })

    const calledUrl = String(fetchSpy.mock.calls[0][0])
    expect(calledUrl).toContain("https://graph.facebook.com/v25.0/oauth/access_token")
    expect(calledUrl).toContain("client_id=123456")
    expect(calledUrl).toContain("code=code-123")
  })

  it("surfaces the Graph error message on a failed exchange", async () => {
    stubCreds()
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: { message: "Invalid verification code" } }), { status: 400 }),
      ),
    )

    const result = await exchangeCoexistenceCode("expired-code")
    expect(result).toEqual({ ok: false, error: "Invalid verification code" })
  })

  it("reports a network failure without throwing", async () => {
    stubCreds()
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("fetch failed")))

    const result = await exchangeCoexistenceCode("code-123")
    expect(result).toEqual({ ok: false, error: "network-error" })
  })
})

describe("coexistence signup state (HMAC sign/verify round-trip)", () => {
  it("verifies a freshly signed state token", () => {
    vi.stubEnv("WHATSAPP_COEXISTENCE_ADMIN_KEY", ADMIN_KEY)
    const state = createCoexistenceSignupState()
    expect(verifyCoexistenceSignupState(state)).toBe(true)
  })

  it("rejects missing, malformed, or tampered state tokens", () => {
    vi.stubEnv("WHATSAPP_COEXISTENCE_ADMIN_KEY", ADMIN_KEY)
    expect(verifyCoexistenceSignupState(null)).toBe(false)
    expect(verifyCoexistenceSignupState("missing-signature")).toBe(false)

    const valid = createCoexistenceSignupState()
    expect(verifyCoexistenceSignupState(`${valid}tampered`)).toBe(false)
  })

  it("rejects a state that was signed with a different key", () => {
    vi.stubEnv("WHATSAPP_COEXISTENCE_ADMIN_KEY", ADMIN_KEY)
    const state = createCoexistenceSignupState()

    vi.stubEnv("WHATSAPP_COEXISTENCE_ADMIN_KEY", "a-totally-different-admin-key")
    expect(verifyCoexistenceSignupState(state)).toBe(false)
  })
})
