'use client';

import DocsWrapper from '../../components/docs/DocsWrapper';
import DocLayout from '../../components/docs/DocLayout';
import DocSection from '../../components/docs/DocSection';
import DocSubSection from '../../components/docs/DocSubSection';
import DocCodeBlock from '../../components/docs/DocCodeBlock';
import DocList from '../../components/docs/DocList';

export default function DevelopmentPage() {
  return (
    <DocsWrapper>
      <DocLayout
        title="Development Guide"
        description="This guide is for developers who want to understand the codebase, contribute to the project, or extend its functionality."
      >
        <DocSection title="Project Structure" delay={0}>
          <p className="mb-4 text-light-text-primary/90 dark:text-dark-text-primary/90">
            The project follows a standard Next.js application structure:
          </p>
          <DocList
            items={[
              <>
                <strong>app/</strong>: Contains the Next.js app router components
                <ul className="ml-6 mt-2 list-disc space-y-1 text-light-text-primary/90 dark:text-dark-text-primary/90">
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
              </>,
              <>
                <strong>public/</strong>: Static assets
              </>,
              <>
                <strong>scraper.js</strong>: Web scraping functionality
              </>,
              <>
                <strong>format.js</strong>: Text formatting functionality
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="Getting Started with Development" delay={1}>
          <DocList
            type="number"
            items={[
              'Clone the repository',
              <>
                Install dependencies:
                <DocCodeBlock code="npm install" />
              </>,
              <>
                Start the development server:
                <DocCodeBlock code="npm run dev" />
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="Core Functionality" delay={2}>
          <DocSubSection title="Web Scraper" delay={0}>
            <p className="mb-4 text-light-text-primary/90 dark:text-dark-text-primary/90">
              The web scraper is implemented in{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-black/20">scraper.js</code>. It uses:
            </p>
            <DocList
              items={[
                'axios for HTTP requests',
                'cheerio for HTML parsing',
                'iconv-lite for character encoding conversion',
              ]}
            />
          </DocSubSection>

          <DocSubSection title="Text Formatter" delay={1}>
            <p className="mb-4 text-light-text-primary/90 dark:text-dark-text-primary/90">
              The text formatter in{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-black/20">format.js</code> handles:
            </p>
            <DocList
              items={[
                'Converting between Traditional and Simplified Chinese',
                'Cleaning up text formatting',
                'Applying custom formatting rules',
              ]}
            />
          </DocSubSection>

          <DocSubSection title="Web Application" delay={2}>
            <p className="mb-4 text-light-text-primary/90 dark:text-dark-text-primary/90">
              The Next.js application provides:
            </p>
            <DocList
              items={[
                'A responsive UI for reading novels',
                'PWA support for offline reading',
                'Theme customization',
                'Reading progress tracking',
              ]}
            />
          </DocSubSection>
        </DocSection>

        <DocSection title="Building and Deployment" delay={3}>
          <p className="mb-4 text-light-text-primary/90 dark:text-dark-text-primary/90">To build the application:</p>
          <DocCodeBlock code="npm run build" />
          <p className="mt-4 text-light-text-primary/90 dark:text-dark-text-primary/90">
            The application can be deployed to platforms like Vercel, Netlify, or any service that supports Next.js
            applications.
          </p>
        </DocSection>
      </DocLayout>
    </DocsWrapper>
  );
}
