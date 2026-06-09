"use client"

import { useEffect, useRef, useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"
import { chatConfig } from "@/data/content"

type ChatRole = "user" | "assistant"
type ChatMessage = { role: ChatRole; content: string }

const MAX_INPUT = 1000

export function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep the transcript pinned to the latest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, loading, open])

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Close the panel on Escape for keyboard and screen-reader users.
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || loading) return

    setError(null)
    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }]
    setMessages(next)
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const data = (await response.json().catch(() => ({}))) || {}

      if (response.status === 429) {
        setError(`Easy there — too many messages. Try again in ${data.retryAfter ?? "a few"}s.`)
        return
      }
      if (!response.ok || typeof data.message !== "string") {
        setError(data.error || "The assistant is unavailable right now. Email works too.")
        return
      }

      setMessages([...next, { role: "assistant", content: data.message }])
    } catch {
      setError("Network hiccup — please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close the assistant" : "Open the assistant"}
        className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 focus-visible:outline-none"
        style={{ background: "var(--dtz-accent)", color: "var(--dtz-on-accent)", boxShadow: "var(--dtz-shadow)" }}
      >
        {open ? <X className="h-6 w-6" aria-hidden="true" /> : <MessageCircle className="h-6 w-6" aria-hidden="true" />}
      </button>

      {/* Panel */}
      {open ? (
        <section
          role="dialog"
          aria-label={chatConfig.title}
          className="fixed bottom-24 right-5 z-[60] flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border"
          style={{
            background: "var(--dtz-panel)",
            color: "var(--dtz-fg)",
            borderColor: "var(--dtz-border)",
            boxShadow: "var(--dtz-shadow)",
          }}
        >
          <header className="border-b px-4 py-3" style={{ borderColor: "var(--dtz-border)" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--dtz-accent)" }}>
              {chatConfig.title}
            </p>
            <p className="mt-1 text-sm" style={{ color: "var(--dtz-muted)" }}>
              {chatConfig.subtitle}
            </p>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            {messages.length === 0 ? (
              <p style={{ color: "var(--dtz-subtle)" }}>{chatConfig.welcomeMessage}</p>
            ) : null}

            {messages.map((message, index) => (
              <div key={index} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <span
                  className="inline-block max-w-[85%] rounded-2xl px-3 py-2 leading-relaxed"
                  style={
                    message.role === "user"
                      ? { background: "var(--dtz-accent)", color: "var(--dtz-on-accent)" }
                      : { background: "var(--dtz-panel-2)", color: "var(--dtz-fg)" }
                  }
                >
                  {message.content}
                </span>
              </div>
            ))}

            {loading ? (
              <p style={{ color: "var(--dtz-subtle)" }} aria-live="polite">
                Thinking…
              </p>
            ) : null}
            {error ? (
              <p className="text-sm" style={{ color: "var(--dtz-accent-2)" }} role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t px-3 py-3" style={{ borderColor: "var(--dtz-border)" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value.slice(0, MAX_INPUT))}
              placeholder={chatConfig.placeholder}
              aria-label="Message the assistant"
              className="min-w-0 flex-1 rounded-xl px-3 py-2 text-sm outline-none"
              style={{ background: "var(--dtz-panel-2)", color: "var(--dtz-fg)" }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-opacity disabled:opacity-50"
              style={{ background: "var(--dtz-accent)", color: "var(--dtz-on-accent)" }}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      ) : null}
    </>
  )
}
