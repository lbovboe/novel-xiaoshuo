'use client';

import { useState, useEffect } from 'react';
import { FiBook } from 'react-icons/fi';
import BookMenuModal from '@/app/components/tools/BookMenuModal';
import { usePathname } from 'next/navigation';

const BookMenuToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Check if the current path is a chapter page
  const isChapterPage = pathname?.includes('/book/') && pathname?.includes('/chapter/');

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Don't render anything if not on a chapter page
  if (!isChapterPage) return null;

  if (!mounted) {
    return (
      <button
        className="relative rounded-md bg-gradient-to-r from-light-secondary to-light-primary p-2 text-dark-text-primary transition-colors dark:from-dark-secondary dark:to-dark-primary"
        aria-label="Open book menu"
      >
        <span className="h-5 w-5"></span>
      </button>
    );
  }

  return (
    <>
      <button
        onClick={openModal}
        className="relative rounded-md bg-gradient-to-r from-light-secondary to-light-primary p-2 text-dark-text-primary transition-colors dark:from-dark-secondary dark:to-dark-primary"
        aria-label="Open book menu"
      >
        <FiBook size={20} />
      </button>

      {isOpen && <BookMenuModal onClose={closeModal} />}
    </>
  );
};

export default BookMenuToggle;
