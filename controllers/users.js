const Users = require("../models/user");
const {
  validationErrorCode,
  notFoundErrorCode,
  handleDefaultError,
} = require("../app");

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send(users))
    .catch((err) => handleDefaultError(err, res));
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
      handleDefaultError(err, res);
    });
};

module.exports.getUser = (req, res) => {
  Users.findById(req.params.userId)
    .orFail(() => {
      throw new Error("NotFoundError");
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === "NotFoundError") {
        res
          .status(notFoundErrorCode)
          .send({ message: "Пользователя с указанным _id не существует" });
      } else if (err.name === "CastError") {
        res.status(validationErrorCode).send({
          message: "Переданы некорректные данные при создании пользователя.",
        });
      } else {
        handleDefaultError(err, res);
      }
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
      handleDefaultError(err, res);
    });
};

module.exports.updateAvatar = (req, res) => {
  const avatar = req.body;
  Users.findByIdAndUpdate(req.user._id, avatar, {
    new: true,
    runValidators: true,
  })
    .then(() => {
      res.send(avatar);
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
      handleDefaultError(err, res);
    });
};
