'use client';

import { forwardRef, ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary: cn(
        'bg-primary-600 text-white',
        'hover:bg-primary-700',
        'active:bg-primary-800 active:scale-[0.98]',
        'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
      ),
      secondary: cn(
        'bg-white text-primary-600 border border-primary-300',
        'hover:bg-primary-50 hover:border-primary-400',
        'active:bg-primary-100',
        'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2'
      ),
      ghost: cn(
        'bg-transparent text-neutral-700',
        'hover:bg-neutral-100',
        'active:bg-neutral-200',
        'focus-visible:ring-2 focus-visible:ring-neutral-400'
      ),
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center',
          'font-semibold',
          'rounded-lg',
          'transition-all duration-150',
          'select-none',
          'focus:outline-none',
          // Disabled state
          'disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed disabled:border-transparent',
          // Variant and size
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span>{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
