import mysql from "mysql2";
import dotenv from "dotenv";
import { readFile } from "node:fs/promises";

const storingStories = async() => {
    try {
        const filePath = new URL("./stories.json", import.meta.url);
        const contents = await readFile(filePath, 'utf-8');
      
        const stories = JSON.parse(contents);
      
        dotenv.config();
      
        const pool = mysql
          .createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
          })
          .promise();
      
          for(const story of stories){
             const [dataSaved] = await pool.query(`insert into story(title, link, tod) values (?, ?, ?)`, [story.title, story.link, story.created]);
             return 
             console.log(dataSaved);
          }
          console.log("Data saved");
          await pool.end();
      } catch (error) {
        console.log("Error importing data", error);
      }
}

export default storingStories;
