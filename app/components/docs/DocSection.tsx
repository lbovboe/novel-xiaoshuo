'use client';

import React from 'react';
import { m } from 'framer-motion';

type DocSectionProps = {
  children: React.ReactNode;
  title: string;
  delay?: number;
};

export default function DocSection({ children, title, delay = 0 }: DocSectionProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + delay * 0.1 }}
      className="border-doc_border-light bg-doc_bg-card_light dark:border-doc_border-dark dark:bg-doc_bg-card_dark mb-12 rounded-xl border p-6 shadow-sm backdrop-blur-sm"
    >
      <h2 className="text-doc_text-heading_light dark:text-doc_text-heading_dark mb-4 text-2xl font-bold">{title}</h2>
      {children}
    </m.div>
  );
}
