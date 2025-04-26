'use client';

import React from 'react';
import Link from 'next/link';
import FadeIn from '@/app/components/tools/Animation/FadeIn';
import { ChapterData } from '@/app/lib/chapter';
import { useSettings } from '@/app/context/SettingsContext';

interface ChapterDetailProps {
  bookId: string;
  chapter: ChapterData;
  prevChapterExists: boolean;
  nextChapterExists: boolean;
  chapterIndex: number;
}

// Format content with proper paragraph breaks
function formatContent(content: string, fontSize: string, convertText: (text: string) => string) {
  // Split content into paragraphs
  const paragraphs = content.split('\n').filter((p) => p.trim().length > 0);

  // Determine font size class based on settings
  let fontSizeClass = 'text-lg';
  if (fontSize === 'small') fontSizeClass = 'text-base';
  if (fontSize === 'large') fontSizeClass = 'text-xl';
  if (fontSize === 'x-large') fontSizeClass = 'text-2xl';

  return paragraphs.map((paragraph, index) => (
    <p
      key={index}
      className={`mb-4 ${fontSizeClass} leading-relaxed text-light-text-primary dark:text-dark-text-primary`}
    >
      {convertText(paragraph)}
    </p>
  ));
}

export default function ChapterDetail({
  bookId,
  chapter,
  prevChapterExists,
  nextChapterExists,
  chapterIndex,
}: ChapterDetailProps) {
  const { fontSize, convertText } = useSettings();

  return (
    <div className="container mx-auto max-w-4xl px-4 pb-12 md:px-8 md:pt-4">
      <FadeIn direction="left">
        <div className="mt-4">
          <Link
            href={`/book/${encodeURIComponent(bookId)}`}
            className="group mb-4 inline-flex items-center text-light-text-secondary transition-colors hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
          >
            <span className="mr-2 transform transition-transform duration-300 group-hover:-translate-x-1">←</span>
            {convertText('返回章节列表')}
          </Link>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="mb-4 w-fit">
          <h1 className="mb-2 text-2xl font-bold text-light-text-primary dark:text-dark-text-primary md:text-3xl">
            {convertText(chapter.title)}
          </h1>
          <div className="h-1 w-full bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary"></div>
        </div>
      </FadeIn>

      <div className="rounded-lg bg-light-paper p-6 shadow-lg dark:bg-dark-paper">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {formatContent(chapter.content, fontSize, convertText)}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        {prevChapterExists && (
          <div className="transform transition-transform duration-300 hover:-translate-x-1">
            <Link
              href={`/book/${encodeURIComponent(bookId)}/chapter/${chapterIndex - 1}`}
              className="rounded bg-light-paper px-4 py-2 text-light-text-primary shadow-md transition-all hover:bg-light-primary/10 hover:text-light-primary dark:bg-dark-paper dark:text-dark-text-primary dark:hover:bg-dark-primary/10 dark:hover:text-dark-primary"
            >
              {convertText('← 上一章')}
            </Link>
          </div>
        )}

        <div className="flex-grow"></div>

        {nextChapterExists && (
          <div className="transform transition-transform duration-300 hover:translate-x-1">
            <Link
              href={`/book/${encodeURIComponent(bookId)}/chapter/${chapterIndex + 1}`}
              className="rounded bg-light-paper px-4 py-2 text-light-text-primary shadow-md transition-all hover:bg-light-primary/10 hover:text-light-primary dark:bg-dark-paper dark:text-dark-text-primary dark:hover:bg-dark-primary/10 dark:hover:text-dark-primary"
            >
              {convertText('下一章 →')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
