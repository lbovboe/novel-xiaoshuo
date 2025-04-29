'use client';

import React from 'react';
import { m } from 'framer-motion';
import DocTableOfContents from './DocTableOfContents';

type DocPageWrapperProps = {
  children: React.ReactNode;
  showTableOfContents?: boolean;
};

export default function DocPageWrapper({ children, showTableOfContents = true }: DocPageWrapperProps) {
  return (
    <div className="from-doc_bg-light to-doc_bg-light dark:from-doc_bg-dark dark:to-doc_bg-dark min-h-screen bg-gradient-to-b">
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-7xl px-4 py-4"
      >
        <div className="flex-1">{children}</div>

        {showTableOfContents && <DocTableOfContents />}
      </m.div>
    </div>
  );
}
