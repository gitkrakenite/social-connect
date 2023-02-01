const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const reelRoutes = require("./routes/reelRoutes");
const db = require("./config/db");

const dotenv = require("dotenv").config();
const colors = require("colors");
const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// DB connection
db();

// routes
app.get("/", (req, res) => {
  res.json({ message: "API working" });
});
app.use("/api/v1", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/reel", reelRoutes);

// listener
app.listen(PORT, console.log(`Server running on port: ${PORT}`));
