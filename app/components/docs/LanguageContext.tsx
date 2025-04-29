'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type LanguageContextType = {
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
};

// Create the context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component for the language context
type LanguageProviderProps = {
  children: ReactNode;
};

// Create a global variable to store the current language
let globalLanguage: 'en' | 'zh' = 'en';

// Function to get the initial language preference
const getInitialLanguage = (): 'en' | 'zh' => {
  // Return the global language if it's already set
  if (globalLanguage !== 'en') {
    return globalLanguage;
  }

  // Check localStorage if we're in the browser
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('docs-language');
    if (savedLanguage === 'en' || savedLanguage === 'zh') {
      globalLanguage = savedLanguage;
      return savedLanguage;
    }
  }

  return 'en';
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<'en' | 'zh'>(getInitialLanguage);

  // Update the language state and synchronize globally
  const setLanguage = (lang: 'en' | 'zh') => {
    setLanguageState(lang);
    globalLanguage = lang;

    if (typeof window !== 'undefined') {
      localStorage.setItem('docs-language', lang);

      // Dispatch a custom event to notify other components about the language change
      const event = new CustomEvent('languageChange', { detail: { language: lang } });
      window.dispatchEvent(event);
    }
  };

  // Listen for language change events from other components
  useEffect(() => {
    const handleLanguageChange = (e: any) => {
      const newLang = e.detail.language;
      if (newLang !== language) {
        setLanguageState(newLang);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, [language]);

  // Initialize language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('docs-language');
    if (savedLanguage === 'en' || savedLanguage === 'zh') {
      if (savedLanguage !== language) {
        setLanguageState(savedLanguage);
        globalLanguage = savedLanguage;
      }
    }
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};
