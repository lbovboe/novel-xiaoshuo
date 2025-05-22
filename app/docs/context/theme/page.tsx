'use client';

import DocsWrapper from '@/app/components/docs/DocsWrapper';
import DocLayout from '@/app/components/docs/DocLayout';
import DocSection from '@/app/components/docs/DocSection';
import DocList from '@/app/components/docs/DocList';
import DocCodeBlock from '@/app/components/docs/DocCodeBlock';
import { useLanguage } from '@/app/components/docs/LanguageContext';

// Type for DocList items with optional codeBlock
type DocItem = { description: React.ReactNode; codeBlock?: React.ReactNode };

export default function ThemeContextPage() {
  const { language } = useLanguage();

  const content = {
    title: language === 'en' ? 'ThemeContext' : '主题上下文',
    description:
      language === 'en'
        ? 'Manages the application theme (light/dark mode) and provides a toggle function.'
        : '管理应用程序主题（明暗模式）并提供切换功能。',
    sections: {
      overview: {
        title: language === 'en' ? 'Overview' : '概述',
        description:
          language === 'en'
            ? 'ThemeContext provides a global state for theme management, allowing users to switch between light and dark modes.'
            : 'ThemeContext 提供主题管理的全局状态，使用户可以在明暗模式之间切换。',
      },
      features: {
        title: language === 'en' ? 'Key Features' : '主要功能',
        items: [
          { description: language === 'en' ? 'Light and dark mode switching' : '明暗模式切换' },
          {
            description:
              language === 'en' ? 'Persistent theme preference with localStorage' : '通过 localStorage 持久化主题偏好',
          },
          { description: language === 'en' ? 'Easy access via useTheme hook' : '通过 useTheme 钩子轻松访问' },
        ] as DocItem[],
      },
      usage: {
        title: language === 'en' ? 'Usage Example' : '用法示例',
        description:
          language === 'en'
            ? 'Use the useTheme hook to access and toggle the theme:'
            : '使用 useTheme 钩子来访问和切换主题：',
        code: `import { useTheme } from '@/app/context/ThemeContext';

const { theme, toggleTheme } = useTheme();

// Example: Toggle theme
toggleTheme();`,
      },
    },
  };

  return (
    <DocsWrapper>
      <DocLayout title={content.title} description={content.description}>
        <DocSection title={content.sections.overview.title} delay={0}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.overview.description}
          </p>
        </DocSection>
        <DocSection title={content.sections.features.title} delay={1}>
          <DocList items={content.sections.features.items} />
        </DocSection>
        <DocSection title={language === 'en' ? 'Setup & Integration' : '设置与集成'} delay={1.5}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {language === 'en'
              ? 'To use the ThemeContext, wrap your application with the ThemeProvider and use the useTheme hook to access and toggle the theme globally.'
              : '要使用 ThemeContext，请用 ThemeProvider 包裹应用，并通过 useTheme 钩子全局访问和切换主题。'}
          </p>
          <DocCodeBlock
            code={`// app/context/ThemeContext.tsx
import { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}`}
          />
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mt-4 mb-2">
            {language === 'en'
              ? 'Integrate the provider at the root of your app (e.g., in app/layout.tsx):'
              : '在应用根部集成 Provider（如 app/layout.tsx）：'}
          </p>
          <DocCodeBlock
            code={`// app/layout.tsx
import { ThemeProvider } from '@/app/context/ThemeContext';

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}`}
          />
        </DocSection>
        <DocSection title={content.sections.usage.title} delay={2}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.usage.description}
          </p>
          <DocCodeBlock code={content.sections.usage.code} />
        </DocSection>
      </DocLayout>
    </DocsWrapper>
  );
}
