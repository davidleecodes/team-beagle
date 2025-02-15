const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const Profile = require("../models/Profile");

// @route POST /auth/register
// @desc Register user
// @access Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const emailExists = await User.findOne({ email });

  if (emailExists) {
    res.status(400);
    throw new Error("A user with that email already exists");
  }

  const usernameExists = await User.findOne({ username });

  if (usernameExists) {
    res.status(400);
    throw new Error("A user with that username already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  await Profile.create({
    userId: user._id,
    firstName: username,
    lastName: "(n/a)",
    description: "(this user has not written a description yet)",
    location: "(this user has not set a location yet)",
    isDogSitter: false,
    hourlyRate: 15,
    tagLine: "(no tagline)",
  });

  console.log("profile created");
  if (user) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    });

    res.status(201).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @route POST /auth/login
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    const secondsInWeek = 604800;

    console.log("dev", process.env.NODE_ENV);
    console.log("tokenIN", token);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: secondsInWeek * 1000,
      // sameSite: "none",
      // secure: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    });

    const profile = await Profile.findOne({ userId: user._id });
    res.status(200).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
        profile: profile,
      },
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @route GET /auth/user
// @desc Get user data with valid token
// @access Private
exports.loadUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const profile = await Profile.findOne({ userId: user._id });

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      profile: profile,
    },
  });
});

// @route GET /auth/logout
// @desc Logout user
// @access Public
exports.logoutUser = asyncHandler(async (req, res, next) => {
  // const host =
  //   process.env.NODE_ENV === "development" ? "localhost" : req.get("host");
  // console.log("host", host);

  // res.clearCookie("token", { domain: host, path: "/" });
  res.cookie("token", "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });

  res.send("You have successfully logged out");
});
