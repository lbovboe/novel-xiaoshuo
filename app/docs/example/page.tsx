'use client';

import React from 'react';
import DocsWrapper from '../../components/docs/DocsWrapper';
import DocLayout from '../../components/docs/DocLayout';
import DocList from '../../components/docs/DocList';

export default function ExamplePage() {
  const items = [
    'This is the first list item with an icon',
    'This is the second list item with an icon',
    'This is the third list item with an icon',
    'This is the fourth list item with an icon',
    'This is the fifth list item with an icon',
  ];

  return (
    <DocsWrapper>
      <DocLayout
        title="DocList Example"
        description="Example of the DocList component with different styling options."
        showBackLink={true}
      >
        <div className="space-y-10">
          <div>
            <h2 className="mb-4 text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
              DocList with Icons
            </h2>
            <DocList items={items} type="icon" />
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
              DocList with Bullets
            </h2>
            <DocList items={items} type="bullet" />
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
              DocList with Numbers
            </h2>
            <DocList items={items} type="number" />
          </div>
        </div>
      </DocLayout>
    </DocsWrapper>
  );
}
