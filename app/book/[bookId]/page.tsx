import React from 'react';
import Link from 'next/link';
import BookDetail from '@/app/components/Book/BookDetail';
import { getBookData, generateBookParams } from '@/app/lib/book';

// Force static generation
export const dynamic = 'force-static';

// Use the utility function for generating static params
export async function generateStaticParams() {
  return generateBookParams();
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const resolvedParams = await params;
  const bookId = decodeURIComponent(resolvedParams.bookId);
  const book = await getBookData(bookId);
  
  if (!book) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">
          Book not found
        </h1>
        <Link href="/" className="text-light-primary hover:underline dark:text-dark-primary">
          Back to Books
        </Link>
      </div>
    );
  }
  
  return <BookDetail book={book} />;
} 