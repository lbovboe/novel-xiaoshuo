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
      className="mx-auto max-w-5xl md:px-4"
    >
      {title && (
        <div className="mb-8">
          <m.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-doc_text-heading_light dark:text-doc_text-heading_dark mb-4 text-xl font-bold"
          >
            {title}
          </m.h1>
          {description && (
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark"
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
            className="bg-doc_bg-paper_light text-doc_text-body_light hover:bg-doc_bg-accent_light dark:bg-doc_bg-paper_dark dark:text-doc_text-body_dark dark:hover:bg-doc_bg-accent_dark rounded-md px-4 py-2 transition-colors"
          >
            {backText}
          </Link>
        </m.div>
      )}
    </m.div>
  );
}
