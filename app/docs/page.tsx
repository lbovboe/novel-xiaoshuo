'use client';

import { FaBook, FaTools, FaCogs, FaCode } from 'react-icons/fa';
import DocsWrapper from '../components/docs/DocsWrapper';
import DocLayout from '../components/docs/DocLayout';
import DocFeatureCard from '../components/docs/DocFeatureCard';
import KeyFeatures from '../components/docs/KeyFeatures';

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

// Key features of the application
const features = [
  {
    title: 'Web Scraping',
    description: 'Scrape novels from Chinese websites',
  },
  {
    title: 'Text Formatting',
    description: 'Convert between Traditional and Simplified Chinese',
  },
  {
    title: 'Reading Interface',
    description: 'Clean, responsive UI for reading novels',
  },
  {
    title: 'Chapter Navigation',
    description: 'Easy navigation between chapters',
  },
  {
    title: 'PWA Support',
    description: 'Install as a Progressive Web App',
  },
];

export default function DocsPage() {
  return (
    <DocsWrapper>
      <DocLayout
        title="Documentation"
        description="Novel Xiaoshuo is a web application for scraping, formatting, and reading Chinese novels. It provides a
            clean interface for reading novels and supports various features like text formatting, chapter navigation,
            and more."
        showBackLink={false}
      >
        <div className="mb-16">
          <h3
            id="key-features"
            className="mb-6 mt-6 text-xl font-bold text-light-text-primary dark:text-dark-text-primary"
          >
            Key Features
          </h3>
          <KeyFeatures features={features} />
        </div>

        <h2
          id="documentation-sections"
          className="mb-6 text-2xl font-bold text-light-text-primary dark:text-dark-text-primary"
        >
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
