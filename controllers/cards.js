const Card = require('../models/card');
const {
  validationErrorCode,
  notFoundErrorCode,
  handleDefaultError,
} = require('../utils/errorConstans');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleDefaultError(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(validationErrorCode).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
        return;
      }
      handleDefaultError(err, res);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((card) => {
      if (`${card.owner}` !== req.user._id) {
        throw new Error('Forbidden');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .orFail(() => {
          throw new Error('NotFoundError');
        })
        .then(() => {
          res.send({ message: 'успешно' });
        })
        .catch((err) => {
          if (err.message === 'NotFoundError') {
            res
              .status(notFoundErrorCode)
              .send({ message: 'Передан несуществующий _id карточки.' });
          } else if (err.name === 'CastError') {
            res.status(validationErrorCode).send({
              message: 'Переданы некорректные данные для удаления карточки.',
            });
          } else if (err.message === 'Forbidden') {
            res.status(403).send({
              message: 'Удалять можно только свою карточку',
            });
          } else {
            handleDefaultError(err, res);
          }
        });
    })
    .catch((err) => {
      if (err.message === 'Forbidden') {
        res.status(403).send({
          message: 'Удалять можно только свою карточку',
        });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((newData) => {
      res.send(newData);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res
          .status(notFoundErrorCode)
          .send({ message: 'Передан несуществующий _id карточки.' });
      } else if (err.name === 'CastError') {
        res.status(validationErrorCode).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      } else {
        handleDefaultError(err, res);
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((newData) => {
      res.send(newData);
    })
    .catch((err) => {
      if (err.message === 'NotFoundError') {
        res
          .status(notFoundErrorCode)
          .send({ message: 'Передан несуществующий _id карточки.' });
      } else if (err.name === 'CastError') {
        res.status(validationErrorCode).send({
          message: 'Переданы некорректные данные для постановки/снятии лайка.',
        });
      } else {
        handleDefaultError(err, res);
      }
    });
};
