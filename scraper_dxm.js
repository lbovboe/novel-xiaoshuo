const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');
const iconv = require('iconv-lite');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

// Configuration
const config = {
  // Novel URL - replace with the URL of the novel you want to download
  novelUrl: 'https://www.dxmwx.org/chapter/57132.html',
  // Output directory
  outputDir: './output',
  // Delay between requests (in ms) to avoid overloading the server
  requestDelay: 1000,
  // Number of retries if a request fails
  maxRetries: 3,
  // User agent to use for requests
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
};

// Create output directory if it doesn't exist
fs.ensureDirSync(config.outputDir);

// Helper function to handle requests with retries
async function fetchWithRetry(url, retries = 0) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': config.userAgent,
      },
    });

    // Convert from UTF-8
    const html = iconv.decode(response.data, 'utf-8');
    return html;
  } catch (error) {
    if (retries < config.maxRetries) {
      console.log(`Request failed, retrying (${retries + 1}/${config.maxRetries}): ${url}`);
      await sleep(config.requestDelay);
      return fetchWithRetry(url, retries + 1);
    } else {
      console.error(`Failed to fetch ${url} after ${config.maxRetries} retries:`, error.message);
      throw error;
    }
  }
}

// Function to get the novel title and chapter list
async function getNovelInfo() {
  console.log(`Fetching novel information from: ${config.novelUrl}`);

  try {
    const html = await fetchWithRetry(config.novelUrl);
    const $ = cheerio.load(html);

    // Extract novel title and author directly from the HTML structure
    const bookName =
      $('div[style*="font-weight: bold; text-align: center;"]').text().trim() ||
      $('title').text().split('章节目录')[0].trim() ||
      'Unknown Novel';

    // Find author in the HTML
    let author = 'Unknown Author';
    $('div[style*="text-align: center"] a').each((i, el) => {
      // Author link typically follows "作者：" text
      if ($(el).prev().text().includes('作者：')) {
        author = $(el).text().trim();
      }
    });

    // Extract additional novel info
    let updateTime = '';
    let latestChapter = '';

    $('div[style*="text-align: center"] span').each((i, el) => {
      const text = $(el).text();
      if (text.includes('更新时间：')) {
        updateTime = text.replace('更新时间：', '').trim();
      }
    });

    $('div[style*="text-align: center"] a[href*="/read/"]').each((i, el) => {
      if ($(el).parent().text().includes('最新章节：')) {
        latestChapter = $(el).text().trim();
      }
    });

    console.log(`Novel Title: ${bookName}`);
    console.log(`Author: ${author}`);
    console.log(`Last Updated: ${updateTime}`);
    console.log(`Latest Chapter: ${latestChapter}`);

    // Extract chapter links
    const chapters = [];

    // Extract links based on the site's HTML structure as shown in the user's example
    $('span[style*="width:31%;padding-left:20px; float:left;"]').each((i, span) => {
      const anchor = $(span).find('a');
      if (anchor.length > 0) {
        const link = anchor.attr('href');
        const title = anchor.text().trim();

        if (link && title && link.includes('/read/')) {
          chapters.push({
            title: title,
            url: new URL(link, config.novelUrl).href,
          });
        }
      }
    });

    console.log(`Found ${chapters.length} chapters using span selector.`);

    // If no chapters found, try more generic selectors
    if (chapters.length === 0) {
      // Try looking for all links within divs that match the pattern
      $('div[style*="border-bottom: 1px dotted #ccc"] a').each((i, el) => {
        const link = $(el).attr('href');
        const title = $(el).text().trim();

        if (link && title && link.includes('/read/')) {
          chapters.push({
            title: title,
            url: new URL(link, config.novelUrl).href,
          });
        }
      });

      console.log(`Found ${chapters.length} chapters using div selector.`);
    }

    // Sort chapters by their chapter number if possible
    chapters.sort((a, b) => {
      const aMatch = a.title.match(/第(\d+)章/);
      const bMatch = b.title.match(/第(\d+)章/);

      if (aMatch && bMatch) {
        return parseInt(aMatch[1]) - parseInt(bMatch[1]);
      }
      return 0;
    });

    return {
      title: bookName,
      author: author,
      updateTime: updateTime,
      latestChapter: latestChapter,
      chapters: chapters,
    };
  } catch (error) {
    console.error('Error fetching novel information:', error.message);
    throw error;
  }
}

