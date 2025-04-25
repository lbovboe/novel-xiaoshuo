# Novel Scraper

A simple Node.js web scraper that downloads Chinese novels from [piaotia.com](https://www.piaotia.com) and converts them to readable formats.

## Features

- Scrapes novel chapters from piaotia.com
- Extracts chapter titles and content
- Saves data as structured JSON files
- Formats novels into clean, readable text format
- Interactive CLI for easy usage

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd novel-xiaoshuo
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Make the CLI globally available (optional):
   ```
   npm link
   ```

### Usage

#### Using the CLI

The easiest way to use this tool is via the command-line interface:

```
npm start
```

Or if you installed it globally:

```
novel-scraper
```

The CLI provides the following options:

1. Scrape a novel
2. Format scraped novels
3. Scrape and format a novel

Simply follow the prompts to enter the novel URL and the tool will handle the rest.

#### Using Individual Scripts

You can also use the individual scripts directly:

1. **Scrape a novel**:

   - Edit the `scraper.js` file to configure the novel you want to download:
     ```javascript
     const config = {
       novelUrl: 'https://www.piaotia.com/html/12/12877/',
       // Other config options...
     };
     ```
   - Run the scraper:
     ```
     npm run scrape
     ```
   - The scraper will create a directory for the novel and save the novel data and chapters.

2. **Format a novel**:
   - After scraping, run the formatter:
     ```
     npm run format
     ```
   - This will create formatted text versions of the novel in the `./formatted/<novel_name>/` directory.

## Configuration

You can customize the scraper and formatter by editing the configuration variables at the top of each file:

### Scraper Configuration (scraper.js)

```javascript
const config = {
  novelUrl: 'https://www.piaotia.com/html/12/12877/',
  outputDir: './output',
  requestDelay: 1000,
  maxRetries: 3,
  userAgent: '...',
};
```

### Formatter Configuration (format.js)

```javascript
const config = {
  inputDir: './output',
  outputDir: './formatted',
  lineSpacing: 1,
  chapterTitleFormat: 1, // 1 = "Chapter X: Title", 2 = "Chapter X", 3 = "Title"
  pageWidth: 80,
  addTableOfContents: true,
  addMetadata: true,
};
```

## Project Structure

```
novel-xiaoshuo/
├── index.js          # CLI interface
├── scraper.js        # Web scraper for novels
├── format.js         # Novel formatter
├── output/           # Directory for scraped novels
│   └── <novel_name>/
│       ├── chapter-0001.json   # Individual chapter data
│       ├── chapter-0002.json
│       ├── ...
│       └── novel.json          # Complete novel data
├── formatted/        # Directory for formatted novels
│   └── <novel_name>/
│       ├── chapter-0001.txt    # Individual formatted chapters
│       ├── chapter-0002.txt
│       ├── ...
│       └── <novel_name>.txt    # Complete formatted novel
└── node_modules/     # Dependencies
```

## Dependencies

- axios - For making HTTP requests
- cheerio - For parsing HTML
- iconv-lite - For handling character encoding
- fs-extra - For file system operations

## License

This project is intended for personal use only. Please respect copyright laws and the terms of service of the websites you scrape.
