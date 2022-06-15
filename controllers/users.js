const Users = require("../models/user");
const {
  validationErrorCode,
  notFoundErrorCode,
  defaultErrorCode,
} = require("../app");

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(defaultErrorCode).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(validationErrorCode).send({
          message: "Переданы некорректные данные при создании пользователя.",
        });
        return;
      }
      res.status(defaultErrorCode).send({
        message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
      });
    });
};

module.exports.getUser = (req, res) => {
  Users.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(notFoundErrorCode).send({
          message: "Пользователь по указанному _id не найден.",
        });
        return;
      }
      res.status(defaultErrorCode).send({
        message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
      });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .then((updateData) => {
      res.send(updateData);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(notFoundErrorCode).send({
          message: "Пользователь по указанному _id не найден.",
        });
        return;
      }
      if (err.name === "ValidationError") {
        res.status(validationErrorCode).send({
          message: "Переданы некорректные данные при создании карточки.",
        });
        return;
      }
      res.status(defaultErrorCode).send({
        message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
      });
    });
};

module.exports.updateAvatar = (req, res) => {
  const avatar = req.body;
  console.log(avatar);
  Users.findByIdAndUpdate(req.user._id, avatar, {
    new: true,
    runValidators: true,
  })
    .then(() => {
      res.send({ message: "аватар изменен" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(notFoundErrorCode).send({
          message: "Пользователь по указанному _id не найден.",
        });
        return;
      }
      if (err.name === "ValidationError") {
        res.status(validationErrorCode).send({
          message: "Переданы некорректные данные при обновлении аватара.",
        });
        return;
      }
      res.status(defaultErrorCode).send({
        message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
      });
    });
};
