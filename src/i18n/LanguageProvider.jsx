"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import en from "./translations/en.json";
import pt from "./translations/pt.json";

const SUPPORTED_LANGUAGES = ["en", "pt"];

const translationsMap = { en, pt };

const LanguageContext = createContext({
  language: "en",
  t: (key) => key,
  setLanguage: () => {},
  toggleLanguage: () => {}
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
    if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
      setLanguage(stored);
      return;
    }
    // Default: try browser language, fallback to en
    const browser = typeof navigator !== "undefined" ? (navigator.language || navigator.userLanguage || "en") : "en";
    const normalized = browser.toLowerCase().startsWith("pt") ? "pt" : "en";
    setLanguage(normalized);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lang", language);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = useCallback((key) => {
    const dict = translationsMap[language] || translationsMap.en;
    const value = key.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : undefined), dict);
    return value != null ? value : key;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === "en" ? "pt" : "en"));
  }, []);

  const contextValue = useMemo(() => ({ language, t, setLanguage, toggleLanguage }), [language, t, toggleLanguage]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}


