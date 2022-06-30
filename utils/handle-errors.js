/* eslint-disable no-unused-vars */
const validationError = require('./validation-error');
const forbiddenError = require('./forbidden-error');
const notFoundError = require('./notFound-error');
const conflictError = require('./conflict-error');
const unauthorizedError = require('./unauthorized-error');
const { handleDefaultError } = require('./errorConstans');

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res
      .status(validationError.statusCode)
      .send({ message: validationError.message });
    return;
  }
  if (err.message === 'NotFoundError') {
    res
      .status(notFoundError.statusCode)
      .send({ message: notFoundError.message });
    return;
  }

  if (err.message === 'Forbidden') {
    res
      .status(forbiddenError.statusCode)
      .send({ message: forbiddenError.message });
    return;
  }

  if (err.message.includes('user validation failed: email')) {
    res
      .status(validationError.statusCode)
      .send({ message: validationError.message });
    return;
  }

  //   if (err.code === 11000) {
  //     // Обработка ошибки
  // }

  if (err.name === 'MongoServerError') {
    res.status(conflictError.statusCode).send({
      message: conflictError.message,
    });
    return;
  }

  if (err.message === 'UnauthorizedError') {
    res.status(unauthorizedError.statusCode).send({
      message: unauthorizedError.message,
    });
    return;
  }

  handleDefaultError(err, res);
  next();
};

// 400 — переданы некорректные данные в метод создания карточки, пользователя, обновления аватара
// пользователя и профиля;
// 401 — передан неверный логин или пароль. Ещё эту ошибку возвращает авторизационный middleware,
// если передан неверный JWT;
// 403 — попытка удалить чужую карточку;
// 404 — карточка или пользователь не найден, или был запрошен несуществующий роут;
// 409 — при регистрации указан email, который уже существует на сервере;
// 500 — ошибка по умолчанию. Сопровождается сообщением: «На сервере произошла ошибка».
