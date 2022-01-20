const express = require("express");
const routes = express.Router();

//route method
//route desc
//access public
routes.get("/", (req, res) => res.send("profile roues"));

module.exports = routes;
