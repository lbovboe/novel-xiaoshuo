'use client';

import React from 'react';
import { m } from 'framer-motion';

type DocSubSectionProps = {
  children: React.ReactNode;
  title: string;
  delay?: number;
};

export default function DocSubSection({ children, title, delay = 0 }: DocSubSectionProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 + delay * 0.1 }}
      className="mt-6"
    >
      <h3 className="text-doc_text-heading_light dark:text-doc_text-heading_dark mb-3 text-xl font-bold">{title}</h3>
      {children}
    </m.div>
  );
}
