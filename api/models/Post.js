const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
    },
    desc: {
      type: String,
      maxlength: 500, //limits the amount of characters to 500 char
      minlength: 1, //users cannot make an empty post
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
