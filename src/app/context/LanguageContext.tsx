"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";

interface LanguageContextType {
  language: "es" | "en";
  setLanguage: (lang: "es" | "en") => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<"es" | "en">("es");

  useEffect(() => {
    // Cargar idioma guardado del localStorage
    const savedLanguage = (localStorage.getItem("language") as "es" | "en") || "es";
    setLanguage(savedLanguage);
  }, []);

  const handleSetLanguage = (lang: "es" | "en") => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
