const validationErrorCode = 400;
const unauthorizedErrorCode = 401;
const forbiddenErrorCode = 403;
const notFoundErrorCode = 404;
const conflictErrorCode = 409;
const defaultErrorCode = 500;

const handleDefaultError = (err, res) => {
  res.status(defaultErrorCode).send({ message: err.name });
};

module.exports = {
  validationErrorCode,
  unauthorizedErrorCode,
  forbiddenErrorCode,
  notFoundErrorCode,
  conflictErrorCode,
  defaultErrorCode,
  handleDefaultError,
};

// 400 — переданы некорректные данные в метод создания карточки, пользователя, обновления аватара
// пользователя и профиля;
// 401 — передан неверный логин или пароль. Ещё эту ошибку возвращает авторизационный middleware,
// если передан неверный JWT;
// 403 — попытка удалить чужую карточку;
// 404 — карточка или пользователь не найден, или был запрошен несуществующий роут;
// 409 — при регистрации указан email, который уже существует на сервере;
// 500 — ошибка по умолчанию. Сопровождается сообщением: «На сервере произошла ошибка».
