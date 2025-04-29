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
        className="border-doc_border-light bg-doc_bg-card_light hover:border-doc_border-accent_light dark:border-doc_border-dark dark:bg-doc_bg-card_dark dark:hover:border-doc_border-accent_dark group flex h-full flex-col rounded-xl border p-6 shadow-sm backdrop-blur-sm transition-all hover:shadow-md"
      >
        <div className="mb-4 flex items-center">
          {Icon && (
            <span className="bg-doc_bg-accent_light text-doc_icon-light dark:bg-doc_bg-accent_dark dark:text-doc_icon-dark mr-3 flex h-10 w-10 items-center justify-center rounded-full">
              <Icon size={20} />
            </span>
          )}
          <h3 className="text-doc_text-heading_light dark:text-doc_text-heading_dark text-xl font-bold">{title}</h3>
        </div>
        <p className="text-doc_text-secondary_light dark:text-doc_text-secondary_dark">{description}</p>
        <div className="mt-auto pt-4">
          <span className="text-doc_text-link_light dark:text-doc_text-link_dark text-sm font-medium group-hover:underline">
            Learn more →
          </span>
        </div>
      </Link>
    </m.div>
  );
}
