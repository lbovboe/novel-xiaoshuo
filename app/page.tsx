import React from 'react';
import fs from 'fs';
import path from 'path';
import HomeClient from './components/HomeClient';

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
    const bookDirs = fs
      .readdirSync(outputDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    // Create a book object for each directory
    const books = bookDirs.map((bookDir) => {
      const bookPath = path.join(outputDir, bookDir);

      // Count chapters in the book
      const files = fs.readdirSync(bookPath);
      const chapterFiles = files.filter((file) => file.startsWith('chapter-') && file.endsWith('.json'));

      return {
        id: bookDir,
        title: bookDir, // Using directory name as title
        description: `A captivating novel with ${chapterFiles.length} chapters.`,
        coverImage: `/images/novel/${bookDir}.jpg`, // Updated cover image path
        chapterCount: chapterFiles.length,
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
  return <HomeClient books={books} />;
}
