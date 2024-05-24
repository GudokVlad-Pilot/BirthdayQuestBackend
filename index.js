const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Подключаем модуль fs для работы с файлами

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['https://notasurprise.netlify.app', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors({
  origin: ['https://notasurprise.netlify.app', 'http://localhost:3000'],
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

const avatarsPath = path.join(__dirname, 'avatars'); //Avatars path
app.use('/avatars', express.static(avatarsPath)); //Static files

const chestsPath = path.join(__dirname, 'chests'); //Chests path
app.use('/chests', express.static(chestsPath)); //Static files

let numbers = [1, 2, 3, 4, 5, 6, 7];
let currentNumber = numbers[Math.floor(Math.random() * numbers.length)];
let startTime = Date.now();

const updateCurrentNumber = () => {
  currentNumber = numbers[Math.floor(Math.random() * numbers.length)];
  startTime = Date.now();
  io.emit('numberUpdated', { currentNumber, startTime });
};

setInterval(updateCurrentNumber, 90000); // 1.5 minutes

app.get("/get-current-number", (req, res) => {
  res.json({ currentNumber, startTime });
});

app.get("/numbers", (req, res) => {
  res.json({ "numbers": numbers });
});

app.get("/users", (req, res) => {
  res.json({
    users: [
      { name: "userOne", avatar: "userOne.jpg" },
      { name: "userTwo", avatar: "userTwo.jpg" },
      { name: "userThree", avatar: "userThree.jpg" },
      { name: "userFour", avatar: "userFour.jpg" }
    ]
  });
});

app.get("/champions", (req, res) => {
  fs.readFile('./champions.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading champions.json:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const champions = JSON.parse(data);
      res.json(champions);
    }
  });
});

app.get("/champions_lol", (req, res) => {
  fs.readFile('./champions_lol.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading champions.json:', err);
      res.status(500).send('Internal Server Error');
    } else {
      const champions_lol = JSON.parse(data);
      res.json(champions_lol);
    }
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});