'use client';

import DocsWrapper from '../../components/docs/DocsWrapper';
import DocLayout from '../../components/docs/DocLayout';
import DocSection from '../../components/docs/DocSection';
import DocSubSection from '../../components/docs/DocSubSection';
import DocCodeBlock from '../../components/docs/DocCodeBlock';
import DocList from '../../components/docs/DocList';

export default function FeaturesPage() {
  return (
    <DocsWrapper>
      <DocLayout title="Features" description="This page documents all the features available in Novel Xiaoshuo.">
        <DocSection title="Web Scraping" delay={0}>
          <p className="mb-4 text-light-text-primary/90 dark:text-dark-text-primary/90">
            Novel Xiaoshuo allows you to scrape novels from Chinese websites. The scraping functionality is powered by:
          </p>
          <DocList
            items={[
              <>
                <strong>axios</strong>: For making HTTP requests
              </>,
              <>
                <strong>cheerio</strong>: For parsing HTML
              </>,
              <>
                <strong>iconv-lite</strong>: For character encoding conversion
              </>,
            ]}
          />

          <DocSubSection title="Scraper Usage">
            <DocCodeBlock code="// Example usage of the scraper\nnode scraper.js <url> [options]" />
          </DocSubSection>
        </DocSection>

        <DocSection title="Text Formatting" delay={1}>
          <p className="mb-4 text-light-text-primary/90 dark:text-dark-text-primary/90">Text formatting includes:</p>
          <DocList
            items={[
              <>
                <strong>Traditional to Simplified Chinese</strong>: Convert text using OpenCC
              </>,
              <>
                <strong>Paragraph formatting</strong>: Clean up paragraphs for better readability
              </>,
              <>
                <strong>Custom formatting rules</strong>: Apply specific formatting rules for different sources
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="Reading Interface" delay={2}>
          <p className="mb-4 text-light-text-primary/90 dark:text-dark-text-primary/90">
            The reading interface features:
          </p>
          <DocList
            items={[
              <>
                <strong>Dark/Light mode</strong>: Toggle between dark and light themes
              </>,
              <>
                <strong>Font size adjustment</strong>: Customize the reading experience
              </>,
              <>
                <strong>Chapter navigation</strong>: Easily move between chapters
              </>,
              <>
                <strong>Progress tracking</strong>: Keep track of your reading progress
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="PWA Support" delay={3}>
          <p className="mb-4 text-light-text-primary/90 dark:text-dark-text-primary/90">
            Novel Xiaoshuo can be installed as a Progressive Web App, providing:
          </p>
          <DocList
            items={[
              <>
                <strong>Offline reading</strong>: Read downloaded novels without an internet connection
              </>,
              <>
                <strong>App-like experience</strong>: Install on your home screen for quick access
              </>,
              <>
                <strong>Fast loading</strong>: Improved performance with service workers
              </>,
            ]}
          />
        </DocSection>
      </DocLayout>
    </DocsWrapper>
  );
}
