const express = require("express");
const mongoose = require("mongoose");

const validationErrorCode = 400;
const notFoundErrorCode = 404;
const defaultErrorCode = 500;
const handleDefaultError = (err, res) => {
  res.status(defaultErrorCode).send({ message: err.name });
};
module.exports = {
  validationErrorCode,
  notFoundErrorCode,
  defaultErrorCode,
  handleDefaultError,
};

const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.user = {
    _id: "62a9da727ca22b1b7714eeab",
  };
  next();
});
mongoose.connect("mongodb://localhost:27017/mydb");

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));

app.use("*", (req, res) => {
  res
    .status(notFoundErrorCode)
    .send({ message: "указанного пути не существует" });
});

app.listen(PORT);
