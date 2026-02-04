"use client";

import { HTMLAttributes, forwardRef } from "react";
import { motion } from "framer-motion";

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "cream" | "paper" | "dark" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      children,
      variant = "default",
      size = "lg",
      className = "",
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: "bg-brand-cream",
      cream: "bg-brand-cream",
      paper: "bg-brand-paper",
      dark: "bg-brand-espresso",
      gold: "bg-brand-gold-light",
    };

    const sizeStyles = {
      sm: "py-8 px-4",
      md: "py-12 px-4 sm:px-6",
      lg: "py-16 px-4 sm:px-6 lg:px-8",
      xl: "py-20 px-4 sm:px-6 lg:px-8",
    };

    return (
      <section
        ref={ref}
        className={`
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </section>
    );
  }
);

Section.displayName = "Section";


