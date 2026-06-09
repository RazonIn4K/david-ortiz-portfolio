import { NextRequest, NextResponse } from "next/server"
import { contact } from "@/data/content"

const SYSTEM_PROMPT = `You are an AI assistant for David Ortiz's personal site (davidtiz.com). This site is a personal notebook and portfolio, not a sales page.

## What davidtiz.com is for:
- Personal notes, selected work, experiments, and learning-in-public
- Explaining abstraction layers across browsers, apps, APIs, infrastructure, and business systems
- Helping visitors understand what David builds and how he approaches projects

## What davidtiz.com is NOT for:
- It is not the primary project sales page
- Do not present it like a course platform or education business
- Do not route every question toward external services

## Guidance:
- If someone asks what David is learning or building, answer from the perspective of experimentation, notes, and system design
- Keep answers casual, concise, and useful
- Default to 2-4 short sentences
- Do not invent pricing or sales promises
- Avoid formal sales language
- Avoid markdown unless the user asks for a list`

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

// --- Rate limiting -----------------------------------------------------------
// Per-IP sliding window. In-memory (per serverless instance, resets on cold
// start) so it is best-effort, not a hard global guarantee — but it caps the
// obvious abuse case (one client hammering the endpoint and billing the key).
const CHAT_RATE_LIMIT = { windowMs: 60_000, maxRequests: 15 }
const chatRateBuckets = new Map<string, number[]>()

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  )
}

function rateLimit(ip: string) {
  const now = Date.now()
  const windowStart = now - CHAT_RATE_LIMIT.windowMs
  const recent = (chatRateBuckets.get(ip) ?? []).filter((t) => t > windowStart)
  if (recent.length >= CHAT_RATE_LIMIT.maxRequests) {
    return {
      allowed: false as const,
      retryAfter: Math.ceil((recent[0] + CHAT_RATE_LIMIT.windowMs - now) / 1000),
    }
  }
  recent.push(now)
  chatRateBuckets.set(ip, recent)
  return { allowed: true as const }
}

// --- Model selection ---------------------------------------------------------
// Cheapest-first fallback chain, fully overridable via env:
//   OPENROUTER_MODELS = comma-separated chain, tried in order (preferred)
//   OPENROUTER_MODEL  = single model (back-compat)
// Default is `openrouter/free`, OpenRouter's auto-router over free models —
// cheapest possible and self-maintaining as specific free model ids change.
const DEFAULT_MODELS = ["openrouter/free"]

function getModelChain(): string[] {
  const list = process.env.OPENROUTER_MODELS?.split(",").map((m) => m.trim()).filter(Boolean)
  if (list && list.length > 0) return list
  const single = process.env.OPENROUTER_MODEL?.trim()
  if (single) return [single]
  return DEFAULT_MODELS
}

// --- Payload guards ----------------------------------------------------------
const MAX_MESSAGES = 50
const MAX_TOTAL_CHARS = 8000

export async function POST(request: NextRequest) {
  try {
    // Reject the cheap way first, before parsing or calling OpenRouter.
    const limit = rateLimit(getClientIp(request))
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests", retryAfter: limit.retryAfter },
        { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
      )
    }

    const { messages } = (await request.json()) as { messages: ChatMessage[] }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 })
    }
    if (messages.length > MAX_MESSAGES) {
      return NextResponse.json({ error: "Too many messages" }, { status: 400 })
    }
    const totalChars = messages.reduce(
      (n, m) => n + (typeof m?.content === "string" ? m.content.length : 0),
      0,
    )
    if (totalChars > MAX_TOTAL_CHARS) {
      return NextResponse.json({ error: "Message content too long" }, { status: 400 })
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      console.error("OPENROUTER_API_KEY not configured")
      return NextResponse.json({
        message: getFallbackResponse(messages[messages.length - 1]?.content || ""),
        fallback: true,
      })
    }

    const apiMessages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-10),
    ]

    // Try each model in the chain until one returns usable content.
    let lastError: string | null = null
    for (const model of getModelChain()) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.SITE_URL || "https://davidtiz.com",
            "X-Title": "David Ortiz AI Assistant",
          },
          body: JSON.stringify({
            model,
            messages: apiMessages,
            max_tokens: 220,
            temperature: 0.35,
            provider: {
              sort: "price",
              allow_fallbacks: true,
            },
          }),
        })

        if (!response.ok) {
          lastError = `model ${model} -> ${response.status}`
          console.error("OpenRouter API error:", lastError, await response.text().catch(() => ""))
          continue
        }

        const data = await response.json()
        const assistantMessage = data.choices?.[0]?.message?.content
        if (typeof assistantMessage === "string" && assistantMessage.length > 0) {
          return NextResponse.json({ message: assistantMessage, fallback: false })
        }
        lastError = `model ${model} returned empty content`
      } catch (error) {
        lastError = `model ${model} threw: ${error instanceof Error ? error.message : "unknown"}`
        console.error(lastError)
      }
    }

    // Every model failed — degrade gracefully instead of erroring.
    console.error("All chat models failed:", lastError)
    return NextResponse.json({
      message: getFallbackResponse(messages[messages.length - 1]?.content || ""),
      fallback: true,
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat request" }, { status: 500 })
  }
}

function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("hire") || lowerMessage.includes("project") || lowerMessage.includes("service") || lowerMessage.includes("work")) {
    return "This site is the personal portfolio and notes layer. If you want to start a scoped project, contact David directly at " + contact.email + "."
  }

  if (lowerMessage.includes("learn") || lowerMessage.includes("building") || lowerMessage.includes("studying")) {
    return "Right now the focus is on abstraction layers, browser behavior, automation systems, AI tooling, and prompt safety. You can see current work in the selected work and notes sections."
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("email") || lowerMessage.includes("whatsapp") || lowerMessage.includes("phone")) {
    return `Use the contact section at ${contact.email} or the WhatsApp link on the page.`
  }

  if (lowerMessage.includes("security") || lowerMessage.includes("audit")) {
    return "Prompt safety, AI system behavior, and reliability testing are active topics across current work. He keeps notes on what worked, what failed, and what needs tightening."
  }

  return "Ask about what David is learning, what he is building, or how he approaches project handoffs. If you're ready to start a conversation, use the Contact section."
}
