const express = require("express");
const routes = express.Router();

//route method
//route desc
//access public
routes.get("/", (req, res) => res.send("post roues"));

module.exports = routes;
