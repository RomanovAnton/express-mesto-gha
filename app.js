const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new Error('NotFoundPath'));
});
app.use(errors());
app.use(require('./middlewares/handle-errors'));

app.listen(PORT);
