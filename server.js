const express = require('express')
const { createServer } = require("node:http")

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
})

server.listen(3000, () => {
    console.log("server is running on port: 3000");
})