'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<string>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('selectedLanguage') || 'en';
      setLanguageState(savedLang);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleLanguageChange = (e: CustomEvent) => {
        setLanguageState(e.detail);
      };

      window.addEventListener('languageChange', handleLanguageChange as EventListener);
      return () => {
        window.removeEventListener('languageChange', handleLanguageChange as EventListener);
      };
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedLanguage', lang);
      window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
    }
  };

  const t = (key: string): string => {
    const { getTranslation } = require('@/app/lib/translations');
    return getTranslation(language, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

