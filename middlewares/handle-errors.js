const validationError = require('../utils/errors/validation-error');
const notFoundError = require('../utils/errors/notFound-error');
const conflictError = require('../utils/errors/conflict-error');
const { handleDefaultError } = require('../utils/errors/errorConstans');

module.exports = (err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res
      .status(validationError.statusCode)
      .send({ message: validationError.message });
    return;
  }
  if (err.name === 'NotFoundError') {
    res.status(err.statusCode).send({ messaege: err.message });
    return;
  }

  if (err.name === 'ForbiddenError') {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }

  if (err.code === 11000) {
    res.status(conflictError.statusCode).send({
      message: conflictError.message,
    });
    return;
  }

  if (err.name === 'UnauthorizedError') {
    res.status(err.statusCode).send({
      message: err.message,
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
