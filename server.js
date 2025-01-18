import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import scrape from "./scraper.js";
import http from "http";
import storingStories from "./database.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "./public/index.html"));
});

server.listen(3000, () => {
  console.log("server is running on port: 3000");
});

const socketConnection = async () => {
  try {
    const stories = await scrape();
    await storingStories();
    console.log("data saved completed");
    io.emit("newStories", stories);
  } catch (error) {
    console.log("Error fetching stories:", error);
  }
};

setInterval(socketConnection,  10000);
// socketConnection();
