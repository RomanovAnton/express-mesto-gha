const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Error('ValidationError');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new Error('ValidationError');
        }
        const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
          expiresIn: '7d',
        });
        res.status(201).send({ token });
      });
    })
    .catch((err) => {
      if (err.message === 'ValidationError') {
        res.status(401).send({ message: 'Некорректный email или пароль' });
      }
    });
};
