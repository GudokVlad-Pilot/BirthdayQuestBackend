const express = require('express')
const app = express()


app.get("/users", (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour"] })
})

app.get("/numbers",  (req, res) => {
    res.json({ "numbers": ["1", "2", "3", "4", "5"] })
})


app.listen(5000, () => { console.log("Server is running on port 5000") });