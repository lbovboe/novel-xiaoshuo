'use client';

import React from 'react';
import DocsWrapper from '@/app/components/docs/DocsWrapper';
import DocLayout from '@/app/components/docs/DocLayout';
import DocList from '@/app/components/docs/DocList';
import { useLanguage } from '@/app/components/docs/LanguageContext';

// Type for DocList items with optional codeBlock
type DocItem = { description: React.ReactNode; codeBlock?: React.ReactNode };

export default function ExamplePage() {
  const { language } = useLanguage();

  // Example items based on language
  const items: DocItem[] =
    language === 'en'
      ? [
          { description: 'This is the first list item with an icon' },
          { description: 'This is the second list item with an icon' },
          { description: 'This is the third list item with an icon' },
          { description: 'This is the fourth list item with an icon' },
          { description: 'This is the fifth list item with an icon' },
        ]
      : [
          { description: '这是第一个带图标的列表项' },
          { description: '这是第二个带图标的列表项' },
          { description: '这是第三个带图标的列表项' },
          { description: '这是第四个带图标的列表项' },
          { description: '这是第五个带图标的列表项' },
        ];

  // Page content based on selected language
  const content = {
    title: language === 'en' ? 'DocList Example' : 'DocList 示例',
    description:
      language === 'en'
        ? 'Example of the DocList component with different styling options.'
        : 'DocList 组件的不同样式选项示例。',
    sections: {
      withIcons: {
        title: language === 'en' ? 'DocList with Icons' : '带图标的 DocList',
      },
      withBullets: {
        title: language === 'en' ? 'DocList with Bullets' : '带项目符号的 DocList',
      },
      withNumbers: {
        title: language === 'en' ? 'DocList with Numbers' : '带数字的 DocList',
      },
    },
  };

  return (
    <DocsWrapper>
      <DocLayout title={content.title} description={content.description} showBackLink={true}>
        <div className="space-y-10">
          <div>
            <h2 className="text-doc_text-heading_light dark:text-doc_text-heading_dark mb-4 text-xl font-bold">
              {content.sections.withIcons.title}
            </h2>
            <DocList items={items} type="icon" />
          </div>

          <div>
            <h2 className="text-doc_text-heading_light dark:text-doc_text-heading_dark mb-4 text-xl font-bold">
              {content.sections.withBullets.title}
            </h2>
            <DocList items={items} type="bullet" />
          </div>

          <div>
            <h2 className="text-doc_text-heading_light dark:text-doc_text-heading_dark mb-4 text-xl font-bold">
              {content.sections.withNumbers.title}
            </h2>
            <DocList items={items} type="number" />
          </div>
        </div>
      </DocLayout>
    </DocsWrapper>
  );
}
