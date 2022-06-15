const Users = require("../models/user");

module.exports.getUsers = (req, res) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  Users.findById(req.params._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const owner = req.user._id;
  Users.create({
    name,
    about,
    avatar,
    owner,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.send({ message: err.message }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((updateData) => {
      res.send({ data: updateData });
      console.log(updateData);
    })
    .catch((err) => {
      res.status(400).send({ message: err.name });
    });
};
