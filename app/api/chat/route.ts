import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are an AI assistant for David Ortiz's personal site (davidtiz.com). This site is a personal notebook and ecosystem guide, not the primary sales site.

## What davidtiz.com is for:
- Personal notes, experiments, demos, and learning-in-public
- Explaining abstraction layers across browsers, apps, APIs, infrastructure, and business systems
- Helping visitors understand how David's ecosystem fits together

## What davidtiz.com is NOT for:
- It is not the main place for closing scoped work or presenting formal offers
- Do not present it like a course platform or education business

## Ecosystem Sites:
- **HighEncode** (highencodelearning.com) - The business-facing site for services, demos, project scoping, and business work
- **CSBrainAI** (csbrainai.vercel.app) - A private RAG assistant proof asset with citations, validation, rate limits, and hash-only logging
- **Prompt Defenders** (prompt-defenders.vercel.app) - AI security testing and prompt-safety work

## Guidance:
- If someone wants to hire David, discuss a project, or ask about business services, direct them to HighEncode
- If someone asks what David is learning or building, answer from the perspective of experimentation, notes, demos, and system design
- Keep answers casual, concise, and useful
- Default to 2-4 short sentences
- Do not invent pricing or sales promises
- Avoid formal sales language
- Avoid markdown unless the user asks for a list`

interface ChatMessage {
  role: "user" | "assistant" | "system"
  content: string
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json() as { messages: ChatMessage[] }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      )
    }

    const apiKey = process.env.OPENROUTER_API_KEY
    const model = process.env.OPENROUTER_MODEL || "google/gemini-3.1-flash-lite"

    if (!apiKey) {
      console.error("OPENROUTER_API_KEY not configured")
      return NextResponse.json({
        message: getFallbackResponse(messages[messages.length - 1]?.content || ""),
        fallback: true
      })
    }

    const apiMessages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-10)
    ]

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.SITE_URL || "https://davidtiz.com",
        "X-Title": "David Ortiz AI Assistant"
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
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("OpenRouter API error:", response.status, errorData)

      return NextResponse.json({
        message: getFallbackResponse(messages[messages.length - 1]?.content || ""),
        fallback: true
      })
    }

    const data = await response.json()
    const assistantMessage = data.choices?.[0]?.message?.content

    if (!assistantMessage) {
      throw new Error("No response from AI")
    }

    return NextResponse.json({
      message: assistantMessage,
      fallback: false
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    )
  }
}

function getFallbackResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes("hire") || lowerMessage.includes("project") || lowerMessage.includes("service") || lowerMessage.includes("work")) {
    return "For business services, scoped work, and business conversations, use HighEncode: https://highencodelearning.com. This site is the personal notebook layer."
  }

  if (lowerMessage.includes("learn") || lowerMessage.includes("building") || lowerMessage.includes("studying")) {
    return "Right now the focus is on abstraction layers, browser behavior, automation systems, AI tooling, prompt safety, and how personal notes connect to business-facing delivery."
  }

  if (lowerMessage.includes("high encode") || lowerMessage.includes("davidtiz") || lowerMessage.includes("ecosystem")) {
    return "davidtiz.com is the personal site for notes, experiments, and learning in public. highencodelearning.com is the business-facing site for services, demos, and project scoping. CSBrainAI is the RAG proof asset, and Prompt Defenders is the AI safety track."
  }

  if (lowerMessage.includes("security") || lowerMessage.includes("audit")) {
    return "Prompt safety, AI system behavior, and security testing are active topics in the ecosystem. Prompt Defenders is the security-focused surface: https://prompt-defenders.vercel.app."
  }

  return "This site is the personal notebook layer in David Ortiz's ecosystem. Ask about what he is learning, what he is building, or how the ecosystem sites connect. For scoped business work, use HighEncode: https://highencodelearning.com."
}
