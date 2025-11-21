import { ReactNode } from 'react';
import clsx from 'clsx';

export interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassmorphismCard({
  children,
  className,
  hover = false
}: GlassmorphismCardProps) {
  return (
    <div
      className={clsx(
        'backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl',
        hover && 'hover:bg-white/10 hover:border-teal-400/50 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}
