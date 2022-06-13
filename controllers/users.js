const Users = require("../models/user");

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(404).send({ message: err.message })); // поправь ошибку
};

module.exports.getUser = (req, res) => {
  Users.findById(req.params._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(404).send({ message: err.message })); // поправь ошибку
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(req.body);
  Users.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.send({ message: err.message }));
};
