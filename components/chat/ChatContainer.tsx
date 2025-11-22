'use client';

import { FC, ReactNode } from 'react';

interface ChatContainerProps {
  title?: string;
  subtitle?: string;
  isOpen?: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export const ChatContainer: FC<ChatContainerProps> = ({
  title,
  subtitle,
  isOpen = true,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      {(title || onClose) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex flex-col gap-1">
            {title && (
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-400">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-sm text-white/60">{subtitle}</p>
            )}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center h-8 w-8 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label="Close chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  );
};
