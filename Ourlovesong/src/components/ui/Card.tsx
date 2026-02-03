"use client";

import { HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { children, variant = "default", padding = "md", className = "", ...props },
    ref
  ) => {
    const baseStyles = "bg-brand-paper rounded-lg";

    const variantStyles = {
      default: "shadow-card border border-gray-200",
      elevated: "shadow-floating border border-gray-200",
    };

    const paddingStyles = {
      none: "",
      sm: "p-4",
      md: "p-6 lg:p-8",
      lg: "p-8 lg:p-10",
    };

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";



