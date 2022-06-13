const express = require("express");

const _id = 4;
const { PORT = 3000 } = process.env;

const app = express();
app.listen(PORT, () => {
  console.log(_id);
});
