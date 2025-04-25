import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/app/components/tools/Animation/FadeIn';
import ChapterCard from '@/app/components/Book/ChapterCard';

// Type definition for chapter data
type Chapter = {
  index: number;
  title: string;
};

// Type definition for book data
type Book = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  chapters: Chapter[];
};

// Get list of all available book IDs
export async function generateStaticParams() {
  try {
    const outputDir = path.join(process.cwd(), 'output');
    if (!fs.existsSync(outputDir)) {
      return [];
    }
    
    // Get all directories in the output folder (each directory is a book)
    const books = fs.readdirSync(outputDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => ({ bookId: dirent.name }));
    
    return books;
  } catch (error) {
    console.error('Error generating static params for books:', error);
    return [];
  }
}

// Force static generation
export const dynamic = 'force-static';

// Get book data and its chapters
async function getBookData(bookId: string): Promise<Book | null> {
  try {
    const bookPath = path.join(process.cwd(), 'output', bookId);
    
    // Check if the book directory exists
    if (!fs.existsSync(bookPath)) {
      return null;
    }
    
    // Read all files in the directory
    const files = fs.readdirSync(bookPath);
    
    // Filter chapter files only
    const chapterFiles = files.filter(file => 
      file.startsWith('chapter-') && file.endsWith('.json')
    );
    
    // Sort chapter files by chapter number
    chapterFiles.sort((a, b) => {
      const numA = parseInt(a.replace('chapter-', '').replace('.json', ''));
      const numB = parseInt(b.replace('chapter-', '').replace('.json', ''));
      return numA - numB;
    });
    
    // Read chapter data from each file
    const chapters = chapterFiles.map(file => {
      const filePath = path.join(bookPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const chapterData = JSON.parse(fileContent);
      
      return {
        index: chapterData.index,
        title: chapterData.title,
      };
    });
    
    return {
      id: bookId,
      title: bookId, // Using directory name as title
      description: `A captivating novel with ${chapters.length} chapters.`,
      coverImage: '/images/book-cover.png', // Updated cover image path
      chapters: chapters,
    };
  } catch (error) {
    console.error(`Error loading book ${bookId}:`, error);
    return null;
  }
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
          {book.chapters.map((chapter,i) => (
            i!== 0 && (
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