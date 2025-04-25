import fs from 'fs';
import path from 'path';

// Type definition for chapter data
export type Chapter = {
  index: number;
  title: string;
};

// Type definition for book data
export type Book = {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  chapters: Chapter[];
};

// Get list of all available book IDs
export async function generateBookParams() {
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

// Get book data and its chapters
export async function getBookData(bookId: string): Promise<Book | null> {
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