"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { X, Send, Sparkles, Bot, User, Zap, BookOpen, Shield, Minimize2, Maximize2 } from "lucide-react"
import { businessSiteUrl, personalSiteDomain } from "@/lib/site-config"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface QuickAction {
  icon: typeof Zap
  label: string
  query: string
}

const quickActions: QuickAction[] = [
  { icon: Zap, label: "What are you building?", query: "What are you currently building and testing?" },
  { icon: BookOpen, label: "How do the sites connect?", query: `How do ${personalSiteDomain} and High Encode Learning connect?` },
  { icon: Shield, label: "Where should business inquiries go?", query: "Where should someone go if they want to hire you or discuss scoped work?" },
]

const generateId = () =>
  globalThis.crypto?.randomUUID?.() ?? `msg-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`

// Move outside component to prevent recreation
const createInitialMessage = (): Message => ({
  id: "welcome-message",
  role: "assistant",
  content:
    "Hey! I'm your AI guide to David's ecosystem. This site is the personal notebook layer, so ask about what David is learning, building, and how the ecosystem sites connect.",
  timestamp: new Date(),
})

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>(() => [createInitialMessage()])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Accessibility: Check for reduced motion preference
  const prefersReducedMotion = useReducedMotion()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth"
    })
  }, [prefersReducedMotion])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  const getAIResponse = useCallback(async (userMessage: string, conversationHistory: Message[]) => {
    setIsTyping(true)
    setError(null)

    // Create abort controller for this request
    abortControllerRef.current = new AbortController()

    try {
      // Prepare messages for API (convert to API format)
      const apiMessages = conversationHistory
        .filter(m => m.id !== "welcome-message") // Exclude welcome message
        .map(m => ({
          role: m.role,
          content: m.content
        }))

      // Add the new user message
      apiMessages.push({ role: "user" as const, content: userMessage })

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: apiMessages }),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        },
      ])
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        return // Silently handle abort
      }
      console.error("AI response failed:", err)
      setError("Something went wrong. Please try again.")
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: "assistant",
          content: `Sorry, I encountered an error. Please try again. For business inquiries, use High Encode Learning: ${businessSiteUrl}.`,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    const currentMessages = [...messages, userMessage]
    setMessages(currentMessages)
    setInput("")
    setError(null)

    await getAIResponse(userMessage.content, messages)
  }, [input, isTyping, messages, getAIResponse])

  const handleQuickAction = useCallback(async (query: string) => {
    if (isTyping) return

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: query,
      timestamp: new Date(),
    }

    const currentMessages = [...messages, userMessage]
    setMessages(currentMessages)
    await getAIResponse(query, messages)
  }, [isTyping, messages, getAIResponse])

  // Memoize animation variants for performance
  const motionVariants = useMemo(() => ({
    button: prefersReducedMotion
      ? {}
      : { hover: { scale: 1.05 }, tap: { scale: 0.95 } },
    panel: prefersReducedMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
      : {
          initial: { opacity: 0, y: 20, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 20, scale: 0.95 }
        },
    message: prefersReducedMotion
      ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
      : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }
  }), [prefersReducedMotion])

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Assistant chat"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`fixed bottom-6 right-6 z-50 ${isOpen ? "hidden" : "flex"} focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:ring-offset-2 focus:ring-offset-[#060a14] rounded-full`}
        whileHover={motionVariants.button.hover}
        whileTap={motionVariants.button.tap}
      >
        <div className="relative">
          {/* Pulse rings - hidden from screen readers */}
          <span className="absolute inset-0 rounded-full bg-[#2dd4bf] animate-pulse-ring" aria-hidden="true" />
          <span
            className="absolute inset-0 rounded-full bg-[#2dd4bf] animate-pulse-ring"
            style={{ animationDelay: "0.5s" }}
            aria-hidden="true"
          />

          {/* Main button */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center shadow-lg glow-teal">
            <Sparkles className="w-7 h-7 text-[#060a14]" aria-hidden="true" />
          </div>

          {/* Status indicator */}
          <span
            className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff6b6b] rounded-full border-2 border-[#060a14] flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-[10px] font-bold text-white">AI</span>
          </span>
        </div>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="AI Assistant chat window"
            {...motionVariants.panel}
            transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-50 ${
              isExpanded ? "inset-4 md:inset-8" : "bottom-6 right-6 w-[380px] h-[600px] max-h-[80vh]"
            }`}
          >
            <div className="w-full h-full glass-strong rounded-2xl overflow-hidden flex flex-col shadow-2xl">
              {/* Header */}
              <header className="p-4 border-b border-[#2dd4bf]/20 flex items-center justify-between bg-gradient-to-r from-[#2dd4bf]/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center" aria-hidden="true">
                    <Bot className="w-5 h-5 text-[#060a14]" />
                  </div>
                  <div>
                    <h2 id="chat-title" className="font-semibold text-white">AI Assistant</h2>
                    <p className="text-xs text-[#2dd4bf]">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label={isExpanded ? "Minimize chat window" : "Expand chat window"}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]"
                  >
                    {isExpanded ? <Minimize2 className="w-4 h-4" aria-hidden="true" /> : <Maximize2 className="w-4 h-4" aria-hidden="true" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat window"
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]"
                  >
                    <X className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </header>

              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto p-4 space-y-4"
                role="log"
                aria-label="Chat messages"
                aria-live="polite"
                aria-relevant="additions"
              >
                {messages.map((message) => (
                  <motion.article
                    key={message.id}
                    {...motionVariants.message}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    aria-label={`${message.role === "user" ? "You" : "AI Assistant"} said`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        message.role === "user" ? "bg-[#ff6b6b]/20 text-[#ff6b6b]" : "bg-[#2dd4bf]/20 text-[#2dd4bf]"
                      }`}
                      aria-hidden="true"
                    >
                      {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user" ? "bg-[#ff6b6b]/20 text-white" : "bg-white/5 text-white/90"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </motion.article>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                    role="status"
                    aria-label="AI Assistant is typing"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#2dd4bf]/20 text-[#2dd4bf] flex items-center justify-center" aria-hidden="true">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white/5 rounded-2xl px-4 py-3">
                      <div className="flex gap-1" aria-hidden="true">
                        <span className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error message */}
                {error && (
                  <div role="alert" className="text-center text-sm text-[#ff6b6b] py-2">
                    {error}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="px-4 py-2 border-t border-white/5">
                  <p className="text-xs text-white/40 mb-2" id="quick-actions-label">Quick actions</p>
                  <div className="flex flex-wrap gap-2" role="group" aria-labelledby="quick-actions-label">
                    {quickActions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => handleQuickAction(action.query)}
                        disabled={isTyping}
                        aria-label={action.label}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#2dd4bf]"
                      >
                        <action.icon className="w-3 h-3" aria-hidden="true" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <label htmlFor="chat-input" className="sr-only">Type your message</label>
                  <input
                    id="chat-input"
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isTyping}
                    aria-describedby={error ? "chat-error" : undefined}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#2dd4bf]/50 focus:ring-2 focus:ring-[#2dd4bf]/20 transition-colors disabled:opacity-50"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    aria-label="Send message"
                    whileHover={!input.trim() || isTyping ? {} : motionVariants.button.hover}
                    whileTap={!input.trim() || isTyping ? {} : motionVariants.button.tap}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center text-[#060a14] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:ring-offset-2 focus:ring-offset-[#060a14]"
                  >
                    <Send className="w-5 h-5" aria-hidden="true" />
                  </motion.button>
                </div>
                {error && <p id="chat-error" className="sr-only">{error}</p>}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
