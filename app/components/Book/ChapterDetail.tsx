'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import FadeIn from '@/app/components/tools/Animation/FadeIn';
import { ChapterData } from '@/app/lib/chapter';
import { useSettings } from '@/app/context/SettingsContext';
import { Book } from '@/app/lib/book';
import NavBar from '@/app/components/Headers/NavBar';
interface ChapterDetailProps {
  bookId: string;
  chapter: ChapterData;
  prevChapterExists: boolean;
  nextChapterExists: boolean;
  chapterIndex: number;
  bookData: Book | null;
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
  bookData,
}: ChapterDetailProps) {
  const { fontSize, convertText, autoNext } = useSettings();
  const router = useRouter();
  const footerRef = useRef<HTMLDivElement>(null);
  const [showNavBar, setShowNavBar] = useState(false);
  const handleShowNavBar = () => {
    if (window.scrollY >= 300) {
      setShowNavBar(!showNavBar);
    } else {
      setShowNavBar(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setShowNavBar(false);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Save current chapter to localStorage
    try {
      const storageKey = `book_data_${bookId}`;
      const existingData = localStorage.getItem(storageKey);

      if (existingData) {
        const bookData = JSON.parse(existingData);
        bookData.currentChapter = chapterIndex;
        bookData.lastAccessed = Date.now(); // Add timestamp for tracking recency
        try {
          localStorage.setItem(storageKey, JSON.stringify(bookData));
        } catch (storageError) {
          // Handle localStorage quota exceeded
          if (isQuotaExceededError(storageError)) {
            clearOldestLocalStorageItems();
            localStorage.setItem(storageKey, JSON.stringify(bookData));
          } else {
            throw storageError;
          }
        }
      } else {
        // Use server-fetched book data instead of API call
        const newBookData = {
          bookId,
          currentChapter: chapterIndex,
          chapters: bookData?.chapters || [{ index: chapterIndex, title: chapter.title }],
          lastAccessed: Date.now(), // Add timestamp for tracking recency
        };
        try {
          localStorage.setItem(storageKey, JSON.stringify(newBookData));
        } catch (storageError) {
          // Handle localStorage quota exceeded
          if (isQuotaExceededError(storageError)) {
            clearOldestLocalStorageItems();
            localStorage.setItem(storageKey, JSON.stringify(newBookData));
          } else {
            throw storageError;
          }
        }
      }
    } catch (e) {
      console.error('Error saving chapter data to localStorage:', e);
    }
  }, [bookId, chapterIndex, chapter, bookData]);

  // Function to check if error is a quota exceeded error
  const isQuotaExceededError = (e: any): boolean => {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    );
  };

  // Function to clear oldest localStorage items until we have enough space
  const clearOldestLocalStorageItems = () => {
    // Get all book data keys
    const bookDataKeys = Object.keys(localStorage).filter((key) => key.startsWith('book_data_'));

    if (bookDataKeys.length > 0) {
      // Create array of books with their access times
      const booksWithAccessTimes = bookDataKeys
        .map((key) => {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '{}');
            return {
              key,
              lastAccessed: data.lastAccessed || 0, // Default to 0 if not found
            };
          } catch (e) {
            // If data is corrupted, consider it old
            return { key, lastAccessed: 0 };
          }
        })
        .sort((a, b) => a.lastAccessed - b.lastAccessed); // Sort oldest first

      // Remove the oldest items (up to 3)
      for (let i = 0; i < Math.min(2, booksWithAccessTimes.length); i++) {
        localStorage.removeItem(booksWithAccessTimes[i].key);
      }
    }
  };

  useEffect(() => {
    if (!autoNext || !nextChapterExists) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When footer is visible, set a timer to navigate to the next chapter
            const timer = setTimeout(() => {
              router.push(`/book/${encodeURIComponent(bookId)}/chapter/${chapterIndex + 1}`);
            }, 2000);

            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the footer is visible
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, [autoNext, nextChapterExists, bookId, chapterIndex, router]);

  return (
    <div className="container relative mx-auto max-w-4xl px-4 pb-12 md:px-8">
      <div
        className={`fixed left-0 top-0 z-50 w-full transition-opacity duration-1000 ease-in-out ${showNavBar ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <NavBar />
      </div>
      <FadeIn direction="left">
        <div className="">
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

      <div className="rounded-lg bg-light-paper p-6 shadow-lg dark:bg-dark-paper" onClick={handleShowNavBar}>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {formatContent(chapter.content, fontSize, convertText)}
        </div>
      </div>

      <div ref={footerRef} className="mt-8 flex justify-between">
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

      {autoNext && nextChapterExists && (
        <div className="mt-4 text-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
          {convertText('滚动到底部将在1秒后自动前往下一章')}
        </div>
      )}
    </div>
  );
}
