import React from 'react';
import fs from 'fs';
import path from 'path';
import FadeIn from './components/tools/Animation/FadeIn';
import BookCard from './components/Book/BookCard';

// Type definition for book data
type Book = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  chapterCount: number;
};

// Force static generation
export const dynamic = 'force-static';

// Get all books data
async function getBooks(): Promise<Book[]> {
  try {
    // Get all directories in the output folder
    const outputDir = path.join(process.cwd(), 'output');
    const bookDirs = fs.readdirSync(outputDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    // Create a book object for each directory
    const books = bookDirs.map(bookDir => {
      const bookPath = path.join(outputDir, bookDir);
      
      // Count chapters in the book
      const files = fs.readdirSync(bookPath);
      const chapterFiles = files.filter(file => 
        file.startsWith('chapter-') && file.endsWith('.json')
      );
      
      return {
        id: bookDir,
        title: bookDir, // Using directory name as title
        description: `A captivating novel with ${chapterFiles.length} chapters.`,
        coverImage: '/images/book-cover.png', // Updated cover image path
        chapterCount: chapterFiles.length
      };
    });
    
    return books;
  } catch (error) {
    console.error('Error loading books:', error);
    return [];
  }
}

export default async function Home() {
  const books = await getBooks();
  
  return (
    <div className="container mx-auto px-4 pb-12 pt-2 md:px-8 md:pt-4">
      <FadeIn direction="down">
        <h1 className="mb-8 text-center text-3xl font-bold text-light-text-primary md:text-4xl dark:text-dark-text-primary">
          本人最爱小说
        </h1>
      </FadeIn>
      
      <FadeIn direction="up" delay={0.2}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {books.map((book, index) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              description={book.description}
              coverImage={book.coverImage}
              chapterCount={book.chapterCount}
            />
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
