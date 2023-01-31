const express = require("express");
const {
  createPost,
  fetchPosts,
  deletePost,
} = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", protect, createPost);
router.get("/get", fetchPosts);
router.delete("/delete/:id", protect, deletePost);

module.exports = router;
