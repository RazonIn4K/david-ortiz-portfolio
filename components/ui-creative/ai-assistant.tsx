"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Sparkles, Bot, User, Zap, BookOpen, Shield, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickActions = [
  { icon: Zap, label: "Automate my workflows", query: "How can you help automate my business workflows?" },
  { icon: BookOpen, label: "Learn CS & Security", query: "Tell me about your educational programs" },
  { icon: Shield, label: "Security audit", query: "What security services do you offer?" },
]

const generateId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Hey! I'm your AI guide to David's ecosystem. Ask me about automation services, learning programs, or our AI tools like CSBrainAI and Prompt Defenders.",
    timestamp: new Date(),
  },
]

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const simulateResponse = async (userMessage: string) => {
    setIsTyping(true)

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    let response = ""
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("automat") || lowerMessage.includes("workflow")) {
      response =
        "Great question! I specialize in building AI-powered automation using tools like n8n, Make, Zapier, and custom solutions. Whether it's lead qualification, CRM sync, or data pipelines — I can help you save 10+ hours/week. Want to book a discovery call to discuss your specific needs?"
    } else if (
      lowerMessage.includes("learn") ||
      lowerMessage.includes("education") ||
      lowerMessage.includes("program")
    ) {
      response =
        "High Encode Learning offers structured CS & Cybersecurity education with three tiers:\n\n• **Starter** — Self-paced fundamentals\n• **Pro Cohort** — Live sessions + projects\n• **Team** — Custom training for organizations\n\nPlus, you get access to CSBrainAI for personalized learning assistance!"
    } else if (lowerMessage.includes("security") || lowerMessage.includes("audit")) {
      response =
        "I offer comprehensive SaaS security audits including OSINT reconnaissance, vulnerability assessments, and security gate implementation. Also check out Prompt Defenders — our tool for testing AI systems against prompt injection attacks."
    } else if (lowerMessage.includes("csbrain") || lowerMessage.includes("ai tool")) {
      response =
        "CSBrainAI is an AI learning companion trained on CS fundamentals and security concepts. It helps students understand complex topics through conversation. Prompt Defenders tests LLM applications for security vulnerabilities. Both are part of the ecosystem!"
    } else {
      response =
        "I can help you with:\n\n• **Automation** — AI workflows, chatbots, integrations\n• **Education** — CS & security learning programs\n• **Security** — Audits, vulnerability testing\n• **AI Tools** — CSBrainAI, Prompt Defenders\n\nWhat interests you most?"
    }

    setIsTyping(false)
    setMessages((prev) => [
      ...prev,
      {
        id: generateId(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      },
    ])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    await simulateResponse(userMessage.content)
  }

  const handleQuickAction = async (query: string) => {
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: query,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    await simulateResponse(query)
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 ${isOpen ? "hidden" : "flex"}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          {/* Pulse rings */}
          <span className="absolute inset-0 rounded-full bg-[#2dd4bf] animate-pulse-ring" />
          <span
            className="absolute inset-0 rounded-full bg-[#2dd4bf] animate-pulse-ring"
            style={{ animationDelay: "0.5s" }}
          />

          {/* Main button */}
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center shadow-lg glow-teal">
            <Sparkles className="w-7 h-7 text-[#060a14]" />
          </div>

          {/* Status indicator */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff6b6b] rounded-full border-2 border-[#060a14] flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">AI</span>
          </span>
        </div>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`fixed z-50 ${
              isExpanded ? "inset-4 md:inset-8" : "bottom-6 right-6 w-[380px] h-[600px] max-h-[80vh]"
            }`}
          >
            <div className="w-full h-full glass-strong rounded-2xl overflow-hidden flex flex-col shadow-2xl">
              {/* Header */}
              <div className="p-4 border-b border-[#2dd4bf]/20 flex items-center justify-between bg-gradient-to-r from-[#2dd4bf]/10 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#060a14]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <p className="text-xs text-[#2dd4bf]">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/60 hover:text-white"
                  >
                    {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors text-white/60 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        message.role === "user" ? "bg-[#ff6b6b]/20 text-[#ff6b6b]" : "bg-[#2dd4bf]/20 text-[#2dd4bf]"
                      }`}
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
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#2dd4bf]/20 text-[#2dd4bf] flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-white/5 rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-[#2dd4bf] rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 2 && (
                <div className="px-4 py-2 border-t border-white/5">
                  <p className="text-xs text-white/40 mb-2">Quick actions</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleQuickAction(action.query)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs transition-colors"
                      >
                        <action.icon className="w-3 h-3" />
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#2dd4bf]/50 transition-colors"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2dd4bf] to-[#22d3ee] flex items-center justify-center text-[#060a14] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
