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
      className="mb-12 rounded-xl border md:shadow-sm md:backdrop-blur-sm md:border-doc_border-light md:bg-doc_bg-card_light md:p-6 md:dark:border-doc_border-dark md:dark:bg-doc_bg-card_dark"
    >
      <h2 className="mb-4 text-2xl font-bold text-doc_text-heading_light dark:text-doc_text-heading_dark">{title}</h2>
      {children}
    </m.div>
  );
}
