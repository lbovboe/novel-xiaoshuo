import fs from 'fs';
import path from 'path';

// Chapter data type
export type ChapterData = {
  index: number;
  title: string;
  content: string;
};

// Get chapter content by book ID and chapter index
export async function getChapterContent(bookId: string, chapterIndex: number): Promise<ChapterData | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      'output',
      bookId,
      `chapter-${String(chapterIndex).padStart(4, '0')}.json`
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
export async function chapterExists(bookId: string, chapterIndex: number): Promise<boolean> {
  try {
    const filePath = path.join(
      process.cwd(),
      'output',
      bookId,
      `chapter-${String(chapterIndex).padStart(4, '0')}.json`
    );
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

// Function to get all book IDs and chapter indices for static generation
export async function generateChapterParams() {
  try {
    const outputDir = path.join(process.cwd(), 'output');
    if (!fs.existsSync(outputDir)) {
      return [];
    }
    
    // Get all book directories
    const bookDirs = fs.readdirSync(outputDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    // For each book, get all its chapters
    const params = [];
    
    for (const bookId of bookDirs) {
      const bookPath = path.join(outputDir, bookId);
      const files = fs.readdirSync(bookPath);
      
      // Filter chapter files
      const chapterFiles = files.filter(file => 
        file.startsWith('chapter-') && file.endsWith('.json')
      );
      
      // Create params for each chapter
      for (const file of chapterFiles) {
        const chapterIndex = parseInt(
          file.replace('chapter-', '').replace('.json', '')
        );
        
        params.push({
          bookId,
          chapterIndex: String(chapterIndex)
        });
      }
    }
    
    return params;
  } catch (error) {
    console.error('Error generating static params for chapters:', error);
    return [];
  }
} 