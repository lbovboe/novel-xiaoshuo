'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { m } from 'framer-motion';

type BookCardProps = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  chapterCount: number;
};

const BookCard = ({ id, title, description, coverImage, chapterCount }: BookCardProps) => {
  return (
    <m.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        href={`/book/${encodeURIComponent(id)}`} 
        className="block h-full"
      >
        <div className="h-full overflow-hidden rounded-lg bg-light-paper shadow-md transition-all duration-300 hover:shadow-xl dark:bg-dark-paper dark:shadow-gray-800">
          <div className="relative h-60 w-full overflow-hidden">
            <Image 
              src={coverImage}
              alt={title}
              fill
              className="transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-light-background-gradient-start/80 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 dark:from-dark-background-gradient-start/80" />
          </div>
          <div className="p-6">
            <h2 className="mb-2 text-xl font-bold text-light-text-primary transition-colors dark:text-dark-text-primary">{title}</h2>
            <p className="mb-4 text-light-text-secondary dark:text-dark-text-secondary">{description}</p>
            <div className="flex items-center justify-between">
              <span className="rounded bg-light-primary/20 px-2.5 py-0.5 text-xs font-medium text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary">
                {chapterCount} Chapters
              </span>
              <m.span 
                className="text-sm font-medium text-light-primary dark:text-dark-primary"
                whileHover={{ x: 3 }}
              >
                Read Now →
              </m.span>
            </div>
          </div>
        </div>
      </Link>
    </m.div>
  );
};

export default BookCard; 