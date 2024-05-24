const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

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

const avatarsPath = path.join(__dirname, 'avatars'); // Folder path

app.use('/avatars', express.static(avatarsPath));

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

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});