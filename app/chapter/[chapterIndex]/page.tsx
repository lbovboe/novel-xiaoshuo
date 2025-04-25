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

// Get chapter content by index
async function getChapterContent(chapterIndex: number): Promise<ChapterData | null> {
  try {
    const filePath = path.join(process.cwd(), `output/重生之最强剑神最新章节/chapter-000${chapterIndex}.json`);

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
    console.error(`Error loading chapter ${chapterIndex}:`, error);
    return null;
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

export default async function ChapterPage({ params }: { params: { chapterIndex: string } }) {
  const chapterIndex = parseInt(params.chapterIndex);
  const chapter = await getChapterContent(chapterIndex);

  if (!chapter) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="mb-4 text-2xl font-bold">Chapter not found</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <div className="mb-6">
        <Link href="/" className="mb-4 inline-block text-blue-500 hover:underline">
          ← Back to Chapters
        </Link>
      </div>

      <h1 className="mb-2 text-2xl font-bold md:text-3xl">{chapter.title}</h1>
      <div className="mb-8 text-sm text-gray-500">Chapter {chapter.index}</div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="prose prose-lg max-w-none">{formatContent(chapter.content)}</div>
      </div>

      <div className="mt-8 flex justify-between">
        {chapterIndex > 2814 && (
          <Link
            href={`/chapter/${chapterIndex - 1}`}
            className="rounded bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300"
          >
            ← Previous Chapter
          </Link>
        )}

        <div className="flex-grow"></div>

        {chapterIndex < 2917 && (
          <Link
            href={`/chapter/${chapterIndex + 1}`}
            className="rounded bg-gray-200 px-4 py-2 transition-colors hover:bg-gray-300"
          >
            Next Chapter →
          </Link>
        )}
      </div>
    </div>
  );
}
