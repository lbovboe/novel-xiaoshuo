import React from 'react';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import ChapterDetail from '@/app/components/Book/ChapterDetail';
import { getChapterContent, chapterExists, generateChapterParams } from '@/app/lib/chapter';
import { getBookData } from '@/app/lib/book';

// Force static generation
export const dynamic = 'force-static';

// Cache the chapter content fetching
const getCachedChapterContent = unstable_cache(
  async (bookId: string, chapterIndex: number) => {
    return getChapterContent(bookId, chapterIndex);
  },
  ['chapter-content'],
  { revalidate: 3600 } // Cache for 1 hour
);

// Cache the chapter existence check
const getCachedChapterExists = unstable_cache(
  async (bookId: string, chapterIndex: number) => {
    return chapterExists(bookId, chapterIndex);
  },
  ['chapter-exists'],
  { revalidate: 3600 } // Cache for 1 hour
);

// Cache book data fetching
const getCachedBookData = unstable_cache(
  async (bookId: string) => {
    return getBookData(bookId);
  },
  ['book-data'],
  { revalidate: 3600 } // Cache for 1 hour
);

// Use the utility function for generating static params
export async function generateStaticParams() {
  return generateChapterParams();
}

export default async function ChapterPage({ params }: { params: Promise<{ bookId: string; chapterIndex: string }> }) {
  const resolvedParams = await params;
  const bookId = decodeURIComponent(resolvedParams.bookId);
  const chapterIndex = parseInt(resolvedParams.chapterIndex);

  // Fetch all data in parallel
  const [chapter, bookData, prevChapterExists, nextChapterExists] = await Promise.all([
    getCachedChapterContent(bookId, chapterIndex),
    getCachedBookData(bookId),
    getCachedChapterExists(bookId, chapterIndex - 1),
    getCachedChapterExists(bookId, chapterIndex + 1),
  ]);

  if (!chapter) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">未找到章节</h1>
        <Link
          href={`/book/${encodeURIComponent(bookId)}`}
          className="text-light-primary hover:underline dark:text-dark-primary"
        >
          返回书籍详情
        </Link>
      </div>
    );
  }

  return (
    <ChapterDetail
      bookId={bookId}
      chapter={chapter}
      prevChapterExists={prevChapterExists}
      nextChapterExists={nextChapterExists}
      chapterIndex={chapterIndex}
      bookData={bookData}
    />
  );
}
