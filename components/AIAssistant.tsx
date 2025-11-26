'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export function AIAssistant() {
  const [messages, setMessages] = useState<{ type: 'user' | 'assistant'; message: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0 || loading) {
      scrollToBottom();
    }
  }, [messages, loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);
    const newMessage = { type: 'user' as const, message: input.trim() };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage.message, sessionId: 'portfolio', history: messages })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Chat error');
      }
      setMessages((prev) => [...prev, { type: 'assistant', message: data.response }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to process message');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-navy py-20 relative overflow-hidden">
      {/* Background context */}
      <div className="absolute inset-0 bg-grid-light opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="relative mx-auto max-w-4xl px-4">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">

          <div className="flex flex-col gap-2 text-center mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-teal-400">AI Concierge</p>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Ask about services, process, or availability</h2>
          </div>

          <div className="flex flex-col h-[500px]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent mb-4">
              {messages.length === 0 && (
                <div className="flex h-full flex-col items-center justify-center text-center text-white/40 p-8">
                  <div className="mb-4 rounded-full bg-white/5 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <p>Ask me about automations, chatbots, case studies, or security.</p>
                </div>
              )}

              <AnimatePresence initial={false}>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={clsx(
                      "flex gap-3",
                      message.type === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.type === 'assistant' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-accent flex items-center justify-center text-white text-xs font-bold shadow-lg">
                        AI
                      </div>
                    )}

                    <div
                      className={clsx(
                        "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-lg",
                        message.type === 'user'
                          ? "bg-teal-500/20 border border-teal-400/30 text-white rounded-tr-sm"
                          : "bg-white/5 border border-white/10 text-white/90 rounded-tl-sm"
                      )}
                    >
                      {message.message}
                    </div>

                    {message.type === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/60 text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-accent flex items-center justify-center text-white text-xs font-bold shadow-lg">
                    AI
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex items-center gap-1.5 h-[54px]">
                    <motion.div
                      className="w-1.5 h-1.5 bg-teal-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-teal-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-teal-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {error && <p className="text-sm text-red-400 mb-3 px-2">{error}</p>}

            <form onSubmit={handleSubmit} className="relative">
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 pr-12 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                placeholder="Ask about automations, pricing, onboarding..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="absolute right-2 top-2 bottom-2 aspect-square rounded-lg bg-teal-500 flex items-center justify-center text-white transition-colors hover:bg-teal-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-teal-500"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>

            <div className="mt-4 flex justify-center">
               <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-white/40 backdrop-blur-sm">
                  Powered by GPT-4
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
