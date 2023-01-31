const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    profile: {
      type: mongoose.Schema.Types.String,
      required: true,
      ref: "User",
    },
    title: { type: String, required: true },
    image: { type: String, required: true },
    location: { type: String, required: true },
    //   email: { type: String, required: true },
    //   name: { type: String, required: true },
    //   comments: { type: [String] },
    comments: {
      user: {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: "User",
      },
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
