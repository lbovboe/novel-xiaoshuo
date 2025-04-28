'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import ChapterCard from '@/app/components/Book/ChapterCard';
import { Book } from '@/app/lib/book';
import { useSettings } from '@/app/context/SettingsContext';

interface BookDetailProps {
  book: Book;
}

export default function BookDetail({ book }: BookDetailProps) {
  const [currentChapter, setCurrentChapter] = useState<number | null>(null);
  const { convertText } = useSettings();
  const chaptersContainerRef = useRef<HTMLDivElement>(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  // Simple one-time scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Try to load book data from localStorage
    const storedData = localStorage.getItem(`book_data_${book.id}`);

    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        console.log('Loaded chapter data:', parsedData.currentChapter);
        setCurrentChapter(parsedData.currentChapter);
      } catch (e) {
        console.error('Error parsing stored book data:', e);
      }
    } else {
      // Initialize book data in localStorage if it doesn't exist
      const initialBookData = {
        bookId: book.id,
        currentChapter: null,
        chapters: book.chapters,
      };
      localStorage.setItem(`book_data_${book.id}`, JSON.stringify(initialBookData));
    }
  }, [book.id, book.chapters]);

  // Scroll to active chapter immediately when set
  useEffect(() => {
    if (!initialScrollDone && currentChapter && chaptersContainerRef.current) {
      console.log('Scrolling to chapter:', currentChapter);

      const container = chaptersContainerRef.current;
      const activeChapterElement = container.querySelector(`[data-chapter="${currentChapter}"]`);

      if (activeChapterElement) {
        // Immediately scroll to the element
        activeChapterElement.scrollIntoView({
          behavior: 'auto',
          block: 'center',
        });

        setInitialScrollDone(true);
      }
    }
  }, [currentChapter, initialScrollDone]);

  // Function to navigate directly to the last read chapter
  const goToLastReadChapter = () => {
    if (currentChapter) {
      window.location.href = `/book/${encodeURIComponent(book.id)}/chapter/${currentChapter}`;
    }
  };

  return (
    <div className="container mx-auto px-4 pb-12 pt-4 md:px-8">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/"
          className="group inline-flex items-center text-light-text-secondary transition-colors hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
        >
          <span className="mr-2 transform transition-transform duration-300 group-hover:-translate-x-1">←</span>
          {convertText ? convertText('返回书籍列表') : '返回书籍列表'}
        </Link>

        {currentChapter && (
          <button
            onClick={goToLastReadChapter}
            className="rounded-lg bg-light-primary px-4 py-2 text-sm text-white shadow-md transition-all hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90"
          >
            {convertText ? convertText('继续阅读') : '继续阅读'}
          </button>
        )}
      </div>

      <div ref={chaptersContainerRef} className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {book.chapters.map(
          (chapter, i) =>
            i !== 0 && (
              <div key={chapter.index} data-chapter={chapter.index}>
                <ChapterCard
                  bookId={book.id}
                  index={chapter.index}
                  title={chapter.title}
                  isActive={currentChapter === chapter.index}
                />
              </div>
            )
        )}
      </div>
    </div>
  );
}
