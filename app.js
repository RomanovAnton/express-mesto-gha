const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.user = {
    _id: "62a99b178b3ad4b5227dc3a4",
  };
  next();
});
mongoose.connect("mongodb://localhost:27017/mydb");

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.listen(PORT);
