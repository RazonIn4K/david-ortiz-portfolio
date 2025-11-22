'use client';

import { FC } from 'react';

export const TypingIndicator: FC = () => {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <span
        className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"
        style={{ animationDelay: '0ms', animationDuration: '1s' }}
      />
      <span
        className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"
        style={{ animationDelay: '200ms', animationDuration: '1s' }}
      />
      <span
        className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"
        style={{ animationDelay: '400ms', animationDuration: '1s' }}
      />
    </div>
  );
};
