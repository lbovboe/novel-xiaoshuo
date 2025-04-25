#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const { formatNovel } = require('./format');
const { execSync } = require('child_process');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Utility function to ask questions
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// Check if the scraper.js file exists
function checkScraperExists() {
  try {
    return fs.existsSync('./scraper.js');
  } catch (error) {
    return false;
  }
}

// Run the scraper with the provided URL
async function runScraper(novelUrl) {
  console.log(`Starting scraper for URL: ${novelUrl}`);

  try {
    // Modify the scraper.js file to use the provided URL
    let scraperContent = await fs.readFile('./scraper.js', 'utf8');

    // Replace the URL in the config
    scraperContent = scraperContent.replace(/(const config = {[\s\S]*?url: ['"]).*?(['"])/, `$1${novelUrl}$2`);

    // Write the updated scraper file
    await fs.writeFile('./scraper.js', scraperContent);

    // Run the scraper
    console.log('Running scraper...');
    execSync('node scraper.js', { stdio: 'inherit' });

    return true;
  } catch (error) {
    console.error('Error running scraper:', error.message);
    return false;
  }
}

// Run the formatter
async function runFormatter() {
  console.log('Running formatter...');

  try {
    execSync('node format.js', { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error('Error running formatter:', error.message);
    return false;
  }
}

// Display the main menu
async function showMainMenu() {
  console.log('\n=== Novel Scraper and Formatter ===');
  console.log('1. Scrape a novel');
  console.log('2. Format scraped novels');
  console.log('3. Scrape and format a novel');
  console.log('4. Exit');

  const choice = await askQuestion('\nEnter your choice (1-4): ');

  switch (choice) {
    case '1':
      await handleScrape();
      break;
    case '2':
      await runFormatter();
      break;
    case '3':
      await handleScrapeAndFormat();
      break;
    case '4':
      console.log('Exiting...');
      rl.close();
      return;
    default:
      console.log('Invalid choice. Please try again.');
  }

  // Show the menu again unless exiting
  if (choice !== '4') {
    await showMainMenu();
  }
}

// Handle novel scraping
async function handleScrape() {
  if (!checkScraperExists()) {
    console.error('Error: scraper.js file not found. Please ensure it exists in the current directory.');
    return;
  }

  const novelUrl = await askQuestion('Enter the URL of the novel to scrape: ');

  if (!novelUrl) {
    console.log('No URL provided. Returning to main menu.');
    return;
  }

  await runScraper(novelUrl);
}

// Handle scraping and formatting in one go
async function handleScrapeAndFormat() {
  if (!checkScraperExists()) {
    console.error('Error: scraper.js file not found. Please ensure it exists in the current directory.');
    return;
  }

  const novelUrl = await askQuestion('Enter the URL of the novel to scrape: ');

  if (!novelUrl) {
    console.log('No URL provided. Returning to main menu.');
    return;
  }

  const scraperSuccess = await runScraper(novelUrl);

  if (scraperSuccess) {
    await runFormatter();
  }
}

// Main function
async function main() {
  // Create output directories if they don't exist
  await fs.ensureDir('./output');
  await fs.ensureDir('./formatted');

  // Show the main menu
  await showMainMenu();
}

// Start the program
main().catch((error) => {
  console.error('An unexpected error occurred:', error);
  rl.close();
});
