'use client';

import { FaBook, FaTools, FaCogs, FaCode } from 'react-icons/fa';
import DocsWrapper from '../components/docs/DocsWrapper';
import DocLayout from '../components/docs/DocLayout';
import DocFeatureCard from '../components/docs/DocFeatureCard';
import KeyFeatures from '../components/docs/KeyFeatures';
import { useLanguage } from '../components/docs/LanguageContext';

// Documentation sections with both English and Chinese content
const sections = [
  {
    title: {
      en: 'Getting Started',
      zh: '入门指南',
    },
    description: {
      en: 'Learn how to use Novel Xiaoshuo',
      zh: '了解如何使用 Novel Xiaoshuo',
    },
    href: '/docs/user-guide',
    icon: FaTools,
  },
  {
    title: {
      en: 'Features',
      zh: '功能特性',
    },
    description: {
      en: 'Explore all the features available',
      zh: '探索所有可用的功能',
    },
    href: '/docs/features',
    icon: FaCogs,
  },
  {
    title: {
      en: 'UI Components',
      zh: 'UI 组件',
    },
    description: {
      en: 'Documentation of UI components',
      zh: 'UI 组件文档',
    },
    href: '/docs/components',
    icon: FaCode,
  },
  {
    title: {
      en: 'Development Guide',
      zh: '开发指南',
    },
    description: {
      en: 'Information for developers',
      zh: '为开发者提供的信息',
    },
    href: '/docs/development',
    icon: FaCode,
  },
];

// Key features of the application
const features = [
  {
    title: {
      en: 'Web Scraping',
      zh: '网页抓取',
    },
    description: {
      en: 'Scrape novels from Chinese websites',
      zh: '从中文网站抓取小说',
    },
  },
  {
    title: {
      en: 'Text Formatting',
      zh: '文本格式化',
    },
    description: {
      en: 'Convert between Traditional and Simplified Chinese',
      zh: '繁体中文与简体中文之间转换',
    },
  },
  {
    title: {
      en: 'Reading Interface',
      zh: '阅读界面',
    },
    description: {
      en: 'Clean, responsive UI for reading novels',
      zh: '清晰、响应式的小说阅读界面',
    },
  },
  {
    title: {
      en: 'Chapter Navigation',
      zh: '章节导航',
    },
    description: {
      en: 'Easy navigation between chapters',
      zh: '便捷的章节间导航',
    },
  },
  {
    title: {
      en: 'PWA Support',
      zh: 'PWA 支持',
    },
    description: {
      en: 'Install as a Progressive Web App',
      zh: '可安装为渐进式 Web 应用',
    },
  },
];

export default function DocsPage() {
  const { language } = useLanguage();
  console.log("🚀 ~ DocsPage ~ language:", language)

  // Page content based on selected language
  const content = {
    title: language === 'en' ? 'Documentation' : '文档',
    description:
      language === 'en'
        ? 'Novel Xiaoshuo is a web application for scraping, formatting, and reading Chinese novels. It provides a clean interface for reading novels and supports various features like text formatting, chapter navigation, and more.'
        : 'Novel Xiaoshuo 是一个用于抓取、格式化和阅读中文小说的网络应用程序。它提供了一个清晰的阅读界面，并支持各种功能，如文本格式化、章节导航等。',
    keyFeatures: language === 'en' ? 'Key Features' : '主要功能',
    docSections: language === 'en' ? 'Documentation Sections' : '文档部分',
  };

  return (
    <DocsWrapper>
      <DocLayout title={content.title} description={content.description} showBackLink={false}>
        <div className="mb-16">
          <h3
            id="key-features"
            className="text-doc_text-heading_light dark:text-doc_text-heading_dark mb-6 mt-6 text-xl font-bold"
          >
            {content.keyFeatures}
          </h3>
          <KeyFeatures
            features={features.map((feature) => ({
              title: feature.title[language],
              description: feature.description[language],
            }))}
          />
        </div>

        <h2
          id="documentation-sections"
          className="text-doc_text-heading_light dark:text-doc_text-heading_dark mb-6 text-2xl font-bold"
        >
          {content.docSections}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((section, index) => (
            <DocFeatureCard
              key={section.title[language]}
              title={section.title[language]}
              description={section.description[language]}
              href={section.href}
              icon={section.icon}
              delay={index}
            />
          ))}
        </div>
      </DocLayout>
    </DocsWrapper>
  );
}
