'use client';

import React from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { IconType } from 'react-icons';

type DocFeatureCardProps = {
  title: string;
  description: string;
  href: string;
  icon?: IconType;
  delay?: number;
};

export default function DocFeatureCard({ title, description, href, icon: Icon, delay = 0 }: DocFeatureCardProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + delay * 0.1 }}
    >
      <Link
        href={href}
        className="group flex h-full flex-col rounded-xl border border-light-border bg-white/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-light-primary hover:shadow-md dark:border-dark-border dark:bg-gray-900/50 dark:hover:border-dark-primary"
      >
        <div className="mb-4 flex items-center">
          {Icon && (
            <span className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-light-primary/10 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary">
              <Icon size={20} />
            </span>
          )}
          <h3 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">{title}</h3>
        </div>
        <p className="text-light-text-primary/80 dark:text-dark-text-primary/80">{description}</p>
        <div className="mt-auto pt-4">
          <span className="text-sm font-medium text-light-primary group-hover:underline dark:text-dark-primary">
            Learn more →
          </span>
        </div>
      </Link>
    </m.div>
  );
}
