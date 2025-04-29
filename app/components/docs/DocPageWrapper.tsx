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
    <div className="min-h-screen bg-gradient-to-b from-light-background-gradient-start/30 to-light-background-gradient-end/30 dark:from-dark-background-gradient-start/30 dark:to-dark-background-gradient-end/30">
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
