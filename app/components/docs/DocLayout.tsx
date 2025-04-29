'use client';

import React from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';

type DocLayoutProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  showBackLink?: boolean;
  backLink?: string;
  backText?: string;
};

export default function DocLayout({
  children,
  title,
  description,
  showBackLink = true,
  backLink = '/docs',
  backText = '← Back to Documentation',
}: DocLayoutProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-5xl px-4"
    >
      {title && (
        <div className="mb-8">
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-xl font-bold text-light-text-primary dark:text-dark-text-primary"
          >
            {title}
          </m.h1>
          {description && (
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-light-text-primary/80 dark:text-dark-text-primary/80"
            >
              {description}
            </m.p>
          )}
        </div>
      )}

      <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
        {children}
      </m.div>

      {showBackLink && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex justify-between"
        >
          <Link
            href={backLink}
            className="bg-light-background-hover text-light-text hover:bg-light-background-active dark:bg-dark-background-hover dark:text-dark-text dark:hover:bg-dark-background-active rounded-md px-4 py-2 transition-colors"
          >
            {backText}
          </Link>
        </m.div>
      )}
    </m.div>
  );
}
