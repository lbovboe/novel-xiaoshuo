import React from 'react';
import Link from 'next/link';
import FadeIn from '@/app/components/tools/Animation/FadeIn';
import ChapterCard from '@/app/components/Book/ChapterCard';
import { Book } from '@/app/lib/book';

interface BookDetailProps {
  book: Book;
}

export default function BookDetail({ book }: BookDetailProps) {
  return (
    <div className="container mx-auto px-4 pb-12 md:px-8 pt-4">
      <FadeIn direction="left">
        <div className="mb-2">
          <Link 
            href="/" 
            className="group mb-4 inline-flex items-center text-light-text-secondary transition-colors hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
          >
            <span className="mr-2 transform transition-transform duration-300 group-hover:-translate-x-1">←</span>
            Back to Books
          </Link>
        </div>
      </FadeIn>
      
      <FadeIn direction="up" delay={0.2}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {book.chapters.map((chapter, i) => (
            i !== 0 && (
              <ChapterCard 
                key={chapter.index}
                bookId={book.id}
                index={chapter.index}
                title={chapter.title}
              />
            )
          ))}
        </div>
      </FadeIn>
    </div>
  );
} 