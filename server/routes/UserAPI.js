const express = require("express");
const router = express.Router();
const User = require("../models/User");

//@desc register new user
//@route POST /users/register-user
router.post("/register-user", async (req, res) => {
  let errors = [];
  const { fname, lname, email, password1, password2 } = req.body;

  if (
    fname === "" ||
    lname === "" ||
    email === "" ||
    password1 === "" ||
    password2 === ""
  ) {
    errors.push({ msg: "Some details are missing." });
  }
  if (password1 !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (password1.length <= 5) {
    errors.push({ msg: "Password should be atleast 6 characters long " });
  }
  if (errors.length > 0) {
    return res.status(500).json({
      success: false,
      errors: errors,
    });
  } else {
    try {
      const user = await User.create({
        fname: fname,
        lname: lname,
        email: email,
        password: password1,
      });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      errors.push({ msg: "Email Adress already registered." });
      res.status(500).json({
        success: false,
        errors: errors,
      });
    }
  }
});

//@desc user login route
//@route POST users/login-user
router.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      console.log(user);
    }
    if (!user) {
      return res.status(500).json({
        success: false,
        msg: "Email address is not registered",
      });
    }
    if (user.password !== password) {
      return res.status(500).json({
        success: false,
        msg: "Password is incorrect",
      });
    }
    const newUser = {
      id: user._id,
      fname: user.fname,
      lname: user.lname,
      email: user.email,
    };
    return res.status(200).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
});

module.exports = router;
