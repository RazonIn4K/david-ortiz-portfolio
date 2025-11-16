import { NextResponse } from 'next/server';

type HistoryMessage = {
  type: 'user' | 'assistant';
  message: string;
};

const chatRateLimitStore = new Map<string, number[]>();
const CHAT_RATE_LIMIT = { windowMs: 60 * 1000, maxRequests: 10 };

function validate(body: any) {
  const errors: Record<string, string> = {};
  if (!body?.message || typeof body.message !== 'string' || !body.message.trim()) {
    errors.message = 'Message is required';
  } else if (body.message.length > 1000) {
    errors.message = 'Message is too long';
  }
  if (!body?.sessionId || typeof body.sessionId !== 'string') {
    errors.sessionId = 'Session ID is required';
  }
  if (body?.history && !Array.isArray(body.history)) {
    errors.history = 'History must be an array';
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

function rateLimit(sessionId: string) {
  const now = Date.now();
  const windowStart = now - CHAT_RATE_LIMIT.windowMs;
  const requests = chatRateLimitStore.get(sessionId) ?? [];
  const recent = requests.filter((timestamp) => timestamp > windowStart);
  if (recent.length >= CHAT_RATE_LIMIT.maxRequests) {
    return { allowed: false, retryAfter: Math.ceil((recent[0] + CHAT_RATE_LIMIT.windowMs - now) / 1000) };
  }
  recent.push(now);
  chatRateLimitStore.set(sessionId, recent);
  return { allowed: true };
}

async function sendToOpenRouter(message: string, history: HistoryMessage[] = []) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('Missing OpenRouter credentials');
  }
  const messages = [
    {
      role: 'system',
      content:
        "You are the concierge for David Ortiz's AI automation studio. Keep replies under 150 tokens, focus on automations, chatbots, scraping, and AI security."
    },
    ...history
      .slice(-5)
      .map((item) => ({ role: item.type === 'user' ? 'user' : 'assistant', content: item.message })),
    { role: 'user', content: message }
  ];

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.SITE_URL || 'https://cs-learning.me',
      'X-Title': 'David Ortiz Portfolio Chat'
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_PRIMARY_MODEL || 'x-ai/grok-4-fast:free',
      messages,
      max_tokens: 200,
      temperature: 0.6
    })
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error?.message || 'OpenRouter error');
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content as string;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const validation = validate(body);
  if (!validation.valid) {
    return NextResponse.json({ error: 'Validation failed', details: validation.errors }, { status: 400 });
  }

  const { sessionId, message, history } = body as { sessionId: string; message: string; history?: HistoryMessage[] };
  const limit = rateLimit(sessionId);
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Too many requests', retryAfter: limit.retryAfter }, { status: 429 });
  }

  try {
    const reply = await sendToOpenRouter(message, history);
    return NextResponse.json({ response: reply });
  } catch (error) {
    return NextResponse.json({ error: 'AI service temporarily unavailable' }, { status: 502 });
  }
}
