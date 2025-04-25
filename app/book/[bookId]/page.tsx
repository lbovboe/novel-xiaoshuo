import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Image from 'next/image';

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

export default async function BookPage({ params }: { params: { bookId: string } }) {
  const bookId = decodeURIComponent(params.bookId);
  const book = await getBookData(bookId);
  
  if (!book) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Book not found</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Books
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
          ← Back to Books
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-md">
            <Image 
              src={book.coverImage}
              alt={book.title}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        
        <div className="md:w-2/3 lg:w-3/4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{book.description}</p>
          <div className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded inline-block">
            {book.chapters.length} Chapters
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Chapters</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {book.chapters.map((chapter) => (
          <Link 
            href={`/book/${encodeURIComponent(book.id)}/chapter/${chapter.index}`} 
            key={chapter.index}
            className="bg-white rounded-lg border border-gray-200 p-4 shadow-md hover:shadow-lg transition-shadow hover:border-blue-500"
          >
            <div className="text-lg font-medium text-gray-900">
              Chapter {chapter.index}: {chapter.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 