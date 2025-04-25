import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';

// Type definition for book data
type Book = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  chapterCount: number;
};

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
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Novel Collection</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link 
            href={`/book/${encodeURIComponent(book.id)}`} 
            key={book.id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={book.coverImage}
                  alt={book.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{book.title}</h2>
                <p className="text-gray-600 mb-4">{book.description}</p>
                <div className="flex justify-between items-center">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {book.chapterCount} Chapters
                  </span>
                  <span className="text-blue-600 font-medium text-sm group-hover:underline">
                    Read Now →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
