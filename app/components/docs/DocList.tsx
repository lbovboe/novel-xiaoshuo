'use client';

import React from 'react';
import { m } from 'framer-motion';

type DocListProps = {
  items: React.ReactNode[];
  type?: 'bullet' | 'number';
  delay?: number;
};

export default function DocList({ items, type = 'bullet', delay = 0 }: DocListProps) {
  const variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: 0.3 + delay * 0.1 + i * 0.05,
      },
    }),
  };

  const ListComponent = type === 'bullet' ? 'ul' : 'ol';
  const listClass = type === 'bullet' ? 'ml-6 list-disc space-y-2' : 'ml-6 list-decimal space-y-2';

  return (
    <ListComponent className={`text-light-text/90 dark:text-dark-text/90 ${listClass}`}>
      {items.map((item, index) => (
        <m.li key={index} custom={index} initial="hidden" animate="visible" variants={variants}>
          {item}
        </m.li>
      ))}
    </ListComponent>
  );
}
