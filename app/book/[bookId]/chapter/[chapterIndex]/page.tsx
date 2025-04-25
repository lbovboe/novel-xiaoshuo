import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

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
      `chapter-${chapterIndex}.json`
    );
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

// Format content with proper paragraph breaks
function formatContent(content: string) {
  return content.split('\n').map((paragraph, index) => {
    // Skip empty paragraphs
    if (!paragraph.trim()) return null;
    
    return (
      <p key={index} className="mb-4 text-lg leading-relaxed">
        {paragraph}
      </p>
    );
  });
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
        <h1 className="text-2xl font-bold mb-4">Chapter not found</h1>
        <Link href={`/book/${encodeURIComponent(bookId)}`} className="text-blue-500 hover:underline">
          Back to Book
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <div className="mb-6">
        <Link href={`/book/${encodeURIComponent(bookId)}`} className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Chapter List
        </Link>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-2">{chapter.title}</h1>
      <div className="text-sm text-gray-500 mb-8">Chapter {chapter.index}</div>
      
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="prose prose-lg max-w-none">
          {formatContent(chapter.content)}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        {prevChapterExists && (
          <Link
            href={`/book/${encodeURIComponent(bookId)}/chapter/${chapterIndex - 1}`}
            className="rounded bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300"
          >
            ← Previous Chapter
          </Link>
        )}
        
        <div className="flex-grow"></div>
        
        {nextChapterExists && (
          <Link
            href={`/book/${encodeURIComponent(bookId)}/chapter/${chapterIndex + 1}`}
            className="rounded bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300"
          >
            Next Chapter →
          </Link>
        )}
      </div>
    </div>
  );
} 