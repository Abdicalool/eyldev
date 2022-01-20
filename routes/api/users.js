const express = require("express");
const routes = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const User = require("../../model/User");
const bcryptjs = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
//route method
//route desc
//access public
routes.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email please include valid mail").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "user already exist" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);
      await user.save();
      res.send("User registered");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = routes;
