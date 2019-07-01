const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");
const { authenticate } = require("../auth/authenticate");

const bcrypt = require("bcryptjs");

router.put("/:id", authenticate, async (req, res) => {
  try {
    const userId = req.params.id;
    const userToUpdate = req.body;
    if (userId && userToUpdate) {
      if (
        userToUpdate.email &&
        (userToUpdate.first_name ||
          userToUpdate.last_name ||
          userToUpdate.phone_number ||
          userToUpdate.password)
      ) {
        console.log(`:: USER UPDATE :: ALL CREDENTIALS AVAILABLE::`);
        const email = userToUpdate.email;
        console.log(`::USER UPDATE :: EMAIL IS :: ${email}`);
        const userValid = User.findBy({ email });
        if (userValid) {
          console.log(`::USER UPDATE :: VALID USER ::`);
          if (userToUpdate.password) {
            const hash = bcrypt.hashSync(userToUpdate.password, 10);
            userToUpdate.password = hash;
            console.log(`::USER UPDATE :: PASSWORD HASHED ::`);
          }
          const user = await User.update(userId, userToUpdate);
          console.log(`::USER UPDATE :: USER IS :: ${JSON.stringify(user)}`);
          res.status(201).json({ user });
        } else {
          res.status(404).json({
            message: `Sorry, but a profile with the email - ${email} does not exist.`
          });
        }
      } else {
        res
          .status(400)
          .json({ message: "There is not enough information to update." });
      }
    } else {
      res.status(400).json({
        message: "User id or user object missing."
      });
    }
  } catch (error) {
    console.log(`:: ERROR IN UPDATE USER IS :: ${error}`);
    res.status(500).json({
      message:
        "Sorry, something went wrong while updating the user information."
    });
  }
});

module.exports = router;
