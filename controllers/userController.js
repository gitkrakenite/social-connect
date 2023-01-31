const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @Register  POST
// http://localhost:5000/api/v1/register
// public
const registerUser = async (req, res) => {
  // check we have details from frontend
  const { name, email, profile, password } = req.body;

  if (!name || !email || !profile || !password) {
    res.status(400).json({ message: "Some details are missing" });
    console.log(req.body);
    return;
  }
  // check if user exists in db
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "User already exists in database" });
    return;
  }

  // register user
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    profile,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
      token: generateToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

// @login  POST
// http://localhost:5000/api/v1/login
// public
const loginUser = async (req, res) => {
  // check if details were sent
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Details missing" });
    return;
  }
  // check if user exists
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
      // isAdmin: user.isAdmin,
      token: generateToken(user._id),
      createdAt: user.createdAt,
    });
  } else {
    res.status(400).send("Invalid credentials");
  }
};

// @user  GET
// http://localhost:5000/api/v1/user/:id
// public
const getUser = async (req, res) => {
  //  receive the user id
  const { id } = req.params;
  if (!id) {
    res.status(404).json({ message: "Id not sent" });
    return;
  }
  // check user
  const user = await User.findOne({ _id: id });

  // serve data
  if (user) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
      createdAt: user.createdAt,
    });
  } else {
    res.status(500).json({ message: "User not" });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "2d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
