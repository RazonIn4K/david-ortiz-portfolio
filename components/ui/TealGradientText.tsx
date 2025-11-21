import { ReactNode } from 'react';
import clsx from 'clsx';

export interface TealGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function TealGradientText({ children, className }: TealGradientTextProps) {
  return (
    <span
      className={clsx(
        'bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </span>
  );
}
