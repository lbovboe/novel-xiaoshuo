import React from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// Type definition for chapter data
type Chapter = {
  index: number;
  title: string;
};

// Get all chapters data
async function getChapters(): Promise<Chapter[]> {
  try {
    const novelDir = path.join(process.cwd(), 'output/重生之最强剑神最新章节');

    // Read all files in the directory
    const files = fs.readdirSync(novelDir);

    // Filter chapter files only
    const chapterFiles = files.filter((file) => file.startsWith('chapter-') && file.endsWith('.json'));

    // Sort chapter files by chapter number
    chapterFiles.sort((a, b) => {
      const numA = parseInt(a.replace('chapter-', '').replace('.json', ''));
      const numB = parseInt(b.replace('chapter-', '').replace('.json', ''));
      return numA - numB;
    });

    // Read chapter data from each file
    const chapters = chapterFiles.map((file) => {
      const filePath = path.join(novelDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const chapterData = JSON.parse(fileContent);

      return {
        index: chapterData.index,
        title: chapterData.title,
      };
    });

    return chapters;
  } catch (error) {
    console.error('Error loading chapters:', error);
    return [];
  }
}

export default async function Home() {
  const chapters = await getChapters();

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">重生之最强剑神</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <Link
            href={`/chapter/${chapter.index}`}
            key={chapter.index}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-shadow hover:border-blue-500 hover:shadow-lg"
          >
            <div className="text-lg font-medium text-gray-900">
               {chapter.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
