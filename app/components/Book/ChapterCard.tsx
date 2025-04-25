'use client';

import React from 'react';
import Link from 'next/link';
type ChapterCardProps = {
  bookId: string;
  index: number;
  title: string;
};

const ChapterCard = ({ bookId, index, title }: ChapterCardProps) => {
  return (
    <div
    >
      <Link 
        href={`/book/${encodeURIComponent(bookId)}/chapter/${index}`}
        className="block"
      >
        <div className="rounded-lg border border-light-border bg-light-paper p-4 shadow-md transition-all duration-300 hover:border-light-primary hover:shadow-lg dark:border-dark-border dark:bg-dark-paper dark:hover:border-dark-primary dark:hover:shadow-xl dark:hover:shadow-dark-background-gradient-end/5">
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-light-primary to-light-secondary opacity-60 dark:from-dark-primary dark:to-dark-secondary" />
            <div className="pl-3">
              <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                {title}
              </h3>
              <p className="mt-1 text-xs text-light-text-secondary dark:text-dark-text-secondary">
                Chapter {index-1}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChapterCard; 