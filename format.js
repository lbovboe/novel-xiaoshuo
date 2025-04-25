const fs = require('fs-extra');
const path = require('path');

// Configuration
const config = {
  // Input directory where novels are stored (should match scraper.js output)
  inputDir: './output',
  // Output directory for formatted files
  outputDir: './formatted',
  // Line spacing for paragraphs (1-3)
  lineSpacing: 1,
  // Chapter title format: 1 = "Chapter X: Title", 2 = "Chapter X", 3 = "Title"
  chapterTitleFormat: 1,
  // Page width (characters per line)
  pageWidth: 80,
  // Add table of contents
  addTableOfContents: true,
  // Add metadata page at the beginning
  addMetadata: true,
};

// Create output directory if it doesn't exist
fs.ensureDirSync(config.outputDir);

/**
 * Format the content of a chapter
 * @param {string} content - The raw content of the chapter
 * @returns {string} - The formatted content
 */
function formatChapterContent(content) {
  // Split content into paragraphs
  let paragraphs = content
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p && p.length > 0);

  // Format each paragraph
  paragraphs = paragraphs
    .map((p) => {
      // Remove common artifacts
      p = p
        .replace(/&nbsp;/g, ' ')
        .replace(/^　+/g, '') // Remove leading full-width spaces
        .replace(/^[ \t]+/g, '') // Remove leading spaces
        .replace(/^<br\s*\/?>/gi, '') // Remove leading <br>
        .trim();

      // Skip empty paragraphs
      if (!p) return '';

      // Wrap long paragraphs
      if (config.pageWidth > 0 && p.length > config.pageWidth) {
        const wrapped = [];
        let currentLine = '';
        const words = p.split(' ');

        // For Chinese text, we need to handle characters individually
        if (/[\u4e00-\u9fa5]/.test(p)) {
          for (let i = 0; i < p.length; i++) {
            if (currentLine.length >= config.pageWidth) {
              wrapped.push(currentLine);
              currentLine = '';
            }
            currentLine += p[i];
          }
          if (currentLine) wrapped.push(currentLine);
          return wrapped.join('\n');
        } else {
          // For non-Chinese text, wrap by words
          for (const word of words) {
            if ((currentLine + word).length > config.pageWidth) {
              wrapped.push(currentLine);
              currentLine = word;
            } else {
              currentLine += (currentLine ? ' ' : '') + word;
            }
          }
          if (currentLine) wrapped.push(currentLine);
          return wrapped.join('\n');
        }
      }

      return p;
    })
    .filter((p) => p);

  // Join paragraphs with appropriate spacing
  const spacing = '\n' + '\n'.repeat(config.lineSpacing);
  return paragraphs.join(spacing);
}

/**
 * Format a chapter title based on configuration
 * @param {number} chapterNumber - The chapter number
 * @param {string} title - The chapter title
 * @returns {string} - The formatted chapter title
 */
function formatChapterTitle(chapterNumber, title) {
  switch (config.chapterTitleFormat) {
    case 1:
      return `Chapter ${chapterNumber}: ${title}`;
    case 2:
      return `Chapter ${chapterNumber}`;
    case 3:
      return title;
    default:
      return `Chapter ${chapterNumber}: ${title}`;
  }
}

/**
 * Create a table of contents from chapter data
 * @param {Array} chapters - The array of chapter objects
 * @returns {string} - The formatted table of contents
 */
function createTableOfContents(chapters) {
  const toc = ['Table of Contents', '=================', ''];

  chapters.forEach((chapter, index) => {
    const chapterTitle = formatChapterTitle(chapter.index, chapter.title);
    toc.push(`${chapterTitle}`);
  });

  return toc.join('\n');
}

/**
 * Create a metadata page with novel information
 * @param {Object} novel - The novel object
 * @returns {string} - The formatted metadata page
 */
function createMetadataPage(novel) {
  const metadata = [
    novel.title,
    '='.repeat(novel.title.length),
    '',
    `Source: ${novel.url}`,
    `Chapters: ${novel.chapters.length}`,
    `Scraped: ${new Date(novel.scrapedAt).toLocaleString()}`,
    `Formatted: ${new Date().toLocaleString()}`,
    '',
    '-'.repeat(40),
    '',
  ];

  return metadata.join('\n');
}

/**
 * Format a novel from JSON to text format
 * @param {string} novelPath - Path to the novel JSON file
 */
async function formatNovel(novelPath) {
  try {
    console.log(`Formatting novel: ${novelPath}`);

    // Load novel data
    const novel = await fs.readJson(novelPath);

    // Create output directory for this novel
    const novelDir = path.dirname(novelPath);
    const novelName = novel.title;
    const outputDir = path.join(config.outputDir, novelName);
    fs.ensureDirSync(outputDir);

    // Format each chapter
    const formattedChapters = [];

    for (const chapter of novel.chapters) {
      console.log(`Formatting chapter ${chapter.index}: ${chapter.title}`);

      const chapterTitle = formatChapterTitle(chapter.index, chapter.title);
      const formattedContent = formatChapterContent(chapter.content);

      // Create formatted chapter content with title
      const formattedChapter = [chapterTitle, '='.repeat(chapterTitle.length), '', formattedContent].join('\n');

      formattedChapters.push(formattedChapter);

      // Save individual chapter file
      const chapterFilename = path.join(outputDir, `chapter-${String(chapter.index).padStart(4, '0')}.txt`);
      await fs.writeFile(chapterFilename, formattedChapter);
    }

    // Create complete novel text
    let novelContent = '';

    // Add metadata page
    if (config.addMetadata) {
      novelContent += createMetadataPage(novel) + '\n\n';
    }

    // Add table of contents
    if (config.addTableOfContents) {
      novelContent += createTableOfContents(novel.chapters) + '\n\n';
    }

    // Add all chapters
    novelContent += formattedChapters.join('\n\n' + '-'.repeat(40) + '\n\n');

    // Save complete novel
    const completeNovelPath = path.join(outputDir, `${novelName}.txt`);
    await fs.writeFile(completeNovelPath, novelContent);

    console.log(`Novel formatting completed!`);
    console.log(`Output file: ${completeNovelPath}`);

    return {
      title: novel.title,
      outputPath: completeNovelPath,
    };
  } catch (error) {
    console.error('Error formatting novel:', error.message);
    throw error;
  }
}

/**
 * Main function to run the formatter
 */
async function main() {
  try {
    console.log('Starting formatter...');

    // Get all novel.json files in the input directory
    const novels = [];
    const dirs = await fs.readdir(config.inputDir);

    for (const dir of dirs) {
      const novelDir = path.join(config.inputDir, dir);
      const stats = await fs.stat(novelDir);

      if (stats.isDirectory()) {
        const novelPath = path.join(novelDir, 'novel.json');
        if (await fs.pathExists(novelPath)) {
          novels.push(novelPath);
        }
      }
    }

    console.log(`Found ${novels.length} novels to format`);

    // Format each novel
    for (const novel of novels) {
      await formatNovel(novel);
    }

    console.log('All novels formatted successfully!');
  } catch (error) {
    console.error('Formatting failed:', error.message);
  }
}

// Run the formatter
if (require.main === module) {
  main();
}

module.exports = {
  formatNovel,
  formatChapterContent,
};
