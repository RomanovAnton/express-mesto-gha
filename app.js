const express = require("express");
const mongoose = require("mongoose");

const validationErrorCode = 400;
const notFoundErrorCode = 404;
const defaultErrorCode = 500;

module.exports = {
  validationErrorCode,
  notFoundErrorCode,
  defaultErrorCode,
};

const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.user = {
    _id: "62a844e64ed25774e95cc9ac",
  };
  next();
});
mongoose.connect("mongodb://localhost:27017/mydb");

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.listen(PORT);
