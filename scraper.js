import puppeteer from "puppeteer";
import { writeFile } from "node:fs/promises";

const scrape = async () => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const allStories = [];
  let currentPage = 1;
  const maxPage = 20;

  while (currentPage <= maxPage) {

    const url = "https://news.ycombinator.com/";
    await page.goto(url);

    const stories = await page.evaluate(() => {
      const storyElement = document.querySelectorAll(".athing, .submission");

      return Array.from(storyElement).map((story) => {

        const title = story.querySelector(".titleline a").textContent;
        const link = story.querySelector(".titleline a").href;

        return { title, link };
      });
    });

    allStories.push(...stories);
    currentPage++;
  }

  try{

    const controller = new AbortController();
    const data = JSON.stringify(allStories);
    const promise = writeFile('stories.json', data);
    
    controller.abort();
    await promise;

  } catch(error){

    console.log("Error while writing file stories.json", error);

  }

  await browser.close();
};

setInterval(scrape, 300000);
