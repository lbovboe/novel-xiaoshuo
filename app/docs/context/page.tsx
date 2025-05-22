'use client';

import DocsWrapper from '@/app/components/docs/DocsWrapper';
import DocLayout from '@/app/components/docs/DocLayout';
import DocSection from '@/app/components/docs/DocSection';
import DocList from '@/app/components/docs/DocList';
import { useLanguage } from '@/app/components/docs/LanguageContext';

export default function ContextPage() {
  const { language } = useLanguage();

  const content = {
    title: language === 'en' ? 'Context' : '上下文',
    description:
      language === 'en'
        ? 'This page documents the main React Contexts used in Novel Xiaoshuo.'
        : '本页面记录了最爱小说网中使用的主要 React 上下文（Context）。',
    sections: {
      contextCategories: {
        title: language === 'en' ? 'Context Categories' : '上下文类别',
        description:
          language === 'en'
            ? 'The application uses several React Contexts to manage global state:'
            : '应用程序使用多个 React 上下文来管理全局状态：',
        items: [
          {
            en: (
              <>
                <strong>BookSettingsContext</strong>: Manages book reading settings (font size, language, auto-next,
                etc.)
              </>
            ),
            zh: (
              <>
                <strong>书籍设置上下文</strong>: 管理阅读设置（字体大小、语言、自动翻页等）
              </>
            ),
          },
          {
            en: (
              <>
                <strong>ThemeContext</strong>: Manages light/dark theme switching
              </>
            ),
            zh: (
              <>
                <strong>主题上下文</strong>: 管理明暗主题切换
              </>
            ),
          },
        ],
      },
    },
  };

  return (
    <DocsWrapper>
      <DocLayout title={content.title} description={content.description}>
        <DocSection title={content.sections.contextCategories.title} delay={0}>
          <p className="mb-4 text-doc_text-secondary_light dark:text-doc_text-secondary_dark">
            {content.sections.contextCategories.description}
          </p>
          <DocList items={content.sections.contextCategories.items.map((item) => item[language])} />
        </DocSection>
      </DocLayout>
    </DocsWrapper>
  );
}
