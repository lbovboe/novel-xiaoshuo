'use client';

import DocsWrapper from '../../components/docs/DocsWrapper';
import DocLayout from '../../components/docs/DocLayout';
import DocSection from '../../components/docs/DocSection';
import DocSubSection from '../../components/docs/DocSubSection';
import DocCodeBlock from '../../components/docs/DocCodeBlock';
import DocList from '../../components/docs/DocList';

export default function UserGuidePage() {
  return (
    <DocsWrapper>
      <DocLayout title="User Guide" description="This guide will help you get the most out of Novel Xiaoshuo.">
        <DocSection title="Getting Started" delay={0}>
          <p className="mb-4 text-light-text-primary/90 dark:text-dark-text-primary/90">
            Novel Xiaoshuo is a web application for reading Chinese novels. To get started:
          </p>
          <DocList
            items={[
              'Visit the main page',
              'Browse available novels or import your own',
              'Click on a novel to start reading',
            ]}
          />
        </DocSection>

        <DocSection title="Reading a Novel" delay={1}>
          <DocSubSection title="Navigation" delay={0}>
            <DocList
              items={[
                'Use the left and right arrows or swipe to navigate between chapters',
                'The table of contents is available from the menu button',
                'Your reading progress is automatically saved',
              ]}
            />
          </DocSubSection>

          <DocSubSection title="Reading Settings" delay={1}>
            <p className="mb-3 text-light-text-primary/90 dark:text-dark-text-primary/90">
              You can customize your reading experience:
            </p>
            <DocList
              items={[
                <>
                  <strong>Dark/Light Mode</strong>: Toggle between dark and light themes
                </>,
                <>
                  <strong>Font Size</strong>: Adjust the text size for comfortable reading
                </>,
                <>
                  <strong>Line Spacing</strong>: Customize the spacing between lines
                </>,
                <>
                  <strong>Font Family</strong>: Choose your preferred font
                </>,
              ]}
            />
          </DocSubSection>
        </DocSection>

        <DocSection title="Importing Novels" delay={2}>
          <p className="mb-3 text-light-text-primary/90 dark:text-dark-text-primary/90">
            You can import novels in several ways:
          </p>
          <DocList
            type="number"
            items={[
              <>
                <strong>Web Scraping</strong>: Enter a URL to scrape a novel from a supported website
                <DocCodeBlock code="npm run scrape <url>" />
              </>,
              <>
                <strong>Local Files</strong>: Import local text files
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="Converting Text" delay={3}>
          <p className="mb-3 text-light-text-primary/90 dark:text-dark-text-primary/90">
            Novel Xiaoshuo supports conversion between Traditional and Simplified Chinese:
          </p>
          <DocList
            type="number"
            items={[
              'Go to the Text Tools section',
              'Select your conversion preference',
              'Import your text',
              'Download the converted text',
            ]}
          />
        </DocSection>

        <DocSection title="Using as a PWA" delay={4}>
          <p className="mb-3 text-light-text-primary/90 dark:text-dark-text-primary/90">
            Novel Xiaoshuo can be installed as a Progressive Web App:
          </p>
          <DocList
            type="number"
            items={[
              'Visit the website in a supported browser',
              'Click the "Install" button in the address bar or menu',
              'The app will be installed on your device for offline use',
            ]}
          />
        </DocSection>
      </DocLayout>
    </DocsWrapper>
  );
}
