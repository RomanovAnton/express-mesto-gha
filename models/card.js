const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: {
    required: true,
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
