"use client";

import { useState, useEffect } from "react";

// Simple translation hook that loads from JSON files
// In production, you would replace this with next-i18next or similar

type TranslationDict = Record<string, string | Record<string, any>>;

const loadTranslations = async (locale: string): Promise<TranslationDict> => {
  try {
    const response = await fetch(`/locales/${locale}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${locale}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error loading translations:", error);
    return {};
  }
};

export function useTranslation(locale: string = "en") {
  const [translations, setTranslations] = useState<TranslationDict>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      const dict = await loadTranslations(locale);
      setTranslations(dict);
      setIsLoading(false);
    };

    load();
  }, [locale]);

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split(".");
    let result: any = translations;

    for (const k of keys) {
      if (result && typeof result === "object" && k in result) {
        result = result[k];
      } else {
        // Fallback for development - return the key
        return key;
      }
    }

    // If result is an object, return the key as fallback
    if (typeof result !== "string") {
      return key;
    }

    // Replace placeholders like {{step}} with actual values
    if (params) {
      return result.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
        return params[paramKey] !== undefined ? String(params[paramKey]) : match;
      });
    }

    return result;
  };

  return { t, isLoading };
}



