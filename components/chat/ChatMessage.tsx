'use client';

import { FC } from 'react';
import { ChatAvatar } from './ChatAvatar';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export const ChatMessage: FC<ChatMessageProps> = ({ role, content, timestamp }) => {
  const isUser = role === 'user';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <ChatAvatar type={role} />
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-teal-500/20 border border-teal-400/30 text-white'
            : 'bg-white/5 border border-white/10 text-white/90'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        {timestamp && (
          <p
            className={`mt-1 text-xs ${
              isUser ? 'text-teal-400/60' : 'text-white/40'
            }`}
          >
            {formatTime(timestamp)}
          </p>
        )}
      </div>
    </div>
  );
};
