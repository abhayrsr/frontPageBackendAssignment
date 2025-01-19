import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";
import { DateTime } from "luxon";

let browser;

const initializeBrowser = async () => {
  if (!browser) {
    browser = await puppeteer.launch({ headless: true, timeout: 0 });
  }
};

const scrape = async () => {
  await initializeBrowser();
  const page = await browser.newPage();

  const allStories = [];

  const url = "https://news.ycombinator.com/newest";
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  const stories = await page.evaluate(() => {
    const storyElements = document.querySelectorAll(".athing");
    const storyTimes = document.querySelectorAll(".subtext .age");

    return Array.from(storyElements).map((story, index) => {
      const title = story.querySelector(".titleline a").textContent;
      const link = story.querySelector(".titleline a").href;
      const ageElement = storyTimes[index];
      const usTime = ageElement.getAttribute("title"); // Getting the raw timestamp

      return { title, link, usTime }; // Return the raw usTime for conversion in Node.js
    });
  });

  // Now, handle the time conversion in Node.js using luxon
  allStories.push(
    ...stories.map(story => {
      const isoDateString = story.usTime.split(' ')[0];
      const created = DateTime.fromISO(isoDateString, { zone: 'utc' })
        .setZone('Asia/Kolkata')  // Convert to IST
        .toFormat('yyyy-MM-dd HH:mm:ss'); // Format to desired output

      return { ...story, created };
    })
  );

  try {
    const data = JSON.stringify(allStories, null, 2);
    await writeFile("stories.json", data);
  } catch (error) {
    console.log("Error while writing file stories.json", error);
  } finally {
    await page.close();
  }

  return allStories;
};

export default scrape;
