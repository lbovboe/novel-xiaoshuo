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
      className="mb-12 rounded-xl border border-light-border bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-dark-border dark:bg-dark-border"
    >
      <h2 className="mb-4 text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">{title}</h2>
      {children}
    </m.div>
  );
}
