const express = require("express");
const routes = express.Router();
const auth = require('../../middleware/auth');

//route method
//route desc
//access public
routes.get("/", auth, (req, res) => res.send("auth roues"));

module.exports = routes;