// Function to scrape a chapter
async function scrapeChapter(chapter, index) {
  console.log(`Scraping chapter ${index + 1}: ${chapter.title}`);
  console.log('Scraping URL Chapter:', chapter.url);

  try {
    const html = await fetchWithRetry(chapter.url);
    const $ = cheerio.load(html);

    // Extract chapter content
    let content = '';

    // Look for the Lab_Contents div which contains the chapter text
    const labContents = $('#Lab_Contents');
    if (labContents.length > 0) {
      // Collect all paragraph elements within Lab_Contents
      content = labContents
        .find('p')
        .map((i, el) => {
          return $(el).text().trim();
        })
        .get()
        .join('\n\n');
    }

    // If Lab_Contents not found, try alternative approaches
    if (!content) {
      // Look for paragraphs with id starting with "txt_"
      const paragraphs = $('p[id^="txt_"]');
      if (paragraphs.length > 0) {
        content = paragraphs
          .map((i, el) => {
            return $(el).text().trim();
          })
          .get()
          .join('\n\n');
      }
    }

    // If still no content, try to find largest text block
    if (!content) {
      let maxTextLength = 0;
      let maxTextElement = null;

      $('div').each((i, el) => {
        const textLength = $(el).text().length;
        if (textLength > maxTextLength && !$(el).find('script').length) {
          maxTextLength = textLength;
          maxTextElement = el;
        }
      });

      if (maxTextElement) {
        content = $(maxTextElement).text();
      }
    }

    // Clean up the content
    content = content
      .replace(/\s{2,}/g, '\n\n') // Replace multiple spaces with newlines
      .replace(/\n{3,}/g, '\n\n') // Replace excessive newlines
      .replace(/^[\s\n]+|[\s\n]+$/g, '') // Trim start and end
      .replace(/大熊猫文学.*?速来大熊猫文学/gs, '') // Remove site promotion
      .replace(/本站所收錄作品.*?大熊猫文学/gs, '') // Remove footer
      .replace(/点这里听书.*?浏览器/gs, '') // Remove audio player text
      .replace(/大熊猫文学.*?没钱修什么仙？/gs, '') // Remove header
      .trim();

    // Save chapter data
    return {
      index: index + 1,
      title: chapter.title,
      url: chapter.url,
      content: content.trim(),
    };
  } catch (error) {
    console.error(`Error scraping chapter ${chapter.title}:`, error.message);
    return {
      index: index + 1,
      title: chapter.title,
      url: chapter.url,
      content: `[Error: Failed to scrape this chapter. ${error.message}]`,
      error: true,
    };
  }
}

// Main function to run the scraper
async function main() {
  try {
    // Get novel info
    const novelInfo = await getNovelInfo();
    const novelTitle = novelInfo.title;
    const author = novelInfo.author;
    const chapters = novelInfo.chapters;

    // Create novel directory with just the book name (no author)
    const novelDir = path.join(config.outputDir, `${novelTitle}`);
    fs.ensureDirSync(novelDir);

    console.log(`Starting to download ${chapters.length} chapters...`);

    // Store all chapter data
    const novel = {
      title: novelTitle,
      author: author,
      updateTime: novelInfo.updateTime,
      latestChapter: novelInfo.latestChapter,
      url: config.novelUrl,
      chapters: [],
      scrapedAt: new Date().toISOString(),
    };

    // Create chapter-0001.json with novel info and empty content
    const bookInfoChapter = {
      index: 1,
      title: novelTitle,
      url: config.novelUrl,
      content: '',
    };

    // Save book info as chapter-0001.json
    const bookInfoFilename = path.join(novelDir, `chapter-0001.json`);
    await fs.writeJson(bookInfoFilename, bookInfoChapter, { spaces: 2 });
    novel.chapters.push(bookInfoChapter);

    // Scrape each chapter (starting from index 2 for actual chapters)
    let errorCount = 0;
    for (let i = 0; i < chapters.length; i++) {
      const chapter = await scrapeChapter(chapters[i], i);

      // Adjust the index to start from 2 for actual chapters
      chapter.index = i + 2;
      novel.chapters.push(chapter);

      // Save chapter to individual file (with index starting from 2)
      const chapterFilename = path.join(novelDir, `chapter-${String(chapter.index).padStart(4, '0')}.json`);
      await fs.writeJson(chapterFilename, chapter, { spaces: 2 });

      if (chapter.error) {
        errorCount++;
      }

      // Wait before the next request to avoid overloading the server
      if (i < chapters.length - 1) {
        await sleep(config.requestDelay);
      }
    }

    // Save complete novel data
    const novelFilename = path.join(novelDir, 'novel.json');
    await fs.writeJson(novelFilename, novel, { spaces: 2 });

    console.log(`Scraping completed!`);
    console.log(`Novel: ${novelTitle}`);
    console.log(`Author: ${author}`);
    console.log(`Last Updated: ${novelInfo.updateTime}`);
    console.log(`Latest Chapter: ${novelInfo.latestChapter}`);
    console.log(`Chapters: ${chapters.length}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Output directory: ${novelDir}`);
  } catch (error) {
    console.error('Scraping failed:', error.message);
  }
}

// Run the scraper
main();
