import { clsx, type ClassValue } from "clsx";

/**
 * Combines class names using clsx for conditional styling.
 * Provides a clean way to merge multiple class values.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Format a date for display in localized format.
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Calculate the estimated delivery date based on urgency.
 */
export function getEstimatedDeliveryDate(urgency: "standard" | "rush"): Date {
  const daysToAdd = urgency === "rush" ? 1 : 7;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
  return deliveryDate;
}

/**
 * Format currency amount for display.
 */
export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

/**
 * Generate a random ID for temporary use.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

/**
 * Truncate text to a maximum length with ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Delay execution for a specified number of milliseconds.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}



