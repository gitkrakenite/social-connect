const express = require("express");
const {
  createReel,
  fetchReels,
  deleteReels,
} = require("../controllers/reelController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/get", fetchReels);
router.post("/create", protect, createReel);
router.delete("/delete/:id", protect, deleteReels);

module.exports = router;
