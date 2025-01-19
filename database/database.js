import mysql from "mysql2";
import dotenv from "dotenv";
// import { readFile } from "node:fs/promises";

const storingStories = async(stories) => {
    try {
        // const filePath = new URL("./stories.json", import.meta.url);
        // const contents = await readFile(filePath, 'utf-8');
      
        // const stories = JSON.parse(contents);
      
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
             const [dataSaved] = await pool.query(`insert ignore into story(title, link, created) values (?, ?, ?)`, [story.title, story.link, story.created]);

          }

          const [rows] = await pool.query(`select count(*) as count from story where created >= now() - interval 5 minute`);
          console.log(rows)
          const count = rows[0].count;
          await pool.end();
          return count;

          
      } catch (error) {
        console.log("Error importing data", error);
      }
}

export default storingStories;
