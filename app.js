const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/mydb");

app.use("/users", require("./routes/users"));

app.listen(PORT);
