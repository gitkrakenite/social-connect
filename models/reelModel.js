const mongoose = require("mongoose");

const reelSchema = mongoose.Schema(
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

    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reel", reelSchema);
