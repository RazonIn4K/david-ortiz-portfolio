'use client';

import { useState } from 'react';

export function AIAssistant() {
  const [messages, setMessages] = useState<{ type: 'user' | 'assistant'; message: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate/10 bg-slate-50 p-6">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-ink/60">AI Concierge</p>
          <h2 className="text-2xl font-semibold text-ink">Ask about services, process, or availability</h2>
        </div>
        <div className="mt-6 space-y-4 rounded-2xl border border-slate/10 bg-white p-4">
          <div className="h-64 overflow-y-auto rounded-xl border border-slate/10 bg-slate-50 p-4 text-sm text-ink/80">
            {messages.length === 0 && <p className="text-ink/50">Ask me about automations, chatbots, case studies, or security.</p>}
            {messages.map((message, index) => (
              <div key={index} className="mb-3">
                <p className="text-xs uppercase tracking-[0.2em] text-ink/50">
                  {message.type === 'user' ? 'You' : 'Assistant'}
                </p>
                <p>{message.message}</p>
              </div>
            ))}
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              className="flex-1 rounded-xl border border-slate/200 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/50 focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Ask about automations, pricing, onboarding..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
