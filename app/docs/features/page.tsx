'use client';

import DocsWrapper from '@/app/components/docs/DocsWrapper';
import DocLayout from '@/app/components/docs/DocLayout';
import DocSection from '@/app/components/docs/DocSection';
import DocSubSection from '@/app/components/docs/DocSubSection';
import DocCodeBlock from '@/app/components/docs/DocCodeBlock';
import DocList from '@/app/components/docs/DocList';
import { useLanguage } from '@/app/components/docs/LanguageContext';

// Type for DocList items with optional codeBlock
type DocItem = { description: React.ReactNode; codeBlock?: React.ReactNode };

export default function FeaturesPage() {
  const { language } = useLanguage();

  // Page content based on selected language
  const content = {
    title: language === 'en' ? 'Features' : '功能特性',
    description:
      language === 'en'
        ? 'This page documents all the features available in Novel Xiaoshuo.'
        : '本页面记录了 最爱小说网中所有可用的功能特性。',
    sections: {
      webScraping: {
        title: language === 'en' ? 'Web Scraping' : '网页抓取',
        description:
          language === 'en'
            ? 'Novel Xiaoshuo allows you to scrape novels from Chinese websites. The scraping functionality is powered by:'
            : '最爱小说网允许您从中文网站抓取小说。抓取功能由以下技术驱动：',
        items: [
          {
            description:
              language === 'en' ? (
                <>
                  <strong>axios</strong>: For making HTTP requests
                </>
              ) : (
                <>
                  <strong>axios</strong>: 用于发送 HTTP 请求
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>cheerio</strong>: For parsing HTML
                </>
              ) : (
                <>
                  <strong>cheerio</strong>: 用于解析 HTML
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>iconv-lite</strong>: For character encoding conversion
                </>
              ) : (
                <>
                  <strong>iconv-lite</strong>: 用于字符编码转换
                </>
              ),
          },
        ] as DocItem[],
        subSections: {
          scraperUsage: {
            title: language === 'en' ? 'Scraper Usage' : '抓取器使用方法',
            code: '// Example usage of the scraper\nnode scraper.js <url> [options]',
          },
        },
      },
      textFormatting: {
        title: language === 'en' ? 'Text Formatting' : '文本格式化',
        description: language === 'en' ? 'Text formatting includes:' : '文本格式化包括：',
        items: [
          {
            description:
              language === 'en' ? (
                <>
                  <strong>Traditional to Simplified Chinese</strong>: Convert text using OpenCC
                </>
              ) : (
                <>
                  <strong>繁体转简体中文</strong>: 使用 OpenCC 转换文本
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>Paragraph formatting</strong>: Clean up paragraphs for better readability
                </>
              ) : (
                <>
                  <strong>段落格式化</strong>: 清理段落以提高可读性
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>Custom formatting rules</strong>: Apply specific formatting rules for different sources
                </>
              ) : (
                <>
                  <strong>自定义格式规则</strong>: 为不同来源应用特定的格式化规则
                </>
              ),
          },
        ] as DocItem[],
      },
      readingInterface: {
        title: language === 'en' ? 'Reading Interface' : '阅读界面',
        description: language === 'en' ? 'The reading interface features:' : '阅读界面功能：',
        items: [
          {
            description:
              language === 'en' ? (
                <>
                  <strong>Dark/Light mode</strong>: Toggle between dark and light themes
                </>
              ) : (
                <>
                  <strong>深色/浅色模式</strong>: 切换深色和浅色主题
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>Font size adjustment</strong>: Customize the reading experience
                </>
              ) : (
                <>
                  <strong>字体大小调整</strong>: 自定义阅读体验
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>Chapter navigation</strong>: Easily move between chapters
                </>
              ) : (
                <>
                  <strong>章节导航</strong>: 轻松在章节之间移动
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>Progress tracking</strong>: Keep track of your reading progress
                </>
              ) : (
                <>
                  <strong>进度跟踪</strong>: 记录您的阅读进度
                </>
              ),
          },
        ] as DocItem[],
      },
      pwaSupport: {
        title: language === 'en' ? 'PWA Support' : 'PWA 支持',
        description:
          language === 'en'
            ? 'Novel Xiaoshuo can be installed as a Progressive Web App, providing:'
            : '最爱小说网可以安装为渐进式 Web 应用，提供：',
        items: [
          {
            description:
              language === 'en' ? (
                <>
                  <strong>Offline reading</strong>: Read downloaded novels without an internet connection
                </>
              ) : (
                <>
                  <strong>离线阅读</strong>: 无需互联网连接即可阅读已下载的小说
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>App-like experience</strong>: Install on your home screen for quick access
                </>
              ) : (
                <>
                  <strong>应用般体验</strong>: 安装到主屏幕以便快速访问
                </>
              ),
          },
          {
            description:
              language === 'en' ? (
                <>
                  <strong>Fast loading</strong>: Improved performance with service workers
                </>
              ) : (
                <>
                  <strong>快速加载</strong>: 通过 Service Worker 提高性能
                </>
              ),
          },
        ] as DocItem[],
      },
    },
  };

  return (
    <DocsWrapper>
      <DocLayout title={content.title} description={content.description}>
        <DocSection title={content.sections.webScraping.title} delay={0}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.webScraping.description}
          </p>
          <DocList items={content.sections.webScraping.items} />

          <DocSubSection title={content.sections.webScraping.subSections.scraperUsage.title}>
            <DocCodeBlock code={content.sections.webScraping.subSections.scraperUsage.code} />
          </DocSubSection>
        </DocSection>

        <DocSection title={content.sections.textFormatting.title} delay={1}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.textFormatting.description}
          </p>
          <DocList items={content.sections.textFormatting.items} />
        </DocSection>

        <DocSection title={content.sections.readingInterface.title} delay={2}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.readingInterface.description}
          </p>
          <DocList items={content.sections.readingInterface.items} />
        </DocSection>

        <DocSection title={content.sections.pwaSupport.title} delay={3}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.pwaSupport.description}
          </p>
          <DocList items={content.sections.pwaSupport.items} />
        </DocSection>
      </DocLayout>
    </DocsWrapper>
  );
}
