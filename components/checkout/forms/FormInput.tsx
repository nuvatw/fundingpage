'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="space-y-1.5">
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-neutral-700"
        >
          {label}
          {props.required && (
            <span className="text-red-500 ml-0.5">*</span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-3 rounded-lg border',
            'text-neutral-900 placeholder:text-neutral-400',
            'transition-colors duration-150',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-200',
            'disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />

        {hint && !error && (
          <p className="text-xs text-neutral-500">{hint}</p>
        )}

        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-red-600 flex items-center gap-1"
          >
            <svg
              className="w-4 h-4 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
