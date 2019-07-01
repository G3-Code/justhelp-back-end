const express = require("express");
const router = express.Router();

const User = require("../models/UserModel");
const authenticate = require("../auth/authenticate");

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
        const email = userToUpdate.email;
        const userValid = User.findBy({ email });
        if (userValid) {
          if (userToUpdate.password) {
            const hash = bcrypt.hashSync(userToUpdate.password, 10);
            userToUpdate.password = hash;
          }
          const updated = await User.update(userId, user);
          res.status(201).json(updated);
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
