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
  Users.create({
    name,
    about,
    avatar,
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.send({ message: err.message }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.findByIdAndUpdate(
    req.user._id,
    { name, about, avatar },
    { new: true, runValidators: true },
  )
    .then((updateData) => {
      res.send({ data: updateData });
    })
    .catch((err) => {
      res.status(500).send({ message: err.name });
    });
};

module.exports.updateAvatar = (req, res) => {
  const avatar = req.body;
  console.log(avatar);
  Users.findByIdAndUpdate(
    req.user._id,
    avatar,
    { new: true, runValidators: true },
  )
    .then(() => {
      res.send({ message: "change avatar succsess" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.name });
    });
};
