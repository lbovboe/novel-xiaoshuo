'use client';

import React from 'react';
import { m } from 'framer-motion';
import { FaCircle } from 'react-icons/fa';

type DocListProps = {
  items: React.ReactNode[];
  type?: 'bullet' | 'number' | 'icon';
  delay?: number;
};

export default function DocList({ items, type = 'icon', delay = 0 }: DocListProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay * 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  // Array of color gradients for icons
  const iconColors = [
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-purple-500',
    'from-indigo-500 to-blue-500',
    'from-yellow-500 to-amber-500',
    'from-red-500 to-pink-500',
    'from-purple-500 to-indigo-500',
    'from-teal-500 to-cyan-500',
  ];

  return (
    <m.div className="relative space-y-8 md:space-y-2.5" initial="hidden" animate="visible" variants={containerVariants}>
      {items.map((item, index) => {
        const gradientColor = iconColors[index % iconColors.length];
        const number = index + 1;

        return (
          <m.div
            key={index}
            className={`group flex hover:bg-doc_bg-accent_light dark:hover:bg-doc_bg-accent_dark ${type === 'number' ? 'items-start' : 'items-center'} items-start gap-3 rounded-lg md:p-4 transition-all duration-200`}
            variants={itemVariants}
          >
            <div className={`relative flex-shrink-0 ${type === 'number' ? 'hidden md:block' : ''}`}>
              <div
                className={`absolute -inset-1 rounded-full bg-gradient-to-br ${gradientColor} opacity-75 blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:blur-md`}
              ></div>
              <div
                className={`relative flex ${type === 'number' ? 'h-4 w-4' : 'h-2 w-2'} items-center justify-center rounded-full bg-doc_bg-light dark:bg-doc_bg-dark`}
              >
                <div className="relative">
                  <FaCircle
                    size={type === 'number' ? 8 : 4}
                    className={`bg-gradient-to-br bg-clip-text text-transparent ${gradientColor}`}
                  />
                  {type === 'number' && (
                    <div className="absolute inset-0 flex items-center justify-center text-sm text-doc_text-secondary_light dark:text-doc_text-secondary_dark">
                      {number}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full min-w-0 text-doc_text-secondary_light dark:text-doc_text-secondary_dark">{item}</div>
          </m.div>
        );
      })}
    </m.div>
  );
}
