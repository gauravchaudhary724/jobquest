const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/jobs", require("./routes/jobs"));


app.use("/api/tasks", require("./routes/tasks"));

app.use("/api/auth", require("./routes/auth"));

app.get("/", (req, res) => {
    res.send("server is running");
})
app.get("/welcome", (req, res) => {
    res.json( {
        message : "Welcome to the jobquest Api!"
    })
})
app.get("/hello", (req, res) => {
    res.send("Hello gaurav, your sever running fine");
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})