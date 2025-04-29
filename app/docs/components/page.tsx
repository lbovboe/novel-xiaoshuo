'use client';

import DocsWrapper from '../../components/docs/DocsWrapper';
import DocLayout from '../../components/docs/DocLayout';
import DocSection from '../../components/docs/DocSection';
import DocList from '../../components/docs/DocList';

export default function ComponentsPage() {
  return (
    <DocsWrapper>
      <DocLayout title="UI Components" description="This page documents the main UI components used in Novel Xiaoshuo.">
        <DocSection title="Component Categories" delay={0}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            The application is built with several component categories:
          </p>
          <DocList
            items={[
              <>
                <strong>UI Components</strong>: Generic UI elements
              </>,
              <>
                <strong>Headers</strong>: Navigation and header components
              </>,
              <>
                <strong>Book Components</strong>: Book-specific UI elements
              </>,
              <>
                <strong>Footer</strong>: Footer components
              </>,
              <>
                <strong>Animation</strong>: Animation-related components
              </>,
              <>
                <strong>Tools</strong>: Utility UI components
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="Theme Management" delay={1}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            Novel Xiaoshuo includes a theme system with components like:
          </p>
          <DocList
            items={[
              <>
                <strong>ClientThemeWrapper</strong>: Manages theme on the client-side
              </>,
              <>
                <strong>ThemeMetadata</strong>: Handles theme-related metadata
              </>,
            ]}
          />
        </DocSection>

        <DocSection title="Header Components" delay={2}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            Header components handle navigation and app-wide controls.
          </p>
        </DocSection>

        <DocSection title="Book Components" delay={3}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            Book components are specifically designed for displaying and interacting with book content, including:
          </p>
          <DocList items={['Chapter navigation', 'Reading interface', 'Book metadata display']} />
        </DocSection>

        <DocSection title="Animation Components" delay={4}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            These components provide animated UI elements for a more engaging user experience.
          </p>
        </DocSection>

        <DocSection title="Tools Components" delay={5}>
          <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark mb-4">
            Tool components offer utility functions like:
          </p>
          <DocList items={['Text formatting controls', 'Search functionality', 'Settings management']} />
        </DocSection>
      </DocLayout>
    </DocsWrapper>
  );
}
