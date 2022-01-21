const express = require("express");
const routes = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../model/profile");
const User = require("../../model/User");

//route method
//route desc
//access public
routes.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server");
  }
});

module.exports = routes;
