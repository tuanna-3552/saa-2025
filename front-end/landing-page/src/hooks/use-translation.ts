"use client";

import { useLanguage } from "@saa/shared-ui";
import vi from "../locales/vi.json";
import en from "../locales/en.json";

const dictionaries = {
  VN: vi,
  EN: en,
};

export function useTranslation() {
  const { language } = useLanguage();
  const dict: any = dictionaries[language] || vi;

  function t(key: string): string {
    const keys = key.split(".");
    let current = dict;
    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        return key; // Fallback to raw key if not found
      }
    }
    return typeof current === "string" ? current : key;
  }

  return { t, language };
}
