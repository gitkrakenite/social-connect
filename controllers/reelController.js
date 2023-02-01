const Reel = require("../models/reelModel");
const User = require("../models/userModel");

// @create  POST
// http://localhost:5000/api/v1/reel/create
// private
const createReel = async (req, res, next) => {
  const { image } = req.body;
  if (!image) {
    res.status(404).json({ message: "Image missing" });
    return;
  }
  try {
    const reel = await Reel.create({
      image,
      user: req.user.name,
      profile: req.user.profile,
      userId: req.user.id,
    });

    res.status(201).send(reel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @fetch  GET
// http://localhost:5000/api/v1/reel/get
// public
const fetchReels = async (req, res, next) => {
  try {
    const reels = await Reel.find().sort({ $natural: -1 });
    res.status(200).send(reels);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @delete  DELETE
// http://localhost:5000/api/v1/reel/delete/:id
// private
const deleteReels = async (req, res, next) => {
  // check if reel exist
  const reel = await Reel.findById(req.params.id);

  if (!reel) {
    res.status(400).json({ message: "post not found" });
    return;
  }

  const user = await User.findById(req.user.id); //find the logged in user from db

  // check for user
  if (!user) {
    res.status(401).send("user not found");
    return;
  }

  // compare the user who created the goal with the logged in user
  if (reel.user.toString() !== user.name) {
    res.status(401).send("Not Authorized");
    return;
  }

  try {
    await Reel.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete reel" });
  }
};

module.exports = { createReel, deleteReels, fetchReels };
