'use client';

import { FC } from 'react';

interface ChatAvatarProps {
  type: 'user' | 'assistant';
  initials?: string;
}

export const ChatAvatar: FC<ChatAvatarProps> = ({ type, initials = 'U' }) => {
  if (type === 'user') {
    return (
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-500/30 border border-teal-400/40 text-teal-400 text-xs font-semibold">
        {initials}
      </div>
    );
  }

  // Assistant avatar with robot icon
  return (
    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-cyan-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
        <circle cx="8" cy="16" r="1" fill="currentColor" />
        <circle cx="16" cy="16" r="1" fill="currentColor" />
      </svg>
    </div>
  );
};
