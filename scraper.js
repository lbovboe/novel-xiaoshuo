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
  novelUrl: 'https://www.piaotia.com/html/15/15278/',
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

    // Convert from GBK to UTF-8
    const html = iconv.decode(response.data, 'gbk');
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

    // Extract novel title (adjust selector based on website structure)
    const novelTitle = $('h1').text().trim() || 'Unknown Novel';
    console.log(`Novel Title: ${novelTitle}`);

    // Extract chapter links (adjust selector based on website structure)
    const chapters = [];
    $('a[href$=".html"]').each((i, el) => {
      const link = $(el).attr('href');
      // Filter out non-chapter links and ensure it's a valid chapter link
      if (link && link.match(/\d+\.html$/)) {
        const title = $(el).text().trim();
        // Only include links that have text and are likely chapter links
        if (title && !title.includes('首页') && !title.includes('目录')) {
          chapters.push({
            title: title,
            url: new URL(link, config.novelUrl).href,
          });
        }
      }
    });

    console.log(`Found ${chapters.length} chapters.`);
    return { title: novelTitle, chapters };
  } catch (error) {
    console.error('Error fetching novel information:', error.message);
    throw error;
  }
}

// Function to scrape a chapter
async function scrapeChapter(chapter, index) {
  console.log(`Scraping chapter ${index + 1}: ${chapter.title}`);
  console.log('Scraping URL Chapter :', chapter.url);

  try {
    const html = await fetchWithRetry(chapter.url);
    const $ = cheerio.load(html);

    // Extract chapter content - this site doesn't use a #content div
    // Content is directly in the HTML with <br> tags after H1 and before next div
    let content = '';

    // Find the content between H1 and the first div.bottomlink
    const h1 = $('H1');
    if (h1.length > 0) {
      let currentNode = h1[0].nextSibling;
      let contentNodes = [];

      // Collect all nodes until we hit the bottomlink div or run out of nodes
      while (currentNode) {
        if (
          currentNode.type === 'tag' &&
          currentNode.name === 'div' &&
          ($(currentNode).hasClass('bottomlink') || $(currentNode).attr('id') === 'feit2')
        ) {
          break;
        }

        if (
          currentNode.type === 'text' ||
          (currentNode.type === 'tag' && (currentNode.name === 'br' || currentNode.name === 'p'))
        ) {
          contentNodes.push(currentNode);
        }

        currentNode = currentNode.nextSibling;
      }

      // Convert the nodes to HTML
      content = contentNodes.map((node) => $.html(node)).join('');
    }

    // Clean up the content
    content = content
      .replace(/<br\s*\/?>/gi, '\n') // Replace <br> with newlines
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/<div\b[^>]*>(.*?)<\/div>/gi, '') // Remove divs
      .replace(/&nbsp;/g, ' ') // Replace non-breaking spaces
      .replace(/\n{3,}/g, '\n\n'); // Replace multiple newlines with two

    // Strip all remaining HTML tags
    content = cheerio.load(content).text();

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
    const chapters = novelInfo.chapters;

    // Create novel directory
    const novelDir = path.join(config.outputDir, novelTitle);
    fs.ensureDirSync(novelDir);

    console.log(`Starting to download ${chapters.length} chapters...`);

    // Store all chapter data
    const novel = {
      title: novelTitle,
      url: config.novelUrl,
      chapters: [],
      scrapedAt: new Date().toISOString(),
    };

    // Scrape each chapter
    let errorCount = 0;
    for (let i = 0; i < chapters.length; i++) {
      const chapter = await scrapeChapter(chapters[i], i);
      novel.chapters.push(chapter);

      // Save chapter to individual file
      const chapterFilename = path.join(novelDir, `chapter-${String(i + 1).padStart(4, '0')}.json`);
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
    console.log(`Chapters: ${chapters.length}`);
    console.log(`Errors: ${errorCount}`);
    console.log(`Output directory: ${novelDir}`);
  } catch (error) {
    console.error('Scraping failed:', error.message);
  }
}

// Run the scraper
main();
