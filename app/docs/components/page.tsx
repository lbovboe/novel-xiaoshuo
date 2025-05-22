'use client';

import DocsWrapper from '@/app/components/docs/DocsWrapper';
import DocLayout from '@/app/components/docs/DocLayout';
import DocSection from '@/app/components/docs/DocSection';
import DocList from '@/app/components/docs/DocList';
import { useLanguage } from '@/app/components/docs/LanguageContext';

export default function ComponentsPage() {
  const { language } = useLanguage();

  // Page content based on selected language
  const content = {
    title: language === 'en' ? 'UI Components' : 'UI 组件',
    description:
      language === 'en'
        ? 'This page documents the main UI components used in Novel Xiaoshuo.'
        : '本页面记录了 最爱小说网中使用的主要 UI 组件。',
    sections: {
      componentCategories: {
        title: language === 'en' ? 'Component Categories' : '组件类别',
        description:
          language === 'en'
            ? 'The application is built with several component categories:'
            : '应用程序由以下几类组件构成：',
        items: [
          {
            en: (
              <>
                <strong>UI Components</strong>: Generic UI elements
              </>
            ),
            zh: (
              <>
                <strong>UI 组件</strong>: 通用 UI 元素
              </>
            ),
          },
          {
            en: (
              <>
                <strong>Headers</strong>: Navigation and header components
              </>
            ),
            zh: (
              <>
                <strong>页眉</strong>: 导航和页头组件
              </>
            ),
          },
          {
            en: (
              <>
                <strong>Book Components</strong>: Book-specific UI elements
              </>
            ),
            zh: (
              <>
                <strong>书籍组件</strong>: 书籍特定的 UI 元素
              </>
            ),
          },
          {
            en: (
              <>
                <strong>Footer</strong>: Footer components
              </>
            ),
            zh: (
              <>
                <strong>页脚</strong>: 页脚组件
              </>
            ),
          },
          {
            en: (
              <>
                <strong>Animation</strong>: Animation-related components
              </>
            ),
            zh: (
              <>
                <strong>动画</strong>: 动画相关组件
              </>
            ),
          },
          {
            en: (
              <>
                <strong>Tools</strong>: Utility UI components
              </>
            ),
            zh: (
              <>
                <strong>工具</strong>: 实用工具组件
              </>
            ),
          },
        ],
      },
      themeManagement: {
        title: language === 'en' ? 'Theme Management' : '主题管理',
        description:
          language === 'en'
            ? 'Novel Xiaoshuo includes a theme system with components like:'
            : '最爱小说网包含带有以下组件的主题系统：',
        items: [
          {
            en: (
              <>
                <strong>ClientThemeWrapper</strong>: Manages theme on the client-side
              </>
            ),
            zh: (
              <>
                <strong>客户端主题包装器</strong>: 管理客户端主题
              </>
            ),
          },
          {
            en: (
              <>
                <strong>ThemeMetadata</strong>: Handles theme-related metadata
              </>
            ),
            zh: (
              <>
                <strong>主题元数据</strong>: 处理主题相关的元数据
              </>
            ),
          },
        ],
      },
      headerComponents: {
        title: language === 'en' ? 'Header Components' : '页眉组件',
        description:
          language === 'en'
            ? 'Header components handle navigation and app-wide controls.'
            : '页眉组件处理导航和应用范围的控制。',
      },
      bookComponents: {
        title: language === 'en' ? 'Book Components' : '书籍组件',
        description:
          language === 'en'
            ? 'Book components are specifically designed for displaying and interacting with book content, including:'
            : '书籍组件专门为显示和交互书籍内容而设计，包括：',
        items: [
          language === 'en' ? 'Chapter navigation' : '章节导航',
          language === 'en' ? 'Reading interface' : '阅读界面',
          language === 'en' ? 'Book metadata display' : '书籍元数据显示',
        ],
      },
      animationComponents: {
        title: language === 'en' ? 'Animation Components' : '动画组件',
        description:
          language === 'en'
            ? 'These components provide animated UI elements for a more engaging user experience.'
            : '这些组件提供了动画 UI 元素，以提供更具吸引力的用户体验。',
      },
      toolsComponents: {
        title: language === 'en' ? 'Tools Components' : '工具组件',
        description: language === 'en' ? 'Tool components offer utility functions like:' : '工具组件提供以下实用功能：',
        items: [
          language === 'en' ? 'Text formatting controls' : '文本格式化控制',
          language === 'en' ? 'Search functionality' : '搜索功能',
          language === 'en' ? 'Settings management' : '设置管理',
        ],
      },
    },
  };

  return (
    <DocsWrapper>
      <DocLayout title={content.title} description={content.description}>
        <DocSection title={content.sections.componentCategories.title} delay={0}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.componentCategories.description}
          </p>
          <DocList items={content.sections.componentCategories.items.map((item) => item[language])} />
        </DocSection>

        <DocSection title={content.sections.themeManagement.title} delay={1}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.themeManagement.description}
          </p>
          <DocList items={content.sections.themeManagement.items.map((item) => item[language])} />
        </DocSection>

        <DocSection title={content.sections.headerComponents.title} delay={2}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.headerComponents.description}
          </p>
        </DocSection>

        <DocSection title={content.sections.bookComponents.title} delay={3}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.bookComponents.description}
          </p>
          <DocList items={content.sections.bookComponents.items} />
        </DocSection>

        <DocSection title={content.sections.animationComponents.title} delay={4}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.animationComponents.description}
          </p>
        </DocSection>

        <DocSection title={content.sections.toolsComponents.title} delay={5}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.toolsComponents.description}
          </p>
          <DocList items={content.sections.toolsComponents.items} />
        </DocSection>
      </DocLayout>
    </DocsWrapper>
  );
}
