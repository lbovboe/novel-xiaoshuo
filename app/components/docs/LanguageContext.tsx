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

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Always initialize with 'en' to prevent hydration mismatch
  const [language, setLanguageState] = useState<'en' | 'zh'>('en');
  // Track whether we're on the client
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize language from localStorage on client side only
  useEffect(() => {
    if (isClient) {
      const savedLanguage = localStorage.getItem('docs-language');
      if (savedLanguage === 'en' || savedLanguage === 'zh') {
        setLanguageState(savedLanguage);
      }
    }
  }, [isClient]);

  // Update the language state
  const setLanguage = (lang: 'en' | 'zh') => {
    setLanguageState(lang);

    if (isClient) {
      localStorage.setItem('docs-language', lang);
    }
  };

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};
