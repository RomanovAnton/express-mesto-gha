const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const { notFoundErrorCode } = require('./utils/errorConstans');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res) => {
  res
    .status(notFoundErrorCode)
    .send({ message: 'указанного пути не существует' });
});

app.use(errors()); // фильтр перед роутами
app.use(require('./utils/handle-errors')); // централизованный обработчик ошибок

app.listen(PORT);
