const Post = require("../models/postModel");
const User = require("../models/userModel");

// @create  POST
// http://localhost:5000/api/v1/posts/create
// private
const createPost = async (req, res, next) => {
  const { title, image, location } = req.body;
  if (!title || !image || !location) {
    res.status(404).json({ message: "fields missing" });
    return;
  }
  try {
    const post = await Post.create({
      title,
      image,
      location,
      user: req.user.name,
      profile: req.user.profile,
      userId: req.user.id,
    });

    res.status(201).send(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @fetch  GET
// http://localhost:5000/api/v1/posts/get
// public
const fetchPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ $natural: -1 });
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @delete  DELETE
// http://localhost:5000/api/v1/posts/delete/:id
// private
const deletePost = async (req, res, next) => {
  // check if posts exist
  const post = await Post.findById(req.params.id);

  if (!post) {
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
  if (post.user.toString() !== user.name) {
    res.status(401).send("Not Authorized");
    return;
  }

  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: "Could not delete post" });
  }
};

module.exports = { createPost, deletePost, fetchPosts };
