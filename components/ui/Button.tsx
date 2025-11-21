import { ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-teal-500 hover:bg-teal-400 text-white hover:shadow-lg hover:shadow-teal-500/30',
  secondary: 'border border-teal-500/50 hover:border-teal-400 hover:bg-teal-500/10 text-white',
  outline: 'border border-white/20 hover:border-teal-400 hover:bg-white/5 text-white'
};

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-lg px-8 py-4 text-base font-semibold transition-all duration-300',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
