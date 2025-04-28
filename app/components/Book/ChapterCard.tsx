'use client';

import React from 'react';
import Link from 'next/link';
type ChapterCardProps = {
  bookId: string;
  index: number;
  title: string;
  isActive?: boolean;
};

const ChapterCard = ({ bookId, index, title, isActive = false }: ChapterCardProps) => {
  return (
    <div>
      <Link href={`/book/${encodeURIComponent(bookId)}/chapter/${index}`} className="block">
        <div
          className={`rounded-lg border ${
            isActive
              ? 'border-light-primary bg-light-primary/10 dark:border-dark-primary dark:bg-dark-primary/20'
              : 'border-light-border bg-light-paper dark:border-dark-border dark:bg-dark-paper'
          } p-4 shadow-md transition-all duration-300 hover:border-light-primary hover:shadow-lg dark:hover:border-dark-primary dark:hover:shadow-xl dark:hover:shadow-dark-background-gradient-end/5`}
        >
          <div className="relative overflow-hidden">
            <div
              className={`absolute left-0 top-0 h-full w-1 ${
                isActive
                  ? 'bg-light-primary dark:bg-dark-primary'
                  : 'bg-gradient-to-b from-light-primary to-light-secondary opacity-60 dark:from-dark-primary dark:to-dark-secondary'
              }`}
            />
            <div className="pl-3">
              <h3
                className={`truncate font-medium ${
                  isActive
                    ? 'text-light-primary dark:text-dark-primary'
                    : 'text-light-text-primary dark:text-dark-text-primary'
                }`}
              >
                {title}
              </h3>
              <p className="mt-1 text-xs text-light-text-secondary dark:text-dark-text-secondary">第 {index - 1} 章</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ChapterCard;
