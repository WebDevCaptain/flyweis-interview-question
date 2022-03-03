const express = require("express");
const validator = require("validator");

const router = express.Router();
const sendPasswordResetOtp = require("../utils/password-reset-otp");
const verifyOtp = require("../utils/verify-otp");

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

  res.status(201).json({
    message: "Login Success",
    email,
  });
});

/*
2. Forgot Password {
  email,
}
*/

router.post("/forgot-password", async (req, res) => {
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({
      error: "Please provide an email address",
    });
  }

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

module.exports = router;
