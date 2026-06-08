import { NextRequest, NextResponse } from "next/server"
import { contact } from "@/data/content"

const intentMessages = {
  portfolio: "Hola David, vi tu portafolio",
  callback: "Hola David, vi tu portafolio. Me gustaria pedir una llamada cuando tengas tiempo.",
  localSite: "Hola David, vi tus demos para negocios locales y quiero una pagina asi para mi negocio.",
  automation: "Hola David, quiero hablar de una automatizacion o flujo de trabajo.",
} as const

type Intent = keyof typeof intentMessages

type ScoredRequest = {
  blocked: boolean
  reasons: string[]
}

const suspiciousUserAgentPatterns = [
  /bot|crawl|spider|slurp|fetch|python|scrapy|curl|wget|httpx|axios|postman|insomnia|headless|playwright|puppeteer|selenium/i,
  /okhttp|java|go-http|curl\/|lighthouse|newrelic|nagios|pingdom/i,
]

const suspiciousTextPatterns = [
  /https?:\/\/\S+/i,
  /[\u200e-\u200f]/,
  /[@#](?:\d{3,}|[A-Za-z]+\d{3,})/,
  /(seo|crypto|loan|casino|adult|adults|sex|viagra|pharmacy)/i,
]

const repeatedWordPattern = /\b([A-Za-zÀ-ÿ']{2,})\b(?:\s+\1){2,}/i

const contactChallengeCookieName = "dzt-contact-challenge"
const contactChallengeWindowMs = 10 * 60_000
const rateBuckets = new Map<string, number[]>()
const bucketWindowMs = 60_000
const burstLimit = 6
const usedChallenges = new Map<string, number>()
const usedChallengeWindowMs = 2 * 60_000

function cleanupUsedChallenges(now: number) {
  for (const [token, expiresAt] of usedChallenges.entries()) {
    if (expiresAt <= now) {
      usedChallenges.delete(token)
    }
  }
}

function hasChallengeBeenUsed(token: string, now: number) {
  cleanupUsedChallenges(now)

  return usedChallenges.get(token) !== undefined
}

function trackUsedChallenge(token: string, now: number) {
  usedChallenges.set(token, now + usedChallengeWindowMs)
  cleanupUsedChallenges(now)
}

function isIntent(value: string | null): value is Intent {
  return Boolean(value && value in intentMessages)
}

function getClientIp(request: NextRequest) {
  const cfIp = request.headers.get("cf-connecting-ip")
  if (cfIp) return cfIp

  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown"

  return request.headers.get("x-real-ip") ?? "unknown"
}

type ChallengeValidation = {
  valid: boolean
  reason?: string
  token?: string
}

function parseChallengeValue(value: string | null) {
  if (!value) return null

  const [token, issuedAtRaw] = value.split(".")
  if (!token || !issuedAtRaw) return null

  const issuedAt = Number.parseInt(issuedAtRaw, 10)
  if (!Number.isFinite(issuedAt) || issuedAt <= 0) return null
  const issuedAtMs =
    issuedAtRaw.length >= 13 ? issuedAt : issuedAt * 1000

  return { token, issuedAt: issuedAtMs }
}

function validateContactChallenge(request: NextRequest): ChallengeValidation {
  const challengeFromQuery = parseChallengeValue(request.nextUrl.searchParams.get("challenge"))
  if (!challengeFromQuery) {
    return {
      valid: false,
      reason: "missing-contact-challenge",
    }
  }

  const challengeCookie = parseChallengeValue(
    request.cookies.get(contactChallengeCookieName)?.value ?? null
  )
  if (!challengeCookie) {
    return {
      valid: false,
      reason: "missing-contact-challenge-cookie",
    }
  }

  if (challengeCookie.token !== challengeFromQuery.token) {
    return {
      valid: false,
      reason: "contact-challenge-mismatch",
    }
  }

  const age = Date.now() - challengeFromQuery.issuedAt
  if (age < 0 || age > contactChallengeWindowMs) {
    return {
      valid: false,
      reason: "contact-challenge-expired",
    }
  }

  return {
    valid: true,
    token: challengeFromQuery.token,
  }
}

function scoreRequest(request: NextRequest, text: string): ScoredRequest {
  const userAgent = request.headers.get("user-agent") ?? ""
  const reasons: string[] = []
  let score = 0

  if (!userAgent || userAgent.length < 20) {
    score += 2
    reasons.push("missing-or-short-user-agent")
  }

  if (suspiciousUserAgentPatterns.some((pattern) => pattern.test(userAgent))) {
    score += 3
    reasons.push("bot-like-user-agent")
  }

  const referrer = request.headers.get("referer")
  if (!referrer) {
    score += 1
    reasons.push("missing-referrer")
  }

  const secFetchSite = request.headers.get("sec-fetch-site")
  if (secFetchSite === "cross-site" || secFetchSite === "none") {
    score += 1
    reasons.push("cross-site-fetch")
  }

  const challenge = validateContactChallenge(request)
  if (!challenge.valid) {
    return {
      blocked: true,
      reasons: [challenge.reason ?? "contact-challenge-required"],
    }
  }

  const now = Date.now()
  if (hasChallengeBeenUsed(challenge.token!, now)) {
    return {
      blocked: true,
      reasons: ["contact-challenge-replay"],
    }
  }

  if (text.length > 900) {
    score += 1
    reasons.push("message-too-long")
  }

  if (text.split(/\s+/).filter(Boolean).length <= 2) {
    score += 2
    reasons.push("message-too-short")
  }

  if (repeatedWordPattern.test(text)) {
    score += 1
    reasons.push("repeated-word-pattern")
  }

  if (suspiciousTextPatterns.some((pattern) => pattern.test(text))) {
    score += 2
    reasons.push("suspicious-message-pattern")
  }

  const ip = getClientIp(request)
  const events = rateBuckets.get(ip) ?? []
  const activeEvents = events.filter((ts) => ts > now - bucketWindowMs)
  activeEvents.push(now)
  rateBuckets.set(ip, activeEvents)

  if (activeEvents.length > burstLimit) {
    score += 3
    reasons.push("ip-burst-limit")
  }

  return { blocked: score >= 6, reasons }
}

function stripPotentialSpamText(message: string) {
  const sanitized = message
    .replace(/\s{2,}/g, " ")
    .replace(/https?:\/\/\S+/gi, "[link removed]")
    .replace(/\b(wa\.me|bit\.ly|tinyurl|t\.co)\S*/gi, "[link removed]")
    .trim()

  return sanitized.slice(0, 1200)
}

function blockedContactResponse(reasons: string[]) {
  const response = new NextResponse(
    `<html><body><h1>Contact temporarily unavailable</h1><p>Email is available from the site if this is a real request. Include a short project context and preferred contact timing.</p></body></html>`,
    {
      status: 403,
      headers: {
        "content-type": "text/html; charset=UTF-8",
        "Retry-After": "120",
        "X-Robots-Tag": "noindex,nofollow",
        "Cache-Control": "no-store",
      },
    }
  )

  response.headers.append("X-Contact-Guard", reasons.join(","))
  return response
}

function markChallengeCookieConsumed(response: NextResponse, request: NextRequest) {
  const secure = request.nextUrl.protocol === "https:" ? "; Secure" : ""
  response.headers.append(
    "Set-Cookie",
    `${contactChallengeCookieName}=; Path=${CONTACT_PATH}; Max-Age=0; SameSite=Lax${secure}`
  )
}

export function GET(request: NextRequest) {
  const intent = request.nextUrl.searchParams.get("intent")
  const safeIntent: Intent = isIntent(intent) ? intent : "portfolio"
  const customText = request.nextUrl.searchParams.get("text")?.trim()
  const baseMessage = customText && customText.length > 0 ? customText : intentMessages[safeIntent]
  const message = stripPotentialSpamText(baseMessage)
  const risk = scoreRequest(request, message)

  if (risk.blocked) {
    const reasonPayload = risk.reasons.length ? risk.reasons.join(",") : "no-reason"
    console.info(
      `[contact-guard] blocked whatsapp redirect attempt: ip=${getClientIp(request)} intent=${safeIntent} reasons=${reasonPayload}`
    )
    return blockedContactResponse(risk.reasons)
  }

  const target = new URL(`https://wa.me/${contact.whatsappNumber}`)
  target.searchParams.set("text", message)

  const response = NextResponse.redirect(target, 302)
  const challenge = parseChallengeValue(request.nextUrl.searchParams.get("challenge"))
  if (challenge?.token) {
    trackUsedChallenge(challenge.token, Date.now())
  }

  markChallengeCookieConsumed(response, request)
  response.headers.set("Cache-Control", "no-store")
  response.headers.set("X-Robots-Tag", "noindex,nofollow")

  return response
}
