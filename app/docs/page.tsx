'use client';

import { FaBook, FaTools, FaCogs, FaCode } from 'react-icons/fa';
import DocsWrapper from '../components/docs/DocsWrapper';
import DocLayout from '../components/docs/DocLayout';
import DocFeatureCard from '../components/docs/DocFeatureCard';

// Documentation sections
const sections = [
  {
    title: 'Getting Started',
    description: 'Learn how to use Novel Xiaoshuo',
    href: '/docs/user-guide',
    icon: FaTools,
  },
  {
    title: 'Features',
    description: 'Explore all the features available',
    href: '/docs/features',
    icon: FaCogs,
  },
  {
    title: 'UI Components',
    description: 'Documentation of UI components',
    href: '/docs/components',
    icon: FaCode,
  },
  {
    title: 'Development Guide',
    description: 'Information for developers',
    href: '/docs/development',
    icon: FaCode,
  },
];

export default function DocsPage() {
  return (
    <DocsWrapper>
      <DocLayout showBackLink={false}>
        <div className="mb-16">
          <h2 id="overview" className="text-light-text dark:text-dark-text mb-6 text-2xl font-bold">
            Overview
          </h2>
          <p className="text-light-text/90 dark:text-dark-text/90 mb-4">
            Novel Xiaoshuo is a web application for scraping, formatting, and reading Chinese novels. It provides a
            clean interface for reading novels and supports various features like text formatting, chapter navigation,
            and more.
          </p>

          <h3 id="key-features" className="text-light-text dark:text-dark-text mb-3 mt-6 text-xl font-bold">
            Key Features
          </h3>
          <ul className="text-light-text/90 dark:text-dark-text/90 ml-6 list-disc space-y-2">
            <li>
              <strong>Web Scraping</strong>: Scrape novels from Chinese websites
            </li>
            <li>
              <strong>Text Formatting</strong>: Convert between Traditional and Simplified Chinese
            </li>
            <li>
              <strong>Reading Interface</strong>: Clean, responsive UI for reading novels
            </li>
            <li>
              <strong>Chapter Navigation</strong>: Easy navigation between chapters
            </li>
            <li>
              <strong>PWA Support</strong>: Install as a Progressive Web App
            </li>
          </ul>
        </div>

        <h2 id="documentation-sections" className="text-light-text dark:text-dark-text mb-6 text-2xl font-bold">
          Documentation Sections
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {sections.map((section, index) => (
            <DocFeatureCard
              key={section.title}
              title={section.title}
              description={section.description}
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
