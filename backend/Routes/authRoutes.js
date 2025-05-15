// Routes/authRoutes.js

const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const authRouter = express.Router();
const saltRounds = 10;
const SECRET = process.env.SECRET;

// @route POST /api/auth/register
// @desc Register a new user
// @access Public
authRouter.post('/register', async (req, res) => {
  // Validate request body ( email + password)
  const isCredentialsValid = validateCredentials(req.body);
  if (isCredentialsValid.error) {
    return res
      .status(400)
      .json({ success: false, message: isCredentialsValid.error.details });
  }

  const newEmail = req.body.email.trim();
  const newPassword = req.body.password.trim();

  try {
    // Check uniqueness of email
    const userExists = await User.findOne({ email: newEmail });
    if (userExists) {
      return res
        .status(409)
        .json({ success: false, message: 'email already exists' });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // create and save new user document
    const newUser = new User({ email: newEmail, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: `New user successfully created`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: error registering new user',
    });
  }
});

// @route POST /api/auth/login
// @desc Login user
// @access Public
authRouter.post('/login', async (req, res) => {
  // Validate request body ( email + password)
  const isCredentialsValid = validateCredentials(req.body);
  if (isCredentialsValid.error) {
    return res
      .status(400)
      .json({ success: false, message: isCredentialsValid.error.details });
  }

  const newEmail = req.body.email.trim();
  const newPassword = req.body.password.trim();

  try {
    const userExists = await User.findOne({ email: newEmail });
    if (!userExists) {
      return res
        .status(401)
        .json({ success: false, message: 'User is not registered' });
    }

    // user exists if verify password with compare
    const passwordMatch = await bcrypt.compare(
      newPassword,
      userExists.password
    );

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid password' });
    }

    // matches - create jwt and send it with response
    let jwtToken = jwt.sign(
      { email: userExists.email, userId: userExists._id },
      SECRET
    );
    res.cookie('token', jwtToken, {
      httpOnly: true, // prevent JS access (XSS protection)
      secure: true, // only sent over HTTPS (for production)
      sameSite: 'None', // CSRF protection
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: `Logged in successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error: error while log in',
      error: error.message,
    });
  }
});

// @route GET /api/auth/check-auth
// @desc Check auth status
// @access Public
authRouter.get('/check-auth', (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(200).json({ authenticated: false });
    }

    const decoded = jwt.verify(token, SECRET); // use your real secret here
    return res.status(200).json({ authenticated: true, user: decoded });
  } catch (error) {
    return res
      .status(200)
      .json({ authenticated: false, message: 'Invalid or expired token' });
  }
});

// @route GET /api/auth/logout
// @desc Logs out the user by clearing the cookie
// @access Public
authRouter.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
  });
  return res
    .status(200)
    .json({ success: true, message: 'Logged out successfully' });
});

function validateCredentials(credentials) {
  const userSchema = Joi.object({
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
  });

  return userSchema.validate(credentials);
}

module.exports = authRouter;
