import React from 'react';
import Link from 'next/link';
import ChapterDetail from '@/app/components/Book/ChapterDetail';
import { getChapterContent, chapterExists, generateChapterParams } from '@/app/lib/chapter';

// Force static generation
export const dynamic = 'force-static';

// Use the utility function for generating static params
export async function generateStaticParams() {
  return generateChapterParams();
}

export default async function ChapterPage({ params }: { params: Promise<{ bookId: string; chapterIndex: string }> }) {
  const resolvedParams = await params;
  const bookId = decodeURIComponent(resolvedParams.bookId);
  const chapterIndex = parseInt(resolvedParams.chapterIndex);
  const chapter = await getChapterContent(bookId, chapterIndex);

  // Check if previous and next chapters exist
  const prevChapterExists = await chapterExists(bookId, chapterIndex - 1);
  const nextChapterExists = await chapterExists(bookId, chapterIndex + 1);

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
    />
  );
}
