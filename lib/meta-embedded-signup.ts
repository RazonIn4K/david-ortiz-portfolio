import "server-only"

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto"

const STATE_TTL_MS = 15 * 60 * 1000
const DEFAULT_GRAPH_VERSION = "v25.0"

type SignupStatePayload = {
  exp: number
  iat: number
  nonce: string
}

export type CoexistencePublicConfig = {
  appId: string | null
  configId: string | null
  graphVersion: string
  redirectUri: string | null
}

export function getCoexistencePublicConfig(): CoexistencePublicConfig {
  return {
    appId: process.env.META_APP_ID ?? null,
    configId: process.env.META_EMBEDDED_SIGNUP_CONFIG_ID ?? null,
    graphVersion: process.env.META_GRAPH_VERSION ?? DEFAULT_GRAPH_VERSION,
    redirectUri: process.env.META_EMBEDDED_SIGNUP_REDIRECT_URI ?? null,
  }
}

export function getMissingCoexistenceConfig() {
  const config = getCoexistencePublicConfig()
  const missing: string[] = []

  if (!process.env.WHATSAPP_COEXISTENCE_ADMIN_KEY) {
    missing.push("WHATSAPP_COEXISTENCE_ADMIN_KEY")
  }

  if (!config.appId) {
    missing.push("META_APP_ID")
  }

  if (!config.configId) {
    missing.push("META_EMBEDDED_SIGNUP_CONFIG_ID")
  }

  return missing
}

export function isValidCoexistenceAdminKey(provided: string | null | undefined) {
  const expected = process.env.WHATSAPP_COEXISTENCE_ADMIN_KEY

  if (!expected || !provided) {
    return false
  }

  return safeEqual(expected, provided)
}

export function createCoexistenceSignupState() {
  const now = Date.now()
  const payload: SignupStatePayload = {
    iat: now,
    exp: now + STATE_TTL_MS,
    nonce: randomBytes(16).toString("hex"),
  }
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url")
  const signature = signValue(encodedPayload)

  return `${encodedPayload}.${signature}`
}

export function verifyCoexistenceSignupState(state: string | null | undefined) {
  if (!state) {
    return false
  }

  const [encodedPayload, signature] = state.split(".")

  if (!encodedPayload || !signature || !safeEqual(signValue(encodedPayload), signature)) {
    return false
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8")
    ) as Partial<SignupStatePayload>

    return typeof payload.exp === "number" && payload.exp >= Date.now()
  } catch {
    return false
  }
}

export function redactIdentifier(value: string | null | undefined) {
  if (!value) {
    return null
  }

  if (value.length <= 8) {
    return "configured"
  }

  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

function signValue(value: string) {
  const key = process.env.WHATSAPP_COEXISTENCE_ADMIN_KEY

  if (!key) {
    throw new Error("WHATSAPP_COEXISTENCE_ADMIN_KEY is not configured")
  }

  return createHmac("sha256", key).update(value).digest("base64url")
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left)
  const rightBuffer = Buffer.from(right)

  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer)
}
