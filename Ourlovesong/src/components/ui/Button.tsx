"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "sparkle";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold rounded-md
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    const variantStyles = {
      primary: `
        bg-brand-espresso text-white shadow-soft
        hover:bg-brand-espresso-light hover:shadow-medium hover:-translate-y-0.5
        active:translate-y-0
      `,
      secondary: `
        bg-transparent text-brand-espresso border border-brand-espresso
        hover:bg-brand-cream
      `,
      gold: `
        bg-brand-gold text-white shadow-soft
        hover:bg-brand-gold-light hover:shadow-medium hover:-translate-y-0.5
        active:translate-y-0
      `,
      sparkle: `
        bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold text-white
        shadow-glow hover:shadow-glow-lg hover:-translate-y-0.5
        active:translate-y-0 bg-[length:200%_100%] animate-shimmer
      `,
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

