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
