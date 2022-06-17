const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const { notFoundErrorCode } = require('./utils/errorConstans');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  req.user = {
    _id: '62ac977fd8844d0442428cac',
  };
  next();
});
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res
    .status(notFoundErrorCode)
    .send({ message: 'указанного пути не существует' });
});

app.listen(PORT);
