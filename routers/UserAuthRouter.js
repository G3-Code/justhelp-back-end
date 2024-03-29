const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const jwtKey = require("../auth/secrets");
const Contact = require("../models/ContactsModel");
const KindAct = require("../models/KindActsModel");

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

router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;
    if (email && password) {
      console.log(`:: LOGIN :: USER NAME AND PASSWORD CAPTURED SUCCESSFULLY::`);
      let user = await User.findBy({ email });
      console.log(`:: LOGIN :: USER IS FOUND :: ${user}`);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        const contacts = await Contact.findByUserId(user.id);
        const acts = await KindAct.findByUserId(user.id);
        console.log(`:: LOGIN :: TOKEN GENERATED ::}`);
        res.status(200).json({
          message: `${user.first_name} is successfully logged in`,
          token,
          user,
          contacts,
          acts
        });
      } else {
        res
          .status(401)
          .json({ message: "Sorry, incorrect email or password." });
      }
    } else {
      res.status(400).json({
        message: `Submit both an email and password when registering`
      });
    }
  } catch (error) {
    console.log(`:: LOGIN :: ERROR :: IS ${error}`);
    res
      .status(500)
      .json({ message: "Sorry, but something went wrong while logging in." });
  }
});

router.get("/logout", (req, res) => {
  console.log(`:: LOGGING OUT ::`);
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res
          .status(400)
          .json({ message: `There was an error logging out the user.` });
        console.log(`:: LOGOUT :: ERROR IS :: ${err}`);
      } else {
        console.log(`:: LOGOUT :: LOGOUT SUCCESSFUL ::`);
        res.status(200).json({ message: "Logout successful!" });
      }
    });
  } else {
    res.status(400).json({ message: "you were never here to begin with" });
  }
});

function generateToken(user) {
  console.log(`:: GENERATE TOKEN ::`);
  const payLoad = {
    subject: user.id,
    email: user.email
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payLoad, jwtKey.jwtSecret, options);
}

module.exports = router;
