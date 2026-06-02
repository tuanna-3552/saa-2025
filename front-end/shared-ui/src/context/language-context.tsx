"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "VN" | "EN";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("VN");

  useEffect(() => {
    // Read from localStorage on mount (client-side only)
    const stored = localStorage.getItem("saa-language");
    if (stored === "VN" || stored === "EN") {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("saa-language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  const [localLang, setLocalLang] = useState<Language>("VN");

  if (context) {
    return context;
  }

  return {
    language: localLang,
    setLanguage: setLocalLang,
  };
}
