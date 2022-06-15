const Card = require("../models/card");
const {
  validationErrorCode,
  notFoundErrorCode,
  defaultErrorCode,
} = require("../app");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      res.status(defaultErrorCode).send({ message: err.name });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
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

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send({ message: "карточка удалена" }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(notFoundErrorCode).send({
          message: "Карточка с указанным _id не найдена.",
        });
        return;
      }
      res.send({
        message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
      });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.send({ message: "успешно" }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(notFoundErrorCode).send({
          message: "Передан несуществующий _id карточки.",
        });
        return;
      }
      if (err.name === "ValidationError") {
        res.status(validationErrorCode).send({
          message: "Переданы некорректные данные для постановки/снятии лайка.",
        });
        return;
      }
      res.status(defaultErrorCode).send({
        message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
      });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(() => res.send({ message: "успешно" }))
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(notFoundErrorCode).send({
          message: "Передан несуществующий _id карточки.",
        });
        return;
      }
      if (err.name === "ValidationError") {
        res.status(validationErrorCode).send({
          message: "Переданы некорректные данные для постановки/снятии лайка.",
        });
        return;
      }
      res.status(defaultErrorCode).send({
        message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
      });
    });
};
