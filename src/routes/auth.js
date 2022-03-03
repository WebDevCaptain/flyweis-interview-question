const express = require("express");
const validator = require("validator");

const router = express.Router();

const User = require("../models/user");

const sendPasswordResetOtp = require("../utils/password-reset-otp");
const verifyOtp = require("../utils/verify-otp");
const auth = require("../middleware/auth");

/*
1. login {
  email,
  password,
}
*/

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.status(400).json({
      error: "Please provide an email address",
    });
  }

  if (!password) {
    return res.status(400).json({
      error: "Please provide a password",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: "Please provide a valid email address",
    });
  }

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    res.send({ user, token, message: "Login Success" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

/*
2. Forgot Password {
  email,
}
*/

router.post("/forgot-password", async (req, res) => {
  const email = req.body.email;

  try {
    await sendPasswordResetOtp(email);
    res.json({
      message: "Your password reset link has been sent to your email.",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Account not found",
    });
  }
});

/*
3. Verify otp {
  email,
  otp,
}
*/
// Calls a mock function `verifyOtp` as discussed with the interviewer
router.post("/verify-otp", async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  if (!email) {
    return res.status(400).json({
      error: "Please provide an email address",
    });
  }

  if (!otp) {
    return res.status(400).json({
      error: "Please provide a valid OTP",
    });
  }

  try {
    await verifyOtp(email, otp);
    res.status(201).json({
      message: "OTP verification success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: "Account not found",
    });
  }
});

// Additional routes
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send("Logged out successfully");
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = router;
