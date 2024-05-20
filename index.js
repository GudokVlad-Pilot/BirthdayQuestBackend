const express = require('express')
const app = express()
const cors = require("cors");

app.use(cors({
    origin: ['https://notasurprise.netlify.app', 'http://localhost:3000'],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

app.get("/users", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
})

app.get("/numbers",  (req, res) => {
    res.json({ "numbers": [1, 2, 3, 4, 5, 6, 7] })
})


app.listen(5000, () => { console.log("Server is running on port 5000") });