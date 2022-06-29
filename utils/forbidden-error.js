const { FORBIDDEN_ERROR_CODE } = require('./errorConstans');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR_CODE;
  }
}

module.exports = new ForbiddenError('Удалять можно только свою карточку');
