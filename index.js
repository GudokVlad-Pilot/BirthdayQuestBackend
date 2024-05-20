const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors({
    origin: ['https://notasurprise.netlify.app', 'http://localhost:3000'],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

let numbers = [1, 2, 3, 4, 5, 6, 7];
let currentNumber = numbers[Math.floor(Math.random() * numbers.length)];
let startTime = Date.now();

const updateCurrentNumber = () => {
  currentNumber = numbers[Math.floor(Math.random() * numbers.length)];
  startTime = Date.now();
};

setInterval(updateCurrentNumber, 90000);

app.get("/get-current-number", (req, res) => {
  res.json({ currentNumber, startTime });
});

app.get("/numbers", (req, res) => {
  res.json({ "numbers": numbers });
});

app.get("/users", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
})


app.listen(5000, () => { console.log("Server is running on port 5000") });