import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import FadeIn from '@/app/components/tools/Animation/FadeIn';

// Chapter data type
type ChapterData = {
  index: number;
  title: string;
  content: string;
};

// Get chapter content by book ID and chapter index
async function getChapterContent(bookId: string, chapterIndex: number): Promise<ChapterData | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      'output',
      bookId,
      `chapter-000${chapterIndex}.json`
    );
    
    // Read file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Parse JSON data
    const chapterData = JSON.parse(fileContent);
    
    return {
      index: chapterData.index,
      title: chapterData.title,
      content: chapterData.content,
    };
  } catch (error) {
    console.error(`Error loading chapter ${chapterIndex} from book ${bookId}:`, error);
    return null;
  }
}

// Check if a chapter exists
async function chapterExists(bookId: string, chapterIndex: number): Promise<boolean> {
  try {
    const filePath = path.join(
      process.cwd(),
      'output',
      bookId,
      `chapter-000${chapterIndex}.json`
    );
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

// Format content with proper paragraph breaks
function formatContent(content: string) {
  // Split content into paragraphs
  const paragraphs = content.split('\n').filter(p => p.trim().length > 0);
  
  return paragraphs.map((paragraph, index) => (
    <p 
      key={index} 
      className="mb-4 text-lg leading-relaxed text-light-text-primary dark:text-dark-text-primary"
    >
      {paragraph}
    </p>
  ));
}

export default async function ChapterPage({ 
  params 
}: { 
  params: { bookId: string; chapterIndex: string } 
}) {
  const bookId = decodeURIComponent(params.bookId);
  const chapterIndex = parseInt(params.chapterIndex);
  const chapter = await getChapterContent(bookId, chapterIndex);
  
  // Check if previous and next chapters exist
  const prevChapterExists = await chapterExists(bookId, chapterIndex - 1);
  const nextChapterExists = await chapterExists(bookId, chapterIndex + 1);
  
  if (!chapter) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="mb-4 text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">Chapter not found</h1>
        <Link href={`/book/${encodeURIComponent(bookId)}`} className="text-light-primary hover:underline dark:text-dark-primary">
          Back to Book
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-4xl px-4 pb-12 md:px-8 md:pt-4">
      <FadeIn direction="left">
        <div className="mb-6">
          <Link 
            href={`/book/${encodeURIComponent(bookId)}`} 
            className="group mb-4 inline-flex items-center text-light-text-secondary transition-colors hover:text-light-primary dark:text-dark-text-secondary dark:hover:text-dark-primary"
          >
            <span className="mr-2 transform transition-transform duration-300 group-hover:-translate-x-1">←</span> 
            Back to Chapter List
          </Link>
        </div>
      </FadeIn>
      
      <FadeIn>
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold text-light-text-primary md:text-3xl dark:text-dark-text-primary">
            {chapter.title}
          </h1>
          <div className="mb-2 text-sm text-light-text-secondary dark:text-dark-text-secondary">
            Chapter {chapter.index}
          </div>
          <div className="h-1 w-24 bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary"></div>
        </div>
      </FadeIn>
      
      <div className="rounded-lg bg-light-paper p-6 shadow-lg dark:bg-dark-paper">
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {formatContent(chapter.content)}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        {prevChapterExists && (
          <div className="transform transition-transform duration-300 hover:-translate-x-1">
            <Link
              href={`/book/${encodeURIComponent(bookId)}/chapter/${chapterIndex - 1}`}
              className="rounded bg-light-paper px-4 py-2 text-light-text-primary shadow-md transition-all hover:bg-light-primary/10 hover:text-light-primary dark:bg-dark-paper dark:text-dark-text-primary dark:hover:bg-dark-primary/10 dark:hover:text-dark-primary"
            >
              ← Previous Chapter
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
              Next Chapter →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 