import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";

let browser;

const initializeBrowser = async () => {
  if(!browser){
    browser = browser = await puppeteer.launch({ headless: true, timeout: 0 });
  }
}

const scrape = async () => {
  try{
    await initializeBrowser();
  const page = await browser.newPage();

  const allStories = [];

  const url = "https://news.ycombinator.com/";
  await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

  const stories = await page.evaluate(() => {
    const storyElement = document.querySelectorAll(".athing, .submission");

    return Array.from(storyElement).map((story) => {
      const title = story.querySelector(".titleline a").textContent;
      const link = story.querySelector(".titleline a").href;
      const time = story.querySelector(".subline, .age").getAttribute('title');


      return { title, link, time };
    });
  });

  } catch(error){
    console.log("error while scraping data:", error);
  }
  allStories.push(...stories);

  try {
    const controller = new AbortController();
    const data = JSON.stringify(allStories);
    const promise = writeFile("stories.json", data);

    controller.abort();
    await promise;
  } catch (error) {
    console.log("Error while writing file stories.json", error);
  } finally {
    await page.close();
  }

  return allStories;
};


export default scrape;
