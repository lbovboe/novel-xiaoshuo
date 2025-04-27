'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FontSizeOption, LanguageOption, AutoNextOption } from '@/app/types/settings';
import { convertToTraditional, convertToSimplified } from '@/app/utils/chineseConverter';

interface SettingsContextType {
  fontSize: FontSizeOption;
  language: LanguageOption;
  autoNext: AutoNextOption;
  setFontSize: (size: FontSizeOption) => void;
  setLanguage: (lang: LanguageOption) => void;
  setAutoNext: (enabled: AutoNextOption) => void;
  convertText: (text: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSizeState] = useState<FontSizeOption>('medium');
  const [language, setLanguageState] = useState<LanguageOption>('simplified');
  const [autoNext, setAutoNextState] = useState<AutoNextOption>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      const savedFontSize = localStorage.getItem('fontSize');
      const savedLanguage = localStorage.getItem('language');
      const savedAutoNext = localStorage.getItem('autoNext');

      if (savedFontSize) {
        setFontSizeState(savedFontSize as FontSizeOption);
      }

      if (savedLanguage) {
        setLanguageState(savedLanguage as LanguageOption);
      }

      if (savedAutoNext) {
        setAutoNextState(savedAutoNext === 'true');
      }
    }
  }, []);

  const setFontSize = (size: FontSizeOption) => {
    setFontSizeState(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fontSize', size);
    }
  };

  const setLanguage = (lang: LanguageOption) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const setAutoNext = (enabled: AutoNextOption) => {
    setAutoNextState(enabled);
    if (typeof window !== 'undefined') {
      localStorage.setItem('autoNext', enabled.toString());
    }
  };

  const convertText = (text: string) => {
    if (!mounted) return text;
    if (language === 'traditional') {
      return convertToTraditional(text);
    }
    if (language === 'simplified') {
      return convertToSimplified(text);
    }
    return text;
  };

  return (
    <SettingsContext.Provider
      value={{
        fontSize,
        language,
        autoNext,
        setFontSize,
        setLanguage,
        setAutoNext,
        convertText,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
