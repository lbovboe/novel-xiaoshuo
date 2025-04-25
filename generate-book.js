const fs = require('fs-extra');
const path = require('path');

// Configuration
const NOVEL_NAME = '重生之最强剑神';
const INPUT_DIR = path.join(__dirname, 'books', NOVEL_NAME);
const OUTPUT_DIR = path.join(__dirname, 'books', NOVEL_NAME, 'output');

// Ensure output directory exists
fs.ensureDirSync(OUTPUT_DIR);

/**
 * Generate a full book in text format
 */
async function generateTextBook() {
  try {
    console.log('Generating text book...');

    // Load the novel data
    const novelDataPath = path.join(INPUT_DIR, 'novel_data.json');
    if (!fs.existsSync(novelDataPath)) {
      console.error('Novel data file not found. Please run the scraper first.');
      return;
    }

    const novelData = fs.readJSONSync(novelDataPath);

    // Create a text file with all chapters
    let bookContent = `# ${novelData.title}\n\n`;
    bookContent += `作者: ${novelData.author}\n\n`;

    // Add a table of contents
    bookContent += '## 目录\n\n';
    for (const chapter of novelData.chapters) {
      bookContent += `- ${chapter.title}\n`;
    }
    bookContent += '\n\n';

    // Add each chapter's content
    for (const chapter of novelData.chapters) {
      bookContent += `## ${chapter.title}\n\n`;
      bookContent += `${chapter.content}\n\n`;
      bookContent += '---\n\n';
    }

    // Write the book to a text file
    const textOutputPath = path.join(OUTPUT_DIR, `${NOVEL_NAME}.txt`);
    fs.writeFileSync(textOutputPath, bookContent);

    console.log(`Text book generated at ${textOutputPath}`);
  } catch (error) {
    console.error('Error generating text book:', error);
  }
}

/**
 * Generate a book in HTML format for better reading experience
 */
async function generateHtmlBook() {
  try {
    console.log('Generating HTML book...');

    // Load the novel data
    const novelDataPath = path.join(INPUT_DIR, 'novel_data.json');
    if (!fs.existsSync(novelDataPath)) {
      console.error('Novel data file not found. Please run the scraper first.');
      return;
    }

    const novelData = fs.readJSONSync(novelDataPath);

    // Create the HTML content
    let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${novelData.title}</title>
      <style>
        body {
          font-family: 'Noto Sans SC', Arial, sans-serif;
          line-height: 1.6;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          background-color: #f9f5e9;
          color: #333;
        }
        h1 {
          text-align: center;
          color: #5a3e2b;
          margin-bottom: 10px;
        }
        h2 {
          color: #5a3e2b;
          border-bottom: 1px solid #ddd;
          padding-bottom: 5px;
          margin-top: 30px;
        }
        .author {
          text-align: center;
          color: #777;
          margin-bottom: 40px;
        }
        .toc {
          background-color: #f5efe0;
          padding: 20px;
          border-radius: 5px;
          margin-bottom: 30px;
        }
        .toc h2 {
          margin-top: 0;
        }
        .toc ul {
          list-style-type: none;
          padding-left: 0;
        }
        .toc li {
          margin-bottom: 5px;
        }
        .toc a {
          color: #5a3e2b;
          text-decoration: none;
        }
        .toc a:hover {
          text-decoration: underline;
        }
        .chapter {
          margin-bottom: 40px;
        }
        .chapter-content {
          text-indent: 2em;
          margin-top: 20px;
        }
        .chapter-content p {
          margin-bottom: 10px;
        }
        .divider {
          text-align: center;
          margin: 30px 0;
          color: #aaa;
        }
      </style>
    </head>
    <body>
      <h1>${novelData.title}</h1>
      <div class="author">作者: ${novelData.author}</div>
      
      <div class="toc">
        <h2>目录</h2>
        <ul>
    `;

    // Add table of contents
    for (let i = 0; i < novelData.chapters.length; i++) {
      const chapter = novelData.chapters[i];
      htmlContent += `<li><a href="#chapter-${i + 1}">${chapter.title}</a></li>\n`;
    }

    htmlContent += `
        </ul>
      </div>
    `;

    // Add each chapter
    for (let i = 0; i < novelData.chapters.length; i++) {
      const chapter = novelData.chapters[i];

      htmlContent += `
      <div class="chapter" id="chapter-${i + 1}">
        <h2>${chapter.title}</h2>
        <div class="chapter-content">
      `;

      // Format the chapter content with paragraphs
      const paragraphs = chapter.content
        .split('\n')
        .filter((para) => para.trim().length > 0)
        .map((para) => `<p>${para}</p>`)
        .join('\n');

      htmlContent += paragraphs;

      htmlContent += `
        </div>
        <div class="divider">* * *</div>
      </div>
      `;
    }

    htmlContent += `
    </body>
    </html>
    `;

    // Write the HTML file
    const htmlOutputPath = path.join(OUTPUT_DIR, `${NOVEL_NAME}.html`);
    fs.writeFileSync(htmlOutputPath, htmlContent);

    console.log(`HTML book generated at ${htmlOutputPath}`);
  } catch (error) {
    console.error('Error generating HTML book:', error);
  }
}

/**
 * Main function to generate books
 */
async function generateBooks() {
  try {
    await generateTextBook();
    await generateHtmlBook();
    console.log('Book generation completed successfully!');
  } catch (error) {
    console.error('Error generating books:', error);
  }
}

// Execute the main function
generateBooks();
