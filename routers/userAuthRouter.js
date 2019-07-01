const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const jwtKey = require("../auth/secrets");

router.post("/register", async (req, res) => {
  try {
    console.log("::: WITHIN USER REGISTRATION :::");
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    if (
      user.email &&
      user.password &&
      user.phone_number &&
      user.first_name &&
      user.last_name
    ) {
      let addUser = await User.add(user);
      console.log(`:: REGISTER :: ADD USER IS :: ${addUser}`);
      res.status(201).json(addUser);
    } else {
      res.status(400).json({
        message: "Please enter all the necessary credentials to register."
      });
    }
  } catch (error) {
    console.log(`:: REGISTER :: ERROR IS :: ${error}`);
    res
      .status(500)
      .json({ message: "Sorry, but something went wrong while registering." });
  }
});

module.exports = router;
