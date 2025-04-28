'use client';

import { useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSettings } from '@/app/context/SettingsContext';

interface BookMenuModalProps {
  onClose: () => void;
}

interface Chapter {
  index: number;
  title: string;
}

interface BookData {
  bookId: string;
  currentChapter: number;
  chapters: Chapter[];
}

const BookMenuModal = ({ onClose }: BookMenuModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const chaptersContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(true);
  const { convertText } = useSettings();
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  // Parse the current URL to get book ID and chapter index
  useEffect(() => {
    if (!pathname) return;

    // Extract bookId and chapterIndex from pathname
    const pathParts = pathname.split('/');
    const bookIdIndex = pathParts.findIndex((part) => part === 'book') + 1;
    const chapterIndexIndex = pathParts.findIndex((part) => part === 'chapter') + 1;

    if (bookIdIndex > 0 && chapterIndexIndex > 0 && pathParts.length > chapterIndexIndex) {
      const bookId = decodeURIComponent(pathParts[bookIdIndex]);
      const currentChapter = parseInt(pathParts[chapterIndexIndex], 10);

      // Try to load book data from localStorage
      const storedData = localStorage.getItem(`book_data_${bookId}`);

      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setBookData(parsedData);

          // Update current chapter if it's different
          if (parsedData.currentChapter !== currentChapter) {
            const updatedData = {
              ...parsedData,
              currentChapter,
            };
            localStorage.setItem(`book_data_${bookId}`, JSON.stringify(updatedData));
            setBookData(updatedData);
          }
          setLoading(false);
        } catch (e) {
          console.error('Error parsing stored book data:', e);
        }
      } else {
        console.log('No storedData');
      }
    }
  }, [pathname]);

  // Scroll handler that finds and scrolls to the active chapter
  const scrollToActiveChapter = () => {
    if (initialScrollDone || !bookData || !chaptersContainerRef.current) return;

    // Find the active chapter element
    const activeChapterElement = chaptersContainerRef.current.querySelector('[data-active="true"]');

    if (activeChapterElement) {
      // Use scrollIntoView instead of manual calculation which may be affected by device differences
      activeChapterElement.scrollIntoView({
        behavior: 'auto', // Use 'auto' instead of 'smooth' for immediate scroll
        block: 'center', // Center the element in the visible area
      });

      setInitialScrollDone(true);
    }
  };

  // Run the scroll handler when the component renders and data is loaded
  useEffect(() => {
    if (!loading && bookData && !initialScrollDone) {
      // Use requestAnimationFrame to ensure DOM is updated
      requestAnimationFrame(() => {
        scrollToActiveChapter();
      });
    }
  }, [loading, bookData, initialScrollDone]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
    >
      <m.div
        ref={modalRef}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="max-h-[80vh] w-full max-w-md overflow-hidden rounded-xl border border-light-border bg-light-paper shadow-2xl dark:border-dark-border dark:bg-dark-paper"
      >
        <div className="sticky top-0 z-10 mb-2 flex items-center justify-between border-b border-light-border bg-light-paper p-4 dark:border-dark-border dark:bg-dark-paper">
          <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
            {convertText ? convertText('章节目录') : '章节目录'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-light-text-secondary transition-colors hover:bg-light-background/80 hover:text-light-primary dark:text-dark-text-secondary dark:hover:bg-dark-background/80 dark:hover:text-dark-primary"
            aria-label="Close modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div ref={chaptersContainerRef} className="max-h-[calc(80vh-4rem)] overflow-y-auto p-4">
          {loading ? (
            <div className="py-12 text-center text-light-text-secondary dark:text-dark-text-secondary">
              {convertText ? convertText('加载中...') : '加载中...'}
            </div>
          ) : bookData ? (
            <div className="grid grid-cols-1 gap-2">
              {bookData.chapters.map((chapter) => (
                <Link
                  key={chapter.index}
                  href={`/book/${encodeURIComponent(bookData.bookId)}/chapter/${chapter.index}`}
                  onClick={onClose}
                  data-active={bookData.currentChapter === chapter.index}
                  className={`rounded-lg px-4 py-2.5 transition-all duration-200 ${
                    bookData.currentChapter === chapter.index
                      ? 'bg-light-primary text-white shadow-md dark:bg-dark-primary'
                      : 'bg-light-background/80 text-light-text-primary hover:bg-light-background dark:bg-dark-background/80 dark:text-dark-text-primary dark:hover:bg-dark-background'
                  }`}
                >
                  {convertText ? convertText(chapter.title) : chapter.title}
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-light-text-secondary dark:text-dark-text-secondary">
              {convertText ? convertText('未找到章节信息') : '未找到章节信息'}
            </div>
          )}
        </div>
      </m.div>
    </m.div>
  );
};

export default BookMenuModal;
