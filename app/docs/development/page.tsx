'use client';

import DocsWrapper from '@/app/components/docs/DocsWrapper';
import DocLayout from '@/app/components/docs/DocLayout';
import DocSection from '@/app/components/docs/DocSection';
import DocSubSection from '@/app/components/docs/DocSubSection';
import DocCodeBlock from '@/app/components/docs/DocCodeBlock';
import DocList from '@/app/components/docs/DocList';
import { useLanguage } from '@/app/components/docs/LanguageContext';

export default function DevelopmentPage() {
  const { language } = useLanguage();

  // Page content based on selected language
  const content = {
    title: language === 'en' ? 'Development Guide' : '开发指南',
    description:
      language === 'en'
        ? 'This guide is for developers who want to understand the codebase, contribute to the project, or extend its functionality.'
        : '本指南适用于希望了解代码库、为项目做出贡献或扩展其功能的开发人员。',
    sections: {
      projectStructure: {
        title: language === 'en' ? 'Project Structure' : '项目结构',
        description:
          language === 'en'
            ? 'The project follows a standard Next.js application structure:'
            : '该项目遵循标准的 Next.js 应用程序结构：',
        items: [
          language === 'en' ? (
            <>
              <strong>app/</strong>: Contains the Next.js app router components
              <ul className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark ml-6 mt-2 list-disc space-y-1">
                <li>
                  <strong>components/</strong>: UI components organized by type
                </li>
                <li>
                  <strong>lib/</strong>: Utility libraries
                </li>
                <li>
                  <strong>context/</strong>: React context providers
                </li>
                <li>
                  <strong>utils/</strong>: Helper functions
                </li>
                <li>
                  <strong>types/</strong>: TypeScript type definitions
                </li>
              </ul>
            </>
          ) : (
            <>
              <strong>app/</strong>: 包含 Next.js 应用路由组件
              <ul className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark ml-6 mt-2 list-disc space-y-1">
                <li>
                  <strong>components/</strong>: 按类型组织的 UI 组件
                </li>
                <li>
                  <strong>lib/</strong>: 实用程序库
                </li>
                <li>
                  <strong>context/</strong>: React 上下文提供者
                </li>
                <li>
                  <strong>utils/</strong>: 辅助函数
                </li>
                <li>
                  <strong>types/</strong>: TypeScript 类型定义
                </li>
              </ul>
            </>
          ),
          language === 'en' ? (
            <>
              <strong>public/</strong>: Static assets
            </>
          ) : (
            <>
              <strong>public/</strong>: 静态资源
            </>
          ),
          language === 'en' ? (
            <>
              <strong>scraper.js</strong>: Web scraping functionality
            </>
          ) : (
            <>
              <strong>scraper.js</strong>: 网页抓取功能
            </>
          ),
          language === 'en' ? (
            <>
              <strong>format.js</strong>: Text formatting functionality
            </>
          ) : (
            <>
              <strong>format.js</strong>: 文本格式化功能
            </>
          ),
        ],
      },
      gettingStarted: {
        title: language === 'en' ? 'Getting Started with Development' : '开发入门',
        items: [
          language === 'en' ? 'Clone the repository' : '克隆仓库',
          language === 'en' ? (
            <>
              Install dependencies:
              <DocCodeBlock code="npm install" />
            </>
          ) : (
            <>
              安装依赖:
              <DocCodeBlock code="npm install" />
            </>
          ),
          language === 'en' ? (
            <>
              Start the development server:
              <DocCodeBlock code="npm run dev" />
            </>
          ) : (
            <>
              启动开发服务器:
              <DocCodeBlock code="npm run dev" />
            </>
          ),
        ],
      },
      coreFunctionality: {
        title: language === 'en' ? 'Core Functionality' : '核心功能',
        subSections: {
          webScraper: {
            title: language === 'en' ? 'Web Scraper' : '网页抓取器',
            description:
              language === 'en' ? (
                <>
                  The web scraper is implemented in{' '}
                  <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-black/20">scraper.js</code>. It uses:
                </>
              ) : (
                <>
                  网页抓取器在{' '}
                  <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-black/20">scraper.js</code>{' '}
                  中实现。它使用：
                </>
              ),
            items: [
              language === 'en' ? 'axios for HTTP requests' : 'axios 用于 HTTP 请求',
              language === 'en' ? 'cheerio for HTML parsing' : 'cheerio 用于 HTML 解析',
              language === 'en' ? 'iconv-lite for character encoding conversion' : 'iconv-lite 用于字符编码转换',
            ],
          },
          textFormatter: {
            title: language === 'en' ? 'Text Formatter' : '文本格式化器',
            description:
              language === 'en' ? (
                <>
                  The text formatter in{' '}
                  <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-black/20">format.js</code> handles:
                </>
              ) : (
                <>
                  在 <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-black/20">format.js</code>{' '}
                  中的文本格式化器处理：
                </>
              ),
            items: [
              language === 'en'
                ? 'Converting between Traditional and Simplified Chinese'
                : '在繁体中文和简体中文之间转换',
              language === 'en' ? 'Cleaning up text formatting' : '清理文本格式',
              language === 'en' ? 'Applying custom formatting rules' : '应用自定义格式规则',
            ],
          },
          webApplication: {
            title: language === 'en' ? 'Web Application' : '网络应用',
            description: language === 'en' ? 'The Next.js application provides:' : 'Next.js 应用程序提供：',
            items: [
              language === 'en' ? 'A responsive UI for reading novels' : '用于阅读小说的响应式用户界面',
              language === 'en' ? 'PWA support for offline reading' : '支持离线阅读的 PWA',
              language === 'en' ? 'Theme customization' : '主题定制',
              language === 'en' ? 'Reading progress tracking' : '阅读进度跟踪',
            ],
          },
        },
      },
      buildingDeployment: {
        title: language === 'en' ? 'Building and Deployment' : '构建和部署',
        buildInstructions: language === 'en' ? 'To build the application:' : '构建应用程序：',
        deploymentInfo:
          language === 'en'
            ? 'The application can be deployed to platforms like Vercel, Netlify, or any service that supports Next.js applications.'
            : '应用程序可以部署到 Vercel、Netlify 或任何支持 Next.js 应用程序的服务上。',
      },
    },
  };

  return (
    <DocsWrapper>
      <DocLayout title={content.title} description={content.description}>
        <DocSection title={content.sections.projectStructure.title} delay={0}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.projectStructure.description}
          </p>
          <DocList type="number" items={content.sections.projectStructure.items} />
        </DocSection>

        <DocSection title={content.sections.gettingStarted.title} delay={1}>
          <DocList type="number" items={content.sections.gettingStarted.items} />
        </DocSection>

        <DocSection title={content.sections.coreFunctionality.title} delay={2}>
          <DocSubSection title={content.sections.coreFunctionality.subSections.webScraper.title} delay={0}>
            <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
              {content.sections.coreFunctionality.subSections.webScraper.description}
            </p>
            <DocList items={content.sections.coreFunctionality.subSections.webScraper.items} />
          </DocSubSection>

          <DocSubSection title={content.sections.coreFunctionality.subSections.textFormatter.title} delay={1}>
            <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
              {content.sections.coreFunctionality.subSections.textFormatter.description}
            </p>
            <DocList items={content.sections.coreFunctionality.subSections.textFormatter.items} />
          </DocSubSection>

          <DocSubSection title={content.sections.coreFunctionality.subSections.webApplication.title} delay={2}>
            <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
              {content.sections.coreFunctionality.subSections.webApplication.description}
            </p>
            <DocList items={content.sections.coreFunctionality.subSections.webApplication.items} />
          </DocSubSection>
        </DocSection>

        <DocSection title={content.sections.buildingDeployment.title} delay={3}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            {content.sections.buildingDeployment.buildInstructions}
          </p>
          <DocCodeBlock code="npm run build" />
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mt-4">
            {content.sections.buildingDeployment.deploymentInfo}
          </p>
        </DocSection>
      </DocLayout>
    </DocsWrapper>
  );
}
