# frontPageBackendAssignment

This project scrapes real-time stories from Hacker News and broadcasts updates using WebSockets. It also stores the data in a MySQL database. Users can view the latest stories and count of stories published in the last 5 minutes.

## Features

- Periodically scrapes stories from Hacker News.
- Broadcasts real-time updates to connected clients via WebSockets.
- Displays a user-friendly frontend with live updates.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript
- **Real-Time Communication**: WebSockets (via Socket.IO)
- **Web Scraping**: Puppeteer

## Setup Instructions

### 1. Prerequisites

1. Node.js (>= v14)
2. MySQL database
3. npm (Node Package Manager)

### 2. Clone the Repository

```sh
   git clone https://github.com/your-username/frontPageBackendAssignment.git
   cd frontPageBackendAssignment

```

### 3. Install Dependencies

```sh
   npm install

```

### 4. Configure the Database

#### SQL Schema
```sql
CREATE DATABASE stories_hacker_news;
USE stories_hacker_news;
CREATE TABLE story (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(512) NOT NULL UNIQUE,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);
```
    
#### Update the database credentials in .env


   MYSQL_HOST=localhost
   MYSQL_USER=your_username
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=stories_hacker_news
   PORT=3000


#### Instructions

1. **Access MySQL**: Log in to your MySQL server using your preferred MySQL client or command line.
2. **Run the SQL Commands**: Copy and paste the SQL commands above into your MySQL client to create the database and table.
3. **Verify the Setup**: You can verify that the database and table were created successfully by running:
   ```sql
   SHOW DATABASES;
   USE stories_hacker_news;
   SHOW TABLES;
   


### 4. Start the Server

```sh
npm run dev
```

### 5. Open the frontend

Type the below url in the web browser

```sh
http://localhost:{portNumber}/
```

## Project File Structure

```
frontpageBackendAssignments/
├── node_modules/          # Directory for installed npm packages
├── public/                # Public assets (HTML, CSS, JS)
│   ├── index.html         # Main HTML file
│   └── styles.css         # CSS file for styling
├── src/                   # Source code directory
│   ├── scraper.js         # Scraper logic
│   ├── server.js          # Main server file
│   └── database.js        # Database connection and queries
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # NPM package configuration
├── package-lock.json      # NPM package lock file
└── README.md              # Project documentation
```

## Acknowledgement

- Hacker News (https://news.ycombinator.com) for providing the data.
- Socket.IO for real-time WebSocket communication.

## Contact

For questions or suggestions, contact abhayrajsinghrana123@gmail.com.
