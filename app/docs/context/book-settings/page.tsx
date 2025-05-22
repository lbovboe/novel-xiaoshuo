'use client';

import DocsWrapper from '@/app/components/docs/DocsWrapper';
import DocLayout from '@/app/components/docs/DocLayout';
import DocSection from '@/app/components/docs/DocSection';
import DocList from '@/app/components/docs/DocList';
import DocCodeBlock from '@/app/components/docs/DocCodeBlock';
import { useLanguage } from '@/app/components/docs/LanguageContext';

// Type for DocList items with optional codeBlock
type DocItem = { description: React.ReactNode; codeBlock?: React.ReactNode };

export default function BookSettingsContextPage() {
  const { language } = useLanguage();

  const content = {
    title: language === 'en' ? 'BookSettingsContext' : '书籍设置上下文',
    description:
      language === 'en'
        ? 'Manages user reading settings such as font size, language, and auto-next.'
        : '管理用户的阅读设置，如字体大小、语言和自动翻页。',
    sections: {
      overview: {
        title: language === 'en' ? 'Overview' : '概述',
        description:
          language === 'en'
            ? 'BookSettingsContext (SettingsContext) provides a global state for book reading preferences, allowing users to customize their reading experience.'
            : 'BookSettingsContext（SettingsContext）为阅读偏好提供全局状态，使用户可以自定义阅读体验。',
      },
      features: {
        title: language === 'en' ? 'Key Features' : '主要功能',
        items: [
          {
            description:
              language === 'en'
                ? 'Font size selection (small, medium, large, x-large)'
                : '字体大小选择（小、中、大、超大）',
          },
          {
            description:
              language === 'en' ? 'Language switching (simplified/traditional Chinese)' : '语言切换（简体/繁体中文）',
          },
          { description: language === 'en' ? 'Auto-next chapter toggle' : '自动翻页开关' },
          { description: language === 'en' ? 'Persistent settings with localStorage' : '通过 localStorage 持久化设置' },
        ] as DocItem[],
      },
      usage: {
        title: language === 'en' ? 'Usage Example' : '用法示例',
        description:
          language === 'en'
            ? 'Use the useSettings hook to access and update reading settings:'
            : '使用 useSettings 钩子来访问和更新阅读设置：',
        code: `import { useSettings } from '@/app/context/SettingsContext';

const { fontSize, setFontSize, language, setLanguage, autoNext, setAutoNext } = useSettings();

// Example: Change font size
setFontSize('large');
// Example: Switch language
setLanguage('traditional');
// Example: Toggle auto-next
setAutoNext(true);`,
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
          <DocList
            items={content.sections.features.items.map((item) => (
              <>
                {item.description}
                {item.codeBlock ? item.codeBlock : null}
              </>
            ))}
          />
        </DocSection>
        <DocSection title={language === 'en' ? 'Setup & Integration' : '设置与集成'} delay={1.5}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {language === 'en'
              ? 'To use the BookSettingsContext (SettingsContext), wrap your application with the SettingsProvider and use the useSettings hook to access and update user reading preferences globally.'
              : '要使用 BookSettingsContext（SettingsContext），请用 SettingsProvider 包裹应用，并通过 useSettings 钩子全局访问和更新用户阅读偏好。'}
          </p>
          <DocCodeBlock
            code={`// SettingsContext setup (app/context/SettingsContext.tsx)
import { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // ...state and logic...
  return (
    <SettingsContext.Provider value={{ /* values */ }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}`}
          />
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mt-4 mb-2">
            {language === 'en'
              ? 'Integrate the provider at the root of your app (e.g., in app/layout.tsx):'
              : '在应用根部集成 Provider（如 app/layout.tsx）：'}
          </p>
          <DocCodeBlock
            code={`// app/layout.tsx
import { SettingsProvider } from '@/app/context/SettingsContext';

export default function RootLayout({ children }) {
  return (
    <SettingsProvider>
      {children}
    </SettingsProvider>
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
