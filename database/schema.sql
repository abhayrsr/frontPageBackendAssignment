CREATE DATABASE stories_hacker_news;
USE stories_hacker_news;

CREATE TABLE story(
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(512) NOT NULL UNIQUE,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);