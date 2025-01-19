import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import scrape from "./scraper.js";
import http from "http";
import storingStories from "./database/database.js";
import dotenv from "dotenv";


const app = express();
const server = http.createServer(app);
const io = new Server(server);
dotenv.config();

app.use(express.static("public"));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "./public/index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server is running");
});

const socketConnection = async () => {
  try {
    const stories = await scrape();
    const count = await storingStories(stories);
    console.log(count)
    console.log("data saved completed");
    io.emit("newStories", stories);
    io.emit("storiesCount", count);
  } catch (error) {
    console.log("Error fetching stories:", error);
  }
};

setInterval(socketConnection,  10000);
// socketConnection();
