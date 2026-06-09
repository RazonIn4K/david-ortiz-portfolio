import { afterEach, describe, expect, it, vi } from "vitest"
import {
  createCoexistenceSignupState,
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
