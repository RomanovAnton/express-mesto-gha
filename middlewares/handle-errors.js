const validationError = require('../utils/errors/validation-error');
const forbiddenError = require('../utils/errors/forbidden-error');
const notFoundError = require('../utils/errors/notFound-error');
const conflictError = require('../utils/errors/conflict-error');
const unauthorizedError = require('../utils/errors/unauthorized-error');
const { handleDefaultError } = require('../utils/errors/errorConstans');

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

  if (err.code === 11000) {
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

  if (err.message === 'NotFoundPath') {
    res.status(notFoundError.statusCode).send({
      message: 'Указанного пути не существует',
    });
    return;
  }

  handleDefaultError(err, res);
  next();
};
