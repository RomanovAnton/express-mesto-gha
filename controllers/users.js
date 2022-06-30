const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.getCurrentUser = (req, res, next) => {
  User.findOne(req.user)
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => next(err));
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((user) => res.status(201).send({
        user: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }))
      .catch((err) => next(err));
  });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((updateData) => {
      res.send(updateData);
    })
    .catch((err) => next(err));
};

module.exports.updateAvatar = (req, res, next) => {
  const avatar = req.body;
  User.findByIdAndUpdate(req.user._id, avatar, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new Error('NotFoundError');
    })
    .then((newData) => {
      res.send(newData);
    })
    .catch((err) => next(err));
};
