const express = require("express");
const passport = require("passport");
const route = express.Router();
 
route.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: '/home',
    failureFlash: true,
  }));


module.exports = route;