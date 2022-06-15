const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res.status(500).send({ message: err.name });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const ERROR_CODE = 400;
        res.status(ERROR_CODE).send({
          message: "Переданы некорректные данные при создании карточки.",
        });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        const ERROR_CODE = 404;
        res.status(ERROR_CODE).send({
          message: "Карточка с указанным _id не найдена",
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
    .then(() => res.send({ message: "ok" }))
    .catch((err) => {
      res.send(err.name);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then(() => res.send({ message: "ok" })).catch((err) => res.send(err.name));
};
