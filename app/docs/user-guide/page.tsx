'use client';

import DocsWrapper from '@/app/components/docs/DocsWrapper';
import DocLayout from '@/app/components/docs/DocLayout';
import DocSection from '@/app/components/docs/DocSection';
import DocSubSection from '@/app/components/docs/DocSubSection';
import DocCodeBlock from '@/app/components/docs/DocCodeBlock';
import DocList from '@/app/components/docs/DocList';
import { useLanguage } from '@/app/components/docs/LanguageContext';

export default function UserGuidePage() {
  const { language } = useLanguage();

  // Page content based on selected language
  const content = {
    title: language === 'en' ? 'User Guide' : '用户指南',
    description:
      language === 'en'
        ? 'This guide will help you get the most out of Novel Xiaoshuo.'
        : '本指南将帮助您充分利用 最爱小说网。',
    sections: {
      gettingStarted: {
        title: language === 'en' ? 'Getting Started' : '入门',
        description:
          language === 'en'
            ? 'Novel Xiaoshuo is a web application for reading Chinese novels. To get started:'
            : '最爱小说网是一个用于阅读中文小说的 Web 应用程序。开始使用：',
        items: [
          language === 'en' ? 'Visit the main page' : '访问主页',
          language === 'en' ? 'Browse available novels or import your own' : '浏览可用小说或导入您自己的小说',
          language === 'en' ? 'Click on a novel to start reading' : '点击小说开始阅读',
        ],
      },
      readingNovel: {
        title: language === 'en' ? 'Reading a Novel' : '阅读小说',
        subSections: {
          navigation: {
            title: language === 'en' ? 'Navigation' : '导航',
            items: [
              language === 'en'
                ? 'Use the left and right arrows or swipe to navigate between chapters'
                : '使用左右箭头或滑动在章节之间导航',
              language === 'en' ? 'The table of contents is available from the menu button' : '目录可从菜单按钮获取',
              language === 'en' ? 'Your reading progress is automatically saved' : '您的阅读进度会自动保存',
            ],
          },
          readingSettings: {
            title: language === 'en' ? 'Reading Settings' : '阅读设置',
            description: language === 'en' ? 'You can customize your reading experience:' : '您可以自定义阅读体验：',
            items: [
              language === 'en' ? (
                <>
                  <strong>Dark/Light Mode</strong>: Toggle between dark and light themes
                </>
              ) : (
                <>
                  <strong>深色/浅色模式</strong>: 在深色和浅色主题之间切换
                </>
              ),
              language === 'en' ? (
                <>
                  <strong>Font Size</strong>: Adjust the text size for comfortable reading
                </>
              ) : (
                <>
                  <strong>字体大小</strong>: 调整文本大小以便舒适阅读
                </>
              ),
              language === 'en' ? (
                <>
                  <strong>Line Spacing</strong>: Customize the spacing between lines
                </>
              ) : (
                <>
                  <strong>行间距</strong>: 自定义行与行之间的间距
                </>
              ),
              language === 'en' ? (
                <>
                  <strong>Font Family</strong>: Choose your preferred font
                </>
              ) : (
                <>
                  <strong>字体系列</strong>: 选择您喜欢的字体
                </>
              ),
            ],
          },
        },
      },
      importingNovels: {
        title: language === 'en' ? 'Importing Novels' : '导入小说',
        description: language === 'en' ? 'You can import novels in several ways:' : '您可以通过几种方式导入小说：',
        items: [
          language === 'en' ? (
            <>
              <strong>Web Scraping</strong>: Enter a URL to scrape a novel from a supported website
              <DocCodeBlock code="npm run scrape <url>" />
            </>
          ) : (
            <>
              <strong>网页抓取</strong>: 输入 URL 从支持的网站抓取小说
              <DocCodeBlock code="npm run scrape <url>" />
            </>
          ),
          language === 'en' ? (
            <>
              <strong>Local Files</strong>: Import local text files
            </>
          ) : (
            <>
              <strong>本地文件</strong>: 导入本地文本文件
            </>
          ),
        ],
      },
      convertingText: {
        title: language === 'en' ? 'Converting Text' : '转换文本',
        description:
          language === 'en'
            ? 'Novel Xiaoshuo supports conversion between Traditional and Simplified Chinese:'
            : '最爱小说网支持繁体中文和简体中文之间的转换：',
        items: [
          language === 'en' ? 'Go to the Text Tools section' : '转到"文本工具"部分',
          language === 'en' ? 'Select your conversion preference' : '选择您的转换首选项',
          language === 'en' ? 'Import your text' : '导入您的文本',
          language === 'en' ? 'Download the converted text' : '下载转换后的文本',
        ],
      },
      usingAsPWA: {
        title: language === 'en' ? 'Using as a PWA' : '作为 PWA 使用',
        description:
          language === 'en'
            ? 'Novel Xiaoshuo can be installed as a Progressive Web App:'
            : '最爱小说网可以安装为渐进式 Web 应用：',
        items: [
          language === 'en' ? 'Visit the website in a supported browser' : '使用支持的浏览器访问网站',
          language === 'en'
            ? 'Click the "Install" button in the address bar or menu'
            : '点击地址栏或菜单中的"安装"按钮',
          language === 'en'
            ? 'The app will be installed on your device for offline use'
            : '该应用将安装在您的设备上供离线使用',
        ],
      },
    },
  };

  return (
    <DocsWrapper>
      <DocLayout title={content.title} description={content.description}>
        <DocSection title={content.sections.gettingStarted.title} delay={0}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.gettingStarted.description}
          </p>
          <DocList items={content.sections.gettingStarted.items} />
        </DocSection>

        <DocSection title={content.sections.readingNovel.title} delay={1}>
          <DocSubSection title={content.sections.readingNovel.subSections.navigation.title} delay={0}>
            <DocList items={content.sections.readingNovel.subSections.navigation.items} />
          </DocSubSection>

          <DocSubSection title={content.sections.readingNovel.subSections.readingSettings.title} delay={1}>
            <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-3">
              {content.sections.readingNovel.subSections.readingSettings.description}
            </p>
            <DocList items={content.sections.readingNovel.subSections.readingSettings.items} />
          </DocSubSection>
        </DocSection>

        <DocSection title={content.sections.importingNovels.title} delay={2}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-3">
            {content.sections.importingNovels.description}
          </p>
          <DocList type="number" items={content.sections.importingNovels.items} />
        </DocSection>

        <DocSection title={content.sections.convertingText.title} delay={3}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-3">
            {content.sections.convertingText.description}
          </p>
          <DocList type="number" items={content.sections.convertingText.items} />
        </DocSection>

        <DocSection title={content.sections.usingAsPWA.title} delay={4}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-3">
            {content.sections.usingAsPWA.description}
          </p>
          <DocList type="number" items={content.sections.usingAsPWA.items} />
        </DocSection>
      </DocLayout>
    </DocsWrapper>
  );
}
